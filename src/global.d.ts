import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      lastActiveWorkspaceId?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {}
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NODE_ENV: string | undefined;
    }
  }
  interface IPropsWithClassName {
    className?: string;
  }
  type PropsWithClassName<P = unknown> = P & { className?: string };
}