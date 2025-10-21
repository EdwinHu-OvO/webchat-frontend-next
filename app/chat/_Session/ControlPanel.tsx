import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { useEffect, useState } from "react";
import isOwner from "../_utils/isOwner";
import handleDelete from "./handleDelete";

interface ControlPanelProps {
  activeSession: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  };
  setActiveSession: (session: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  }) => void;
  userId: string;
}
export default function ControlPanel({
  activeSession,
  userId,
  setActiveSession,
}: ControlPanelProps) {
  const [isOwnerFlag, setIsOwnerFlag] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (activeSession.type === "group") {
        const isOwnerFlag = await isOwner(userId, activeSession.groupId);
        setIsOwnerFlag(isOwnerFlag);
      }
    })();
  }, [activeSession, userId]);
  return (
    <span className="ml-auto flex items-end gap-2">
      {activeSession.type === "group" && (
        <Button
          color="default"
          size="md"
          onPress={() => {
            // handleInviteMember({ activeSession, userId, setActiveSession });
          }}
        >
          邀请成员
        </Button>
      )}
      <Popover showArrow={true} placement="left-start">
        <PopoverTrigger>
          <Button color="danger" size="md" variant="light">
            {activeSession.type === "friend" && "删除好友"}
            {activeSession.type === "group" && isOwnerFlag && "解散群组"}
            {activeSession.type === "group" && !isOwnerFlag && "退出群组"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-50 items-start p-4">
          <p className="mb-3">
            {activeSession.type === "friend" && "确定删除好友吗？"}
            {activeSession.type === "group" && isOwnerFlag && "确定解散群组吗？"}
            {activeSession.type === "group" && !isOwnerFlag && "确定退出群组吗？"}
          </p>
          <div className="flex w-full justify-end">
            <Button
              color="danger"
              size="sm"
              variant="solid"
              onPress={() => {
                handleDelete({ activeSession, userId, isOwnerFlag, setActiveSession });
              }}
            >
              确定
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </span>
  );
}
