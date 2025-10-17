"use client";
import { useRef } from "react";
import { Textarea } from "@heroui/react";
import { Button } from "@heroui/button";
interface ChatInputProps {
  inputHeight: number;
  setInputHeight: (height: number) => void;
  activeSessionId: string;
}
export default function ChatInput({
  inputHeight,
  setInputHeight,
  activeSessionId,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="border-content3 absolute bottom-0 left-0 flex w-full items-start justify-start gap-2 border-1 bg-[#ffffffa6] p-3 shadow-md backdrop-blur-sm duration-800">
      <Textarea
        placeholder={activeSessionId === "" ? "请选择会话" : "输入消息(按Ctrl+Enter发送)"}
        disabled={activeSessionId === "" ? true : false}
        minRows={inputHeight}
        maxRows={10}
        className="ease-in-out"
        ref={textareaRef}
        onFocus={() => {
          setInputHeight(3);
        }}
        onBlur={() => {
          setInputHeight(1);
        }}
      />
      <Button
        color={activeSessionId === "" ? "default" : "primary"}
        size="sm"
        disabled={activeSessionId === "" ? true : false}
      >
        发送
      </Button>
    </div>
  );
}
