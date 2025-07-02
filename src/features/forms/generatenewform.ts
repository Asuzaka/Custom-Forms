import type { TemplateObject } from "../../entities";

export function returnNewFormObject(id: string): TemplateObject {
  return {
    image:
      "https://hxfqjxaynywivthkixwq.supabase.co/storage/v1/object/public/images//forms-in-word.jpg",
    topic: "other",
    tags: [],
    description: "Form description",
    title: "New Form",
    creator: id,
    access: "public",
    allowedUsers: [],
    publish: false,
    likes: 0,
    likedBy: [],
    questions: [],
  };
}

export function returnSampleSingleLine(id: string) {
  return {
    id,
    type: "singleLine" as const,
    required: false,
    text: "Enter your text?",
    description: "Enter description",
    visible: true,
    placeholder: "Type your answer here...",
  };
}

export function returnSampleMultiLine(id: string) {
  return {
    id,
    type: "multiLine" as const,
    required: false,
    text: "Enter your text?",
    visible: true,
    placeholder: "Type your answer here...",
  };
}

export function returnSampleNumber(id: string) {
  return {
    id,
    type: "numberInput" as const,
    required: true,
    text: "Enter your number?",
    visible: true,
  };
}

export function returnSampleCheckbox(id: string) {
  return {
    id,
    type: "checkbox" as const,
    required: false,
    text: "Your text?",
    visible: true,
    options: [{ id: crypto.randomUUID(), text: "Your text", selected: false }],
    multiple: true,
  };
}

export function dynamicReturn(
  type: "singleLine" | "multiLine" | "numberInput" | "checkbox",
  id: string,
) {
  switch (type) {
    case "singleLine":
      return returnSampleSingleLine(id);
    case "multiLine":
      return returnSampleMultiLine(id);
    case "numberInput":
      return returnSampleNumber(id);
    case "checkbox":
      return returnSampleCheckbox(id);
  }
}
