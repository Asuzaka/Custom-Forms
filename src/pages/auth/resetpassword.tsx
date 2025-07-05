import { useParams } from "react-router";
import { useResetMutation } from "../../shared/api/authApi";
import { addToast, Button, Form, Input } from "@heroui/react";
import { useEffect, useState } from "react";

export function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const [reset, { isLoading, isSuccess, error }] = useResetMutation();
  const [errors, setErrors] = useState({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let any: boolean = false;

    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (data.password !== data.passwordConfirm) {
      setErrors((prev) => ({
        ...prev,
        passwordConfirm: "Passwords don't match",
      }));
      any = true;
    }

    const readyData = { token, ...data };

    if (any) return;

    try {
      await reset(
        readyData as {
          token: string;
          password: string;
          passwordConfirm: string;
        },
      );
    } catch {
      // RTK HANDLES
    }
  }

  useEffect(() => {
    if (isSuccess)
      addToast({
        title: "Success",
        description: "Password changed",
        color: "success",
        timeout: 3000,
      });
    if (error)
      addToast({
        title: "Error",
        description: (error as { error: string }).error,
        color: "danger",
        timeout: 3000,
      });
  }, [isSuccess, error]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-5 py-25">
        <h1 className="py-3 text-center text-4xl font-extrabold">
          Password Change
        </h1>

        <Form
          validationErrors={errors}
          onSubmit={onSubmit}
          className="flex w-full max-w-xl flex-col gap-4"
        >
          <Input
            isDisabled
            label="Token"
            name="token"
            value={token}
            labelPlacement="outside"
            type="text"
          />
          <Input
            isRequired
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter new password"
            type="password"
            validate={(value: string) => {
              if (value.length < 8) {
                return "Passowd must be at least 8 characters long";
              }
            }}
          />
          <Input
            isRequired
            label="Password Confirm"
            labelPlacement="outside"
            name="passwordConfirm"
            placeholder="Re-Enter new password"
            type="password"
            validate={(value: string) => {
              if (value.length < 8) {
                return "Passowd must be at least 8 characters long";
              }
            }}
          />
          <Button isLoading={isLoading} fullWidth type="submit" color="primary">
            Change Passoword
          </Button>
        </Form>
      </div>
    </div>
  );
}
