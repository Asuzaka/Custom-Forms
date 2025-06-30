import { Avatar, Button, Chip } from "@heroui/react";
import { useEffect, useState, type SetStateAction } from "react";
import type { TemplateObject, User } from "../../entities";
import { useGetUsersMutation } from "../../shared/api/usersApi";

type Props = {
  users: string[];
  setNewTemplate: (value: SetStateAction<TemplateObject>) => void;
  newTemplate: TemplateObject;
};

export function Users({ users, setNewTemplate, newTemplate }: Props) {
  const [getUsers, { data: fullUsers }] = useGetUsersMutation();
  const [sort, setSort] = useState<"name" | "email">("name");
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<User[]>([]);
  const [focus, setFocus] = useState<boolean>(false);

  useEffect(() => {
    if (users.length > 0) {
      getUsers({ users });
    }
  }, [users, getUsers]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      // Replace this with your real API call
      setResults([
        {
          id: "a",
          name: "User user",
          email: "user@user.co",
          photo: "https://i.pravatar.cc/300?u=a042581f4e29026709d",
          status: "active",
        },
        {
          id: "b",
          name: "bombardiro Bombardiro",
          email: "bombich@bom.bu",
          photo: "https://i.pravatar.cc/300?u=a042581f4e29026709d",
          status: "active",
        },
        {
          id: "c",
          name: "Really Genious",
          email: "gennie@gmail.co,",
          photo: "https://i.pravatar.cc/300?u=a042581f4e29026709d",
          status: "active",
        },
      ]);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  function handleAdd(value: string) {
    if (newTemplate.allowedUsers.includes(value)) return;
    const newUsers = [...newTemplate.allowedUsers, value];
    setNewTemplate({ ...newTemplate, tags: newUsers });
    setQuery("");
  }

  function handleRemove(value: string) {
    const newUsers = newTemplate.allowedUsers.filter((val) => val !== value);
    setNewTemplate({ ...newTemplate, allowedUsers: newUsers });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-lg font-medium">Allowed Users:</label>
        <Button
          onPress={() =>
            setSort((prev) => (prev === "name" ? "email" : "name"))
          }
        >
          {sort === "name" ? "Sort by Name" : "Sort by Email"}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 rounded-md bg-gray-100 px-3 py-4 dark:bg-[#191a1b]">
        {fullUsers?.data.users.map((each) => (
          <Chip
            avatar={<Avatar isBordered name={each.name} src={each.photo} />}
            variant="flat"
            color="primary"
            onClose={() => handleRemove(each.id)}
          >
            {each.name}
          </Chip>
        ))}
      </div>
      <div className="relative space-y-1">
        <div className="flex items-center justify-between gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for users.."
            className="w-full rounded-md bg-gray-100 px-2 py-2 placeholder-gray-400 dark:bg-[#191a1b]"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
        {focus && query.length > 1 && (
          <div className="absolute z-10 flex flex-col gap-2 rounded-sm bg-gray-100 px-2 py-2 dark:bg-[#191a1b]">
            {results.length === 0 && <p>Nothing was found.</p>}
            {results.map((each) => (
              <button
                onClick={() => handleAdd(each.id)}
                className="flex cursor-pointer items-center gap-5 px-3 py-1 hover:opacity-90"
              >
                <Avatar
                  isBordered
                  className="h-6 w-6 text-tiny"
                  name={each.name}
                  src={each.photo}
                />
                <span>{sort === "name" ? each.name : each.email}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
