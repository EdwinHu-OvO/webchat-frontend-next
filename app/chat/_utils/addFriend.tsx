import showTost from "@/app/_helper/showToast";
import getIdByName from "../../_helper/getIdByName";
interface AddFriendProps {
  friendUsername: string;
  userId: string;
  setActiveSession: (session: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  }) => void;
  onClose: () => void;
  setFriendUsername: (friendUsername: string) => void;
}
export default async function handleAddFriend({
  friendUsername,
  userId,
  setActiveSession,
  onClose,
  setFriendUsername,
}: AddFriendProps) {
  if (friendUsername.trim() === "") {
    showTost({
      title: "添加好友",
      description: "好友用户名不能为空",
      color: "danger",
    });
    return;
  }
  const targetUserId = await getIdByName(friendUsername);
  if (targetUserId === null) {
    showTost({
      title: "添加好友",
      description: "好友用户不存在",
      color: "danger",
    });
    setFriendUsername("");
    return;
  }
  try {
    const response = await fetch(`/api/friends`, {
      method: "POST",
      body: JSON.stringify({ userId: userId, friendId: targetUserId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("添加好友失败");
    }
    setFriendUsername("");
    showTost({
      title: "添加好友",
      description: "添加好友成功",
      color: "success",
    });
    onClose();
    setActiveSession({
      id: targetUserId,
      username: friendUsername,
      type: "friend",
      groupId: "",
    });
  } catch (error) {
    console.error(error);
    showTost({
      title: "添加好友",
      description: "添加好友失败",
      color: "danger",
    });
  }
}
