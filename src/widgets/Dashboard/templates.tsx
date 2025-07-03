import { useEffect, useState } from "react";
import type { TemplateObject } from "../../entities";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Input,
  type Selection,
  Button,
  Tooltip,
  Spinner,
} from "@heroui/react";
import { ExternalLink, Search, Trash2 } from "lucide-react";
import {
  useDeleteTemplatesMutation,
  useGetAllTemplatesQuery,
} from "../../shared/api/templateApi";
import { useLazySearchTempaltesQuery } from "../../shared/api/searchApi";

function getSelectedTempalteIds(
  selectedKeys: Selection,
  allTemplates: TemplateObject[],
): string[] {
  if (selectedKeys === "all") {
    return allTemplates.map((template) => template._id || "");
  }
  return Array.from(selectedKeys as Set<string>);
}

const columns = [
  { key: "title", label: "Title" },
  { key: "access", label: "Access" },
  { key: "likes", label: "Likes" },
];

export function TemplateTable() {
  const [query, setQuery] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [rows, setRows] = useState<TemplateObject[]>([]);
  const [deleteTemplates] = useDeleteTemplatesMutation();

  const { data, isLoading } = useGetAllTemplatesQuery("");

  const [triggerSearchTemplates, { isLoading: isFetching }] =
    useLazySearchTempaltesQuery();

  useEffect(() => {
    if (!query) {
      if (data) setRows(data.data.templates);
      return;
    }

    const timeout = setTimeout(() => {
      triggerSearchTemplates(query)
        .unwrap()
        .then((res) => setRows(res.data));
    }, 300);

    return () => clearTimeout(timeout);
  }, [data, query, triggerSearchTemplates]);

  function handleDelete() {
    const templatesIds = getSelectedTempalteIds(selectedKeys, rows);
    if (templatesIds.length === 0) return;
    deleteTemplates({ ids: templatesIds });
    setSelectedKeys(new Set([]));
  }

  function handleClick() {
    const templateIds = getSelectedTempalteIds(selectedKeys, rows);
    if (templateIds.length === 0) return;
    templateIds.forEach((id) => {
      window.open(`/template/${id}`, "_blank");
    });
    setSelectedKeys(new Set([]));
  }

  useEffect(() => {
    if (!data) return;
    setRows(data?.data.templates);
  }, [data]);

  return (
    <>
      <div className="flex gap-2 px-2 py-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          startContent={<Search />}
          placeholder="Search"
        ></Input>
      </div>

      <div className="flex items-center justify-between px-3 py-3">
        <h1 className="text-lg font-bold">Actions</h1>
        <div className="flex gap-1">
          <Tooltip content="Open template">
            <Button onPress={handleClick} size="sm" color="primary">
              <ExternalLink />
            </Button>
          </Tooltip>
          <Tooltip content="Delete Template">
            <Button onPress={handleDelete} size="sm" color="danger">
              <Trash2 />
            </Button>
          </Tooltip>
        </div>
      </div>

      <Table
        aria-label="Controlled table example with dynamic content"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No templates to display."}
          isLoading={isLoading || isFetching}
          items={rows}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: TemplateObject) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
