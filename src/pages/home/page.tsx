import {
  Card,
  Image,
  CardFooter,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Link,
  Button,
} from "@heroui/react";

import { Calendar, TagIcon, User } from "lucide-react";
import { Navbar } from "../../widgets";

type Tag = {
  name: string;
  count: number;
};
const rows = [
  {
    key: "1",
    title: "Customer Feedback Form",
    author: "John Doe",
    likes: "89",
    submissions: "432",
  },
  {
    key: "2",
    title: "Event Registration",
    author: "Jane Smith",
    likes: "76",
    submissions: "315",
  },
  {
    key: "3",
    title: "Job Application",
    author: "Mike Johnson",
    likes: "67",
    submissions: "281",
  },
  {
    key: "4",
    title: "Product Order Form",
    author: "Sarah Williams",
    likes: "54",
    submissions: "198",
  },
  {
    key: "5",
    title: "Contact Form",
    author: "Alex Brown",
    likes: "48",
    submissions: "176",
  },
];

const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "author",
    label: "Author",
  },
  {
    key: "likes",
    label: "Likes",
  },
  {
    key: "submissions",
    label: "Submissions",
  },
];

const tags: Tag[] = [
  {
    name: "feedback",
    count: 24,
  },
  {
    name: "survey",
    count: 18,
  },
  {
    name: "customer",
    count: 15,
  },
  {
    name: "registration",
    count: 12,
  },
  {
    name: "event",
    count: 10,
  },
  {
    name: "application",
    count: 9,
  },
  {
    name: "job",
    count: 8,
  },
  {
    name: "contact",
    count: 7,
  },
  {
    name: "order",
    count: 6,
  },
  {
    name: "product",
    count: 5,
  },
  {
    name: "ecommerce",
    count: 4,
  },
  {
    name: "education",
    count: 4,
  },
  {
    name: "newsletter",
    count: 3,
  },
  {
    name: "subscription",
    count: 3,
  },
  {
    name: "payment",
    count: 2,
  },
  {
    name: "donation",
    count: 2,
  },
  {
    name: "booking",
    count: 2,
  },
  {
    name: "reservation",
    count: 1,
  },
  {
    name: "appointment",
    count: 1,
  },
  {
    name: "review",
    count: 1,
  },
];

export function Page() {
  return (
    <>
      <Navbar />
      <main className="m-auto max-w-5xl px-6">
        <h1 className="mt-10 text-3xl font-bold">Latest Templates</h1>
        <div className="grid grid-cols-3 gap-5 py-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              isPressable
              shadow="sm"
              isFooterBlurred
              className="flex min-w-[200px] border-none"
              radius="lg"
            >
              <CardBody className="h-[50%] overflow-visible p-0">
                <Image
                  alt="Woman listing to music"
                  className="object-cover"
                  w-full="true"
                  height="200px"
                  src="https://heroui.com/images/hero-card.jpeg"
                  width="100%"
                />
              </CardBody>
              <CardFooter>
                <div className="flex flex-col gap-2">
                  {/* Forms Theme */}
                  <h1 className="text-xl font-bold">Customer Feedback Form</h1>
                  {/* Forms description */}
                  <p className="font-thin">
                    Collect feedback from customers about your products or
                    services
                  </p>
                  {/* Publisher */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <User />
                      <span>John Doe</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar />
                      <span>15.05.2025</span>
                    </div>
                  </div>
                  {/* Tags */}
                  <div></div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <h1 className="text-3xl font-bold">Popular Templates</h1>
        <div className="py-10">
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <h1 className="text-3xl font-bold">Tags</h1>
        <div className="my-10 rounded-large bg-white p-6 shadow-small dark:bg-[#191a1b]">
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Button size="sm" variant="solid" key={crypto.randomUUID()}>
                <Link
                  color="foreground"
                  key={tag.name}
                  href={`/search?tag=${tag.name}`}
                >
                  <TagIcon size={tag.count >= 10 ? 16 : 12} className="mr-1" />
                  {tag.name}
                  <span className="ml-1.5 rounded-full bg-white px-1.5 py-0.5 text-xs dark:bg-[#191a1b]">
                    {tag.count}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
