import showTost from "@/app/_helper/showToast";
interface JoinGroupProps {
  groupCode: string;
  userId: string;
  setActiveSession: (session: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  }) => void;
  onClose: () => void;
  setGroupCode: (groupCode: string) => void;
}
export default async function handleJoinGroup({
  groupCode,
  userId,
  setActiveSession,
  onClose,
  setGroupCode,
}: JoinGroupProps) {
  if (groupCode.trim() === "") {
    showTost({
      title: "加入群组",
      description: "群名称不能为空",
      color: "danger",
    });
    return;
  }
  // POST /api/groups/join
  try {
    const response = await fetch(`/api/groups/join`, {
      method: "POST",
      body: JSON.stringify({ userId: userId, name: groupCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      showTost({
        title: "加入群组",
        description: "加入群组失败",
        color: "danger",
      });
      setGroupCode("");
      return;
    }
    setGroupCode("");
    showTost({
      title: "加入群组",
      description: "加入群组成功",
      color: "success",
    });
    onClose();
    setActiveSession({
      id: "",
      username: groupCode,
      type: "group",
      groupId: "",
    });
  } catch (error) {
    console.error(error);
  }
}
