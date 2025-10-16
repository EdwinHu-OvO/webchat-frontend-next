"use client";
import { Card, CardHeader } from "@heroui/card";
import { Button, Textarea } from "@heroui/react";
import { useState, useEffect, useRef } from "react";
import { Avatar } from "@heroui/avatar";
import ChatInput from "./_Session/Input";
interface ChatSessionProps {
  activeSession: string;
  userId: string;
}
interface MessageRowProps {
  id: number;
  sender: {
    id: string;
    username: string;
    password: string;
  };
  receiver: {
    id: string;
    username: string;
    password: string;
  };
  group: null;
  content: string;
  createdAt: string;
}
export default function ChatSession({ activeSession, userId }: ChatSessionProps) {
  const [messages, setMessages] = useState<MessageRowProps[]>([]);
  const [inputHeight, setInputHeight] = useState<number>(1);
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: {
          id: "1",
          username: "user1",
          password: "pass1",
        },
        receiver: {
          id: "2",
          username: "user2",
          password: "pass2",
        },
        group: null,
        content: "你好！",
        createdAt: "2025-01-01T10:00:00Z",
      },
      {
        id: 2,
        sender: {
          id: "2",
          username: "user2",
          password: "pass2",
        },
        receiver: {
          id: "2",
          username: "user1",
          password: "pass1",
        },
        group: null,
        content: "你好，很高兴认识你！",
        createdAt: "2025-01-01T10:01:00Z",
      },
    ]);
  }, []);
  return (
    <Card className="bg-content2 relative w-7/9 min-w-[500px]" shadow="none" radius="none">
      <div className="h-full overflow-y-auto">
        <CardHeader className="border-content3 sticky top-0 left-0 h-20 border-1 bg-[#ffffffa6] shadow-md backdrop-blur-sm">
          <h1>{userId}</h1>
        </CardHeader>
        <ChatMessages messages={messages} userId={userId} />
        <ChatInput inputHeight={inputHeight} setInputHeight={setInputHeight} />
      </div>
    </Card>
  );
}
function MessageRow({ content, sender, createdAt, userId }: MessageRowProps & { userId: string }) {
  const isSelf: boolean = Number(sender.id) === Number(userId);
  if (isSelf) {
    return (
      <div className="flex w-full justify-end">
        <div className="flex flex-col items-end gap-2">
          <h2>{sender.username}</h2>
          {/* bubble */}
          <div className="flex flex-row gap-2">
            <p className={`${isSelf ? "bg-primary" : "bg-content1"} h-fit w-fit rounded-lg p-2`}>
              {content}
            </p>
            <Avatar size="sm" name={sender.username} />
          </div>
          <p>{createdAt}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full justify-start">
        <div className="flex flex-col gap-2">
          <h2>{sender.username}</h2>
          {/* bubble */}
          <div className="flex flex-row gap-2">
            <Avatar size="sm" name={sender.username} />
            <p className={`${isSelf ? "bg-primary" : "bg-content1"} h-fit w-fit rounded-lg p-2`}>
              {content}
            </p>
          </div>
          <p>{createdAt}</p>
        </div>
      </div>
    );
  }
}
function ChatMessages({ messages, userId }: { messages: MessageRowProps[]; userId: string }) {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((message) => (
        <MessageRow key={message.id} {...message} userId={userId} />
      ))}
    </div>
  );
}
