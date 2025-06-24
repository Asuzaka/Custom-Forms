import { Button } from "@heroui/react";
import { X } from "lucide-react";
import type { CheckboxQuestion } from "../../entities";

export function CheckBoxEditor({
  question,
  selectedId,
  handleCheckboxTextChange,
  handleDeleteCheckboxOption,
  handleAddCheckboxOption,
}: {
  question: CheckboxQuestion;
  selectedId: string;
  handleCheckboxTextChange: (id: string, value: string) => void;
  handleDeleteCheckboxOption: (id: string) => void;
  handleAddCheckboxOption: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {question.options.map((each, index) => (
        <div className="flex items-center gap-1" key={each.id}>
          <p>{index + 1 + ". "}</p>
          <input
            value={each.text}
            className={
              selectedId === question.id
                ? `w-full border-b px-2 py-1`
                : `w-full px-2 py-1`
            }
            onChange={(e) => handleCheckboxTextChange(each.id, e.target.value)}
          />
          {selectedId === question.id ? (
            <button
              onClick={() => handleDeleteCheckboxOption(each.id)}
              className="cursor-pointer"
            >
              <X />
            </button>
          ) : null}
        </div>
      ))}
      {selectedId === question.id ? (
        <Button onPress={handleAddCheckboxOption} size="sm">
          Add new Option
        </Button>
      ) : null}
    </div>
  );
}
