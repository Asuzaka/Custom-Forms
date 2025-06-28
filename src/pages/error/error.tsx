import { Frown } from "lucide-react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

export function ErrorFallback() {
  const navigate = useNavigate();
  const error = useRouteError();

  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center dark:bg-gray-900">
      <Frown className="mb-4 h-16 w-16 text-red-500" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
        Something went wrong
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{message}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 cursor-pointer rounded bg-red-600 px-6 py-2 text-white transition hover:bg-red-700"
      >
        Home
      </button>
    </div>
  );
}
