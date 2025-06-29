import { useParams } from "react-router";
import { useState } from "react";
import { renderInput } from "../../features";
import { Button, Form, Image } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import type { TemplateObject } from "../../entities";

export function FormPage() {
  const { id } = useParams<{ id: string }>();
  const [form] = useState<TemplateObject | null>(null);
  const [checkboxAnswers, setCheckboxAnswers] = useState<
    Record<string, string[]>
  >({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const answers =
      form?.questions.map((q, idx) => {
        const name = String(idx);
        if (q.type === "checkbox") {
          return { id: q.id, value: checkboxAnswers[q.id] || [] };
        }
        return { id: q.id, value: formData.get(name) || "" };
      }) || [];
    console.log(answers);
  };

  if (!form) return <p className="p-4">Loading form...</p>;

  return (
    <div>
      <p>Viewing form with ID: {id}</p>
      <div className="flex items-center justify-between rounded-lg border px-10 py-5">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{form?.title}</h1>
          <ReactMarkdown>{form?.description}</ReactMarkdown>
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
        {form?.questions.map((each) => (
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

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
