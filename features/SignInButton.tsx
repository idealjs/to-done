"use client";

import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <button
      className="btn btn-primary"
      onClick={async () => await signIn("email")}
    >
      Get Started
    </button>
  );
};
export default SignInButton;
