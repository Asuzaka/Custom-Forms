import type { HomePageColumns, Sort } from "../../entities";
import type { TFunction } from "i18next";

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

export const getHomePageColumns = (t: TFunction): HomePageColumns[] => [
  { key: "title", label: t("homepage.popularTemplates.title") },
  { key: "creator.name", label: t("homepage.popularTemplates.author") },
  { key: "likes", label: t("homepage.popularTemplates.likes") },
];
