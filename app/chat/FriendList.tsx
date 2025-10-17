"use client";
import { useState, useEffect, useRef } from "react";
import { baseUrl } from "@/app/_utils/baseurl";
import { User, Divider } from "@heroui/react";
import { cn } from "@/utils/cn";

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
}
interface Friend {
  friend: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  id: string;
}
export default function FriendList({ userId, setActiveSession, activeSession }: FriendListProps) {
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<string | null>(null);
  useEffect(() => {
    fetchFriendList();
    setActiveSession({ id: "", username: "未选择会话", type: null, groupId: "" });
  }, [userId]);
  useEffect(() => {
    if (activeSession.type === "friend") {
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
    if (index !== friendList.length - 1) {
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
              selectedListItem === friend.id && "bg-[#e5eef5cc]",
            )}
            onClick={() => {
              setSelectedListItem(friend.id);
              setActiveSession({
                id: friend.friend.id,
                username: friend.friend.username,
                type: "friend",
                groupId: "",
              });
            }}
          />
          <Divider className="w-[95%]" />
        </div>
      );
    } else {
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
              selectedListItem === friend.id && "bg-[#e5eef5cc]",
            )}
            onClick={() => {
              setSelectedListItem(friend.id);
              setActiveSession({
                id: friend.friend.id,
                username: friend.friend.username,
                type: "friend",
                groupId: "",
              });
            }}
          />
        </div>
      );
    }
  });
}
