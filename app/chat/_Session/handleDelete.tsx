import showTost from "@/app/_helper/showToast";
interface HandleDeleteProps {
  activeSession: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  };
  userId: string;
  isOwnerFlag: boolean;
  setActiveSession: (session: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  }) => void;
}
export default async function handleDelete({
  activeSession,
  userId,
  isOwnerFlag,
  setActiveSession,
}: HandleDeleteProps) {
  try {
    let response: Response | null = null;
    if (activeSession.type === "friend") {
      // 删除好友
      response = await fetch(`/api/friends?userId=${userId}&friendId=${activeSession.id}`, {
        method: "DELETE",
      });
    } else if (activeSession.type === "group" && isOwnerFlag) {
      // 解散群组
      response = await fetch(`/api/groups/${activeSession.groupId}?operatorId=${userId}`, {
        method: "DELETE",
      });
    } else if (activeSession.type === "group" && !isOwnerFlag) {
      // 退出群组
      response = await fetch(`/api/groups/${activeSession.groupId}/members/${userId}`, {
        method: "DELETE",
      });
    }
    if (!response || !response.ok) {
      showTost({
        title:
          activeSession.type === "friend"
            ? "删除好友"
            : activeSession.type === "group" && isOwnerFlag
              ? "解散群组"
              : "退出群组",
        description:
          activeSession.type === "friend"
            ? "删除好友失败"
            : activeSession.type === "group" && isOwnerFlag
              ? "解散群组失败"
              : "退出群组失败",
        color: "danger",
      });
      throw new Error("操作失败");
    }
    showTost({
      title:
        activeSession.type === "friend"
          ? "删除好友"
          : activeSession.type === "group" && isOwnerFlag
            ? "解散群组"
            : "退出群组",
      description:
        activeSession.type === "friend"
          ? "删除好友成功"
          : activeSession.type === "group" && isOwnerFlag
            ? "解散群组成功"
            : "退出群组成功",
      color: "success",
    });
    setActiveSession({
      id: "",
      username: "未选择会话",
      type:
        activeSession.type === "friend"
          ? "friend"
          : activeSession.type === "group" && isOwnerFlag
            ? "group"
            : "group",
      groupId: "",
    });
  } catch (error) {
    console.error(error);
  }
}
