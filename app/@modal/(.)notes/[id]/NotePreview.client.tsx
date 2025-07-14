"use client"
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";

import { useRouter } from 'next/navigation';
import css from "./NorePreview.module.css";

interface NotePreviewClientProps {
    id: number;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
    const router = useRouter();
    const {
        data: note,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });
    const handleClose = () => {
        router.back();
    };
    if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong..</p>;

  return (
    <Modal onClose = {handleClose}>
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
      </div>
    </Modal>
  );
};