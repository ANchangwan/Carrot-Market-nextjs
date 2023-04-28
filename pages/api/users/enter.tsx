import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next/types";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.status(200).end();
}

export default withHandler("POST", handler);
