import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import showTost from "@/app/_helper/showToast";
import { useState } from "react";
import { baseUrl } from "../_utils/baseurl";
interface AddFriendProps {
  userId: string;
  setActiveSession: (session: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  }) => void;
}
export default function AddFriend({ userId, setActiveSession }: AddFriendProps) {
  const [friendUsername, setFriendUsername] = useState<string>("");
  async function handleCreateGroup(onClose: () => void) {
    if (friendUsername.trim() === "") {
      showTost({
        title: "添加好友",
        description: "好友用户名不能为空",
        color: "danger",
      });
      return;
    }
    const targetUserId = await fetch(`${baseUrl}/api/users/search?username=${friendUsername}`);
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
      const response = await fetch(`${baseUrl}/api/friends`, {
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="flex justify-center py-2">
        <Button className="h-7 w-[80%]" radius="sm" color="primary" onPress={onOpen}>
          添加好友
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">添加好友</ModalHeader>
              <ModalBody>
                <Input
                  label="好友用户名"
                  value={friendUsername}
                  onChange={(e) => setFriendUsername(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="primary" onPress={() => handleCreateGroup(onClose)}>
                  添加
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
