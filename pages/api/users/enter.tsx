import client from "@libs/server/client";
import withHandler, { RespoonseType } from "@libs/server/withHandler";
import type { NextApiRequest, NextApiResponse } from "next/types";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  if (!user) res.status(400).json({ ok: false });
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "익명",
            ...user,
          },
        },
      },
    },
  });
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

  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
