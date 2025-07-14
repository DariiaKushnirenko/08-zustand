
import NotesClient from './Notes.client';
import { getNotes } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string[] }>
  };

const NotesPageWithFilters = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] 

  const notes = await getNotes({
    search: "",
    tag: category,
    page: 1,
   
  });

  return (
    <div>
      <h2>Notes</h2>
      <NotesClient initialData={notes} tag={slug[0]} />
    </div>
  );
};

export default NotesPageWithFilters;
