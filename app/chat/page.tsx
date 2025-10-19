"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { useLoginState } from "../_utils/storeuser";
import Hitokoto from "@/components/hitokoto";
import { useState, useEffect } from "react";
import FriendList from "./FriendList";
import fetchAvatar from "../_helper/fetchAvatar";
import { useRouter } from "next/navigation";
import _Hitokoto from "./Hitokoto";
import GroupList from "./GroupList";
import { Tabs, Tab } from "@heroui/tabs";
import ChatSession from "./ChatSession";
import UserInfo from "./UserInfo";
import CreateGroup from "./CreateGroup";
import { Button } from "@heroui/button";
import { ToastProvider } from "@heroui/toast";
import { ScrollShadow } from "@heroui/scroll-shadow";
import AddFriend from "./AddFriend";
import JoinGroup from "./JoinGroup";
import io from "socket.io-client";
import type { ChatSocket } from "./_types/ChatSocket";
import { socketUrl } from "@/app/_utils/baseurl";

export default function Chat() {
  const [_username, set_Username] = useState<string>("loading");
  const { username, userId } = useLoginState();
  const router = useRouter();
  const [socket, setSocket] = useState<ChatSocket | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [activeSession, setActiveSession] = useState<{
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  }>({
    id: "",
    username: "未选择会话",
    type: null,
    groupId: "",
  });
  useEffect(() => {
    set_Username(username);
    fetchAvatar({ username: username, setAvatarUrl });

    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      query: { userId: String(userId) },
    });

    const handleConnect = () => {
      setSocket(newSocket as unknown as ChatSocket);
    };

    const handleConnectError = (err: unknown) => {
      console.error("[socket] connect_error", err);
    };

    const handleDisconnect = (reason: unknown) => {
      console.warn("[socket] disconnected", reason);
      setSocket((prev: ChatSocket | null) =>
        prev === (newSocket as unknown as ChatSocket) ? null : prev,
      );
    };

    (newSocket as any).on("connect", handleConnect);
    (newSocket as any).on("connect_error", handleConnectError);
    (newSocket as any).on("disconnect", handleDisconnect);

    if ((newSocket as any).connected) {
      handleConnect();
    }

    return () => {
      (newSocket as any).off("connect", handleConnect);
      (newSocket as any).off("connect_error", handleConnectError);
      (newSocket as any).off("disconnect", handleDisconnect);
      try {
        (newSocket as any).close();
      } catch {}
    };
  }, [username, userId]);
  const hitokoto = Hitokoto({
    type: ["c", "d", "f", "h", "i", "j", "k"],
    max_length: 13,
    min_length: 10,
  });
  function logout() {
    localStorage.removeItem("webchat-login");
    socket?.disconnect?.();
    setSocket(null);
    router.push("/login");
  }
  return (
    <>
      <div className="fixed z-[100]">
        <ToastProvider placement={"top-center"} toastOffset={30} />
      </div>
      <div className="flex h-screen w-screen">
        {/* 左侧 */}
        <Card className="w-2/9 min-w-xs" shadow="none" radius="none">
          <CardHeader className="flex flex-col items-center justify-center pb-1">
            <UserInfo username={_username} avatarUrl={avatarUrl} />
            <div className="mt-2 flex gap-5">
              <CreateGroup userId={userId} setActiveSession={setActiveSession} />
              <Button
                color="danger"
                size="sm"
                onPress={() => {
                  logout();
                }}
                className="h-7"
              >
                退出登录
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <Tabs
              classNames={{
                tabList: "w-full rounded-lg p-0",
                cursor: "w-full bg-primary",
                tabContent: "group-data-[selected=true]:text-content1 text-[#3e3e3e]",
              }}
              className="justify-center px-1"
              color="primary"
            >
              <Tab key="friend" title="好友" className="pb-0">
                <div className="bg-content2 rounded-xl">
                  <AddFriend userId={userId} setActiveSession={setActiveSession} />
                  <ScrollShadow className="h-[calc(50.5vh)]">
                    <FriendList
                      userId={userId}
                      setActiveSession={setActiveSession}
                      activeSession={activeSession}
                    />
                  </ScrollShadow>
                </div>
              </Tab>
              <Tab key="group" title="群组" className="pb-0">
                <div className="bg-content2 rounded-xl">
                  <JoinGroup userId={userId} setActiveSession={setActiveSession} />
                  <ScrollShadow className="h-[calc(50.5vh)]">
                    <GroupList
                      userId={userId}
                      setActiveSession={setActiveSession}
                      activeSession={activeSession}
                    />
                  </ScrollShadow>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
          <CardFooter className="pt-0">
            <_Hitokoto hitokoto={hitokoto} />
          </CardFooter>
        </Card>
        {/* 右侧 */}
        <ChatSession
          socket={socket}
          activeSession={activeSession}
          setActiveSession={setActiveSession}
          userId={userId}
        />
      </div>
    </>
  );
}
