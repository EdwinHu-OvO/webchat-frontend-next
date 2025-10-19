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
interface JoinGroupProps {
  userId: string;
  setActiveSession: (session: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  }) => void;
}
export default function JoinGroup({ userId, setActiveSession }: JoinGroupProps) {
  const [groupCode, setGroupCode] = useState<string>("");
  async function handleJoinGroup(onClose: () => void) {
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
      const response = await fetch(`${baseUrl}/api/groups/join`, {
        method: "POST",
        body: JSON.stringify({ userId: userId, name: groupCode }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("加入群组失败");
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="flex justify-center py-2">
        <Button className="h-7 w-[80%]" radius="sm" color="primary" onPress={onOpen}>
          加入群组
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">加入群组</ModalHeader>
              <ModalBody>
                <Input
                  label="群组名称"
                  value={groupCode}
                  onChange={(e) => setGroupCode(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="primary" onPress={() => handleJoinGroup(onClose)}>
                  加入
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
