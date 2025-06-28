import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export function SearchWithButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Open modal on Ctrl + K
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpen]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);

      // Replace this with your real API call
      fakeSearch(query).then((res) => {
        setResults(res);
        setLoading(false);
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const fakeSearch = async (input: string): Promise<string[]> => {
    const allItems = ["apple", "banana", "orange", "grape", "watermelon"];
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(allItems.filter((item) => item.includes(input.toLowerCase())));
      }, 500),
    );
  };

  return (
    <>
      <button
        className="flex cursor-pointer rounded-md border border-gray-300 bg-gray-100 px-3 py-1 dark:border-gray-300/20 dark:bg-gray-100/20"
        onClick={onOpen}
      >
        CTRL K
      </button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {() => (
            <ModalBody>
              <div className="flex items-center gap-3 border-b p-2">
                <Search />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent outline-none"
                  autoFocus
                />

                <button className="flex cursor-pointer items-center justify-center rounded-md bg-gray-100 px-2 py-1 dark:bg-gray-100/10">
                  ESC
                </button>
              </div>

              {loading && (
                <div className="p-2 text-center text-sm text-gray-500">
                  Loading...
                </div>
              )}

              {!loading && results.length > 0 && (
                <ul className="p-2">
                  {results.map((item, index) => (
                    <li
                      key={index}
                      className="py-1 text-gray-800 dark:text-white"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {!loading && query && results.length === 0 && (
                <div className="p-2 text-sm text-gray-400">
                  No results found
                </div>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
