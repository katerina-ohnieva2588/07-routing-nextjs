"use client";

import css from "./NotePreview.module.css";

type Props = {
  note: {
    title: string;
    content: string;
  };
};

export default function NotePreview({ note }: Props) {
  return (
    <div>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
    </div>
  );
}