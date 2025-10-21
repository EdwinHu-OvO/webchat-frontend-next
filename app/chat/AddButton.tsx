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
import { useState } from "react";
import handleJoinGroup from "./_utils/joinGroup";
import handleAddFriend from "./_utils/addFriend";
interface AddButtonProps {
  type: "friend" | "group";
  userId: string;
  setActiveSession: (session: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  }) => void;
}
export default function AddButton({ type, userId, setActiveSession }: AddButtonProps) {
  const [name, setName] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="flex justify-center py-2">
        <Button className="h-7 w-[80%]" radius="sm" color="primary" onPress={onOpen}>
          {type === "friend" ? "添加好友" : "加入群组"}
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {type === "friend" ? "添加好友" : "加入群组"}
              </ModalHeader>
              <ModalBody>
                <Input
                  label={type === "friend" ? "好友用户名" : "群组名称"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (type === "friend") {
                      handleAddFriend({
                        friendUsername: name,
                        userId,
                        setActiveSession,
                        onClose,
                        setFriendUsername: setName,
                      });
                    } else {
                      handleJoinGroup({
                        groupCode: name,
                        userId,
                        setActiveSession,
                        onClose,
                        setGroupCode: setName,
                      });
                    }
                  }}
                >
                  {type === "friend" ? "添加" : "加入"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
