import { baseUrl } from "@/app/_utils/baseurl";
export interface MessageRowProps {
  id: number;
  sender: {
    id: string;
    username: string;
    password: string;
  };
  receiver: {
    id: string;
    username: string;
    password: string;
  };
  group: null;
  content: string;
  createdAt: string;
}
interface FetchMessagesProps {
  userId: string;
  activeSessionId: string;
  activeSessionType: "friend" | "group" | null;
  activeSessionGroupId: string;
  setMessages: (messages: MessageRowProps[]) => void;
}
export default async function fetchMessages({
  userId,
  activeSessionId,
  activeSessionType,
  activeSessionGroupId,
  setMessages,
}: FetchMessagesProps) {
  try {
    if (activeSessionId === "" || activeSessionType === null) {
      setMessages([]);
      return;
    } else if (activeSessionType === "friend") {
      const response = await fetch(
        `${baseUrl}/api/messages/private?userId=${userId}&peerId=${activeSessionId}`,
      );
      const data = await response.json();
      setMessages(data);
    } else if (activeSessionType === "group") {
      const response = await fetch(`${baseUrl}/api/messages/group/${activeSessionGroupId}`);
      const data = await response.json();
      setMessages(data);
    }
  } catch (error) {
    console.error(error);
  }
}
