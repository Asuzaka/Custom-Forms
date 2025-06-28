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
  useDisclosure,
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
import { sort } from "../../shared/constants/Dashboard";
import type { Form, ModalType, sortQuery } from "../../entities";
import { ModalProvider } from "../../widgets";
import { useNavigate } from "react-router";

const staticForms: Form[] = [
  {
    id: "uuu--dwa-dwa",
    title: "Customer Feedback Survey",
    thumbail: "https://example.com/thumbs/survey1.jpg",
    createdAt: new Date("2023-05-15T10:00:00Z"),
    seen: new Date("2023-05-16T14:30:00Z"),
  },
  {
    id: "aabawd===dwa--dwa",
    title: "Employee Onboarding Form",
    thumbail: "https://example.com/thumbs/onboarding.jpg",
    createdAt: new Date("2023-06-01T09:15:00Z"),
    seen: new Date("2023-06-02T11:20:00Z"),
  },
  {
    id: "dwadsamxam;d",
    title: "Product Satisfaction Questionnaire",
    thumbail: "https://example.com/thumbs/product-feedback.jpg",
    createdAt: new Date("2023-06-10T13:45:00Z"),
    seen: new Date("2023-06-10T15:10:00Z"),
  },
  {
    id: "klkkczlx;asda",
    title: "Event Registration",
    thumbail: "https://example.com/thumbs/event-reg.jpg",
    createdAt: new Date("2023-06-15T08:30:00Z"),
    seen: new Date("2023-06-16T10:00:00Z"),
  },
  {
    id: "dwaqwequijiocz",
    title: "Website Usability Test",
    thumbail: "https://example.com/thumbs/usability.jpg",
    createdAt: new Date("2023-06-20T11:00:00Z"),
    seen: new Date("2023-06-21T09:45:00Z"),
  },
  {
    id: "querto-dasjwa",
    title: "Monthly Subscription Preferences",
    thumbail: "https://example.com/thumbs/subscription.jpg",
    createdAt: new Date("2023-06-25T16:20:00Z"),
    seen: new Date("2023-06-26T13:15:00Z"),
  },
];

type View = "grid" | "table";

export function UserDashboard() {
  const [view, setView] = useState<View>("grid");
  const [sortQuery, setSortQuery] = useState<sortQuery>("");
  const [selected, setSelected] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState<ModalType>("");
  const navigate = useNavigate();

  throw new Error("we could find you");
  const active = staticForms.find((each) => each.id === selected);

  return (
    <>
      <div className="flex items-center justify-between px-2 py-3">
        <Button color="primary">Create Form</Button>
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
                <DropdownItem
                  onPress={() => setSortQuery(item.query)}
                  key={item.id}
                >
                  {item.name}
                </DropdownItem>
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
              onPress={() => console.log(sortQuery)}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item.title}
                  className="h-[140px] w-full object-cover"
                  radius="lg"
                  shadow="sm"
                  src={`https://image.thum.io/get/width/800/https://lig-forms.netlify.app`}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="flex-col justify-between text-small">
                <b>{item.title}</b>
                <p className="text-default-500">
                  {item.createdAt.toLocaleString()}
                </p>
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
            {staticForms.map((each) => (
              <TableRow key={each.id}>
                <TableCell>
                  <Library />
                </TableCell>
                <TableCell>{each.title}</TableCell>
                <TableCell>{each.createdAt.toLocaleString()}</TableCell>
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
                            setSelected(each.id);
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
                            setSelected(each.id);
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
                          onClick={() => navigate(`/forms/${each.id}`)}
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
      )}
      <ModalProvider
        key={selected}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        modalType={modalType}
        active={active}
      />
    </>
  );
}
