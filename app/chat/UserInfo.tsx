"use client";
import { Avatar } from "@heroui/avatar";
import { useRouter } from "next/navigation";
interface UserInfoProps {
  username: string;
  avatarUrl: string;
}
export default function UserInfo({ username, avatarUrl }: UserInfoProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-4 mb-1">
        <Avatar
          size="lg"
          showFallback={true}
          src={avatarUrl}
          name={username}
          className="h-20 w-20"
        />
      </div>
      <h1 className="hover:text-primary cursor-pointer text-xl" onClick={() => router.push("/me")}>
        {username}
      </h1>
    </div>
  );
}
