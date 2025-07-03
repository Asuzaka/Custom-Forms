import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Spinner } from "@heroui/react";
import type { RootState } from "../../store/store";

export function Protected({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user);

  if (user.isLoading) {
    return (
      <div className="flex items-center justify-between">
        <Spinner>Loading...</Spinner>
      </div>
    );
  }

  if (!user.user) {
    return <Navigate to="/signin" />;
  }

  if (user.user?.status === "blocked") throw Error("You are blocked");

  return children;
}
