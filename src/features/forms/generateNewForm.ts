import type { TemplateObject } from "../../entities";

export function returnNewFormObject(id: string): TemplateObject {
  return {
    image: "",
    topic: "other",
    tags: ["cool", "education", "spring"],
    description: "Form description",
    title: "New Form",
    creator: id,
    access: "restricted",
    allowedUsers: [],
    questions: [
      {
        id: crypto.randomUUID(),
        type: "singleLine",
        text: "Where do you live?",
        required: true,
        placeholder: "Type your answer...",
        visible: true,
      },
      {
        id: crypto.randomUUID(),
        type: "multiLine",
        text: "Explain your biggest challenge this year.",
        required: false,
        placeholder: "Write your response here...",
        visible: true,
      },
      {
        id: crypto.randomUUID(),
        type: "numberInput",
        text: "How many siblings do you have?",
        required: false,
        visible: true,
      },
      {
        id: crypto.randomUUID(),
        type: "checkbox",
        text: "Which languages do you speak?",
        required: Math.random() > 0.5,
        visible: true,
        options: [
          { id: crypto.randomUUID(), text: "English" },
          { id: crypto.randomUUID(), text: "Spanish" },
          { id: crypto.randomUUID(), text: "French" },
        ],
        multiple: true,
      },
    ],
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
    answer: "",
    placeholder: "Type your answer here...",
    maxLength: 100,
  };
}

export function returnSampleMultiLine(id: string) {
  return {
    id,
    type: "multiLine" as const,
    required: false,
    text: "Enter your text?",
    visible: true,
    answer: "",
    lines: 4,
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
    answer: 0,
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
