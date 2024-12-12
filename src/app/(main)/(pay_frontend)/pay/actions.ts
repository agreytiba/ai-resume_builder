"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface UpdateOrderIdProps {
  request_order_id: string;
  id: string;
}

export async function updateRequestOrderId({
  id,
  request_order_id,
}: UpdateOrderIdProps) {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  try {
    await prisma.resume.update({
      where: {
        id,
      },
      data: {
        request_order_id,
      },
    });

    return {
      success: true,
      message: "Request order ID updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to update request order ID: ${(error as Error).message}`,
    };
  }
}
