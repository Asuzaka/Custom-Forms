import { Button, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useVerifyMutation } from "../../shared/api/authApi";

export function Verify() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<"primary" | "danger" | "success">(
    "primary",
  );

  const [verify, { isSuccess, isLoading, isError }] = useVerifyMutation();

  useEffect(() => {
    const verification = async () => {
      try {
        if (!token) {
          setStatus("danger");
          return;
        }
        await verify(token);
      } catch {
        // RTK handles
      }
    };
    verification();
  }, []);

  useEffect(() => {
    if (isSuccess) setStatus("success");
    if (isError) setStatus("danger");
  }, [isSuccess, isError]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-5 py-25">
        <h1 className="py-3 text-center text-4xl font-extrabold">
          Verification
        </h1>
        <Input isDisabled value={token} />
        <Button color={status} isLoading={isLoading} isDisabled>
          {status === "success" && "Success!"}
          {status === "danger" && "Invalid Token or Expired"}
          {status === "primary" && "Loading..."}
        </Button>
      </div>
    </div>
  );
}
