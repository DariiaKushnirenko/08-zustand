import { QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

type Props = {
  params: Promise<{ id: string }>
};

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

