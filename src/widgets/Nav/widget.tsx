import { MoonIcon, NotebookPenIcon, SunMediumIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "@heroui/use-theme";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import { SearchWithButton } from "./search";
import { loadLanguage } from "../../shared/lib/i18n";
import { useLazySignoutQuery } from "../../shared/api/authApi";
import { useTranslation } from "react-i18next";
import { getLanguages } from "../../shared/constants/Dashboard";
import type { RootState } from "../../store/store";
import type { Lang } from "../../entities";
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

export function Widget() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [triggerSignout] = useLazySignoutQuery();

  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState<Set<string>>(() => {
    const storedKey = localStorage.getItem("language");
    const isValidKey =
      storedKey && getLanguages(t).some((l) => l.key === storedKey);
    return new Set([isValidKey ? storedKey : getLanguages(t)[0].key]);
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
    if (!storedKey) {
      loadLanguage([...selectedLang][0]);
    } else {
      loadLanguage(storedKey);
    }
  }, []);

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand
          className="mr-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <NotebookPenIcon />
          <p className="hidden font-bold text-inherit sm:block">
            {t("general.app")}
          </p>
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

        <Select
          aria-label="language"
          selectedKeys={selectedLang}
          onSelectionChange={handleSelectionChange}
          classNames={{
            base: "max-w-[70px]",
            trigger: "h-10",
          }}
          items={getLanguages(t)}
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
                user?.photo ??
                "https://hxfqjxaynywivthkixwq.supabase.co/storage/v1/object/public/images//default.png"
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
                  <p className="font-semibold">{t("nav.notsigned")}</p>
                </DropdownItem>
                <DropdownItem
                  textValue="signin"
                  onPress={() => navigate("/signin")}
                  key="signin"
                >
                  {t("nav.signin")}
                </DropdownItem>
              </>
            ) : (
              <>
                <DropdownItem
                  textValue="profile"
                  key="profile"
                  className="h-14 gap-2"
                >
                  <p className="font-semibold">{t("nav.signedin")}</p>
                  <p className="font-semibold">{user?.email}</p>
                </DropdownItem>
                <DropdownItem
                  textValue="dashboard"
                  onPress={() => navigate("/dashboard")}
                  key="dashboard"
                >
                  {t("nav.dashboard")}
                </DropdownItem>
              </>
            )}

            <DropdownItem
              onPress={() => navigate("/forgetPassword")}
              textValue="dashboard"
              key="forget"
            >
              {t("nav.forgetPassword")}
            </DropdownItem>
            <DropdownItem
              onPress={handleLogut}
              textValue="dashboard"
              key="logout"
              color="danger"
            >
              {t("nav.signout")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
