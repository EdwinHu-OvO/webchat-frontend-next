"use client";
import { Card, CardHeader } from "@heroui/card";
import { baseUrl } from "../_utils/baseurl";
import { useLoginState } from "../_utils/storeuser";
import { Avatar } from "@heroui/avatar";
import Hitokoto from "../_components/hitokoto";
function Chat() {
  const { username } = useLoginState();
  async function getAvatar() {
    const response = await fetch(`${baseUrl}/api/users/search?username=${username}`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.avatarUrl !== null) {
      return `${baseUrl}${data.avatarUrl}`;
    } else {
      return "";
    }
  }
  // const avatarUrl = getAvatar();
  return (
    <div className="flex h-screen w-screen">
      {/* 左侧 */}
      <Card className="w-2/9" shadow="none" radius="none">
        {/* <Hitokoto type={["ch", "i", "t"]} max_length={10} min_length={10} /> */}
        <CardHeader className="flex flex-col items-center justify-center">
          <Avatar size="lg" showFallback={true} src={""} className="h-20 w-20" />
          <h1>Chat</h1>
        </CardHeader>
      </Card>
      {/* 右侧 */}
      <Card className="bg-content2 w-7/9" shadow="none" radius="none">
        <CardHeader>
          <h1>Chat</h1>
        </CardHeader>
      </Card>
    </div>
  );
}

export default Chat;
