"use client";
import { ToastProvider } from "@heroui/toast";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoginState } from "../_utils/storeuser";
import { useState, useEffect } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/utils/cn";
import { Divider } from "@heroui/divider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { username, setLoginUsername } = useLoginState();
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);
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
  const segments = useSelectedLayoutSegment();
  return (
    <>
      <div className="fixed z-[100]">
        <ToastProvider placement={"top-center"} toastOffset={30} />
      </div>
      <div className="mx-auto my-auto flex h-screen w-screen">
        <Card className="h-full min-w-xs flex-2/9" shadow="none" radius="none">
          <CardHeader className="relative mt-3 mb-0 flex items-center justify-center">
            <ArrowLeft
              className="hover:bg-content4 absolute left-4 h-9 w-9 cursor-pointer rounded-full p-1"
              onClick={() => router.push("/chat")}
            />
            <h1 className="text-center text-xl">个人设置</h1>
          </CardHeader>
          <Divider />
          <CardBody className="bg-content2 m-4 mt-2 flex w-auto flex-col items-center rounded-lg p-2">
            <div
              className={cn(
                "w-full rounded-lg p-2 text-center",
                segments === "userinfo" && "bg-primary-400 text-white",
              )}
              onClick={() => router.push("/me/userinfo")}
            >
              基本信息
            </div>
            <Divider className="w-[90%]" />
            <div
              className={cn(
                "w-full rounded-lg p-2 text-center",
                segments === "changepwd" && "bg-primary-400 text-white",
              )}
              onClick={() => router.push("/me/changepwd")}
            >
              修改密码
            </div>
            <Divider className="w-[90%]" />
            <div
              className="text-danger active:bg-danger-400 w-full rounded-lg p-2 text-center active:text-white"
              onClick={() => {
                localStorage.removeItem("webchat-login");
                router.push("/login");
              }}
            >
              退出登录
            </div>
          </CardBody>
          <CardFooter className="mt-0 flex flex-col items-center justify-center pt-0 text-sm text-[#666]">
            <div>WebChat</div>
            <div>- v1.0.0 -</div>
          </CardFooter>
        </Card>
        <Card className="bg-content2 h-full min-w-[500px] flex-7/9" shadow="none" radius="none">
          {children}
        </Card>
      </div>
    </>
  );
}
