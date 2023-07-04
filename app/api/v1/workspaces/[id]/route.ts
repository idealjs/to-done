import { NextResponse } from "next/server";

import prisma from "../../../../lib/prisma";

export const GET = async (
  _: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) => {
  return NextResponse.json(
    await prisma.workspace.findUnique({
      where: {
        id: params.id,
      },
    })
  );
};
