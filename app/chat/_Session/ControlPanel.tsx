import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { baseUrl } from "@/app/_utils/baseurl";
import showTost from "@/app/_helper/showToast";

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
          <Button color="danger" size="md" variant="light">
            退出群组
          </Button>
          <Button color="danger" size="md" variant="light">
            解散群组
          </Button>
        </>
      )}
    </span>
  );
}
