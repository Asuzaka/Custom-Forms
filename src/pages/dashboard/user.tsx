import { Spinner } from "@heroui/react";
import { useState } from "react";
import { useGetUserTemplatesQuery } from "../../shared/api/templateApi";
import { GridTempaltes, TableTemplates, Toolbar } from "../../widgets";
import type { sortQuery, View } from "../../entities";

export function UserDashboard() {
  const [sortQuery, setSortQuery] = useState<sortQuery>("");
  const {
    data: templates,
    error,
    isLoading,
  } = useGetUserTemplatesQuery(sortQuery);
  const [view, setView] = useState<View>("grid");

  if (error) throw Error("There was an error loading templates");
  if (isLoading)
    return (
      <div className="flex h-[90dvh] items-center justify-center">
        <Spinner>Loading...</Spinner>
      </div>
    );

  return (
    <>
      <Toolbar view={view} setView={setView} setSortQuery={setSortQuery} />
      {view === "grid" && <GridTempaltes templates={templates?.data || []} />}
      {view === "table" && <TableTemplates templates={templates?.data || []} />}
    </>
  );
}
