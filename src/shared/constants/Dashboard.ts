import type { HomePageColumns, Lang, Sort } from "../../entities";
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

export const getLanguages = (t: TFunction): Lang[] => [
  {
    key: "en",
    name: t("general.en"),
  },
  {
    key: "ru",
    name: t("general.ru"),
  },
  {
    key: "uz",
    name: t("general.uz"),
  },
];

export const getHomePageColumns = (t: TFunction): HomePageColumns[] => [
  { key: "title", label: t("homepage.popularTemplates.title") },
  { key: "creator.name", label: t("homepage.popularTemplates.author") },
  { key: "likes", label: t("homepage.popularTemplates.likes") },
];
