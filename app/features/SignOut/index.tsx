"use client";

import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <ul className="menu menu-compact lg:menu-normal rounded-box p-4">
      <li
        onClick={async () => {
          await signOut({ callbackUrl: "/" });
        }}
      >
        <a>sign out</a>
      </li>
    </ul>
  );
};
export default SignOut;
