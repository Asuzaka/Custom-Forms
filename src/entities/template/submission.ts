export type Submission = {
  _id: string;
  title: string;
  createdAt: Date;
  user: { _id: string; name: string };
};
