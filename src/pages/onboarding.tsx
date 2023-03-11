import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { GetServerSideProps } from "next/types";
import { getServerSession } from "next-auth/next";
import { useEffect } from "react";

import HeroInput from "../components/HeroInput";
import useCreateWorkspace from "../hooks/api/useCreateWorkspace";
import prisma from "../lib/prisma";
import { authOptions } from "./api/auth/[...nextauth]";

interface IProps {
  user: Pick<User, "id" | "lastActiveWorkspaceId"> | null;
}

const Onboarding = (props: IProps) => {
  const { user } = props;

  const router = useRouter();

  const createWorkspace = useCreateWorkspace();

  useEffect(() => {
    if (user == null) {
      router.push("/");
    }
    if (user?.lastActiveWorkspaceId) {
      router.push(`/workspace/${user?.lastActiveWorkspaceId}`);
    }
  }, [router, user, user?.lastActiveWorkspaceId]);

  if (user == null) {
    return null;
  }

  return (
    <HeroInput
      title="Create Your Workspace"
      content="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
      excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
      a id nisi."
      input={{
        label: "Workspace Name",
        placeholder: "workspace name",
      }}
      button={{
        check: "Go",
      }}
      check={async (input) => {
        await createWorkspace(input ?? "");
        router.push("/");
        return false;
      }}
    />
  );
};

export default Onboarding;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

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
