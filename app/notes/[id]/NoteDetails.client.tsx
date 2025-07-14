"use client";

import css from "../notes/NotesPage.module.css";

import { useState } from "react";
import { getNotes} from "../../../lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import SearchBox from "../../../components//SearchBox/SearchBox";
import NoteList from "../../../components//NoteList/NoteList";
import Pagination from "../../../components//Pagination/Pagination";
import Modal from "../../../components/Modal/Modal";

import type { NotesResponse } from "../../../types/note";
import NoteForm from "@/components/NoteForm/NoteForm";


type NotesClientProps = {
  initialData: NotesResponse;
};

export default function NotesClient({ initialData }: NotesClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeSearch = debouncedSearchTerm.trim();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const { data: note, isLoading, isError } = useQuery<NotesResponse, Error>({
    queryKey: ["notes", activeSearch, currentPage],
    queryFn: () => getNotes({
      page: currentPage,
      search: activeSearch
    },),
    placeholderData: keepPreviousData,

    initialData: initialData ?? null,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {note && note.totalPages > 1 && (
          <Pagination
            totalPages={note.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isModalOpen && (
      <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)}>
          </NoteForm>
      </Modal>
    )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Request failed</p>}
      {note && <NoteList notes={note.notes} />} 
    </div>
  );
}