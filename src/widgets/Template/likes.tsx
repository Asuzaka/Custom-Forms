import { Button } from "@heroui/react";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSocket } from "../../shared/hooks/socketContext";
import { useSelector } from "react-redux";
import type { TemplateObject } from "../../entities";
import type { RootState } from "../../store/store";

export function DescriptionLikes({
  newTemplate,
}: {
  newTemplate: TemplateObject;
}) {
  const [likes, setLikes] = useState(newTemplate.likes);
  const [isLiked, setIsLiked] = useState(false);
  const { socket, isConnected } = useSocket();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user && newTemplate.likedBy) {
      setIsLiked(newTemplate.likedBy.includes(user._id));
    }
  }, [user, newTemplate.likedBy]);

  useEffect(() => {
    setLikes(newTemplate.likes);
  }, [newTemplate.likes]);

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleLikeUpdate = (data: {
      templateId: string;
      likes: number;
      action: "increased" | "decreased";
      userId: string;
    }) => {
      if (data.templateId === newTemplate._id) {
        setLikes(data.likes);
        if (user && data.userId === user._id) {
          setIsLiked(data.action === "increased");
        }
      }
    };

    socket.on("template:liked", handleLikeUpdate);

    return () => {
      socket.off("template:liked", handleLikeUpdate);
    };
  }, [socket, isConnected, newTemplate._id, user]);

  const handleLike = () => {
    if (!socket || !user) return;

    if (isLiked) {
      socket.emit("template:unlike", newTemplate._id);
    } else {
      socket.emit("template:like", newTemplate._id);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        color={isLiked ? "primary" : "default"}
        onPress={handleLike}
        isDisabled={!user}
      >
        <ThumbsUp /> {likes} {likes === 1 ? "Like" : "Likes"}
      </Button>
    </div>
  );
}
