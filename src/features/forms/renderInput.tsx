import {
  Checkbox,
  CheckboxGroup,
  Input,
  NumberInput,
  Textarea,
} from "@heroui/react";
import type { TemplateQuestion } from "../../entities";

export function renderInput(
  question: TemplateQuestion,
  onCheckboxChange?: (id: string, value: string[]) => void,
) {
  switch (question.type) {
    case "singleLine":
      return (
        <Input
          isRequired={question.required}
          placeholder="Your Answer"
          name={question.id}
          size="sm"
          aria-label="Text input"
        />
      );
    case "multiLine":
      return (
        <Textarea
          isRequired={question.required}
          placeholder="Your Answer"
          name={question.id}
          size="sm"
          aria-label="Textarea input"
        />
      );
    case "numberInput":
      return (
        <NumberInput
          name={question.id}
          isRequired={question.required}
          size="sm"
          aria-label="Number input"
        />
      );
    case "checkbox":
      return (
        <CheckboxGroup
          name={question.id}
          isRequired={question.required}
          onChange={(values) => onCheckboxChange?.(question.id, values)}
        >
          {question.options.map((each) => (
            <Checkbox key={each.id} value={each.text}>
              {each.text}
            </Checkbox>
          ))}
        </CheckboxGroup>
      );
    default:
      return null;
  }
}
