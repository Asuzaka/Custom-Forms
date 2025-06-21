import type { Sort } from "../../entities";

export const sort: Sort[] = [
  { id: 0, name: "default", query: "" },
  {
    id: 0,
    name: "sort by date",
    query: "date",
  },
  {
    id: 1,
    name: "sort by last seen",
    query: "seen",
  },
  {
    id: 2,
    name: "sort by title",
    query: "title",
  },
];
