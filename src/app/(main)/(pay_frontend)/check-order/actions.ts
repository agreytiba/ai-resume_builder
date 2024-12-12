"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function updatePaidOrderId(id: string, paid_order_id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Update only the paid_order_id  field
  return prisma.resume.update({
    where: {
      id,
      userId,
    },
    data: {
      paid_order_id,
    },
  });
}
