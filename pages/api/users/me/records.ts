import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next/types";
import { withApiSession } from "@libs/server/withSession";
import { Kind } from "@prisma/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { users },
    query: { kind },
  } = req;
  console.log(Kind);
  const records = await clinet.record.findMany({
    where: {
      userId: user?.id,
      kind: kind as Kind,
    },
  });
  console.log(records);
  res.json({
    ok: true,
    records,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: true,
  })
);
