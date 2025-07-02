import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "@heroui/react";
import { env } from "../../shared/config";

export function GitHubCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateWithGitHub = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`${env.BACKEND_URL}/v1/auth/github`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (data.status === "success") {
          navigate("/dashboard");
        } else {
          console.error("GitHub login failed:", data);
          navigate("/");
        }
      } catch (err) {
        console.error("GitHub login error:", err);
        navigate("/");
      }
    };

    authenticateWithGitHub();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center text-lg">
      <Spinner>Loading...</Spinner>
    </div>
  );
}
