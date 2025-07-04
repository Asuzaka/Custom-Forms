import { Calendar, TagIcon, User } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getHomePageColumns } from "../../shared/constants/Dashboard";
import ReactMarkdown from "react-markdown";
import type { FullTemplate } from "../../entities";
import {
  useGetLatestTemplatesQuery,
  useGetPopularTemplatesQuery,
  useGetTagsQuery,
} from "../../shared/api/templateApi";
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
  Button,
  Spinner,
} from "@heroui/react";

export function Page() {
  const navigate = useNavigate();
  const [popular, setPopular] = useState<FullTemplate[]>([]);
  const { data: templatesData } = useGetLatestTemplatesQuery();
  const { data: popularData, isLoading } = useGetPopularTemplatesQuery();
  const { data: tagsData } = useGetTagsQuery();

  const { t } = useTranslation();

  useEffect(() => {
    if (popularData) {
      setPopular(popularData.data);
    }
  }, [popularData]);

  return (
    <>
      <h1 className="mt-10 text-3xl font-bold">
        {t("homepage.latestTemplates")}
      </h1>
      <div className="grid grid-cols-3 gap-5 py-10">
        {templatesData ? (
          templatesData.data.map((template, index) => (
            <Card
              key={index}
              onPress={() => navigate(`/template/${template._id}`)}
              isPressable
              shadow="sm"
              isFooterBlurred
              className="flex min-w-[200px] border-none"
              radius="lg"
            >
              <CardBody className="h-[50%] overflow-visible p-0">
                <Image
                  alt={template.title}
                  className="object-cover"
                  w-full="true"
                  height="200px"
                  src={template.image}
                  width="100%"
                />
              </CardBody>
              <CardFooter>
                <div className="flex w-full flex-col items-center gap-2 py-1">
                  <h1 className="text-xl font-bold">{template.title}</h1>
                  <ReactMarkdown>{template.description}</ReactMarkdown>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1">
                      <User />
                      <span>{template.creator.name}</span>
                    </div>
                    <div className="flex items-center gap-1 py-2">
                      <Calendar />
                      <span>
                        {template.createdAt
                          ? new Date(template.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Spinner>{t("general.loading")}</Spinner>
        )}
      </div>
      <h1 className="text-3xl font-bold">
        {t("homepage.popularTemplates.root")}
      </h1>
      <div className="py-10">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={getHomePageColumns(t)}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={<Spinner>{t("general.loading")}</Spinner>}
            items={popular}
          >
            {(item) => (
              <TableRow
                onClick={() => navigate(`/template/${item._id}`)}
                key={item._id}
              >
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "creator.name"
                      ? item.creator.name
                      : getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <h1 className="text-3xl font-bold">{t("homepage.tags")}</h1>
      <div className="my-10 rounded-large bg-white p-6 shadow-small dark:bg-[#191a1b]">
        <div className="flex flex-wrap gap-3">
          {tagsData ? (
            tagsData.data.map((tag: { _id: string; count: number }) => (
              <Button size="sm" variant="solid" key={crypto.randomUUID()}>
                <div
                  className="flex cursor-pointer items-center text-sm"
                  key={tag._id}
                >
                  <TagIcon size={tag.count >= 10 ? 16 : 12} className="mr-1" />
                  {tag._id}
                  <span className="ml-1.5 rounded-full bg-white px-1.5 py-0.5 text-xs dark:bg-[#191a1b]">
                    {tag.count}
                  </span>
                </div>
              </Button>
            ))
          ) : (
            <Spinner>{t("general.loading")}</Spinner>
          )}
        </div>
      </div>
    </>
  );
}
