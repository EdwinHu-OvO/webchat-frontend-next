"use client";
import { Button } from "@heroui/react";
import { LoginData } from "./page";
interface LoginButtonProps {
  buttonLoading: boolean;
  form: LoginData;
  setButtonLoading: (loading: boolean) => void;
  onLogin: (form: LoginData, setButtonLoading: (loading: boolean) => void) => void;
}
function LoginButton({ buttonLoading, form, setButtonLoading, onLogin }: LoginButtonProps) {
  return (
    <Button
      isLoading={buttonLoading}
      color="primary"
      className="w-full"
      onPress={() => onLogin(form, setButtonLoading)}
      type="submit"
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
      登录
    </Button>
  );
}
export default LoginButton;
