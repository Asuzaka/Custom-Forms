import {
  Modal,
  ModalBody,
  ModalContent,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { FileText, MessageCircle, Search, Tag } from "lucide-react";
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
              {isFetching ? (
                <div className="flex justify-center py-6">
                  <Spinner size="lg">Searching...</Spinner>
                </div>
              ) : (
                <div className="space-y-4 px-4 py-2 text-sm">
                  {results.templates.length > 0 && (
                    <div>
                      <h2 className="mb-1 flex items-center gap-1 font-semibold text-gray-700 dark:text-white">
                        <FileText size={16} />
                        Templates
                      </h2>
                      <ul className="space-y-1">
                        {results.templates.map((item) => (
                          <li
                            key={item._id}
                            onClick={() => navigate(`/template/${item._id}`)}
                            className="cursor-pointer rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            {item.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {results.tags.length > 0 && (
                    <div>
                      <h2 className="mb-1 flex items-center gap-1 font-semibold text-gray-700 dark:text-white">
                        <Tag size={16} />
                        Tags
                      </h2>
                      {results.tags.map((tagGroup) => (
                        <div key={tagGroup.tag} className="mb-2">
                          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            #{tagGroup.tag}
                          </h3>
                          <ul className="mt-1 ml-2 space-y-1">
                            {tagGroup.templates.map((tpl) => (
                              <li
                                key={tpl._id}
                                onClick={() => navigate(`/template/${tpl._id}`)}
                                className="cursor-pointer rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                              >
                                {tpl.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {results.comments.length > 0 && (
                    <div>
                      <h2 className="mb-1 flex items-center gap-1 font-semibold text-gray-700 dark:text-white">
                        <MessageCircle size={16} />
                        Comments
                      </h2>
                      <ul className="space-y-1">
                        {results.comments.map((comment, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              navigate(`/template/${comment.template}`)
                            }
                            className="cursor-pointer rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                          >
                            {comment.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {query &&
                    results.templates.length === 0 &&
                    results.tags.length === 0 &&
                    results.comments.length === 0 && (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        No results found for "{query}"
                      </div>
                    )}
                </div>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
