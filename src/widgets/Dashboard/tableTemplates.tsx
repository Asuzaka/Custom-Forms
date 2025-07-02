import { useNavigate } from "react-router";
import type { ModalType, TemplateObject } from "../../entities";
import { useState } from "react";
import {
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Table,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import {
  EllipsisVertical,
  ExternalLink,
  Library,
  PencilLine,
  Trash2,
} from "lucide-react";
import { ModalProvider } from "./modal";

type Props = {
  templates: TemplateObject[];
};

export function TableTemplates({ templates }: Props) {
  const [modalType, setModalType] = useState<ModalType>("");
  const [selected, setSelected] = useState<TemplateObject>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  if (!templates)
    return (
      <div className="flex items-center justify-between">
        <Spinner>Loading...</Spinner>
      </div>
    );

  return (
    <>
      <Table aria-label="Example empty table">
        <TableHeader>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {templates.map((each) => (
            <TableRow key={each.id}>
              <TableCell>
                <Library />
              </TableCell>
              <TableCell>{each.title}</TableCell>
              <TableCell>
                {each.createdAt
                  ? new Date(each.createdAt).toLocaleString()
                  : ""}
              </TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <button className="cursor-pointer px-2">
                      <EllipsisVertical />
                    </button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Actions">
                    <DropdownItem key={0} textValue="Rename">
                      <button
                        onClick={() => {
                          setModalType("rename");
                          setSelected(each);
                          onOpen();
                        }}
                        className="cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <PencilLine />
                          Rename
                        </span>
                      </button>
                    </DropdownItem>
                    <DropdownItem key={1} textValue="Delete">
                      <button
                        onClick={() => {
                          setModalType("delete");
                          setSelected(each);
                          onOpen();
                        }}
                        className="cursor-pointer"
                      >
                        <span className="flex items-center gap-2 text-danger">
                          <Trash2 />
                          Delete
                        </span>
                      </button>
                    </DropdownItem>
                    <DropdownItem key={2} textValue="Open">
                      <button
                        onClick={() => navigate(`/template/${each._id}`)}
                        className="cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <ExternalLink />
                          Open
                        </span>
                      </button>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalProvider
        key={selected?._id}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modalType={modalType}
        template={selected}
      />
    </>
  );
}
