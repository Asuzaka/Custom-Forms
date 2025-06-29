import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Navigate } from "react-router";

export function Protected({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.user);

  if (user.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }
  if (user.user?.status === "blocked") throw Error("You are blocked");

  return children;
}
