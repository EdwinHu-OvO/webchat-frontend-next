"use client";
import { useState, useEffect } from "react";
import { baseUrl } from "@/app/_utils/baseurl";
import { User, Divider } from "@heroui/react";

interface GroupListProps {
  userId: string;
}
interface Group {
  id: string;
  name: string;
}
export default function GroupList({ userId }: GroupListProps) {
  const [groupList, setGroupList] = useState<Group[]>([]);
  useEffect(() => {
    fetchGroupList();
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
                description={`id:${group.id}`}
                name={group.name}
                className="flex w-full justify-start rounded-xl p-3 active:bg-[#e5eef5cc]"
              />
              <Divider className="w-[95%]" />
            </div>
          );
        } else {
          return (
            <div key={group.id} className="flex flex-col items-center px-2 first:mt-0 last:mb-0">
              <User
                description={`id:${group.id}`}
                name={group.name}
                className="flex w-full justify-start rounded-xl p-3 active:bg-[#e5eef5cc]"
              />
            </div>
          );
        }
      })}
    </div>
  );
}
