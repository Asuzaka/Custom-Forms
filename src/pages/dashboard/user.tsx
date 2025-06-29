import { useDisclosure } from "@heroui/react";
import { useState } from "react";
import { useGetUserTemplatesQuery } from "../../shared/api/templateApi";
import type { ModalType, sortQuery, View } from "../../entities";
import {
  GridTempaltes,
  ModalProvider,
  TableTemplates,
  Toolbar,
} from "../../widgets";

export function UserDashboard() {
  const [sortQuery, setSortQuery] = useState<sortQuery>("");
  const {
    data: templates,
    error,
    isLoading,
  } = useGetUserTemplatesQuery(sortQuery);
  const [view, setView] = useState<View>("grid");
  const [selected, setSelected] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState<ModalType>("");

  const active = templates?.data?.find((each) => each.id === selected);

  if (error) throw Error("There was an error loading templates");
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Toolbar view={view} setView={setView} setSortQuery={setSortQuery} />
      {view === "grid" && <GridTempaltes templates={templates?.data || []} />}
      {view === "table" && (
        <TableTemplates
          templates={templates?.data || []}
          setModalType={setModalType}
          setSelected={setSelected}
          onOpen={onOpen}
        />
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
