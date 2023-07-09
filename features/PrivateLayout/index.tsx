import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Fragment, PropsWithChildren } from "react";

import authOptions from "../../app/lib/authOptions";
import prisma from "../../app/lib/prisma";

const PrivateLayout = async (props: PropsWithChildren<{}>) => {
  const { children } = props;
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

  return <Fragment>{children}</Fragment>;
};

export default PrivateLayout;
