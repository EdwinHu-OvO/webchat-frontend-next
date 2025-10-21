import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@heroui/react";
import { useEffect, useState } from "react";
import isOwner from "../_utils/isOwner";
import handleDelete from "./handleDelete";
import handleInviteMember from "./handleInviteMember";

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
  const [isOwnerFlag, setIsOwnerFlag] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      if (activeSession.type === "group") {
        const isOwnerFlag = await isOwner(userId, activeSession.groupId);
        setIsOwnerFlag(isOwnerFlag);
      }
    })();
  }, [activeSession, userId]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [username, setUsername] = useState<string>("");
  return (
    <span className="ml-auto flex items-end gap-2">
      {activeSession.type === "group" && (
        <>
          <Button
            color="default"
            size="md"
            onPress={() => {
              onOpen();
            }}
          >
            邀请成员
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">邀请成员</ModalHeader>
                  <ModalBody>
                    <Input
                      label="用户名"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      取消
                    </Button>
                    <Button
                      color="primary"
                      onPress={() =>
                        handleInviteMember({ username, onClose, activeSession, setUsername })
                      }
                    >
                      邀请
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
      <Popover showArrow={true} placement="left-start">
        <PopoverTrigger>
          <Button color="danger" size="md" variant="light">
            {activeSession.type === "friend" && "删除好友"}
            {activeSession.type === "group" && isOwnerFlag && "解散群组"}
            {activeSession.type === "group" && !isOwnerFlag && "退出群组"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-50 items-start p-4">
          <p className="mb-3">
            {activeSession.type === "friend" && "确定删除好友吗？"}
            {activeSession.type === "group" && isOwnerFlag && "确定解散群组吗？"}
            {activeSession.type === "group" && !isOwnerFlag && "确定退出群组吗？"}
          </p>
          <div className="flex w-full justify-end">
            <Button
              color="danger"
              size="sm"
              variant="solid"
              onPress={() => {
                handleDelete({ activeSession, userId, isOwnerFlag, setActiveSession });
              }}
            >
              确定
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </span>
  );
}
