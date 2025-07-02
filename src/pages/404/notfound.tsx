import { AlertTriangle } from "lucide-react";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex translate-y-3/4 flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="mb-4 h-16 w-16 text-yellow-500" />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
        404 - Page Not Found
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        The page you’re looking for doesn’t exist.
      </p>
      <Button
        onPress={() => navigate("/")}
        color="primary"
        variant="solid"
        className="mt-3"
      >
        Go to Home
      </Button>
    </div>
  );
}
