"use client";

import { Session } from "inspector";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>;
}
