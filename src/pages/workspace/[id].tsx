import type { GetServerSideProps } from "next/types";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";

import Logo from "../../components/Logo";
import Content from "../../features/Content";
import Navbar from "../../features/Navbar";
import prisma from "../../lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";

interface IProps {}

const Workspace = (props: IProps) => {
  return (
    <div className="drawer">
      <input id="workspace-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div
          className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 
  bg-base-100 text-base-content"
        >
          <Navbar />
        </div>
        <div className="px-5">
          <Content />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="workspace-drawer"
          className="drawer-overlay button"
        ></label>
        <aside className="bg-base-200 w-80 sm:border-r-2 sm:border-gray-300 flex flex-col">
          <div className="sticky flex items-baseline px-4 py-2 gap-2">
            <Logo />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <ul></ul>
            <ul className="menu menu-compact lg:menu-normal rounded-box p-4">
              <li
                onClick={async () => {
                  await signOut({ callbackUrl: "/" });
                }}
              >
                <a>sign out</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Workspace;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (session == null) {
    return {
      props: { session },
    };
  }
  const user =
    session?.user?.id != null
      ? await prisma.user.findUnique({
          where: {
            id: session?.user?.id,
          },
        })
      : null;

  return {
    props: {
      session,
      user:
        user != null
          ? {
              id: user?.id,
              lastActiveWorkspaceId: user?.lastActiveWorkspaceId,
            }
          : null,
    },
  };
};

export const getLayout = (page: JSX.Element) => {
  return page;
};
