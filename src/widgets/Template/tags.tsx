import { Button, Chip } from "@heroui/react";
import { useEffect, useState, type SetStateAction } from "react";
import { useSearchTagsQuery } from "../../shared/api/searchApi";
import type { TemplateObject } from "../../entities";

type Props = {
  tags: string[];
  setNewTemplate: (value: SetStateAction<TemplateObject>) => void;
  newTemplate: TemplateObject;
};

export function Tags({ tags, setNewTemplate, newTemplate }: Props) {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [focus, setFocus] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const { data: searchData } = useSearchTagsQuery(debouncedQuery, {
    skip: debouncedQuery.length < 2,
  });

  useEffect(() => {
    if (searchData?.data) {
      const filteredResults = searchData.data.filter(
        (tag) => !newTemplate.tags.includes(tag),
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [searchData, newTemplate.tags]);

  function handleAdd(value: string) {
    const trimmedValue = value.trim();
    if (!trimmedValue || newTemplate.tags.includes(trimmedValue)) return;

    const newTags = [...newTemplate.tags, trimmedValue];
    setNewTemplate({ ...newTemplate, tags: newTags });
    setQuery("");
    setFocus(false);
  }

  function handleRemove(value: string) {
    const newTags = newTemplate.tags.filter((val) => val !== value);
    setNewTemplate({ ...newTemplate, tags: newTags });
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd(query);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-medium">Tags:</label>

      <div className="flex flex-wrap gap-2 rounded-md bg-gray-100 px-3 py-4 dark:bg-[#191a1b]">
        {tags.length > 0 ? (
          tags.map((each) => (
            <Chip key={each} color="primary" onClose={() => handleRemove(each)}>
              {each}
            </Chip>
          ))
        ) : (
          <p className="text-gray-500">No tags added yet</p>
        )}
      </div>

      <div className="relative space-y-1">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or add tags..."
            className="w-full rounded-md bg-gray-100 px-2 py-2 placeholder-gray-400 dark:bg-[#191a1b]"
            onFocus={() => setFocus(true)}
            onBlur={() => setTimeout(() => setFocus(false), 200)}
          />
          <Button onPress={() => handleAdd(query)} isDisabled={!query.trim()}>
            Add
          </Button>
        </div>

        {focus && query.length > 1 && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-gray-100 shadow-lg dark:bg-[#191a1b]">
            {results.length === 0 ? (
              <div className="px-4 py-2 text-gray-500">
                {searchData ? "No matching tags found" : "Type to search tags"}
              </div>
            ) : (
              results.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleAdd(tag)}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {tag}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
