import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next/types";
import { withApiSession } from "@libs/server/withSession";
import { Post } from "@prisma/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  
  if(id !== undefined){
    const alreadyExists = await client.wondering.findFirst({
      where: {
        userId: user?.id,
        postId: +id!.toString(),
      },
      select: {
        id: true,
      },
    });
  


  if (alreadyExists) {
    await client.wondering.delete({
      where: {
        id: alreadyExists?.id,
      },
    });
  } else {
    await client.wondering.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }
  res.json({
    ok: true,
  });
}
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
