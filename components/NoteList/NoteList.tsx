import type { Note } from "@/types/note";
import NoteItem from "../NoteItem/NoteItem";

type Props = {
  notes: Note[];
  onDelete: (id: string) => void;
};

export default function NoteList({ notes, onDelete }: Props) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <NoteItem
            id={note.id}
            title={note.title}
            content={note.content}
            tag={note.tag}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}