export type TemplateObject = {
  _id?: string;
  id?: string;
  title: string;
  topic: string;
  description: string;
  tags: string[];
  image: string;
  access: "public" | "restricted";
  allowedUsers: string[];
  creator: string;
  questions: TemplateQuestion[];
  createdAt?: Date;
  publish: boolean;
  likes: number;
  likedBy: string[];
};

export type QuestionBase = {
  id: string;
  type: "singleLine" | "multiLine" | "numberInput" | "checkbox";
  required: boolean;
  text: string;
  visible: boolean;
  description?: string;
};

export type SingleLineTemplateQuestion = QuestionBase & {
  type: "singleLine";
  placeholder?: string;
};

export type MultiLineTemplateQuestion = QuestionBase & {
  type: "multiLine";
  placeholder?: string;
};

export type NumberInputTemplateQuestion = QuestionBase & {
  type: "numberInput";
};

export type CheckboxOption = {
  id: string;
  text: string;
};

export type CheckboxTemplateQuestion = QuestionBase & {
  type: "checkbox";
  options: CheckboxOption[];
  multiple?: boolean;
};

export type TemplateQuestion =
  | SingleLineTemplateQuestion
  | MultiLineTemplateQuestion
  | NumberInputTemplateQuestion
  | CheckboxTemplateQuestion;
