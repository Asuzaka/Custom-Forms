import { Button, Spinner } from "@heroui/react";
import type { Comment } from "../../entities";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { useSocket } from "../../shared/hooks/socketContext";
import { useGetCommentByTemplateIdQuery } from "../../shared/api/commentApi";
import { skipToken } from "@reduxjs/toolkit/query";

type Props = {
  templateId: string | undefined;
};

export function Comments({ templateId }: Props) {
  const user = useSelector((state: RootState) => state.user.user);
  const { socket, isConnected } = useSocket();

  const { data, isLoading, refetch } = useGetCommentByTemplateIdQuery(
    templateId ?? skipToken,
  );

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [showNewCommentForm, setShowNewCommentForm] = useState(true);

  useEffect(() => {
    if (!socket || !templateId) return;

    if (isConnected) {
      socket.emit("join-template", templateId);
    }

    const invalidateComments = () => {
      refetch();
    };

    socket.on("comment:new", invalidateComments);
    socket.on("comment:updated", invalidateComments);
    socket.on("comment:deleted", invalidateComments);

    return () => {
      socket.off("comment:new", invalidateComments);
      socket.off("comment:updated", invalidateComments);
      socket.off("comment:deleted", invalidateComments);
    };
  }, [socket, isConnected, templateId, refetch]);

  const handleAddComment = () => {
    if (!newCommentText.trim() || !user || !socket || !templateId) return;

    socket.emit("comment:create", {
      text: newCommentText,
      templateId,
    });

    setNewCommentText("");
    setShowNewCommentForm(false);
  };

  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditedText(comment.text);
  };

  const handleSaveEdit = (commentId: string) => {
    if (!editedText.trim() || !socket) return;

    socket.emit("comment:edit", {
      commentId,
      text: editedText,
      templateId,
    });

    setEditingCommentId(null);
  };

  const handleDelete = (commentId: string) => {
    if (!socket || !templateId) return;

    socket.emit("comment:delete", {
      commentId,
      templateId,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner>Loading...</Spinner>
      </div>
    );

  return (
    <div className="space-y-4 py-4">
      {user && (
        <div className="mb-6">
          {showNewCommentForm ? (
            <div className="rounded-lg border bg-gray-100/20 p-4 dark:bg-[#191a1b]">
              <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="mb-2 w-full rounded border p-3"
                rows={3}
                placeholder="Write your comment..."
              />
              <div className="flex justify-end gap-2">
                <Button
                  color="danger"
                  onPress={() => setShowNewCommentForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  onPress={handleAddComment}
                  disabled={!newCommentText.trim()}
                  color="primary"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowNewCommentForm(true)}
              className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            >
              + New Comment
            </button>
          )}
        </div>
      )}

      {data?.data.length === 0 ? (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        data?.data.map((comment) => (
          <div key={comment._id} className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <img
                src={comment.user.photo}
                alt={comment.user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{comment.user.name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                  {user?._id === comment.user._id && (
                    <div className="flex gap-2">
                      {editingCommentId === comment._id ? (
                        <>
                          <button
                            onClick={() => setEditingCommentId(null)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveEdit(comment._id)}
                            className="text-sm text-blue-500 hover:text-blue-700"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditClick(comment)}
                            className="text-sm text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(comment._id)}
                            className="text-sm text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {editingCommentId === comment._id ? (
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="mt-2 w-full rounded border p-2"
                    rows={3}
                  />
                ) : (
                  <p className="mt-2">{comment.text}</p>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
