import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate } from "react-router";

export function Protected({ children }: { children: React.ReactNode }) {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
}
