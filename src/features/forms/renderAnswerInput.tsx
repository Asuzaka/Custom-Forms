import { Input, NumberInput, Textarea } from "@heroui/react";
import type { TemplateQuestion } from "../../entities";
import { CheckBoxEditor } from "../../widgets";

export function renderAnswerInput(functions: {
  question: TemplateQuestion;
  selected: string;
  handleCheckboxTextChange: (id: string, value: string) => void;
  handleDeleteCheckboxOption: (id: string) => void;
  handleAddCheckboxOption: () => void;
}) {
  switch (functions.question.type) {
    case "singleLine":
      return (
        <Input
          placeholder="User's Answer"
          isDisabled
          size="sm"
          aria-label="Text input"
        />
      );
    case "multiLine":
      return (
        <Textarea
          placeholder="User's Answer"
          isDisabled
          size="sm"
          aria-label="Textarea input"
        />
      );
    case "numberInput":
      return <NumberInput isDisabled size="sm" aria-label="Number input" />;
    case "checkbox":
      return (
        <CheckBoxEditor
          selectedId={functions.selected}
          question={functions.question}
          handleAddCheckboxOption={functions.handleAddCheckboxOption}
          handleDeleteCheckboxOption={functions.handleDeleteCheckboxOption}
          handleCheckboxTextChange={functions.handleCheckboxTextChange}
        />
      );
    default:
      return null;
  }
}
