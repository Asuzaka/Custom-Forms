import { useNavigate, useParams } from "react-router";
import { useGetFormQuery } from "../../shared/api/formsApi";
import { Image, Input, Spinner } from "@heroui/react";
import ReactMarkdown from "react-markdown";

export function SubmittedForm() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetFormQuery(id || "");
  const navigate = useNavigate();

  const sortedAnswers = data?.data.answers
    ? [...data.data.answers].sort((a, b) => a.index - b.index)
    : [];

  if (isLoading)
    return (
      <div className="flex h-[90dvh] items-center justify-center">
        <Spinner>Loading...</Spinner>
      </div>
    );

  if (error) {
    const err = error as { status: number };
    if (err.status === 404) navigate("/notfound");
  }
  return (
    <div>
      <div className="flex items-center justify-between rounded-lg border px-10 py-5">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{data?.data.template.title}</h1>
          <ReactMarkdown>{data?.data.template.description}</ReactMarkdown>
        </div>
        <div>
          <Image
            alt="forms-image"
            width={200}
            height={200}
            src={data?.data.template.image}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {sortedAnswers.map((answer) => (
          <div key={answer.id} className="flex flex-col">
            <label className="mb-1 font-semibold">{answer.text}</label>
            {typeof answer.answer === "string" ? (
              <Input type="text" value={answer.answer} readOnly />
            ) : (
              <ul className="list-inside list-disc space-y-1 rounded-lg bg-gray-100 p-2 text-sm dark:bg-[#191a1b]">
                {answer.answer.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
