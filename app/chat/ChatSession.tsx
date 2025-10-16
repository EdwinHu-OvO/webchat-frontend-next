"use client";
import { Card, CardHeader } from "@heroui/card";
import { useState, useEffect, useRef } from "react";
import ChatInput from "./_Session/Input";
import { baseUrl } from "@/app/_utils/baseurl";
import MessageRow from "./_Session/MessageRow";

interface ChatSessionProps {
  activeSessionName: string;
  activeSessionId: string;
  userId: string;
  activeSessionType: "friend" | "group" | null;
  activeSessionGroupId: string;
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

export default function ChatSession({
  activeSessionName,
  activeSessionId,
  activeSessionType,
  activeSessionGroupId,
  userId,
}: ChatSessionProps) {
  const [messages, setMessages] = useState<MessageRowProps[]>([]);
  const [inputHeight, setInputHeight] = useState<number>(1);
  async function fetchMessages(
    userId: string,
    activeSessionId: string,
    activeSessionType: "friend" | "group" | null,
    activeSessionGroupId: string,
  ) {
    try {
      console.log(activeSessionId, activeSessionType, activeSessionGroupId);
      if (activeSessionId === "" || activeSessionType === null) {
        return;
      } else if (activeSessionType === "friend") {
        const response = await fetch(
          `${baseUrl}/api/messages/private?userId=${userId}&peerId=${activeSessionId}`,
        );
        const data = await response.json();
        setMessages(data);
      } else if (activeSessionType === "group") {
        const response = await fetch(`${baseUrl}/api/messages/group/${activeSessionGroupId}`);
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchMessages(userId, activeSessionId, activeSessionType, activeSessionGroupId);
  }, [activeSessionId, userId, activeSessionType, activeSessionGroupId]);
  const messageArea = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageArea.current) {
      messageArea.current.scrollTop = messageArea.current.scrollHeight;
    }
  }, [messages]);
  return (
    <Card className="bg-content2 relative w-7/9 min-w-[500px]" shadow="none" radius="none">
      <div className="h-full overflow-y-auto scroll-smooth" ref={messageArea}>
        <CardHeader className="border-content3 sticky top-0 left-0 h-20 border-1 bg-[#ffffffa6] shadow-md backdrop-blur-sm">
          <h1>{activeSessionName}</h1>
        </CardHeader>
        <ChatMessages messages={messages} userId={userId} className="mb-20 px-5 pt-5" />
        <ChatInput
          inputHeight={inputHeight}
          setInputHeight={setInputHeight}
          activeSessionId={activeSessionId}
        />
      </div>
    </Card>
  );
}
function ChatMessages({
  messages,
  userId,
  className,
}: {
  messages: MessageRowProps[];
  userId: string;
  className: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {messages.map((message) => (
        <MessageRow key={message.id} {...message} userId={userId} />
      ))}
    </div>
  );
}
