import { Avatar, Chip } from "@heroui/react";
import { useEffect, useState, type SetStateAction } from "react";
import type { TemplateObject, User } from "../../entities";
import { useGetUsersMutation } from "../../shared/api/usersApi";
import { useSearchUsersQuery } from "../../shared/api/searchApi";

type Props = {
  users: string[];
  setNewTemplate: (value: SetStateAction<TemplateObject>) => void;
  newTemplate: TemplateObject;
};

export function Users({ users, setNewTemplate, newTemplate }: Props) {
  const [getUsers, { data: fullUsers }] = useGetUsersMutation();
  const [results, setResults] = useState<User[]>([]);
  const [focus, setFocus] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (users.length > 0) {
      getUsers({ users });
    }
  }, [users, getUsers]);

  const { data: searchData } = useSearchUsersQuery(debouncedQuery, {
    skip: debouncedQuery.length < 2,
  });

  useEffect(() => {
    if (searchData) {
      setResults(searchData.data);
    } else {
      setResults([]);
    }
  }, [searchData]);

  function handleAdd(value: string) {
    if (newTemplate.allowedUsers.includes(value)) return;
    const newUsers = [...newTemplate.allowedUsers, value];
    setNewTemplate({ ...newTemplate, allowedUsers: newUsers });
    setQuery("");
    setFocus(false);
  }

  function handleRemove(value: string) {
    const newUsers = newTemplate.allowedUsers.filter((val) => val !== value);
    setNewTemplate({ ...newTemplate, allowedUsers: newUsers });
  }

  const filteredResults = results.filter(
    (user) => !newTemplate.allowedUsers.includes(user._id),
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-lg font-medium">Allowed Users:</label>
      </div>

      <div className="flex flex-wrap gap-2 rounded-md bg-gray-100 px-3 py-4 dark:bg-[#191a1b]">
        {fullUsers?.data?.users?.map((each) => (
          <Chip
            key={each._id}
            avatar={<Avatar isBordered name={each.name} src={each.photo} />}
            variant="flat"
            color="primary"
            onClose={() => handleRemove(each._id)}
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
            placeholder="Search for users..."
            className="w-full rounded-md bg-gray-100 px-2 py-2 placeholder-gray-400 dark:bg-[#191a1b]"
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 200)}
          />
        </div>

        {focus && query.length > 1 && (
          <div className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-gray-100 shadow-lg dark:bg-[#191a1b]">
            {filteredResults.length === 0 ? (
              <p className="px-4 py-2 text-gray-500">No users found</p>
            ) : (
              filteredResults.map((each) => (
                <button
                  key={each._id}
                  onClick={() => handleAdd(each._id)}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Avatar
                    isBordered
                    className="h-8 w-8 text-tiny"
                    name={each.name}
                    src={each.photo}
                  />
                  <div className="text-left">
                    <p className="font-medium">{each.name}</p>
                    <p className="text-sm text-gray-500">{each.email}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
