import { Button, Chip } from "@heroui/react";
import { useEffect, useState, type SetStateAction } from "react";
import type { TemplateObject, User } from "../../entities";

type Props = {
  users: string[];
  setNewTemplate: (value: SetStateAction<TemplateObject>) => void;
  newTemplate: TemplateObject;
};

export function Tags({ users, setNewTemplate, newTemplate }: Props) {
  const {data: fullUsers, isLoading, error} = 
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<User[]>([]);
  const [focus, setFocus] = useState<boolean>(false);

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
      <label className="text-lg font-medium">Tags</label>
      <div className="flex flex-wrap gap-2 rounded-md px-3 py-4 dark:bg-[#191a1b]">
        {users.map((each) => (
          <Chip color="primary" onClose={() => handleRemove(each)}>
            {each}
          </Chip>
        ))}
      </div>
      <div className="relative space-y-1">
        <div className="flex items-center justify-between gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Add tags..."
            className="w-full rounded-md px-2 py-2 placeholder-gray-400 dark:bg-[#191a1b]"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          <Button onPress={() => handleAdd(query)}>Add</Button>
        </div>
        {focus && query.length > 1 && (
          <div className="absolute z-10 flex flex-col gap-2 rounded-sm px-2 py-2 dark:bg-[#191a1b]">
            {results.length === 0 && <p>Nothing was found.</p>}
            {results.map((each) => (
              <button
                onClick={() => handleAdd(each)}
                className="cursor-pointer px-3 py-1 hover:opacity-90"
              >
                {each}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
