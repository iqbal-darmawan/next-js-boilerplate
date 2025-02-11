"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          signIn(undefined, {
            callbackUrl: "/admin/dashboard",
          })
        }
      >
        Login
      </button>
    </div>
  );
}
