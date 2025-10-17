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
interface CreateGroupProps {
  userId: string;
  setActiveSession: (session: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  }) => void;
}
export default function CreateGroup({ userId, setActiveSession }: CreateGroupProps) {
  const [groupName, setGroupName] = useState<string>("");
  async function handleCreateGroup(onClose: () => void) {
    if (groupName.trim() === "") {
      showTost({
        title: "创建群组",
        description: "群组名称不能为空",
        color: "danger",
      });
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/groups`, {
        method: "POST",
        body: JSON.stringify({ ownerId: userId, name: groupName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("创建群组失败");
      }
      const data = await response.json();
      setGroupName("");
      showTost({
        title: "创建群组",
        description: "创建群组成功",
        color: "success",
      });
      onClose();
      setActiveSession({
        id: "",
        username: "",
        type: "group",
        groupId: data.id,
      });
    } catch (error) {
      console.error(error);
      showTost({
        title: "创建群组",
        description: "创建群组失败",
        color: "danger",
      });
    }
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button size="sm" className="h-7" onPress={onOpen}>
        创建群组
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">创建群组</ModalHeader>
              <ModalBody>
                <Input
                  label="群组名称"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleCreateGroup(onClose)}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
