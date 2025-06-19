import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Card,
  Image,
  CardFooter,
  Switch,
  Select,
  SelectItem,
  type SelectedItems,
  CardBody,
} from "@heroui/react";
import { useTheme } from "@heroui/use-theme";

import {
  Calendar,
  MoonIcon,
  NotebookPenIcon,
  Search,
  SunMediumIcon,
  User,
} from "lucide-react";
import { useState } from "react";

type Lang = {
  key: string;
  name: string;
};

export const langs = [
  {
    key: "ru",
    name: "Ru",
  },
  {
    key: "uz",
    name: "Uz",
  },
];

export function Page() {
  const [selectedLang, setSelectedLang] = useState<Set<string>>(
    new Set(["uz"]),
  );
  const { setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <>
      <Navbar isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <NotebookPenIcon />
            <p className="hidden font-bold text-inherit sm:block">
              Custom Forms
            </p>
          </NavbarBrand>

          <Input
            classNames={{
              base: "max-w-full sm:max-w-[15rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search   Ctrl K"
            size="sm"
            startContent={<Search />}
            type="search"
          />
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Switch
            isSelected={isSelected}
            onValueChange={(e) => {
              setIsSelected(e);
              setTheme(isSelected === true ? "light" : "dark");
            }}
            defaultSelected
            color="success"
            endContent={<MoonIcon />}
            size="lg"
            startContent={<SunMediumIcon color="yellow" />}
          />
          {/* --- */}
          <Select
            selectedKeys={selectedLang}
            onSelectionChange={(keys) => {
              if (keys !== "all") setSelectedLang(keys as Set<string>);
            }}
            classNames={{
              base: "max-w-[70px]",
              trigger: "h-10",
            }}
            items={langs}
            renderValue={(items: SelectedItems<Lang>) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <span>{item.data?.name}</span>
                </div>
              ));
            }}
          >
            {(lang) => (
              <SelectItem key={lang.key} textValue={lang.name}>
                <div className="flex items-center gap-2">
                  <span>{lang.name}</span>
                </div>
              </SelectItem>
            )}
          </Select>
          {/* --- */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Forms</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>

      <main className="m-auto flex max-w-5xl items-center justify-center">
        <div className="grid grid-cols-3 gap-5 px-6 pt-10">
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
                  w-full
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
                  <p className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <User />
                      <span>John Doe</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar />
                      <span>15.05.2025</span>
                    </div>
                  </p>
                  {/* Tags */}
                  <div></div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
