"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const formattedDate = data
    ? new Date(data.createdAt).toLocaleDateString()
    : "";

  return (
    <Modal onClose={() => router.back()}>
      <button onClick={() => router.back()}>Close</button>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}

      {!isLoading && !isError && data && (
        <>
          <h2>{data.title}</h2>
          <p>{data.content}</p>
          <p>{formattedDate}</p>
          <span>{data.tag}</span>
        </>
      )}
    </Modal>
  );
}