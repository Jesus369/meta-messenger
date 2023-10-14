import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./components/LogoutButton";
import { getServerSession } from "next-auth";

const Header = async () => {
  const session = await getServerSession();

  if (session)
    return (
      <header className="sticky top-0 z-50 bg-white flex items-center justify-between p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            src={session.user?.image!}
            alt="Profile Picture"
            className="roounded-full mx-2 object-contain"
            width={50}
            height={10}
          />
          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-gl">{session.user?.name}</p>
          </div>
        </div>
        <LogoutButton />
      </header>
    );

  return (
    <header className="sticky top-0 z-50 bg-white flex items-center justify-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            src="https://links.papareact.com/jne"
            alt="Logo"
            width={50}
            height={10}
          />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>

        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
