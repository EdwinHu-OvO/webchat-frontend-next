"use client";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { baseUrl } from "../_utils/baseurl";
import { useLoginState } from "../_utils/storeuser";
import { Avatar } from "@heroui/avatar";
import Hitokoto from "@/components/hitokoto";
import { useState, useEffect } from "react";
import FriendList from "./FriendList";
import fetchAvatar from "../_helper/fetchAvatar";
import { useRouter } from "next/navigation";
import _Hitokoto from "./Hitokoto";
import getUserIdbyname from "../_utils/getUserIdbyname";

function Chat() {
  const router = useRouter();
  const [_username, set_Username] = useState<string>("loading");
  const { username } = useLoginState();
  // const userId = getUserIdbyname(username);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  useEffect(() => {
    set_Username(username);
    fetchAvatar({ username: username, setAvatarUrl });
  }, [username]);
  const hitokoto = Hitokoto({
    type: ["c", "d", "f", "h", "i", "j", "k"],
    max_length: 13,
    min_length: 10,
  });
  return (
    <div className="flex h-screen w-screen">
      {/* 左侧 */}
      <Card className="w-2/9 min-w-xs" shadow="none" radius="none">
        <CardHeader className="flex flex-col items-center justify-center">
          <_Hitokoto hitokoto={hitokoto} />
          <div className="mt-4 mb-1">
            <Avatar size="lg" showFallback={true} src={avatarUrl} className="h-20 w-20" />
          </div>
          <h1 className="text-xl" onClick={() => router.push("/me")}>
            {_username}
          </h1>
        </CardHeader>
        <CardBody>
          <FriendList userId={"1"} />
        </CardBody>
      </Card>
      {/* 右侧 */}
      <Card className="bg-content2 w-7/9 min-w-[500px]" shadow="none" radius="none">
        <CardHeader>
          <h1>Chat</h1>
        </CardHeader>
      </Card>
    </div>
  );
}

export default Chat;
