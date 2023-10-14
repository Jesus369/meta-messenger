import ChatInput from "./components/ChatInput";
import MessageList from "./components/MessageList";
import Loading from "./loading";
import { getServerSession } from "next-auth";
import { Providers } from "./providers";

async function Homepage() {
  const data = await fetch(
    `${
      process.env.NEXT_PUBLIC_VERCEL_URL! || "http://localhost:3000"
    }/api/getMessages`
  ).then((res) => res.json());

  const messages: Message[] = data.messages;

  const session = await getServerSession();

  return (
    <Providers session={session}>
      <div className="">
        <MessageList initialMsgs={messages} />
        <ChatInput session={session} />
      </div>
    </Providers>
  );
}

export default Homepage;
