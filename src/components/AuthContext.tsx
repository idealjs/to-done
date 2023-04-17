"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const AuthContext = (props: PropsWithChildren) => {
  const { children } = props;
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
