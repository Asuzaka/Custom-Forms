import type { FormObject } from "../../entities";

export function returnNewFormObject(
  id: string,
  template: false | string,
): FormObject {
  return {
    image: "",
    topic: "other",
    description: "Form description",
    title: "New Form",
    creator: id,
    template,
    thumbail: "",
    publish: false,
    publishTemplate: "",
    publishUrl: "",
    questions: [
      {
        id: crypto.randomUUID(),
        type: "singleLine",
        text: "Question?",
        answer: "default value",
        required: false,
        maxLength: 100,
        placeholder: "My answer",
        visible: true,
      },
      {
        id: crypto.randomUUID(),
        type: "singleLine",
        text: "Question?",
        answer: "",
        required: false,
        maxLength: 100,
        placeholder: "My answer",
        visible: true,
      },
      {
        id: crypto.randomUUID(),
        type: "singleLine",
        text: "Question?",
        answer: "",
        required: false,
        maxLength: 100,
        placeholder: "My answer",
        visible: true,
      },
      {
        id: crypto.randomUUID(),
        type: "singleLine",
        text: "Question?",
        answer: "",
        required: false,
        maxLength: 100,
        placeholder: "My answer",
        visible: true,
      },
      {
        id: crypto.randomUUID(),
        type: "singleLine",
        text: "Question?",
        answer: "",
        required: false,
        maxLength: 100,
        placeholder: "My answer",
        visible: true,
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    seen: new Date(),
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
