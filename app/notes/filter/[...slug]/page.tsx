
import NotesClient from './NotesClient';
import { getNotes } from '@/lib/api';
import { Metadata } from "next";
import { Tag } from '@/types/note';

type generateMetadataProps = {
  params: Promise<{ slug: string[] }>
};
  
export async function generateMetadata({ params }: generateMetadataProps):Promise<Metadata> {
  const { slug } = await params
 const tag: Tag | string = slug[0];

  return {
    title: `Notes - ${tag === 'All' ? 'All Tags' : tag}`,
    description: `Browse notes tagged with ${
      tag === 'All' ? 'all tags' : tag
    }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
    openGraph: {
      title: `Notes - ${tag === 'All' ? 'All Tags' : tag}`,
      description: `Browse notes tagged with ${
        tag === 'All' ? 'all tags' : tag
      }. NoteHub allows you to filter and view notes based on specific tags for better organization.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes - ${tag === 'All' ? 'All Tags' : tag} | NoteHub`,
        },
      ],
    },
  };
}

const NotesPageWithFilters = async ({ params }: generateMetadataProps) => {
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
