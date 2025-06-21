import type { Sort } from "../../entities";

export const sort: Sort[] = [
  { id: 0, name: "default", query: "" },
  {
    id: 1,
    name: "sort by date",
    query: "date",
  },
  {
    id: 2,
    name: "sort by last seen",
    query: "seen",
  },
  {
    id: 3,
    name: "sort by title",
    query: "title",
  },
];
