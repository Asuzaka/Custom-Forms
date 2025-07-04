import { DndContext } from "@dnd-kit/core";
import { SortableItem } from "./SortableItem";
import { Button } from "@heroui/react";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  type CollisionDetection,
  type SensorDescriptor,
  type SensorOptions,
} from "@dnd-kit/core";
import type { TemplateQuestion } from "../../entities";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  sensors: SensorDescriptor<SensorOptions>[];
  closestCenter: CollisionDetection;
  items: TemplateQuestion[];
  editor: boolean;
  setItems: (value: SetStateAction<TemplateQuestion[]>) => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  handleQuestionChange: (id: string, updatedQuestion: TemplateQuestion) => void;
  handleQuestionDelete: (id: string) => void;
  addNewQuestion: () => void;
};

export function TemplateBuilder({
  sensors,
  closestCenter,
  items,
  editor,
  setItems,
  selectedId,
  setSelectedId,
  handleQuestionChange,
  handleQuestionDelete,
  addNewQuestion,
}: Props) {
  return (
    <div className="rounded-lg">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over) return;

          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);

          if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            setItems(arrayMove(items, oldIndex, newIndex));
          }
        }}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col">
            <div className="flex flex-col gap-3">
              {items.map((question) => (
                <SortableItem
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  editor={editor}
                  key={question.id}
                  id={question.id}
                  question={question}
                  onQuestionChange={handleQuestionChange}
                  handleQuestionDelete={handleQuestionDelete}
                />
              ))}
            </div>
            {editor && (
              <div className="py-2">
                <Button onPress={addNewQuestion} fullWidth>
                  Add new Question
                </Button>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
