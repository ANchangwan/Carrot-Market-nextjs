import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next/types";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        query:{id},
        body,
        session:{user}
    } = req;
    const message = await client.message.create({
        data:{
            message: body.message,
            stream:{
                connect:{
                    id:+id!.toString()
                }
            },
            user:{
                connect:{
                    id:user?.id
                }
            }
        }
    })
    res.json({
        ok:true,
        message
    })
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
    isPrivate: true,
  })
);
