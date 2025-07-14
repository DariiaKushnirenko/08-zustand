import { QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";


type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props):Promise <Metadata> { 
  const { id } = await params;
const noteId = Number(id);

  const note = await fetchNoteById(noteId);
  return {
    title: `Note: ${note.title}`,
    description: note.content,
     openGraph: {
        title: `Note: ${note.title}`,
        description: note.content,
        url: `https://notehub-public.goit.study/api/${noteId}`, 
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'Note preview image',
          },
        ],
      },
  }
    
}

const NoteDetails = async ({ params }: Props) => {
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

