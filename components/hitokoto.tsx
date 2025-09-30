"use client";
import { useState, useEffect } from "react";

interface HitokotoProps {
  type: string[];
  max_length: number;
  min_length: number;
}

export default function Hitokoto({ type, max_length, min_length }: HitokotoProps) {
  const [text, setText] = useState<string>("");
  async function fetchHitokoto() {
    try {
      const response = await fetch(
        `https://v1.hitokoto.cn/?encode=json&${type.join("&")}&max_length=${max_length}&min_length=${min_length}`,
      );
      const data = await response.json();
      setText(data?.hitokoto ?? "");
    } catch (error: unknown) {
      if ((error as { name?: string } | null)?.name !== "AbortError") {
        console.error(error);
      }
    }
  }
  // useEffect防止重复请求
  useEffect(() => {
    fetchHitokoto();
  }, []);
  return <div>{text}</div>;
}
