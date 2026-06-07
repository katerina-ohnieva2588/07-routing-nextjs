import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { notesKey } from "@/lib/queryKeys";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";

export default async function NotesFilterPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const page = 1;
  const perPage = 15;
  const search = "";

  const tagRaw = slug?.[0] ?? "all";
  const tag = tagRaw === "all" ? undefined : tagRaw;

  await queryClient.prefetchQuery({
    queryKey: notesKey(page, search, perPage, tag),
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}