import type { TemplateObject } from "../template/template";
import type { User } from "../auth/user";

export type FullTemplate = TemplateObject & {
  creator: User;
  id: string;
};
