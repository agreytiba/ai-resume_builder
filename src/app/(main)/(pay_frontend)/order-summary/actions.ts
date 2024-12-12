"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function updatePaymentStatus(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Fetch the record to verify the request_order_id
  const record = await prisma.resume.findUnique({
    where: { id, userId },
  });

  if (!record) {
    throw new Error("Record not found");
  }

  if (record.request_order_id !== record.paid_order_id) {
    throw new Error("Order IDs do not match");
  }

  // Update the Payment_status field
  return prisma.resume.update({
    where: {
      id,
      userId,
    },
    data: {
      Payment_status: true,
    },
  });
}
