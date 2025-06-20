import { Navbar } from "../widgets";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <Navbar />
      <main className="m-auto max-w-5xl px-6">
        <Outlet />
      </main>
    </>
  );
}
