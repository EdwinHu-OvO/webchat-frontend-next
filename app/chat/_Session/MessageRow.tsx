import { Avatar } from "@heroui/avatar";
import { useState, useEffect } from "react";
import fetchAvatar from "@/app/_helper/fetchAvatar";
interface MessageRowProps {
  id: number;
  sender: {
    id: string;
    username: string;
    password: string;
  };
  receiver: {
    id: string;
    username: string;
    password: string;
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
  if (isSelf) {
    return (
      <div>
        {needDivder ? (
          <div className="flex w-full items-center gap-2 px-2 py-2">
            <div className="bg-content3 h-[1px] w-full" />
            <span className="shrink-0">{`${date.toLocaleDateString().replace(/\//g, "-")} ${date.toLocaleTimeString().slice(0, 5)}`}</span>
            <div className="bg-content3 h-[1px] w-full" />
          </div>
        ) : null}
        <div className="flex w-full justify-end">
          <div className="flex flex-col items-end gap-1">
            <h2 className="mr-11 text-sm">{sender.username}</h2>
            {/* bubble */}
            <div className="flex flex-row gap-2">
              <p className={`${isSelf ? "bg-primary" : "bg-content1"} h-fit w-fit rounded-lg p-2`}>
                {content}
              </p>
              <Avatar size="sm" name={sender.username} src={avatarUrl} />
            </div>
            <p className="mr-11 text-sm text-gray-400">{formattedDate}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {needDivder ? (
          <div className="flex w-full items-center gap-2 px-2 py-2">
            <div className="bg-content3 h-[1px] w-full" />
            <span className="shrink-0">{`${date.toLocaleDateString().replace(/\//g, "-")} ${date.toLocaleTimeString().slice(0, 5)}`}</span>
            <div className="bg-content3 h-[1px] w-full" />
          </div>
        ) : null}
        <div className="flex w-full justify-start">
          <div className="flex flex-col gap-1">
            <h2 className="ml-11 text-sm">{sender.username}</h2>
            {/* bubble */}
            <div className="flex flex-row gap-2">
              <Avatar size="sm" name={sender.username} src={avatarUrl} />
              <p className={`${isSelf ? "bg-primary" : "bg-content1"} h-fit w-fit rounded-lg p-2`}>
                {content}
              </p>
            </div>
            <p className="ml-11 text-sm text-gray-400">{formattedDate}</p>
          </div>
        </div>
      </div>
    );
  }
}
