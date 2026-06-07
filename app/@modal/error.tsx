"use client";

export default function Error({
  error,
}: {
  error: Error;
}) {
  return (
    <div>
      <p>Modal error: {error.message}</p>
    </div>
  );
}