import { Button, Chip } from "@heroui/react";
import { useEffect, useState, type SetStateAction } from "react";
import type { TemplateObject } from "../../entities";

type Props = {
  tags: string[];
  setNewTemplate: (value: SetStateAction<TemplateObject>) => void;
  newTemplate: TemplateObject;
};

export function Tags({ tags, setNewTemplate, newTemplate }: Props) {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [focus, setFocus] = useState<boolean>(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      // Replace this with your real API call
      setResults(["bombardiro", "query", "bombasus"]);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  function handleAdd(value: string) {
    if (newTemplate.tags.includes(value)) return;
    const newTags = [...newTemplate.tags, value];
    setNewTemplate({ ...newTemplate, tags: newTags });
    setQuery("");
  }

  function handleRemove(value: string) {
    const newTags = newTemplate.tags.filter((val) => val !== value);
    setNewTemplate({ ...newTemplate, tags: newTags });
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-medium">Tags: </label>
      <div className="flex flex-wrap gap-2 rounded-md bg-gray-100 px-3 py-4 dark:bg-[#191a1b]">
        {tags.map((each) => (
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
            className="w-full rounded-md bg-gray-100 px-2 py-2 placeholder-gray-400 dark:bg-[#191a1b]"
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
