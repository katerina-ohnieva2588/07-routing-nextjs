import Link from "next/link";
import css from "@/components/SidebarNotes/SidebarNotes.module.css";

const tags = [
  { value: "todo", label: "Todo" },
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "meeting", label: "Meeting" },
  { value: "shopping", label: "Shopping" },
];

export default function Default() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>

      {tags.map(({ value, label }) => (
        <li key={value} className={css.menuItem}>
          <Link href={`/notes/filter/${value}`} className={css.menuLink}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
