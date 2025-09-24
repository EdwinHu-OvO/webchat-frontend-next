"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input, Button, Checkbox } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
export default function Login() {
  const router = useRouter();
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="fit-content h-[60vh] w-[25vw] p-2">
        <h1 className="pt-4 pb-2 text-center text-4xl font-thin">Register</h1>
        <CardHeader className="flex items-center justify-center">
          <Avatar size="lg" showFallback={true} src="#" className="h-20 w-20" />
        </CardHeader>
        <CardBody className="mt-4 flex items-center">
          <Input className="mb-9 h-4" label="Id" />
          <Input className="h-4" label="Password" />
        </CardBody>
        <CardFooter className="flex h-fit flex-col items-center justify-center">
          <div className="relative mb-8 flex w-full items-start">
            <span className="absolute right-0 mb-3 text-sm text-gray-500 select-none">
              已经有账号？去
              <a
                className="cursor-pointer text-blue-500 select-none"
                onClick={() => {
                  router.push("/login");
                }}
              >
                登录
              </a>
            </span>
          </div>
          <Button
            isLoading={false}
            color="primary"
            className="w-full"
            spinner={
              <svg
                className="h-5 w-5 animate-spin text-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            }
          >
            注册
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
