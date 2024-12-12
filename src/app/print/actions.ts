"use server";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
// actions.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Fetch a resume by ID.
 * @param id - The ID of the resume to fetch.
 * @returns The resume data or null if not found.
 */
export async function fetchResume(id: string) {
  const { userId } = await auth();
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const resume = await prisma.resume.findUnique({
      where: { id, userId },
      include: resumeDataInclude,
    });
    return resume;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw new Error("Failed to fetch resume");
  }
}


export async function fetchPaymentStatus(resumeId: string) {
  const resume = await prisma.resume.findUnique({
    where: { id: resumeId },
    select: { Payment_status: true }, // Only fetch payment_status
  });

  return resume?.Payment_status || false; // Return false if not found
}

