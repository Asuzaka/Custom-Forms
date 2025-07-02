export type Comment = {
  _id: string;
  text: string;
  user: {
    _id: string;
    email: string;
    name: string;
    photo: string;
  };
  createdAt: string;
  template: string;
};
