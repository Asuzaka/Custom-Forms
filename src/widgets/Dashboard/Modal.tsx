import { useState } from "react";
import type { ModalType, TemplateObject } from "../../entities";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import {
  useDeleteTemplateMutation,
  useUpdateTemplateMutation,
} from "../../shared/api/templateApi";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  modalType: ModalType;
  template: TemplateObject | undefined;
};

export function ModalProvider({
  isOpen = false,
  onOpenChange,
  modalType,
  template,
}: Props) {
  const title = modalType === "delete" ? "Delete" : "Rename";
  const [value, setValue] = useState<string | undefined>(template?.title);

  const [deleteTemplate, { isLoading }] = useDeleteTemplateMutation();
  const [updateTemplate, { isLoading: LoadingUpdate }] =
    useUpdateTemplateMutation();

  if (!template) return;
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {modalType === "delete" && <p>Are you sure about deleting?</p>}
              {modalType === "rename" && (
                <Input
                  label="Title"
                  placeholder="Enter new Title"
                  variant="bordered"
                  value={value}
                  onValueChange={setValue}
                />
              )}
            </ModalBody>
            <ModalFooter>
              {modalType === "delete" && (
                <>
                  <Button color="primary" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    variant="light"
                    isLoading={isLoading}
                    onPress={() => {
                      if (!template._id) return;
                      deleteTemplate(template._id);
                      onClose();
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
              {modalType === "rename" && (
                <>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    isLoading={LoadingUpdate}
                    onPress={() => {
                      if (!template._id) return;
                      updateTemplate({
                        id: template?._id,
                        data: { title: value },
                      });
                      onClose();
                    }}
                  >
                    Rename
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
