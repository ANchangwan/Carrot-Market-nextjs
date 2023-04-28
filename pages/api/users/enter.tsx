import type { NextApiRequest, NextApiResponse } from "next/types";
import client from "../../libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(401).end();
  }
  console.log(req.body.email);
  res.status(200).end();
}
