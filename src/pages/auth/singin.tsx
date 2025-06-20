import { useState } from "react";
import { Button, Form, Input, Link } from "@heroui/react";

export function SignIn() {
  const [errors, setErrors] = useState({});
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    console.log(data);
    setErrors({});
  }

  return (
    <div className="flex items-center justify-center py-25">
      <div className="flex flex-col gap-5">
        <h1 className="py-3 text-center text-4xl font-extrabold">Sign in</h1>
        <p className="py-2 text-lg">Sign in to work with forms</p>
        <Form
          validationErrors={errors}
          onSubmit={onSubmit}
          className="flex w-full max-w-xl flex-col gap-4"
        >
          <Input
            isRequired
            errorMessage="Please enter username or email"
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
          <Button fullWidth color="primary" type="submit">
            Sign in
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
            <p>Don't have an account? </p>
            <Link href="/signup"> Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
