import { useEffect } from "react";
import { useAuthenticatedQuery } from "../shared/api/authApi";
import { Navbar } from "../widgets";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { setNoUser, setUser } from "../store/userSlice";

export function Layout() {
  const { data, error, isLoading } = useAuthenticatedQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) return;
    if (error) {
      dispatch(setNoUser());
    } else {
      const userData = data?.data;
      if (!userData) {
        dispatch(setNoUser());
        return;
      }

      const user = {
        email: userData.email,
        name: userData.name,
        photo: userData.photo,
        id: userData.id,
        role: userData.role,
        status: userData.status,
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
