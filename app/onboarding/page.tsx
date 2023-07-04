import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

import authOptions from "../lib/authOptions";
import prisma from "../lib/prisma";
import CreateWorkspaceInput from "./CreateWorkspaceInput";

const Onboarding = async () => {
  const session = await getServerSession(authOptions);

  const user =
    session?.user?.id != null
      ? await prisma.user.findUnique({
          where: {
            id: session?.user?.id,
          },
        })
      : null;

  if (user == null) {
    redirect("/");
  }

  if (user?.lastActiveWorkspaceId) {
    redirect(`/workspace/${user?.lastActiveWorkspaceId}`);
  }

  return (
    <div>
      <CreateWorkspaceInput />
    </div>
  );
};

export default Onboarding;
