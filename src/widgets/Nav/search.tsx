import {
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLazyGlobalSearchQuery } from "../../shared/api/searchApi";
import { useNavigate } from "react-router";
import type { globalSearchType } from "../../entities";

export function SearchWithButton() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [triggerSearch, { isFetching }] = useLazyGlobalSearchQuery();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<globalSearchType>({
    templates: [],
    comments: [],
    tags: [],
  });

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
      setResults({ templates: [], comments: [], tags: [] });
      return;
    }

    const timeout = setTimeout(() => {
      triggerSearch(query)
        .unwrap()
        .then((res) => setResults(res.data));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, triggerSearch]);

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

              {isFetching && <Spinner>Loading...</Spinner>}

              {!isFetching && (
                <>
                  <div>
                    <h1>Comments:</h1>
                    <ul className="p-2">
                      {results.comments.map((item, index) => (
                        <li
                          onClick={() => navigate(`/template/${item.template}`)}
                          key={index}
                          className="py-1 text-gray-800 dark:text-white"
                        >
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h1>Tags:</h1>
                    <ul className="p-2">
                      {results.tags.map((item, index) => (
                        <div key={item.tag}>
                          <h1>{item.tag}</h1>
                          {item.templates.map((each) => (
                            <li
                              onProgress={() =>
                                navigate(`/template/${each._id}`)
                              }
                              key={index}
                              className="py-1 text-gray-800 dark:text-white"
                            >
                              {each.title}
                            </li>
                          ))}
                        </div>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h1>Templates:</h1>
                    <ul className="p-2">
                      {results.templates.map((item, index) => (
                        <li
                          onClick={() => navigate(`/template/${item._id}`)}
                          key={index}
                          className="py-1 text-gray-800 dark:text-white"
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
