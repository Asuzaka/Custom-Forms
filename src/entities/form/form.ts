export type FormObject = {
  id?: string;
  user?: string;
  template: string;
  creator: string;
  title: string;
  answers: FormAnswer[];
  createdAt: Date;
};

export type FormAnswer = {
  id: string;
  value: string | string[];
};
