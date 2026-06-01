"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const PER_PAGE = 15;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, PER_PAGE, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
      }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div>
      <SearchBox value={search} onChange={debouncedSearch} />

      <NoteList notes={data?.notes || []} />

      <div>
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        <span> Page {page} </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= (data?.totalPages || 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}