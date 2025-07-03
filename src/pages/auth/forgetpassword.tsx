import { addToast, Button, Form, Input } from "@heroui/react";
import { useForgetMutation } from "../../shared/api/authApi";
import { useEffect } from "react";
import validator from "validator";

export function ForgetPassword() {
  const [forget, { isLoading, isSuccess, error }] = useForgetMutation();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await forget(data as { email: string });
    } catch {
      // RTK HANDLEs
    }
  }

  useEffect(() => {
    if (isSuccess)
      addToast({
        title: "Success",
        description: "Email was sent",
        timeout: 3000,
        color: "success",
      });

    if (error)
      addToast({
        title: "Error",
        description: (error as { error: string }).error,
        timeout: 3000,
        color: "danger",
      });
  }, [isSuccess, error]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-5 py-25">
        <h1 className="py-3 text-center text-4xl font-extrabold">
          Forget Passord
        </h1>
        <Form
          onSubmit={onSubmit}
          className="flex w-full max-w-xl flex-col gap-4"
        >
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            validate={(value: string) => {
              if (!validator.isEmail(value))
                return "Please enter a valid email";
            }}
          />
          <Button isLoading={isLoading} fullWidth type="submit" color="primary">
            Send E-mail
          </Button>
        </Form>
      </div>
    </div>
  );
}
