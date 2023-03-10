import { PrismaAdapter } from "@next-auth/prisma-adapter";
import jwt from "jsonwebtoken";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import EmailProvider from "next-auth/providers/email";

import prisma from "../../../lib/prisma";

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
  {
    id: "wechat",
    name: "wechat",
    type: "oauth",
    wellKnown:
      "https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect",
    authorization: { params: { scope: "openid email profile" } },
    idToken: true,
    checks: ["pkce", "state"],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
  },
];

const adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
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
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          externalJwt: jwt.sign(
            {
              sub: token.sub,
              email: token.email,
            },
            process.env.EXTERNAL_SECRET ?? "",
            { expiresIn: "30d" }
          ),
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        externalJwt: token.externalJwt,
      };
    },
  },
  providers,
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
