"use client";

import { FormEvent, useState } from "react";

import { v4 as uuid } from "uuid";

import useSWR from "swr";
import fetcher from "@/utils/fetchMessages";

const ChatInput = () => {
  const [input, setInput] = useState<string>("");

  // Fetching and storing the messages from the DB into the cache using SWR!
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    const id = uuid();
    const messageToSend = input;

    setInput("");

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "Jesus Flores",
      profilePic:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      email: "je.flores28@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());

      // returning our newly added message, plus the fetched messages using swr
      return [data.message, ...messages!];
    };

    // Mutate the cache by popping in the newly added message.
    await mutate(uploadMessageToUpstash, {
      // Extra step for a faster UI experience. Automatically, render the new message to the user on send
      // Before the new message is posted and fetched from the DB.
      // A check is done afterwards, and if there is an error, the new message will detach itself
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2
    border-t border-gray-100 bg-white"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a message here..."
        className="flex-1 rounded border-gray-300 focus:outline-none
        focus:ring-2 focus:ring-blue-600 focus:border-transparent
        px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
      py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
};
export default ChatInput;
