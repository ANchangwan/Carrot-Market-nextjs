import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next/types";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const {
        session:{user},
        body:{
            name,
            price,
            description
        },
    } = req;
    
    if(req.method === "POST"){
      const stream = await client.streams.create({
        data:{
            name,
            price,
            description,
            user:{
              connect:{
                id:user?.id
              }
            }
        }
      })
      res.json({
          ok:true,
          stream
      })
    }
    else if(req.method === "GET"){
      const streams = await client.streams.findMany({

      })
      res.json({
        ok:true,
        streams
      })
    }
}

export default withApiSession(
  withHandler({
    methods: ["GET","POST"],
    handler,
    isPrivate: true,
  })
);
