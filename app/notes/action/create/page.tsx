import css from "./CreateNote.module.css"
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Create note',
  description: 'add new note here',
  openGraph: {
    title: 'Create note',
    description: 'Add new note here',
    url: '',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: '1200',
        height:'630',
        alt: 'Note Hub Image'
      }
    ]
  }
}
export default function CreateNote() {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                 <NoteForm />
            </div>
        </main>
    );
}