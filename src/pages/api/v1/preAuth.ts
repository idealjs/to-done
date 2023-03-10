import type { NextApiRequest, NextApiResponse } from "next";

const checkAuthHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body, method } = req;
  switch (method) {
    case "GET": {
      res.status(200).json({
        allow: true,
      });
      break;
    }
    default: {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
    }
  }
};

export default checkAuthHandler;
