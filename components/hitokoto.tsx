"use client";
import { useState, useEffect } from "react";

interface HitokotoProps {
  type: string[];
  max_length: number;
  min_length: number;
}
export type Hitokoto = {
  from: string;
  from_who: string;
  hitokoto: string;
};

export default function Hitokoto({ type, max_length, min_length }: HitokotoProps): Hitokoto {
  const [hitokoto, setHitokoto] = useState<Hitokoto>({
    from: "loading",
    from_who: "loading",
    hitokoto: "loading",
  });
  async function fetchHitokoto() {
    try {
      const response = await fetch(
        `https://v1.hitokoto.cn/?encode=json&${type.join("&")}&max_length=${max_length}&min_length=${min_length}`,
      );
      const { from, from_who, hitokoto } = await response.json();
      setHitokoto({ from, from_who, hitokoto });
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
  return hitokoto;
}
