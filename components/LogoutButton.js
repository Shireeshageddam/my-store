"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({callbackUrl:"/"})}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}
