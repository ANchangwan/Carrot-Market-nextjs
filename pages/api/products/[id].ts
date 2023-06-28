import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";
import withHandler, { RespoonseType } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next/types";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const product = await client.product.findUnique({
    where: {
      id: +id.toString(),
    },
  });
  res.json({ ok: true, product });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
    isPrivate: true,
  })
);
