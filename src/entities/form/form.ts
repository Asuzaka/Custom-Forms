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
  index: number;
  text: string;
  id: string;
  answer: string | string[];
};
