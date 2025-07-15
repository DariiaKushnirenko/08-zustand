"use client";

import css from "../[...slug]/NotesPage.module.css";

import { useState } from "react";
import { getNotes } from "../../../../lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import SearchBox from "../../../../components/SearchBox/SearchBox";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";

import type { NotesResponse } from "../../../../types/note";
import Link from "next/link";

type NotesClientProps = {
  initialData: NotesResponse;
  tag: string;

};

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const activeSearch = debouncedSearchTerm.trim();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const { data } = useQuery<NotesResponse, Error>({
    queryKey: ["notes", tag === "all" ? undefined : tag, activeSearch, currentPage],
    queryFn: () =>
      getNotes({
        tag: tag === "all" ? undefined : (tag as 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo'),
        search: activeSearch,
        page: currentPage,
        perPage: 12,
      }),
    placeholderData: keepPreviousData,
    initialData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        {
        <Link href="/notes/action/create" className={css.button}>Create note +</Link>}
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
