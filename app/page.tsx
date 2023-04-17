import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import SignInButton from "../src/features/SignInButton";
import prisma from "../src/lib/prisma";
import { authOptions } from "../src/pages/api/auth/[...nextauth]";

interface IProps {}

const Home = async (props: IProps) => {
  const session = await getServerSession(authOptions);

  const profiles =
    session?.user?.id != null
      ? await prisma.profile.findMany({
          where: {
            userId: session?.user?.id,
          },
          include: {
            workspaces: true,
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

  const profileWorkspaces = profiles.flatMap((profile) => profile.workspaces);

  if (user != null && user.lastActiveWorkspaceId != null) {
    redirect(`/workspace/${user?.lastActiveWorkspaceId}`);
  }

  if (
    user != null &&
    user.lastActiveWorkspaceId == null &&
    profileWorkspaces.length !== 0
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
          <SignInButton />
        </div>
      </div>
    </div>
  );
};

export default Home;
