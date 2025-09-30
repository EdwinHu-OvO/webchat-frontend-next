"use client";
import { useLoginState } from "../_utils/storeuser";
import { useEffect } from "react";
import Hitokoto from "@/components/hitokoto";

export default function Me() {
  const { username, setUsername } = useLoginState();
  if (username === "") {
    return (
      <div>
        <Hitokoto type={["c", "i", "t"]} max_length={8} min_length={3} />
        请先登录<a href="/login">登录</a>
      </div>
    );
  }
}
