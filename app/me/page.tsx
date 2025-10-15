"use client";
import { useLoginState } from "../_utils/storeuser";
import { useEffect } from "react";
import Hitokoto from "@/components/hitokoto";

export default function Me() {
  const { username, setLoginUsername } = useLoginState();
  if (username === "") {
    return (
      <div>
        请先登录<a href="/login">登录</a>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Me</h1>
      </div>
    );
  }
}
