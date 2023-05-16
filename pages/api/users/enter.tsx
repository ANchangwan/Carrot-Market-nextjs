import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next/types";
<<<<<<< HEAD
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { PrismaClient } from "@prisma/client";
=======
>>>>>>> 1f4c68ac3c7b3c1e565646235c5c7016310940cf

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "익명",
      ...payload,
    },
    update: {},
  });
  console.log(user);
  // if (email) {
  //   user = await client.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (user) console.log("찾음");
  //   if (!user) {
  //     console.log("찾지 못했음");
  //     user = await client.user.create({
  //       data: {
  //         name: "익명",
  //         email,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }
  // if (phone) {
  //   user = await client.user.findUnique({
  //     where: {
  //       phone: +phone,
  //     },
  //   });
  //   if (user) console.log("찾음");
  //   if (!user) {
  //     console.log("찾지 못했음");
  //     user = await client.user.create({
  //       data: {
  //         name: "익명",
  //         phone: +phone,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }

  res.status(200).end();
}

export default withHandler("POST", handler);
