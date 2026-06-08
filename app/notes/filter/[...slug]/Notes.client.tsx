"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import css from "./NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import { fetchNotes } from "@/lib/api";
import { notesKey } from "@/lib/queryKeys";

export default function NotesClient({ tag }: { tag?: string }) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const PER_PAGE = 12;

  const debouncedSearch = useDebouncedCallback((value: string): void => {
    setSearch(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
  queryKey: notesKey(page, search, PER_PAGE, tag ?? "all"),
  queryFn: () =>
    fetchNotes({
      page,
      perPage: PER_PAGE,
      search,
      tag: tag === "all" ? undefined : tag,
    }),
  placeholderData: keepPreviousData,
  staleTime: 60_000,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
});

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={debouncedSearch} />

        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}

      {data?.notes && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}