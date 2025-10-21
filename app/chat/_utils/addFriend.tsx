import showTost from "@/app/_helper/showToast";
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
  const targetUserId = await fetch(`/api/users/search?username=${friendUsername}`);
  const targetUserIdData = await targetUserId.json();
  if (targetUserIdData === null) {
    showTost({
      title: "添加好友",
      description: "好友用户不存在",
      color: "danger",
    });
    return;
  }
  try {
    const response = await fetch(`/api/friends`, {
      method: "POST",
      body: JSON.stringify({ userId: userId, friendId: targetUserIdData.id }),
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
      id: targetUserIdData.id,
      username: targetUserIdData.username,
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
