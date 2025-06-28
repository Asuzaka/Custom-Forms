import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function GitHubCallback() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateWithGitHub = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        navigate("/");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/v1/auth/github`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ code }),
          },
        );

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
      } finally {
        setLoading(false);
      }
    };

    authenticateWithGitHub();
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center text-lg">
      {loading ? "Logging in with GitHub..." : "Redirecting..."}
    </div>
  );
}
