"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-3xl">Dashboard</h1>
      <h4 className="text-2xl my-3">Example Session with useSession()</h4>
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
