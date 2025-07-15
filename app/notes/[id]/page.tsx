import { QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";


type NoteDetailsProps = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: NoteDetailsProps):Promise <Metadata> { 
  const { id } = await params;
  const parsedId = Number(id);
  const note = await fetchNoteById(parsedId);
  return {
    title: note.title,
    description: note.content,
     openGraph: {
        title: `Note: ${note.title}`,
        description: `${note.content.slice(0, 30)}...`,
        url: `https://notehub.com/notes/${id}`, 
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: `${note.title} | NoteHub`,
          },
        ],
      },
  }
    
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const resolvedParams = await params;
  const queryClient = new QueryClient();
  const noteId = Number(resolvedParams.id);
  
  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <div>
      <h1>NoteDetails</h1>
      <br />
      <HydrationBoundary state={dehydrate(queryClient)}>
      </HydrationBoundary>
    </div>
  )
}
export default NoteDetails;

