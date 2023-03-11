import type { Profile, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next/types";
import { getServerSession } from "next-auth/next";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

import prisma from "../lib/prisma";
import { authOptions } from "./api/auth/[...nextauth]";

interface IProps {
  profiles: Profile[];
  user: Pick<User, "id" | "lastActiveWorkspaceId"> | null;
}

const Home = (props: IProps) => {
  const { profiles, user } = props;
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      return;
    }
    if (user?.lastActiveWorkspaceId != null) {
      router.push(`/workspace/${user?.lastActiveWorkspaceId}`);
    }
    if (user?.lastActiveWorkspaceId == null && profiles.length != 0) {
      router.push(`/workspace/${profiles[0].workspaceId}`);
    }
    if (user?.lastActiveWorkspaceId == null && profiles.length == 0) {
      router.push("/onboarding");
    }
  }, [profiles, router, user, user?.lastActiveWorkspaceId]);

  if (user != null) {
    return null;
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button
            className="btn btn-primary"
            onClick={async () => await signIn("email")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  const profiles =
    session?.user?.id != null
      ? await prisma.profile.findMany({
          where: {
            userId: session?.user?.id,
          },
        })
      : [];

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
      profiles,
    },
  };
};
