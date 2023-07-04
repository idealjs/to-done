import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";

import prisma from "./prisma";

const adapter = PrismaAdapter(prisma);

const providers: Provider[] = [
  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
    sendVerificationRequest:
      process.env.NEXT_PUBLIC_NODE_ENV === "prod"
        ? undefined
        : (params) => {
            console.debug("[debug]:mock sendVerificationRequest", params);
          },
  }),
  GithubProvider({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
];

const authOptions: NextAuthOptions = {
  adapter:
    process.env.NEXT_PUBLIC_NODE_ENV === "prod"
      ? adapter
      : {
          ...adapter,
          useVerificationToken(params) {
            return {
              ...params,
              expires: new Date(new Date().getTime() + 3600 * 1000),
            };
          },
        },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (process.env.NEXT_PUBLIC_NODE_ENV !== "prod") {
        const user = await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
        });

        if (user == null) {
          throw new Error("User not found");
        }
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  providers,
  pages: {
    signIn: "/auth/signin",
  },
};

export default authOptions;
