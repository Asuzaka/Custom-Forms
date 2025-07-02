import type { TemplateQuestion } from "../../entities";
import {
  Checkbox,
  CheckboxGroup,
  Input,
  NumberInput,
  Radio,
  RadioGroup,
  Textarea,
} from "@heroui/react";

export function renderInput(
  question: TemplateQuestion,
  onSelectionChange?: (id: string, value: string[]) => void,
) {
  switch (question.type) {
    case "singleLine":
      return (
        <Input
          isRequired={question.required}
          placeholder={question.placeholder}
          name={question.id}
          required={question.required}
          size="sm"
          aria-label="Text input"
        />
      );
    case "multiLine":
      return (
        <Textarea
          isRequired={question.required}
          placeholder={question.placeholder}
          name={question.id}
          required={question.required}
          size="sm"
          aria-label="Textarea input"
        />
      );
    case "numberInput":
      return (
        <NumberInput
          name={question.id}
          required={question.required}
          isRequired={question.required}
          size="sm"
          aria-label="Number input"
        />
      );
    case "checkbox":
      if (!question.multiple) {
        return (
          <RadioGroup
            name={question.id}
            isRequired={question.required}
            onChange={(value) =>
              onSelectionChange?.(question.id, [value.currentTarget.value])
            }
          >
            {question.options.map((each) => (
              <Radio key={each.id} value={each.text}>
                {each.text}
              </Radio>
            ))}
          </RadioGroup>
        );
      }
      return (
        <CheckboxGroup
          name={question.id}
          isRequired={question.required}
          onChange={(values) => onSelectionChange?.(question.id, values)}
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
