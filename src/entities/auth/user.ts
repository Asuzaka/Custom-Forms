export type User = {
  id: string;
  photo: string;
  name: string;
  email: string;
  status: Status;
  role: Role;
};

export type Status = "blocked" | "active";
export type Role = "admin" | "user";
