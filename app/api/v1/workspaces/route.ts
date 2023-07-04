import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "../../../lib/prisma";

export const POST = async (req: Request) => {
  const token = await getServerSession({
    callbacks: {
      session(params) {
        return params.token;
      },
    },
  });
  if (token == null) {
    return new NextResponse(null, {
      status: 401,
    });
  }

  const { name } = (await req.json()) as {
    name: string | undefined;
  };

  if (token.sub == null) {
    return new NextResponse(
      JSON.stringify({ error: "Missing subject in token" }),
      {
        status: 400,
      }
    );
  }
  if (name == null) {
    return new NextResponse(JSON.stringify({ error: "Missing name" }), {
      status: 400,
    });
  }

  try {
    const transactionRes = await prisma.$transaction(async (prisma) => {
      const tag = await prisma.permissionTag.create({
        data: {
          name: `workspace:${name}`,
        },
      });

      const workspace = await prisma.workspace.create({
        data: {
          name: name,
          owner: {
            connect: {
              id: token.sub,
            },
          },
          tags: {
            connect: {
              id: tag.id,
            },
          },
        },
      });

      await prisma.user.update({
        where: {
          id: token.sub,
        },
        data: {
          lastActiveWorkspaceId: workspace.id,
          profiles: {
            create: {
              workspaces: {
                connect: {
                  id: workspace.id,
                },
              },
              tags: {
                connect: {
                  id: tag.id,
                },
              },
            },
          },
        },
      });

      return workspace;
    });
    return NextResponse.json(transactionRes);
  } catch (error) {
    console.error(error);
  }
};
