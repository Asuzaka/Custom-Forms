import { Input, Select, SelectItem, Switch, Textarea } from "@heroui/react";
import { Tags } from "./tags";
import { Users } from "./users";
import { access, topics } from "../../shared/constants/settings";
import { ClickToCopy } from "../../shared/ui/ClickCopy";
import { env } from "../../shared/config";
import type { SetStateAction } from "react";
import type { TemplateObject } from "../../entities";

type Props = {
  newTemplate: TemplateObject;
  setNewTemplate: (value: SetStateAction<TemplateObject>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Settings({
  newTemplate,
  setNewTemplate,
  handleFileChange,
}: Props) {
  return (
    <div className="mt-2 flex flex-col gap-3 pb-10">
      <div className="flex items-center justify-between gap-3">
        <label className="text-lg font-medium">Title:</label>
        <Input
          aria-label="title"
          value={newTemplate.title}
          onChange={(e) =>
            setNewTemplate({ ...newTemplate, title: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium">Description</label>
        <Textarea
          aria-label="description"
          value={newTemplate.description}
          onChange={(e) =>
            setNewTemplate({ ...newTemplate, description: e.target.value })
          }
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-lg font-medium">Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file:mr-4 file:rounded file:border-0 file:bg-black/10 file:px-4 file:py-2 file:text-sm file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-50"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-lg font-medium">Topic: </label>
        <Select
          className="max-w-xs"
          aria-label="select-topic"
          selectedKeys={[newTemplate.topic]}
          onSelectionChange={(keys) => {
            if (keys === "all") return;
            const newKey = [...keys][0];
            if (!newKey) return;
            setNewTemplate({ ...newTemplate, topic: newKey as string });
          }}
        >
          {topics.map((topic) => (
            <SelectItem key={topic.key}>{topic.label}</SelectItem>
          ))}
        </Select>
      </div>

      <Tags
        tags={newTemplate.tags}
        setNewTemplate={setNewTemplate}
        newTemplate={newTemplate}
      />
      <div className="flex items-center gap-2">
        <label className="text-lg font-medium">Access:</label>
        <Select
          className="max-w-xs"
          aria-label="select-topic"
          selectedKeys={[newTemplate.access]}
          onSelectionChange={(keys) => {
            if (keys === "all") return;
            const newKey = [...keys][0];
            if (!newKey) return;
            setNewTemplate({
              ...newTemplate,
              access: newKey as "public" | "restricted",
            });
          }}
        >
          {access.map((acc) => (
            <SelectItem key={acc.key}>{acc.label}</SelectItem>
          ))}
        </Select>
      </div>
      {newTemplate.access === "restricted" && (
        <Users
          users={newTemplate.allowedUsers}
          setNewTemplate={setNewTemplate}
          newTemplate={newTemplate}
        />
      )}
      <div className="flex items-center gap-2">
        <label className="text-lg font-medium">Publish: </label>
        <Switch
          isSelected={newTemplate.publish}
          onValueChange={(val) =>
            setNewTemplate({ ...newTemplate, publish: val })
          }
        ></Switch>
      </div>
      {newTemplate.publish && (
        <div className="flex items-center gap-2">
          <ClickToCopy
            text={`${env.FRONTEND_URL}/form/${newTemplate._id}`}
            label="Your link to Form"
          />
        </div>
      )}
    </div>
  );
}
