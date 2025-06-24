import { Input, NumberInput, Textarea } from "@heroui/react";
import type { Question } from "../../entities";
import { CheckBoxEditor } from "../../widgets";

export function renderAnswerInput(functions: {
  question: Question;
  selected: string;
  handleStringAnswer: (value: string) => void;
  handleNumberAnswer: (value: number) => void;
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
          value={functions.question.answer}
          onChange={(e) => functions.handleStringAnswer(e.target.value)}
        />
      );
    case "multiLine":
      return (
        <Textarea
          placeholder="User's Answer"
          isDisabled
          size="sm"
          aria-label="Textarea input"
          maxRows={functions.question.lines}
          value={functions.question.answer}
          onChange={(e) => functions.handleStringAnswer(e.target.value)}
        />
      );
    case "numberInput":
      return (
        <NumberInput
          isDisabled
          size="sm"
          aria-label="Number input"
          value={functions.question.answer}
          onValueChange={(v: number) => functions.handleNumberAnswer(v)}
        />
      );
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
