import { Avatar } from "@heroui/avatar";
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
}
export default function MessageRow({ content, sender, createdAt, userId }: MessageRowProps) {
  const isSelf: boolean = Number(sender.id) === Number(userId);
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleTimeString();

  if (isSelf) {
    return (
      <div className="flex w-full justify-end">
        <div className="flex flex-col items-end gap-1">
          <h2 className="mr-11 text-sm">{sender.username}</h2>
          {/* bubble */}
          <div className="flex flex-row gap-2">
            <p className={`${isSelf ? "bg-primary" : "bg-content1"} h-fit w-fit rounded-lg p-2`}>
              {content}
            </p>
            <Avatar size="sm" name={sender.username} />
          </div>
          <p className="mr-11 text-sm text-gray-400">{formattedDate}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full justify-start">
        <div className="flex flex-col gap-1">
          <h2 className="ml-11 text-sm">{sender.username}</h2>
          {/* bubble */}
          <div className="flex flex-row gap-2">
            <Avatar size="sm" name={sender.username} />
            <p className={`${isSelf ? "bg-primary" : "bg-content1"} h-fit w-fit rounded-lg p-2`}>
              {content}
            </p>
          </div>
          <p className="ml-11 text-sm text-gray-400">{formattedDate}</p>
        </div>
      </div>
    );
  }
}
