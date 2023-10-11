"use client";

import fetcher from "@/utils/fetchMessages";
import useSWR from "swr";

const MessageList = () => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  return (
    <div>
      {messages?.map((message) => (
        <p key={message.id}>{message.message}</p>
      ))}
    </div>
  );
};

export default MessageList;
