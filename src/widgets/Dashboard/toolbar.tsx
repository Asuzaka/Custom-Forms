import { ArrowDownZA, Grid2x2, TableOfContents } from "lucide-react";
import { sort } from "../../shared/constants/Dashboard";
import type { sortQuery, View } from "../../entities";
import type { Dispatch, SetStateAction } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useNavigate } from "react-router";

type Props = {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
  setSortQuery: Dispatch<SetStateAction<sortQuery>>;
};

export function Toolbar({ view, setView, setSortQuery }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-2 py-3">
      <Button onPress={() => navigate("/newTemplate")} color="primary">
        Create Template
      </Button>
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
  );
}
