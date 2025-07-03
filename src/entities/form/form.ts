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

export type SubmittedForm = {
  _id: string;
  user: string;
  template: {
    _id: string;
    title: string;
    description: string;
    image: string;
  };
  creator: string;
  title: string;
  answers: FormAnswer[];
  createdAt: Date;
};
