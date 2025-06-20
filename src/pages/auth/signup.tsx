import { useState } from "react";
import { Button, Form, Input, Link } from "@heroui/react";
import validator from "validator";

export function SignUp() {
  const [errors, setErrors] = useState({});
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    if (any) return;
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center py-25">
      <div className="flex flex-col gap-5">
        <h1 className="py-3 text-center text-4xl font-extrabold">Sign up</h1>
        <p className="py-2 text-lg">Create an account to get started</p>
        <Form
          validationErrors={errors}
          onSubmit={onSubmit}
          className="flex w-full max-w-xl flex-col gap-4"
        >
          <Input
            isRequired
            errorMessage="Please enter a valid username"
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            type="text"
            validate={(value: string) => {
              if (value.length < 3)
                return "Username should at least be 3 characters";
            }}
          />

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
          <Input
            isRequired
            errorMessage="Please enter a valid password"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter password"
            type="password"
            validate={(value: string) => {
              if (value.length < 7) {
                return "Passowd must be at least 3 characters long";
              }
            }}
          />
          <Input
            isRequired
            errorMessage="Please enter a valid password Confirm"
            label="Password Confirm"
            labelPlacement="outside"
            name="passwordConfirm"
            placeholder="Re-Enter password"
            type="password"
            validate={(value: string) => {
              if (value.length < 7) {
                return "Passowd must be at least 3 characters long";
              }
            }}
          />
          <Button fullWidth color="primary" type="submit">
            Sign up
          </Button>
        </Form>

        <div>
          <hr></hr>
          <div className="mt-3 flex justify-between">
            <Button color="primary" variant="bordered" className="w-[40%]">
              Google
            </Button>
            <Button color="secondary" variant="bordered" className="w-[40%]">
              Github
            </Button>
          </div>
          <div className="mt-2 flex gap-2">
            <p>Already have an account? </p>
            <Link href="/signin"> Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
