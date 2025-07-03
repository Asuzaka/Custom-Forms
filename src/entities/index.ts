// Navbar entities
export type { Lang } from "./Nav/Languages";
// Home entities
export type { globalSearchType } from "./search/global";
// Home entities
export type { FullTemplate } from "./home/template";
// Authentification entites
export type { User } from "./auth/user";
export type { UserLog } from "./auth/signin";
export type { UserReg } from "./auth/signup";
// Error entities
export type { CustomErrorData } from "./error/error";
// Dashboard entities
export type { HomePageColumns } from "./Dashboard/columns";
export type { View } from "./Dashboard/view";
export type { Statistics } from "./Dashboard/statistics";
export type { Form } from "./Dashboard/form";
export type { Sort, sortQuery } from "./Dashboard/sort";
export type { ModalType } from "./Dashboard/modal";
// Template entities
export type { Submission } from "./template/submission";
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
