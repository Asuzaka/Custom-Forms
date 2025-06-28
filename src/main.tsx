import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./shared/lib/i18n/index.ts";
import "./index.css";
import App from "./App.tsx";
import {
  Dashboard,
  Home,
  SignIn,
  SignUp,
  Form,
  NewForm,
  Submit,
  GitHubCallback,
  NotFound,
  ErrorFallback,
} from "./pages/index.ts";
import { route } from "./shared/constants/route.ts";
import { Protected } from "./shared/components/Protected.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Home /> },
      { path: route.AUTH.SIGNIN.ROOT, element: <SignIn /> },
      { path: route.AUTH.SIGNUP.ROOT, element: <SignUp /> },
      {
        path: route.DASHBOARD.ROOT,
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: route.FORM.CREATE,
        element: (
          <Protected>
            <NewForm Form={undefined} />
          </Protected>
        ),
      },
      {
        path: route.FORM.DETAIL,
        element: (
          <Protected>
            <Form />
          </Protected>
        ),
      },
      {
        path: route.SUBMIT.ROOT,
        element: (
          <Protected>
            <Submit />
          </Protected>
        ),
      },
      {
        path: route.GITHUB.ROOT,
        element: <GitHubCallback />,
      },
      {
        path: route.NOTFOUND.ROOT,
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
