import getIdByName from "../../_helper/getIdByName";
import showTost from "@/app/_helper/showToast";
interface HandleInviteMemberProps {
  username: string;
  onClose: () => void;
  activeSession: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  };
  setUsername: (username: string) => void;
}
export default async function handleInviteMember({
  username,
  onClose,
  activeSession,
  setUsername,
}: HandleInviteMemberProps) {
  const targetUserId = await getIdByName(username);
  if (targetUserId === null) {
    showTost({
      title: "邀请成员",
      description: "用户不存在",
      color: "danger",
    });
    setUsername("");
    return;
  }
  const response = await fetch(`/api/groups/${activeSession.groupId}/members/${targetUserId}`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("邀请成员失败");
  }
  showTost({
    title: "邀请成员",
    description: "邀请成员成功",
    color: "success",
  });
  onClose();
  setUsername("");
}
