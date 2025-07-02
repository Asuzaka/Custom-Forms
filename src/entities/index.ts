// Navbar entities
export type { Lang } from "./nav/languages";
// Authentification entites
export type { User } from "./auth/user";
// Error entities
export type { CustomErrorData } from "./error/error";
// Dashboard entities
export type { View } from "./dashboard/view";
export type { Statistics } from "./dashboard/statistics";
export type { Form } from "./dashboard/form";
export type { Sort, sortQuery } from "./dashboard/sort";
export type { ModalType } from "./dashboard/modal";
// Template entities
export type { MainTab } from "./template/maintab";
export type { Comment } from "./template/comment";
export type {
  QuestionBase,
  CheckboxTemplateQuestion,
  CheckboxOption,
  NumberInputTemplateQuestion,
  MultiLineTemplateQuestion,
  SingleLineTemplateQuestion,
  TemplateObject,
  TemplateQuestion,
} from "./template/template";
// Form entites
export type { FormAnswer, FormObject } from "./form/form";
