import { fetchNoteById } from "@/lib/api";
import NotePreview from "./NotePreview.client";

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const note = await fetchNoteById(params.id);

  return <NotePreview note={note} />;
}