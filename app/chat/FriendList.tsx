"use client";
import { useState, useEffect } from "react";
import { baseUrl } from "@/app/_utils/baseurl";
import { User, Divider } from "@heroui/react";
import { cn } from "@/utils/cn";
import type { ChatSocket } from "./_types/ChatSocket";
interface FriendListProps {
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
interface Friend {
  friend: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  id: string;
}
export default function FriendList({
  userId,
  setActiveSession,
  activeSession,
  socket,
}: FriendListProps) {
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<string | null>(null);
  useEffect(() => {
    fetchFriendList();
    socket?.emit("leave_group", { groupId: activeSession.groupId });
    setActiveSession({ id: "", username: "未选择会话", type: null, groupId: "" });
  }, [userId]);
  useEffect(() => {
    if (activeSession.type === "friend") {
      fetchFriendList();
      setSelectedListItem(activeSession.id);
    }
  }, [activeSession]);
  async function fetchFriendList() {
    try {
      const response = await fetch(`${baseUrl}/api/users/${userId}/friends`);
      const data = await response.json();
      setFriendList(data);
    } catch (error) {
      console.error(error);
    }
  }
  return friendList.map((friend, index) => {
    return (
      <div key={friend.id} className="flex flex-col items-center px-2 first:mt-0 last:mb-0">
        <User
          avatarProps={{
            src: friend.friend.avatarUrl ? `${baseUrl}${friend.friend.avatarUrl}` : "",
            name: friend.friend.username,
          }}
          description={`UserId:${friend.friend.id}`}
          name={friend.friend.username}
          className={cn(
            "flex w-full justify-start rounded-xl p-3",
            selectedListItem === friend.friend.id && "bg-[#e5eef5cc]",
          )}
          onClick={() => {
            setSelectedListItem(friend.friend.id);
            setActiveSession({
              id: friend.friend.id,
              username: friend.friend.username,
              type: "friend",
              groupId: "",
            });
          }}
        />
        {index !== friendList.length - 1 && <Divider className="w-[95%]" />}
      </div>
    );
  });
}
