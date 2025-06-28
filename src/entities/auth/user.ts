export type User = {
  id: string;
  photo: string;
  name: string;
  email: string;
  role: Role;
};

export type Role = "admin" | "user";
