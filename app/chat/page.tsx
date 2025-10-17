"use client";
import { Card, CardHeader, CardBody } from "@heroui/card";
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

export default function Chat() {
  const [_username, set_Username] = useState<string>("loading");
  const { username, userId } = useLoginState();
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
  const router = useRouter();
  useEffect(() => {
    set_Username(username);
    fetchAvatar({ username: username, setAvatarUrl });
  }, [username]);
  const hitokoto = Hitokoto({
    type: ["c", "d", "f", "h", "i", "j", "k"],
    max_length: 13,
    min_length: 10,
  });
  function logout() {
    localStorage.removeItem("webchat-login");
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
                tabList: "w-full relative rounded-lg p-0",
                cursor: "w-full bg-primary",
                tabContent: "group-data-[selected=true]:text-content1 text-[#3e3e3e]",
              }}
              className="justify-center px-1"
              color="primary"
            >
              <Tab key="friend" title="好友" className="h-full">
                <div className="bg-content2 rounded-xl">
                  <div className="flex justify-center py-2">
                    <Button className="h-7 w-[80%]" radius="sm" color="primary">
                      +
                    </Button>
                  </div>
                  <ScrollShadow className="h-[calc(51.1vh+1px)]">
                    <FriendList
                      userId={userId}
                      setActiveSession={setActiveSession}
                      activeSession={activeSession}
                    />
                  </ScrollShadow>
                </div>
              </Tab>
              <Tab key="group" title="群组">
                <div className="bg-content2 rounded-xl">
                  <div className="flex justify-center py-2">
                    <Button className="h-7 w-[80%]" radius="sm" color="primary">
                      +
                    </Button>
                  </div>
                  <ScrollShadow className="h-[calc(51.1vh+1px)]">
                    <GroupList
                      userId={userId}
                      setActiveSession={setActiveSession}
                      activeSession={activeSession}
                    />
                  </ScrollShadow>
                </div>
              </Tab>
            </Tabs>
            <_Hitokoto hitokoto={hitokoto} />
          </CardBody>
        </Card>
        {/* 右侧 */}
        <ChatSession
          activeSessionName={activeSession.username}
          activeSessionId={activeSession.id}
          userId={userId}
          activeSessionType={activeSession.type}
          activeSessionGroupId={activeSession.groupId}
        />
      </div>
    </>
  );
}
