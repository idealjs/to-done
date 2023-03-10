import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import prisma from "../../../../lib/prisma";

const workspacesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const { id: workspaceId } = query as { id: string };
  const token = await getToken({ req });
  if (token == null) {
    res.status(401).json(null);
    return;
  }

  switch (method) {
    case "GET": {
      res.status(200).json(
        await prisma.workspace.findUnique({
          where: {
            id: workspaceId,
          },
        })
      );
      break;
    }
    default: {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
    }
  }
};
export default workspacesHandler;
