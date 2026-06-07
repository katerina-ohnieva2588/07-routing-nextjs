"use client";

import Link from "next/link";

const tags = ["all", "Work", "Personal", "Meeting", "Shopping"];

export default function Sidebar() {
  return (
    <ul>
      <li>
        <Link href="/notes/filter/all">All notes</Link>
      </li>

      {tags.slice(1).map((tag) => (
        <li key={tag}>
          <Link href={`/notes/filter/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
}

