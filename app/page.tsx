"use client";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
export default function Home() {
  const pathname = usePathname();
  if (pathname === "/") {
    redirect("/login");
  } else {
    redirect("/chat");
  }
}
