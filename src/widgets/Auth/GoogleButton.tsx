import { addToast } from "@heroui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { api } from "../../shared/api/authApi";
import { setUserLoading } from "../../store/userSlice";

declare global {
  interface Window {
    google: any;
  }
}

export function GoogleLoginButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeGoogleAuth = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          ux_mode: "popup",
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-button"),
          {
            theme: "outline",
            size: "large",
            text: "continue_with",
            shape: "rectangular",
          },
        );
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.onload = initializeGoogleAuth;
      document.body.appendChild(script);
    } else {
      initializeGoogleAuth();
    }

    return () => {};
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Authentication failed");
      }

      dispatch(setUserLoading());
      dispatch(api.util.invalidateTags(["user"]));
      navigate("/dashboard");
      addToast({
        title: "Success",
        description: "Logged in successfully!",
        timeout: 3000,
        color: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        color: "danger",
        timeout: 3000,
        description:
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.",
      });
    }
  }

  return <div id="google-button" className="w-full"></div>;
}
