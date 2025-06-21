import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  ArrowDownZA,
  EllipsisVertical,
  ExternalLink,
  Grid2x2,
  Library,
  PencilLine,
  TableOfContents,
  Trash2,
} from "lucide-react";
import { useState } from "react";

const staticForms = [
  {
    id: "form_1",
    title: "Customer Satisfaction Survey",
    imageUrl:
      "docs.google.com/forms/d/1EPKKGdZ3AO94owrND_7p64SUKQHk0XpPylwwlQmdQ2w/edit?usp=forms_home&ouid=113091791619201786820&ths=true",
    createdAt: "2024-05-01T10:45:00Z",
  },
  {
    id: "form_2",
    title: "Job Application Form",
    imageUrl:
      "docs.google.com/forms/d/1EPKKGdZ3AO94owrND_7p64SUKQHk0XpPylwwlQmdQ2w/edit?usp=forms_home&ouid=113091791619201786820&ths=true",
    createdAt: "2024-05-12T14:20:00Z",
  },
  {
    id: "form_3",
    title: "Event Registration",
    imageUrl:
      "docs.google.com/forms/d/1EPKKGdZ3AO94owrND_7p64SUKQHk0XpPylwwlQmdQ2w/edit?usp=forms_home&ouid=113091791619201786820&ths=true",
    createdAt: "2024-06-03T08:15:00Z",
  },
  {
    id: "form_4",
    title: "Feedback on Our Website",
    imageUrl:
      "docs.google.com/forms/d/1EPKKGdZ3AO94owrND_7p64SUKQHk0XpPylwwlQmdQ2w/edit?usp=forms_home&ouid=113091791619201786820&ths=true",
    createdAt: "2024-06-10T17:50:00Z",
  },
  {
    id: "form_5",
    title: "Product Review Form",
    imageUrl:
      "docs.google.com/forms/d/1EPKKGdZ3AO94owrND_7p64SUKQHk0XpPylwwlQmdQ2w/edit?usp=forms_home&ouid=113091791619201786820&ths=true",
    createdAt: "2024-06-20T09:30:00Z",
  },
];

type View = "grid" | "table";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const sort = [
  { key: 0, label: "sort by date" },
  { key: 1, label: "sort by last seen date" },
  {
    key: 2,
    label: "sort by title",
  },
];

const actions = [
  {
    key: 0,
    label: (
      <span className="flex items-center gap-2">
        <PencilLine />
        Rename
      </span>
    ),
  },
  {
    key: 1,
    label: (
      <span className="flex items-center gap-2 text-danger">
        <Trash2 />
        Delete
      </span>
    ),
  },
  {
    key: 2,
    label: (
      <span className="flex items-center gap-2">
        <ExternalLink />
        Open
      </span>
    ),
  },
];

export function UserDashboard() {
  const [view, setView] = useState<View>("grid");

  return (
    <>
      <div className="flex items-center justify-between px-2 py-3">
        <Button color="primary">Add new Form</Button>
        <div className="items-cente flex gap-2">
          <Button
            size="sm"
            variant="bordered"
            onPress={() => setView((e) => (e === "grid" ? "table" : "grid"))}
          >
            {view !== "grid" ? <Grid2x2 /> : <TableOfContents />}
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="bordered">
                <ArrowDownZA />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={sort}>
              {(item) => (
                <DropdownItem key={item.key}>{item.label}</DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {view === "grid" && (
        <div className="grid grid-cols-4 gap-4 py-2">
          {staticForms.map((item, index) => (
            <Card
              key={index}
              isPressable
              shadow="sm"
              onPress={() => console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item.title}
                  className="h-[140px] w-full object-cover"
                  radius="lg"
                  shadow="sm"
                  src={`https://image.thum.io/get/width/800/https://lig-forms.netlify.app}`}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="flex-col justify-between text-small">
                <b>{item.title}</b>
                <p className="text-default-500">{item.createdAt}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      {view === "table" && (
        <Table aria-label="Example empty table">
          <TableHeader>
            <TableColumn>TYPE</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>
            {rows.map((each) => (
              <TableRow key={each.key}>
                <TableCell>
                  <Library />
                </TableCell>
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <button className="cursor-pointer px-2">
                        <EllipsisVertical />
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={actions}>
                      {(item) => (
                        <DropdownItem key={item.key}>{item.label}</DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
