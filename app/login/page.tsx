"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input, Checkbox } from "@heroui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@heroui/avatar";
import { Form } from "@heroui/form";
import LoginButton from "./Loginbutton";
import { addToast, ToastProvider } from "@heroui/toast";
import { useStoreUser } from "../_utils/storeuser";
import { log } from "console";

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
    timeout: 1500,
  });
}

export default function Login() {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const router = useRouter();
  const { username, password, setUsername, setPassword } = useStoreUser();
  const [form, setForm] = useState<LoginData>({
    username: username,
    password: password,
  });
  const [remember, setRemember] = useState<boolean>(() => Boolean(username || password));

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
  // 在持久化复水后同步表单
  useEffect(() => {
    setForm({ username, password });
    setRemember(Boolean(username || password));
  }, [username, password]);
  function handleRemember(checked: boolean) {
    if (checked) {
      setUsername(form.username);
      setPassword(form.password);
    } else {
      setUsername("");
      setPassword("");
    }
  }
  async function onLogin(data: LoginData, setButtonLoading: (loading: boolean) => void) {
    try {
      setButtonLoading(true);
      if (data.username === "" || data.password === "") {
        showTost("Error", "Username and password are required", "danger");
        handleinput(data.username, inputtype.uname);
        handleinput(data.password, inputtype.pwd);
        setButtonLoading(false);
        return;
      }
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const message = (await response.json()).message;
        showTost("Error", message || "Unknown error", "danger");
        if (message === "用户不存在") {
          setErrorMessage((prev) => {
            return {
              ...prev,
              unameIsvalid: true,
              unameErrorMessage: "用户名不存在",
            };
          });
        } else if (message === "密码错误") {
          setErrorMessage((prev) => {
            return {
              ...prev,
              pwdIsvalid: true,
              pwdErrorMessage: "密码错误",
            };
          });
        }
        setButtonLoading(false);
      } else {
        router.push("/chat");
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
                  if (remember) {
                    setUsername(value);
                  }
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
                  if (remember) {
                    setPassword(value);
                  }
                }}
                onBlur={() => handleinput(form.password, inputtype.pwd)}
                isInvalid={errorMessage.pwdIsvalid}
                errorMessage={errorMessage.pwdErrorMessage}
              />
            </Form>
          </CardBody>
          <CardFooter className="flex h-fit flex-col items-center justify-center">
            <div className="relative mb-8 flex w-full items-start">
              <Checkbox
                size="sm"
                className="absolute left-0 pr-4"
                isSelected={remember}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setRemember(checked);
                  handleRemember(checked);
                }}
              >
                记住我
              </Checkbox>
              <span className="absolute right-0 mb-3 text-sm text-gray-500 select-none">
                还没有账号？去
                <a
                  className="cursor-pointer text-blue-500 select-none"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  注册
                </a>
              </span>
            </div>
            <LoginButton
              buttonLoading={buttonLoading}
              form={form}
              setButtonLoading={setButtonLoading}
              onLogin={onLogin}
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
