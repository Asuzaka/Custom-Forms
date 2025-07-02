import { Button, ButtonGroup } from "@heroui/react";
import type { MainTab, TemplateObject } from "../../entities";
import type { Dispatch, SetStateAction } from "react";
import {
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
} from "../../shared/api/templateApi";

type Props = {
  mainTab: MainTab;
  setMainTab: Dispatch<SetStateAction<MainTab>>;
  newTemplate: TemplateObject;
};
export function TemplateTabs({ mainTab, setMainTab, newTemplate }: Props) {
  const isNew = newTemplate._id ? false : true;

  const [createTemplate, { isLoading: Loading1 }] = useCreateTemplateMutation();
  const [updateTemplate, { isLoading: Loading2 }] = useUpdateTemplateMutation();

  function handleSave() {
    if (isNew) {
      createTemplate(newTemplate);
    } else {
      if (!newTemplate._id) return;
      updateTemplate({ id: newTemplate._id, data: newTemplate });
    }
  }

  return (
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
        <Button
          isLoading={Loading1 || Loading2}
          onPress={handleSave}
          color="primary"
        >
          Save Template
        </Button>
      </ButtonGroup>
    </div>
  );
}
