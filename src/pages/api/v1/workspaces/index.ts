import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import prisma from "../../../../lib/prisma";

const workspacesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  const token = await getToken({ req });
  if (token == null) {
    res.status(401).json(null);
    return;
  }

  const { name } = body as {
    name: string;
  };

  switch (method) {
    case "POST": {
      if (token.sub == null) {
        res.status(400).json({ error: "Missing subject in token" });
        return;
      }
      if (name == null) {
        res.status(400).json({ error: "Missing name" });
        return;
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
              profiles: {
                create: {
                  lastActiveWorkspaceId: workspace.id,
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

        res.status(200).json(transactionRes);
      } catch (error) {
        console.log("test test", error);
      }

      break;
    }
    case "PUT": {
      break;
    }
    case "PATCH": {
      break;
    }
    case "DELETE": {
      break;
    }
    default: {
      res.setHeader("Allow", ["POST", "PUT", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
    }
  }
};

export default workspacesHandler;
