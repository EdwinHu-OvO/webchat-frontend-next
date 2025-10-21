"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tabs,
  Tab,
  Button,
  ToastProvider,
  ScrollShadow,
} from "@heroui/react";
import { useLoginState } from "../_utils/storeuser";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import fetchAvatar from "../_helper/fetchAvatar";
import _Hitokoto from "./Hitokoto";
import fetchMessages, { MessageRowProps } from "./_utils/fetchMessages";
import Hitokoto from "@/components/hitokoto";
import FriendList from "./FriendList";
import GroupList from "./GroupList";
import ChatSession from "./ChatSession";
import UserInfo from "./UserInfo";
import CreateGroup from "./CreateGroup";
import AddButton from "./AddButton";
import io from "socket.io-client";
import type { ChatSocket } from "./_types/ChatSocket";
import { socketUrl } from "@/app/_utils/baseurl";

export default function Chat() {
  const [_username, set_Username] = useState<string>("loading");
  const { username, userId } = useLoginState();
  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageRowProps[]>([]);

  // 监听 zustand 持久化水合完成
  useEffect(() => {
    const persistApi = useLoginState?.persist;
    const unsub = persistApi?.onFinishHydration?.(() => setHasHydrated(true));
    setHasHydrated(persistApi?.hasHydrated?.() ?? false);
    return () => {
      unsub?.();
    };
  }, []);

  // 路由跳转需放入副作用，避免在渲染期间更新 Router
  useEffect(() => {
    if (!hasHydrated) return;
    if (!username) {
      router.replace("/login");
    }
  }, [hasHydrated, username, router]);
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

  // 保存最新的会话，供 socket 回调访问，避免因闭包导致读取到旧值
  const activeSessionRef = useRef(activeSession);
  useEffect(() => {
    activeSessionRef.current = activeSession;
  }, [activeSession]);

  useEffect(() => {
    if (!hasHydrated) return;
    if (!username || !userId) return;
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
    const handlePrivateMessage = (data: {
      senderId: number;
      receiverId: number;
      content: string;
    }) => {
      const current = activeSessionRef.current;
      if (current.type !== "friend") return;
      if (data.receiverId === Number(userId) && data.senderId === Number(current.id)) {
        fetchMessages({ userId, activeSession: current, setMessages });
      }
    };
    const handleGroupMessage = (data: { senderId: number; groupId: number; content: string }) => {
      const current = activeSessionRef.current;
      if (current.type !== "group") return;
      if (data.groupId === Number(current.groupId) && data.senderId !== Number(userId)) {
        fetchMessages({ userId, activeSession: current, setMessages });
      }
    };

    (newSocket as unknown as ChatSocket).on("connect", handleConnect);
    (newSocket as unknown as ChatSocket).on("connect_error", handleConnectError);
    (newSocket as unknown as ChatSocket).on("disconnect", handleDisconnect);
    (newSocket as unknown as ChatSocket).on("private_message", handlePrivateMessage);
    (newSocket as unknown as ChatSocket).on("group_message", handleGroupMessage);
    if ((newSocket as unknown as ChatSocket).connected) {
      handleConnect();
    }
    return () => {
      (newSocket as unknown as ChatSocket).off("connect", handleConnect);
      (newSocket as unknown as ChatSocket).off("connect_error", handleConnectError);
      (newSocket as unknown as ChatSocket).off("disconnect", handleDisconnect);
      (newSocket as unknown as ChatSocket).off("private_message", handlePrivateMessage);
      (newSocket as unknown as ChatSocket).off("group_message", handleGroupMessage);
      try {
        (newSocket as unknown as ChatSocket).close();
      } catch {}
    };
  }, [hasHydrated, username, userId]);
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
              className="justify-center px-1 pb-3"
              color="primary"
            >
              <Tab key="friend" title="好友" className="p-0">
                <div className="bg-content2 rounded-xl">
                  <AddButton type="friend" userId={userId} setActiveSession={setActiveSession} />
                  <ScrollShadow className="h-[calc(50.5vh)]">
                    <FriendList
                      userId={userId}
                      setActiveSession={setActiveSession}
                      activeSession={activeSession}
                      socket={socket}
                    />
                  </ScrollShadow>
                </div>
              </Tab>
              <Tab key="group" title="群组" className="p-0">
                <div className="bg-content2 rounded-xl">
                  <AddButton type="group" userId={userId} setActiveSession={setActiveSession} />
                  <ScrollShadow className="h-[calc(50.5vh)]">
                    <GroupList
                      userId={userId}
                      setActiveSession={setActiveSession}
                      activeSession={activeSession}
                      socket={socket}
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
          messages={messages}
          setMessages={setMessages}
          socket={socket}
          activeSession={activeSession}
          setActiveSession={setActiveSession}
          userId={userId}
        />
      </div>
    </>
  );
}
