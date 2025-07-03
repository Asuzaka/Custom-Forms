import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { renderInput } from "../../features";
import { addToast, Button, Form, Image, Spinner } from "@heroui/react";
import {
  useGetTemplateForFormQuery,
  useSubmitFormMutation,
} from "../../shared/api/formsApi";
import ReactMarkdown from "react-markdown";
import type { FormAnswer } from "../../entities";

export function FormPage() {
  const { id } = useParams<{ id: string }>();
  if (!id) throw Error("No such id exists");
  const { data, isLoading } = useGetTemplateForFormQuery(id);
  const [submitForm, { isLoading: SubmitLoading, isSuccess, isError }] =
    useSubmitFormMutation();
  const [checkboxAnswers, setCheckboxAnswers] = useState<
    Record<string, string[]>
  >({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data?.data._id) return;
    const dataForm = Object.fromEntries(new FormData(e.currentTarget));
    const array = Object.entries({ ...dataForm, ...checkboxAnswers });
    const result = array
      .map(([id, answer]) => {
        const index = data?.data.questions.findIndex((q) => q.id === id);
        if (index === -1) return null;
        return {
          index,
          text: data?.data.questions[index].text,
          id,
          answer,
        };
      })
      .filter(Boolean);
    submitForm({ templateId: data.data._id, answers: result as FormAnswer[] });
  };

  useEffect(() => {
    if (isSuccess) {
      addToast({
        title: "Success",
        description: "Form submitted successfully",
        color: "success",
      });
    }
    if (isError) {
      addToast({
        title: "Error",
        description: "Form wasn't submitted",
        color: "danger",
      });
    }
  }, [isSuccess, isError]);

  if (isLoading)
    return (
      <div className="flex h-[90dvh] items-center justify-center">
        <Spinner>Loading...</Spinner>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between rounded-lg border px-10 py-5">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{data?.data?.title}</h1>
          <ReactMarkdown>{data?.data?.description}</ReactMarkdown>
        </div>
        <div>
          <Image
            alt="forms-iamge"
            width={200}
            height={200}
            src={data?.data.image}
          />
        </div>
      </div>

      <Form className="py-5" onSubmit={handleSubmit}>
        {data?.data?.questions.map((each) => (
          <div key={each.id} className="mb-4 flex w-full flex-col gap-2">
            <label className="text-lg font-medium">{each.text}</label>
            {each.description && (
              <p className="text-sm text-gray-600">{each.description}</p>
            )}
            {renderInput(each, (id, values) => {
              setCheckboxAnswers((prev) => ({ ...prev, [id]: values }));
            })}
          </div>
        ))}

        <Button isLoading={SubmitLoading} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
