import type { ReactNode } from "react";

export type Actions = {
  id: number;
  text: ReactNode;
  callback: (id: string, call: () => void) => void;
};
