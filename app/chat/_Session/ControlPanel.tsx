import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { baseUrl } from "@/app/_utils/baseurl";
import showTost from "@/app/_helper/showToast";
import { useEffect, useState } from "react";

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
  async function handleDeleteFriend() {
    try {
      const response = await fetch(
        `${baseUrl}/api/friends?userId=${userId}&friendId=${activeSession.id}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        showTost({
          title: "删除好友",
          description: "删除好友失败",
          color: "danger",
        });
        throw new Error("删除好友失败");
      }
      showTost({
        title: "删除好友",
        description: "删除好友成功",
        color: "success",
      });
      setActiveSession({
        id: "",
        username: "未选择会话",
        type: "friend",
        groupId: "",
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function isOwner(userId: string, groupId: string) {
    // 后端没有提供相应的接口，群成员列表的第一个就是群主
    // 查询群成员列表
    const response = await fetch(`${baseUrl}/api/groups/${groupId}/members`);
    const data = await response.json();
    // 判断第一个成员是否是当前用户
    return data[0].id === userId;
  }
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
      {activeSession.type === "friend" && (
        <Popover showArrow={true} placement="left-start">
          <PopoverTrigger>
            <Button color="danger" size="md" variant="light">
              删除好友
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-50 items-start p-4">
            <p className="mb-3">确定删除好友吗？</p>
            <div className="flex w-full justify-end">
              <Button
                color="danger"
                size="sm"
                variant="solid"
                onPress={() => {
                  handleDeleteFriend();
                }}
              >
                确定
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
      {activeSession.type === "group" && (
        <>
          <Button color="default" size="md">
            邀请成员
          </Button>
          {isOwnerFlag ? (
            <Button color="danger" size="md" variant="light">
              解散群组
            </Button>
          ) : (
            <Button color="danger" size="md" variant="light">
              退出群组
            </Button>
          )}
        </>
      )}
    </span>
  );
}
