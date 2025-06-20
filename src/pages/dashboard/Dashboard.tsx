import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { AdminDashboard } from "./admin";
import { UserDashboard } from "./user";

export function Dashboard() {
  const { user } = useSelector((state: RootState) => state.user);

  if (user?.role == "admin") return <AdminDashboard />;

  return <UserDashboard />;
}
