"use client";
import { useState, useEffect } from "react";
import { baseUrl } from "@/app/_utils/baseurl";

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
      console.log(data);
      setFriendList(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <ul>
        {friendList.map((friend) => (
          <li key={friend.id}>{friend.friend.username}</li>
        ))}
      </ul>
    </div>
  );
}
