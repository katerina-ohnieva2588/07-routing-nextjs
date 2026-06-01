"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormEvent } from "react";

import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";

export default function NoteForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    title: "",
    content: "",
    tag: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setForm({ title: "", content: "", tag: "" });
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.tag) return;

    mutate(form);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Create Note</h2>

      <input
        className={css.input}
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        disabled={isPending}
      />

      <textarea
        className={css.textarea}
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        disabled={isPending}
      />

      <input
        className={css.input}
        name="tag"
        value={form.tag}
        onChange={handleChange}
        placeholder="Tag"
        disabled={isPending}
      />

      <button className={css.button} type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Note"}
      </button>
    </form>
  );
}