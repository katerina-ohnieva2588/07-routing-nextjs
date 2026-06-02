export const notesKey = (page: number, search: string, perPage: number) => [
  "notes",
  page,
  search,
  perPage,
];

export const noteKey = (id: string) => ["note", id];