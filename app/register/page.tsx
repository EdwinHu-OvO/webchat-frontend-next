"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input, Checkbox } from "@heroui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@heroui/avatar";
import { Form } from "@heroui/form";
import RegisterButton from "./Registerbutton";
import { addToast, ToastProvider } from "@heroui/toast";
import { useStoreUser } from "../_utils/storeuser";

export interface LoginData {
  username: string;
  password: string;
}
enum inputtype {
  pwd,
  uname,
}
function showTost(title: string, description: string, color: any) {
  addToast({
    title: title,
    description: description,
    color: color,
    variant: "solid",
    radius: "lg",
    timeout: 3000,
  });
}

export default function Login() {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const router = useRouter();
  const [form, setForm] = useState<LoginData>({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<{
    pwdIsvalid: boolean;
    unameIsvalid: boolean;
    pwdErrorMessage: string;
    unameErrorMessage: string;
  }>({
    pwdIsvalid: false,
    unameIsvalid: false,
    pwdErrorMessage: "",
    unameErrorMessage: "",
  });
  async function onRegister(data: LoginData, setButtonLoading: (loading: boolean) => void) {
    try {
      setButtonLoading(true);
      if (data.username === "" || data.password === "") {
        showTost("Error", "Username and password are required", "danger");
        handleinput(data.username, inputtype.uname);
        handleinput(data.password, inputtype.pwd);
        setButtonLoading(false);
        return;
      }
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const message = (await response.json()).message;
        showTost("Error", message || "Unknown error", "danger");
        if (message === "用户名已存在") {
          setErrorMessage((prev) => {
            return {
              ...prev,
              unameIsvalid: true,
              unameErrorMessage: "用户名已存在",
            };
          });
        }
        setButtonLoading(false);
      } else {
        showTost("Success", "注册成功,3秒后跳转", "success");
        setTimeout(() => {
          router.push("/chat");
        }, 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setButtonLoading(false);
    }
  }
  function handleinput(value: string, type: inputtype) {
    const isEmpty = value.trim() === "";
    // 防止非函数调用导致更新被覆盖
    setErrorMessage((prev) => {
      if (type === inputtype.uname) {
        return {
          ...prev,
          unameIsvalid: isEmpty,
          unameErrorMessage: isEmpty ? "用户名不能为空" : "",
        };
      } else {
        return {
          ...prev,
          pwdIsvalid: isEmpty,
          pwdErrorMessage: isEmpty ? "密码不能为空" : "",
        };
      }
    });
  }
  return (
    <>
      <div className="fixed z-[100]">
        <ToastProvider placement={"top-center"} toastOffset={30} />
      </div>
      <div className="flex h-screen items-center justify-center">
        <Card className="fit-content h-[60vh] w-[25vw] p-2">
          <h1 className="pt-4 pb-2 text-center text-4xl font-thin">WebChat</h1>
          <CardHeader className="flex items-center justify-center">
            <Avatar size="lg" showFallback={true} src="#" className="h-20 w-20" />
          </CardHeader>
          <CardBody className="mt-4 flex items-center">
            <Form className="w-full">
              <Input
                className="mb-9 h-4"
                label="用户名"
                name="username"
                value={form.username}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm({ ...form, username: value });
                }}
                onBlur={() => handleinput(form.username, inputtype.uname)}
                isInvalid={errorMessage.unameIsvalid}
                errorMessage={errorMessage.unameErrorMessage}
              />
              <Input
                className="h-4"
                label="密码"
                type="password"
                name="password"
                value={form.password}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm({ ...form, password: value });
                }}
                onBlur={() => handleinput(form.password, inputtype.pwd)}
                isInvalid={errorMessage.pwdIsvalid}
                errorMessage={errorMessage.pwdErrorMessage}
              />
            </Form>
          </CardBody>
          <CardFooter className="flex h-fit flex-col items-center justify-center">
            <div className="relative mb-8 flex w-full items-start">
              <span className="absolute right-0 mb-3 text-sm text-gray-500 select-none">
                已有账号？去
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
            <RegisterButton
              buttonLoading={buttonLoading}
              form={form}
              setButtonLoading={setButtonLoading}
              onRegister={onRegister}
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
