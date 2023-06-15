import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const client = global.cient || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.client = clientl;
}

export default new PrismaClient();
