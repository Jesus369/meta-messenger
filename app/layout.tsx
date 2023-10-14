import "@/styles/globals.css";
import { Suspense } from "react";
import Header from "./Header";
import Loading from "./loading";

export const metadata = {
  title: "Meta Messenger",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
