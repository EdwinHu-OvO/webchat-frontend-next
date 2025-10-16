"use client";
import { useState, useEffect } from "react";
import { baseUrl } from "@/app/_utils/baseurl";
import { User, Divider } from "@heroui/react";
import { cn } from "@/utils/cn";
import fetchAvatar from "../_helper/fetchAvatar";

interface GroupListProps {
  userId: string;
  setActiveSession: (session: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  }) => void;
}
interface Group {
  id: string;
  name: string;
}
export default function GroupList({ userId, setActiveSession }: GroupListProps) {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [selectedListItem, setSelectedListItem] = useState<string | null>(null);
  useEffect(() => {
    fetchGroupList();
    setActiveSession({ id: "", username: "未选择会话", type: null, groupId: "" });
  }, [userId]);
  async function fetchGroupList() {
    try {
      const response = await fetch(`${baseUrl}/api/users/${userId}/groups`);
      const data = await response.json();
      setGroupList(data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      {groupList.map((group, index) => {
        if (index !== groupList.length - 1) {
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
                  setSelectedListItem(group.id);
                  setActiveSession({
                    id: group.id,
                    username: group.name,
                    type: "group",
                    groupId: group.id,
                  });
                }}
              />
              <Divider className="w-[95%]" />
            </div>
          );
        } else {
          return (
            <div key={group.id} className="flex flex-col items-center px-2 first:mt-0 last:mb-0">
              <User
                description={`GroupId:${group.id}`}
                name={group.name}
                className={cn(
                  "flex w-full justify-start rounded-xl p-3",
                  selectedListItem === group.id && "bg-[#e5eef5cc]",
                )}
                onClick={() => {
                  setSelectedListItem(group.id);
                  setActiveSession({
                    id: group.id,
                    username: group.name,
                    type: "group",
                    groupId: group.id,
                  });
                }}
              />
            </div>
          );
        }
      })}
    </div>
  );
}
