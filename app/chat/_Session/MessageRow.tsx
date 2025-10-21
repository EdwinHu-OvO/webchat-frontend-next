import { Avatar } from "@heroui/avatar";
import { useState, useEffect } from "react";
import fetchAvatar from "@/app/_helper/fetchAvatar";

interface MessageRowProps {
  id: number;
  sender: {
    id: string;
    username: string;
  };
  receiver: {
    id: string;
    username: string;
  };
  content: string;
  createdAt: string;
  userId: string;
  needDivder: boolean;
}
export default function MessageRow({
  content,
  sender,
  createdAt,
  userId,
  needDivder,
}: MessageRowProps) {
  const isSelf: boolean = Number(sender.id) === Number(userId);
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleTimeString().slice(0, 5);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  useEffect(() => {
    fetchAvatar({ username: sender.username, setAvatarUrl });
  }, [sender.username]);
  return (
    <div>
      {needDivder ? (
        <div className="flex w-full items-center gap-2 px-2 py-2">
          <div className="bg-content3 h-[1px] w-full" />
          <span className="shrink-0">{`${date.toLocaleDateString().replace(/\//g, "-")} ${date.toLocaleTimeString().slice(0, 5)}`}</span>
          <div className="bg-content3 h-[1px] w-full" />
        </div>
      ) : null}
      <div className={`flex w-full ${isSelf ? "justify-end" : "justify-start"}`}>
        <div className={`flex flex-col ${isSelf ? "items-end" : "items-start"} gap-1`}>
          <h2 className={`${isSelf ? "mr-11" : "ml-11"} text-sm`}>{sender.username}</h2>
          <div className={`flex ${isSelf ? "flex-row" : "flex-row-reverse"} gap-2`}>
            <p
              className={`${isSelf ? "bg-primary" : "bg-content1"} h-fit w-fit rounded-lg p-2 whitespace-pre-wrap`}
            >
              {content}
            </p>
            <Avatar size="sm" name={sender.username} src={avatarUrl} />
          </div>
          <p className={`${isSelf ? "mr-11" : "ml-11"} text-sm text-gray-400`}>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
