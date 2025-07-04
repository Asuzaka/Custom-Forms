import { Image } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import type { TemplateObject } from "../../entities";
import { DescriptionLikes } from "./likes";

type Props = {
  newTemplate: TemplateObject;
};

export function TempalteHeader({ newTemplate }: Props) {
  return (
    <div className="flex flex-col items-center justify-between rounded-lg border px-10 py-5 sm:flex-row">
      <div className="flex w-[80%] flex-col">
        <h1 className="text-3xl font-bold">{newTemplate.title}</h1>
        <ReactMarkdown>{newTemplate.description}</ReactMarkdown>
        <DescriptionLikes newTemplate={newTemplate} />
      </div>
      <div className="sm:w-[30%]">
        <Image
          alt="forms-iamge"
          width={300}
          height={200}
          src={newTemplate.image}
        />
      </div>
    </div>
  );
}
