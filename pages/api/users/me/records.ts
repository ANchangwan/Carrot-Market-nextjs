import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { type } from "@libs/client/utils";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { kind },
  } = req;

  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: type(kind),
    },
    include: {
      product: true,
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
