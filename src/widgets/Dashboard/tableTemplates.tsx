import { useNavigate } from "react-router";
import type { ModalType, TemplateObject } from "../../entities";
import type { Dispatch, SetStateAction } from "react";
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
} from "@heroui/react";
import {
  EllipsisVertical,
  ExternalLink,
  Library,
  PencilLine,
  Trash2,
} from "lucide-react";

type Props = {
  templates: TemplateObject[];
  setModalType: Dispatch<SetStateAction<ModalType>>;
  setSelected: Dispatch<SetStateAction<string>>;
  onOpen: () => void;
};

export function TableTemplates({
  templates,
  setModalType,
  setSelected,
  onOpen,
}: Props) {
  const navigate = useNavigate();
  return (
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
            <TableCell>{each.createdAt?.toLocaleString()}</TableCell>
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
                        setSelected(each.id || "");
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
                        setSelected(each.id || "");
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
                      onClick={() => navigate(`/template/${each.id}`)}
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
  );
}
