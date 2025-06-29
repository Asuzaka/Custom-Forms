import { Button, ButtonGroup, Image } from "@heroui/react";
import { returnNewFormObject, returnSampleSingleLine } from "../../features";
import { useSelector } from "react-redux";
import { Settings, SortableItem } from "../../widgets";
import type { RootState } from "../../store/store";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { QuestionBase, TemplateObject } from "../../entities";

type MainTab = "builder" | "settings" | "submissions";

export function NewTemplate({
  Template,
}: {
  Template: TemplateObject | undefined;
}) {
  const userId = useSelector((state: RootState) => state.user.user?.id);
  const [mainTab, setMainTab] = useState<MainTab>("builder");
  // editor
  const [newTemplate, setNewTemplate] = useState<TemplateObject>(
    Template || returnNewFormObject(userId || ""),
  );
  const [items, setItems] = useState<QuestionBase[]>(newTemplate.questions);
  const sensors = useSensors(useSensor(PointerSensor));
  const [selectedId, setSelectedId] = useState<string>("");

  const handleQuestionChange = (id: string, updatedQuestion: QuestionBase) => {
    setItems(items.map((q) => (q.id === id ? updatedQuestion : q)));
  };

  const handleQuestionDelete = (id: string) => {
    setItems(items.filter((q) => q.id !== id));
  };

  const addNewQuestion = () => {
    setItems((prev) => [...prev, returnSampleSingleLine(crypto.randomUUID())]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewTemplate({ ...newTemplate, image: file });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-5 py-2">
        <div className="flex items-center justify-between rounded-lg border px-10 py-5">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{newTemplate.title}</h1>
            <ReactMarkdown>{newTemplate.description}</ReactMarkdown>
          </div>
          <div>
            <Image
              alt="forms-iamge"
              width={200}
              height={200}
              src="https://heroui.com/images/album-cover.png"
            />
          </div>
        </div>
        <div className="flex items-center justify-between px-2">
          <ButtonGroup>
            <Button
              onPress={() => setMainTab("builder")}
              color="primary"
              variant={mainTab === "builder" ? "solid" : "bordered"}
            >
              Builder
            </Button>
            <Button
              onPress={() => setMainTab("settings")}
              color="primary"
              variant={mainTab === "settings" ? "solid" : "bordered"}
            >
              Settings
            </Button>
            <Button
              onPress={() => setMainTab("submissions")}
              color="primary"
              variant={mainTab === "submissions" ? "solid" : "bordered"}
            >
              Submissions
            </Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button color="primary">Publish Form</Button>
            <Button color="primary">Save Form</Button>
            <Button color="primary">Publish Template</Button>
          </ButtonGroup>
        </div>
      </div>
      {mainTab === "settings" && (
        <Settings
          newTemplate={newTemplate}
          setNewTemplate={setNewTemplate}
          handleFileChange={handleFileChange}
        />
      )}

      {mainTab === "builder" && (
        <div className="rounded-lg px-2 py-2">
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
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col">
                <div className="flex flex-col gap-3">
                  {items.map((question) => (
                    <SortableItem
                      selectedId={selectedId}
                      setSelectedId={setSelectedId}
                      key={question.id}
                      id={question.id}
                      question={question}
                      onQuestionChange={handleQuestionChange}
                      handleQuestionDelete={handleQuestionDelete}
                    />
                  ))}
                </div>
                <div className="py-2">
                  <Button onPress={addNewQuestion} fullWidth>
                    Add new Question
                  </Button>
                </div>
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </>
  );
}
