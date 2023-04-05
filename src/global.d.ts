import "next-auth";
import "valtio";

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
      CLIENT_ID: string;
      CLIENT_SECRET: string;
    }
  }
  interface IPropsWithClassName {
    className?: string;
  }
  type PropsWithClassName<P = unknown> = P & { className?: string };
}

declare module "valtio" {
  function useSnapshot<T extends object>(p: T): T;
}
