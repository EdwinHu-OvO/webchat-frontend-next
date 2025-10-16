"use client";
import { Card, CardHeader } from "@heroui/card";
import { useState, useEffect, useRef } from "react";
import ChatInput from "./_Session/Input";
import MessageRow from "./_Session/MessageRow";
import isToday from "./_utils/isToday";
import withinHour from "./_utils/withinHour";
import { MessageRowProps } from "./_utils/fetchMessages";
import fetchMessages from "./_utils/fetchMessages";

interface ChatSessionProps {
  activeSessionName: string;
  activeSessionId: string;
  userId: string;
  activeSessionType: "friend" | "group" | null;
  activeSessionGroupId: string;
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
  useEffect(() => {
    fetchMessages({
      userId,
      activeSessionId,
      activeSessionType,
      activeSessionGroupId,
      setMessages,
    });
  }, [activeSessionId, activeSessionType, activeSessionGroupId]);
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
          <h1 className="text-2xl">{activeSessionName}</h1>
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
      {messages.map((message, index) => {
        if (index === 0) {
          const today = new Date().toISOString();
          const needDivder = !(isToday(message.createdAt) && withinHour(message.createdAt, today));
          return (
            <MessageRow key={message.id} {...message} userId={userId} needDivder={needDivder} />
          );
        } else {
          const t1 = message.createdAt;
          const t2 = messages[index - 1].createdAt;
          const needDivder = !withinHour(t1, t2);
          return (
            <MessageRow key={message.id} {...message} userId={userId} needDivder={needDivder} />
          );
        }
      })}
    </div>
  );
}
