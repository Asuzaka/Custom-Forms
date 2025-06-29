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

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  modalType: ModalType;
  active: TemplateObject | undefined;
};

export function ModalProvider({
  isOpen = false,
  onOpenChange,
  modalType,
  active,
}: Props) {
  const title = modalType === "delete" ? "Delete" : "Rename";
  const [value, setValue] = useState<string>(active?.title || "");

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
                  <Button color="danger" variant="light" onPress={onClose}>
                    Delete
                  </Button>
                </>
              )}
              {modalType === "rename" && (
                <>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={onClose}>
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
