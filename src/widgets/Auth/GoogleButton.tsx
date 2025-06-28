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
          credentials: "include", // Required to send/receive cookies
          body: JSON.stringify({ token }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        console.log("User logged in!", data);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again.");
    }
  }

  return <div id="google-button"></div>;
}
