import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { notesKey } from "@/lib/queryKeys";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const page = 1;
  const search = "";
  const perPage = 15;
  const tag = undefined;

  await queryClient.prefetchQuery({
    queryKey: notesKey(page, search, perPage, tag),
    queryFn: () =>
      fetchNotes({ page, perPage, search, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}