"use client";
import { useState, useEffect } from "react";
import { User, Divider } from "@heroui/react";
import { cn } from "@/utils/cn";
import type { ChatSocket } from "./_types/ChatSocket";
interface GroupListProps {
  userId: string;
  setActiveSession: (session: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  }) => void;
  activeSession: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  };
  socket: ChatSocket | null;
}
interface Group {
  id: string;
  name: string;
}
export default function GroupList({
  userId,
  setActiveSession,
  activeSession,
  socket,
}: GroupListProps) {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<string | null>(null);
  useEffect(() => {
    fetchGroupList();
    setActiveSession({ id: "", username: "未选择会话", type: null, groupId: "" });
  }, [userId]);
  useEffect(() => {
    if (activeSession.type === "group") {
      fetchGroupList();
      setSelectedListItem(activeSession.groupId);
      socket?.emit("join_group", { groupId: activeSession.groupId });
    }
  }, [activeSession]);
  async function fetchGroupList() {
    try {
      const response = await fetch(`/api/users/${userId}/groups`);
      const data = await response.json();
      setGroupList(data);
    } catch (error) {
      console.error(error);
    }
  }
  return groupList.map((group, index) => {
    return (
      <div key={group.id} className="flex flex-col items-center px-2 first:mt-0 last:mb-0">
        <User
          description={`GroupId:${group.id}`}
          name={group.name}
          className={cn(
            "flex w-full justify-start rounded-xl p-3",
            selectedListItem === group.id && "bg-[#e5eef5cc]",
          )}
          avatarProps={{
            src: "",
            name: group.name,
          }}
          onClick={() => {
            socket?.emit("leave_group", { groupId: activeSession.groupId });
            setSelectedListItem(group.id);
            setActiveSession({
              id: group.id,
              username: group.name,
              type: "group",
              groupId: group.id,
            });
          }}
        />
        {index !== groupList.length - 1 && <Divider className="w-[95%]" />}
      </div>
    );
  });
}
