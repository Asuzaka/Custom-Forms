import { useEffect } from "react";
import { useAuthenticatedQuery } from "../shared/api/authApi";
import { Navbar } from "../widgets";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

export function Layout() {
  const { data, error, isLoading } = useAuthenticatedQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      // come here to error handling
    } else {
      const userData = data?.data;
      if (!userData) return;

      const user = {
        email: userData.email,
        name: userData.name,
        photo: userData.photo,
        id: userData.id,
        role: userData.role,
      };

      dispatch(setUser(user));
    }
  }, [dispatch, data, error, isLoading]);

  return (
    <>
      <Navbar />
      <main className="m-auto max-w-5xl px-6">
        <Outlet />
      </main>
    </>
  );
}
