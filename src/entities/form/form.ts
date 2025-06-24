export type FormObject = {
  id?: string;
  topic: string;
  description: string;
  image: string | File;
  title: string;
  creator: string;
  template: false | string;
  publishTemplate: false | string;
  publish: boolean;
  publishUrl: string;
  questions: Question[];
  createdAt?: Date;
  updatedAt?: Date;
  seen: Date;
  thumbail: string;
};

export type QuestionBase = {
  id: string;
  type: "singleLine" | "multiLine" | "numberInput" | "checkbox";
  required: boolean;
  text: string;
  visible: boolean;
  description?: string;
};

export type SingleLineQuestion = QuestionBase & {
  type: "singleLine";
  answer: string;
  placeholder?: string;
  maxLength?: number;
};

export type MultiLineQuestion = QuestionBase & {
  type: "multiLine";
  answer: string;
  lines: number;
  placeholder?: string;
};

export type NumberInputQuestion = QuestionBase & {
  type: "numberInput";
  answer: number;
};

export type CheckboxOption = {
  id: string;
  text: string;
  selected: boolean;
};

export type CheckboxQuestion = QuestionBase & {
  type: "checkbox";
  options: CheckboxOption[];
  multiple?: boolean;
};

export type Question =
  | SingleLineQuestion
  | MultiLineQuestion
  | NumberInputQuestion
  | CheckboxQuestion;
