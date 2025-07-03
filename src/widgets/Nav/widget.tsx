import { MoonIcon, NotebookPenIcon, SunMediumIcon } from "lucide-react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Switch,
  Select,
  SelectItem,
  type SelectedItems,
  type Selection,
} from "@heroui/react";
import { useNavigate } from "react-router";

const langs: Lang[] = [
  {
    key: "ru",
    name: "Ru",
  },
  {
    key: "uz",
    name: "Uz",
  },
  {
    key: "en",
    name: "En",
  },
];

import { useTheme } from "@heroui/use-theme";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import { SearchWithButton } from "./search";
import type { RootState } from "../../store/store";
import type { Lang } from "../../entities";
import { loadLanguage } from "../../shared/lib/i18n";
import { useLazySignoutQuery } from "../../shared/api/authApi";

export function Widget() {
  const dispatch = useDispatch();
  const [triggerSignout] = useLazySignoutQuery();

  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState<Set<string>>(() => {
    const storedKey = localStorage.getItem("language");
    const isValidKey = storedKey && langs.some((l) => l.key === storedKey);
    return new Set([isValidKey ? storedKey : langs[0].key]);
  });
  const previousSelectedKey = [...selectedLang][0];
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme === "dark" ? true : false);

  const handleLogut = async () => {
    try {
      await triggerSignout();
    } catch {
      // RTK HANDLEs
    }
    dispatch(logout());
  };

  const handleSelectionChange = (keys: Selection) => {
    if (keys === "all") return;

    const newKey = [...keys][0];

    let Key: string;

    if (!newKey || newKey === previousSelectedKey) {
      Key = previousSelectedKey;
    } else {
      Key = newKey as string;
    }
    setSelectedLang(new Set([Key]));
    localStorage.setItem("language", Key);
    loadLanguage(Key);
  };

  useEffect(() => {
    const storedKey = localStorage.getItem("language");
    if (!storedKey) return;
    loadLanguage(storedKey);
  }, []);

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand
          className="mr-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <NotebookPenIcon />
          <p className="hidden font-bold text-inherit sm:block">Custom Forms</p>
        </NavbarBrand>

        <SearchWithButton />
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
          aria-label="language"
          selectedKeys={selectedLang}
          onSelectionChange={handleSelectionChange}
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
              name={user?.name}
              size="sm"
              src={
                user === null
                  ? `${import.meta.env.VITE_BACKEND_URL}/public/users/default.png`
                  : user?.photo
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {user === null ? (
              <>
                <DropdownItem
                  textValue="profile"
                  key="profile"
                  className="h-14 gap-2"
                >
                  <p className="font-semibold">You are not signed in</p>
                </DropdownItem>
                <DropdownItem
                  textValue="signin"
                  onPress={() => navigate("/signin")}
                  key="signin"
                >
                  Sign in
                </DropdownItem>
              </>
            ) : (
              <>
                <DropdownItem
                  textValue="profile"
                  key="profile"
                  className="h-14 gap-2"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem
                  textValue="dashboard"
                  onPress={() => navigate("/dashboard")}
                  key="dashboard"
                >
                  Dashboard
                </DropdownItem>
              </>
            )}

            <DropdownItem
              onPress={() => navigate("/forgetPassword")}
              textValue="dashboard"
              key="forget"
            >
              Forgot Password?
            </DropdownItem>
            <DropdownItem
              onPress={handleLogut}
              textValue="dashboard"
              key="logout"
              color="danger"
            >
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
