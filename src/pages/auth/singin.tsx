import { useEffect } from "react";
import { addToast, Button, Form, Input, Link } from "@heroui/react";
import { GitHubLoginButton, GoogleLoginButton } from "../../widgets";
import { useSigninMutation } from "../../shared/api/authApi";
import type { UserLog } from "../../entities";
import { useNavigate } from "react-router";

export function SignIn() {
  const navigate = useNavigate();
  const [signin, { isLoading, error, isSuccess }] = useSigninMutation();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await signin(data as UserLog);
    } catch {
      // RTK HANDLEs
    }
  }

  useEffect(() => {
    if (error)
      addToast({
        title: "Error",
        description: (error as { error: string }).error,
        timeout: 3000,
        color: "danger",
      });
  }, [error]);

  useEffect(() => {
    if (isSuccess) navigate("/dashboard");
  }, [isSuccess, navigate]);

  return (
    <div className="flex items-center justify-center py-25">
      <div className="flex flex-col gap-5">
        <h1 className="py-3 text-center text-4xl font-extrabold">Sign in</h1>
        <p className="py-2 text-lg">Sign in to work with forms</p>
        <Form
          onSubmit={onSubmit}
          className="flex w-full max-w-xl flex-col gap-4"
        >
          <Input
            isRequired
            label="Email or username"
            labelPlacement="outside"
            name="uni"
            placeholder="Enter your username or email"
            type="text"
            validate={(value: string) => {
              if (value.length < 3)
                return "username lenght cannot be less than 3";
            }}
          />
          <Input
            isRequired
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter password"
            type="password"
            validate={(value: string) => {
              if (value.length < 8) {
                return "Passowd must be at least 8 characters long";
              }
            }}
          />
          <Button isLoading={isLoading} fullWidth color="primary" type="submit">
            Sign in
          </Button>
        </Form>

        <div>
          <hr></hr>
          <div className="mt-3 flex flex-col justify-between gap-5">
            <GoogleLoginButton />
            <GitHubLoginButton />
          </div>

          <div className="mt-2 flex gap-2">
            <p>Don't have an account? </p>
            <Link href="/signup"> Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
