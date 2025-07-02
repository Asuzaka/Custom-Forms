import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { useNavigate } from "react-router";
import type { TemplateObject } from "../../entities";

type Props = {
  templates: TemplateObject[];
};

export function GridTempaltes({ templates }: Props) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-4 gap-4 py-2">
      {templates.map((item, index) => (
        <Card
          key={index}
          isPressable
          shadow="sm"
          onPress={() => navigate(`/template/${item._id}`)}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="h-[140px] w-full object-cover"
              radius="lg"
              shadow="sm"
              src={item.image}
              width="100%"
            />
          </CardBody>
          <CardFooter className="flex-col justify-between text-small">
            <b>{item.title}</b>
            <p className="text-default-500">
              {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
