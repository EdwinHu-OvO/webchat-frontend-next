"use client";
import { useRef, useState } from "react";
import { Textarea } from "@heroui/react";
import { Button } from "@heroui/button";
import type { ChatSocket } from "../_types/ChatSocket";
import showTost from "@/app/_helper/showToast";
import fetchMessages from "../_utils/fetchMessages";
import { MessageRowProps } from "../_utils/fetchMessages";
interface ChatInputProps {
  inputHeight: number;
  setInputHeight: (height: number) => void;
  setMessages: (messages: MessageRowProps[]) => void;
  activeSession: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  };
  userId: string;
  socket: ChatSocket | null;
}

export default function ChatInput({
  userId,
  inputHeight,
  setInputHeight,
  activeSession,
  socket,
  setMessages,
}: ChatInputProps) {
  const [message, setMessage] = useState<string>("");
  const handleSend = () => {
    if (!socket || !socket.connected) {
      showTost({
        title: "消息发送",
        description: "未连接到服务器，请稍后重试",
        color: "danger",
      });
      return;
    }
    if (message.trim() === "") {
      showTost({
        title: "消息发送",
        description: "消息不能为空",
        color: "danger",
      });
      setMessage("");
      return;
    }

    const content = message;
    if (activeSession.type === "friend") {
      const payload = {
        senderId: userId,
        receiverId: activeSession.id,
        content,
      };
      try {
        socket.emit("private_message", payload, (ack?: { ok?: boolean; error?: string }) => {
          if (ack && ack.ok) {
          } else if (ack && ack.error) {
            showTost({ title: "消息发送", description: ack.error, color: "danger" });
          }
        });
        setTimeout(() => {
          fetchMessages({ userId, activeSession, setMessages });
          setMessage("");
        }, 300);
      } catch (e) {
        console.error(e);
        showTost({ title: "消息发送", description: "发送失败", color: "danger" });
      }
    } else if (activeSession.type === "group") {
      const payload = {
        senderId: userId,
        groupId: activeSession.groupId,
        content,
      };
      try {
        socket.emit("group_message", payload, (ack?: { ok?: boolean; error?: string }) => {
          if (ack && ack.ok) {
          } else if (ack && ack.error) {
            showTost({ title: "消息发送", description: ack.error, color: "danger" });
          }
        });
        setTimeout(() => {
          fetchMessages({ userId, activeSession, setMessages });
          setMessage("");
        }, 300);
      } catch (e) {
        console.error(e);
        showTost({ title: "消息发送", description: "发送失败", color: "danger" });
      }
    }
  };
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="border-content3 absolute bottom-0 left-0 flex w-full items-start justify-start gap-2 border-1 bg-[#ffffffa6] p-3 shadow-md backdrop-blur-sm duration-800">
      <Textarea
        placeholder={activeSession.id === "" ? "请选择会话" : "输入消息(按Ctrl+Enter发送)"}
        disabled={activeSession.id === "" ? true : false}
        minRows={inputHeight}
        maxRows={10}
        className="ease-in-out"
        ref={textareaRef}
        onFocus={() => {
          setInputHeight(3);
        }}
        onBlur={() => {
          // 延迟收缩，避免点击发送按钮时布局立即变化导致首次点击失效
          setTimeout(() => {
            if (document.activeElement !== textareaRef.current) {
              setInputHeight(1);
            }
          }, 100);
        }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.ctrlKey) {
            handleSend();
            setInputHeight(1);
          }
        }}
      />
      <Button
        color={activeSession.id === "" ? "default" : "primary"}
        size="sm"
        disabled={activeSession.id === "" ? true : false}
        className="h-[2.5rem]"
        onPress={() => {
          handleSend();
        }}
      >
        发送
      </Button>
    </div>
  );
}
