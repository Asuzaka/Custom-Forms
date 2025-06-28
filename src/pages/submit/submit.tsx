import { useParams } from "react-router";
import { useState } from "react";
import { renderInput, returnNewFormObject } from "../../features";
import { Button, Form, Image } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import type { FormObject } from "../../entities";

export function Submit() {
  const { id } = useParams<{ id: string }>();
  const [newForm, setNewForm] = useState<FormObject>(
    returnNewFormObject("", false),
  );
  const [checkboxAnswers, setCheckboxAnswers] = useState<
    Record<string, string[]>
  >({});
  console.log(setNewForm);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const finalData = {
      ...data,
      ...checkboxAnswers,
    };
    console.log(finalData);
  };

  return (
    <div>
      <p>Viewing form with ID: {id}</p>
      <div className="flex items-center justify-between rounded-lg border px-10 py-5">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{newForm.title}</h1>
          <ReactMarkdown>{newForm.description}</ReactMarkdown>
        </div>
        <div>
          <Image
            alt="forms-iamge"
            width={200}
            height={200}
            src="https://heroui.com/images/album-cover.png"
          />
        </div>
      </div>

      <Form className="py-5" onSubmit={handleSubmit}>
        {newForm.questions.map((each) => (
          <div className="flex w-full flex-col justify-between gap-2">
            <label className="text-lg font-medium">{each.text}</label>
            <p className="text-lg">{each.description}</p>
            {renderInput(each, (id, values) => {
              setCheckboxAnswers((prev) => ({ ...prev, [id]: values }));
            })}
          </div>
        ))}

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
