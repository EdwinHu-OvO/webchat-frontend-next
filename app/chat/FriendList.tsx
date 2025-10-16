"use client";
import { useState, useEffect } from "react";
import { baseUrl } from "@/app/_utils/baseurl";
import { User, Divider } from "@heroui/react";

interface FriendListProps {
  userId: string;
}
interface Friend {
  friend: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  id: string;
}
export default function FriendList({ userId }: FriendListProps) {
  const [friendList, setFriendList] = useState<Friend[]>([]);
  useEffect(() => {
    fetchFriendList();
  }, [userId]);
  async function fetchFriendList() {
    try {
      const response = await fetch(`${baseUrl}/api/users/${userId}/friends`);
      const data = await response.json();
      setFriendList(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="py-2">
      {friendList.map((friend, index) => {
        if (index !== friendList.length - 1) {
          return (
            <div key={friend.id} className="flex flex-col items-center px-2 first:mt-0 last:mb-0">
              <User
                avatarProps={{
                  src: friend.friend.avatarUrl,
                  name: friend.friend.username,
                }}
                description={`id:${friend.id}`}
                name={friend.friend.username}
                className="flex w-full justify-start rounded-xl p-3 active:bg-[#e5eef5cc]"
              />
              <Divider className="w-[95%]" />
            </div>
          );
        } else {
          return (
            <div key={friend.id} className="flex flex-col items-center px-2 first:mt-0 last:mb-0">
              <User
                avatarProps={{
                  src: friend.friend.avatarUrl,
                  name: friend.friend.username,
                }}
                description={`id:${friend.id}`}
                name={friend.friend.username}
                className="flex w-full justify-start rounded-xl p-3 active:bg-[#e5eef5cc]"
              />
            </div>
          );
        }
      })}
    </div>
  );
}
