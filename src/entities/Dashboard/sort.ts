export type Sort = {
  id: number;
  name: string;
  query: sortQuery;
};

export type sortQuery = "" | "date" | "seen" | "title";
