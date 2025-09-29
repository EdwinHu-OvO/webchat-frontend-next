"use client";
import { useLoginState } from "../_utils/storeuser";
import { useEffect } from "react";

export default function Me() {
  const { username, setUsername } = useLoginState();
  if (username === "") {
    return (
      <div>
        请先登录<a href="/login">登录</a>
      </div>
    );
  }

  return <div>Me</div>;
}
