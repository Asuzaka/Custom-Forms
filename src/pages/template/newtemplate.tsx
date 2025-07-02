import { returnNewFormObject, returnSampleSingleLine } from "../../features";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "../../store/store";
import type { MainTab, TemplateObject, TemplateQuestion } from "../../entities";
import {
  Settings,
  TempalteHeader,
  TemplateBuilder,
  TemplateTabs,
} from "../../widgets";
import {
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { addToast } from "@heroui/react";
import { env } from "../../shared/config";

export function NewTemplate({
  Template,
  editor = true,
}: {
  Template: TemplateObject | undefined;
  editor: boolean;
}) {
  const userId = useSelector((state: RootState) => state.user.user?._id);
  const [mainTab, setMainTab] = useState<MainTab>("builder");
  const [newTemplate, setNewTemplate] = useState<TemplateObject>(
    Template || returnNewFormObject(userId || ""),
  );
  const [items, setItems] = useState<TemplateQuestion[]>(newTemplate.questions);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    setNewTemplate((previous) => {
      return { ...previous, questions: items };
    });
  }, [items]);

  const [selectedId, setSelectedId] = useState<string>("");

  const handleQuestionChange = (
    id: string,
    updatedQuestion: TemplateQuestion,
  ) => {
    setItems(items.map((q) => (q.id === id ? updatedQuestion : q)));
  };

  const handleQuestionDelete = (id: string) => {
    setItems(items.filter((q) => q.id !== id));
  };

  const addNewQuestion = () => {
    setItems((prev) => [...prev, returnSampleSingleLine(crypto.randomUUID())]);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${env.BACKEND_URL}/v1/upload`, {
        method: "POST",
        body: formData,
      });

      const { url } = await response.json();
      setNewTemplate({ ...newTemplate, image: url });
    } catch {
      addToast({
        title: "Error",
        description: "Failed to upload iamge",
        timeout: 3000,
        color: "danger",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-5 py-2">
        <TempalteHeader newTemplate={newTemplate} />
        {editor && (
          <TemplateTabs
            newTemplate={newTemplate}
            mainTab={mainTab}
            setMainTab={setMainTab}
          />
        )}
      </div>

      {mainTab === "settings" && (
        <Settings
          newTemplate={newTemplate}
          setNewTemplate={setNewTemplate}
          handleFileChange={handleFileChange}
        />
      )}

      {mainTab === "builder" && (
        <TemplateBuilder
          sensors={sensors}
          closestCenter={closestCenter}
          items={items}
          editor={editor}
          selectedId={selectedId}
          setItems={setItems}
          setSelectedId={setSelectedId}
          handleQuestionChange={handleQuestionChange}
          handleQuestionDelete={handleQuestionDelete}
          addNewQuestion={addNewQuestion}
        />
      )}
    </>
  );
}
