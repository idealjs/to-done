import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Fragment, PropsWithChildren } from "react";

import authOptions from "../../app/lib/authOptions";
import prisma from "../../app/lib/prisma";

const RedirectWorkspace = async (props: PropsWithChildren<{}>) => {
  const { children } = props;
  const session = await getServerSession(authOptions);

  const user =
    session?.user?.id != null
      ? await prisma.user.findUnique({
          where: {
            id: session?.user?.id,
          },
          include: {
            profiles: {
              include: {
                workspaces: true,
              },
            },
          },
        })
      : null;

  if (user == null) {
    redirect("/");
  }

  if (user != null && user.lastActiveWorkspaceId != null) {
    redirect(`/workspace/${user?.lastActiveWorkspaceId}`);
  }

  const profileWorkspaces = user.profiles.flatMap(
    (profile) => profile.workspaces
  );

  if (
    user != null &&
    user.lastActiveWorkspaceId == null &&
    user.profiles.length !== 0
  ) {
    redirect(`/workspace/${profileWorkspaces[0].id}`);
  }

  if (
    user != null &&
    user.lastActiveWorkspaceId == null &&
    profileWorkspaces.length == 0
  ) {
    redirect("/onboarding");
  }

  return <Fragment>{children}</Fragment>;
};

export default RedirectWorkspace;
