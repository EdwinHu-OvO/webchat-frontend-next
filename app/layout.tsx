import type { Metadata } from "next";
import "@/styles/globals.css";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "WebChat",
  description: "WebChat",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
