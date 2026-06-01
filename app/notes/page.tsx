import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { notesKey } from "../../lib/queryKeys";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const page = 1;
  const search = "";
  const perPage = 15;

  await queryClient.prefetchQuery({
    queryKey: notesKey(page, search, perPage),
    queryFn: () => fetchNotes({ page, perPage, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}