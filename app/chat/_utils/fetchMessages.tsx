import { baseUrl } from "@/app/_utils/baseurl";
export interface MessageRowProps {
  id: number;
  sender: {
    username: string;
    id: string;
  };
  receiver: {
    username: string;
    id: string;
  };
  group: null;
  content: string;
  createdAt: string;
}
interface FetchMessagesProps {
  userId: string;
  activeSession: {
    id: string;
    username: string;
    type: "friend" | "group" | null;
    groupId: string;
  };
  setMessages: (messages: MessageRowProps[]) => void;
}
export default async function fetchMessages({
  userId,
  activeSession,
  setMessages,
}: FetchMessagesProps) {
  try {
    if (activeSession.id === "" || activeSession.type === null) {
      setMessages([]);
      return;
    } else if (activeSession.type === "friend") {
      const response = await fetch(
        `${baseUrl}/api/messages/private?userId=${userId}&peerId=${activeSession.id}`,
      );
      const data = await response.json();
      setMessages(data);
    } else if (activeSession.type === "group") {
      const response = await fetch(`${baseUrl}/api/messages/group/${activeSession.groupId}`);
      const data = await response.json();
      setMessages(data);
    }
  } catch (error) {
    console.error(error);
  }
}
