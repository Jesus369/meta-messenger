"use client";

import { clientPusher } from "@/pusher";
import fetcher from "@/utils/fetchMessages";
import { useEffect } from "react";
import useSWR from "swr";
import MessageComponent from "./MessageComponent";

const MessageList = () => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("message");
    channel.bind("new-meeage", async (data: Message) => {
      // If you sent the message, do not update cache
      if (messages?.find((message) => message.id === data.id)) return;

      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });
  }, [mutate, clientPusher, messages]);

  return (
    <div className="space-y-5 px-2 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map((message, index) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
