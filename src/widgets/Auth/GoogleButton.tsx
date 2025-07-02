import { useEffect } from "react";
import { useNavigate } from "react-router";

declare global {
  interface Window {
    google: any;
  }
}

export function GoogleLoginButton() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // Replace with your real client ID
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-button"),
        {
          theme: "outline",
          size: "large",
        },
      );
    }
  }, []);

  async function handleCredentialResponse(response: { credential: string }) {
    const token = response.credential;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/v1/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ token }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch {
      alert("Something went wrong. Try again.");
    }
  }

  return <div id="google-button"></div>;
}
