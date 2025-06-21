import type { Form } from "../../entities";

export function sortByTitle(forms: Form[]): Form[] {
  return [...forms].sort((a, b) => a.title.localeCompare(b.title));
}

export function sortByCreatedAt(forms: Form[]): Form[] {
  return [...forms].sort(
    (a, b) => b.createtAt.getTime() - a.createtAt.getTime(),
  );
}

export function sortBySeenDate(forms: Form[]): Form[] {
  return [...forms].sort((a, b) => b.seen.getTime() - a.seen.getTime());
}
