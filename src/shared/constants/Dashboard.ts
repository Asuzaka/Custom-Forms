import type { Sort } from "../../entities";

export const sort: Sort[] = [
  { id: 0, name: "default", query: "" },
  {
    id: 1,
    name: "sort by date",
    query: "date",
  },
  {
    id: 3,
    name: "sort by title",
    query: "title",
  },
];
