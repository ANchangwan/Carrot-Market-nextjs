import type { NextApiRequest, NextApiResponse } from "next/types";
import withHandler from "./../../../libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.status(200).end();
}

export default withHandler("POST", handler);
