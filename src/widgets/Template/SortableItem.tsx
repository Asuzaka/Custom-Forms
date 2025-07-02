const options = [
  { key: "singleLine", label: "Text (Line)" },
  { key: "multiLine", label: "Text (Lines)" },
  { key: "numberInput", label: "Number" },
  { key: "checkbox", label: "Checkbox" },
];

import { GripVertical, Trash2 } from "lucide-react";
import { dynamicReturn, renderAnswerInput } from "../../features";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TemplateQuestion, CheckboxOption } from "../../entities";
import type { Dispatch, SetStateAction } from "react";
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";

export function SortableItem({
  selectedId,
  setSelectedId,
  id,
  question,
  onQuestionChange,
  handleQuestionDelete,
  editor,
}: {
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  id: string;
  question: TemplateQuestion;
  onQuestionChange: (id: string, updatedQuestion: TemplateQuestion) => void;
  handleQuestionDelete: (id: string) => void;
  editor: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTypeChange = (
    value: "singleLine" | "multiLine" | "numberInput" | "checkbox",
  ) => {
    onQuestionChange(id, dynamicReturn(value, id));
  };

  const handleRequiredChange = (isRequired: boolean) => {
    onQuestionChange(id, { ...question, required: isRequired });
  };

  const handleCheckboxMultipleChange = (multiline: boolean) => {
    if (question.type !== "checkbox") return;
    onQuestionChange(id, { ...question, multiple: multiline });
  };

  const handleCheckboxTextChange = (optionId: string, newText: string) => {
    if (!editor) return;
    if (question.type !== "checkbox") return;

    const updatedOptions = question.options.map((option) =>
      option.id === optionId ? { ...option, text: newText } : option,
    );

    onQuestionChange(id, {
      ...question,
      options: updatedOptions,
    });
  };

  const handleDeleteCheckboxOption = (optionId: string) => {
    if (question.type !== "checkbox") return;

    const updatedOptions = question.options.filter(
      (option) => option.id !== optionId,
    );

    if (updatedOptions.length === 0) {
      return;
    }

    onQuestionChange(id, {
      ...question,
      options: updatedOptions,
    });
  };

  const handleAddCheckboxOption = () => {
    if (question.type !== "checkbox") return;

    const newOption: CheckboxOption = {
      id: crypto.randomUUID(),
      text: "New Option",
    };

    onQuestionChange(id, {
      ...question,
      options: [...question.options, newOption],
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        selectedId === question.id
          ? "rounded-lg border px-4 py-4 shadow-sm dark:shadow-white"
          : "rounded-lg px-4 py-4 shadow-sm dark:shadow-white"
      }
    >
      <div
        className="cursor-grab border-b px-4 py-2 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="text-gray-400" />
          <span className="text-sm text-gray-500">Drag to reorder</span>
        </div>
      </div>
      <div
        className="flex flex-col justify-between gap-2"
        onClick={() => {
          if (!editor) return;
          setSelectedId(question.id);
        }}
      >
        <div className="flex items-center justify-between gap-5">
          <div className="mt-2 flex items-center gap-2 py-1">
            <div className="flex flex-col gap-2">
              {selectedId === question.id ? (
                <>
                  <Input
                    size="sm"
                    className="text-lg font-bold"
                    value={question.text}
                    onChange={(e) =>
                      onQuestionChange(id, {
                        ...question,
                        text: e.target.value,
                      })
                    }
                  />
                </>
              ) : (
                <>
                  <h1 className="text-lg font-bold">{question.text}</h1>
                </>
              )}
            </div>
            {selectedId === question.id && (
              <div className="w-[200px]">
                <Select
                  aria-label="Type select"
                  size="sm"
                  className="max-w-xs"
                  items={options}
                  selectedKeys={[question.type]}
                  onSelectionChange={(keys) => {
                    if (keys === "all") return;
                    const newKey = [...keys][0];
                    if (!newKey) return;
                    handleTypeChange(
                      newKey as
                        | "singleLine"
                        | "multiLine"
                        | "numberInput"
                        | "checkbox",
                    );
                  }}
                >
                  {(option) => <SelectItem>{option.label}</SelectItem>}
                </Select>
              </div>
            )}
          </div>
        </div>
        <div>
          {selectedId === question.id ? (
            <Textarea
              size="sm"
              className="text-md"
              value={question.description}
              placeholder="Enter description"
              onChange={(e) =>
                onQuestionChange(id, {
                  ...question,
                  description: e.target.value,
                })
              }
            />
          ) : (
            <p className="text-md">{question.description}</p>
          )}
        </div>
        <div>
          {renderAnswerInput({
            question,
            handleAddCheckboxOption,
            handleCheckboxTextChange,
            handleDeleteCheckboxOption,
            handleCheckboxMultipleChange,
            selected: selectedId,
          })}
        </div>
        <hr></hr>
        {selectedId === question.id && (
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Checkbox
                size="lg"
                isSelected={question.required}
                onValueChange={(e) => handleRequiredChange(e)}
              >
                is required
              </Checkbox>
            </div>
            <Button
              onPress={() => handleQuestionDelete(id)}
              color="danger"
              size="sm"
            >
              <Trash2 />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
