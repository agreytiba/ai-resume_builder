import { NextRequest, NextResponse } from "next/server";
import { postRequest } from "@/lib/zenopay"; // Adjust the path to your utility file

export const runtime = "nodejs"; // Ensures server-side execution
export const dynamic = "force-dynamic"; // Forces dynamic handling of the API route

/**
 * Handles API requests from the client and posts data to ZenoPay.
 * @param req - Incoming request.
 * @returns Server response.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the request body from the client

    // Securely use credentials from environment variables
    const options = {
      api_key: process.env.ZENO_API_KEY!,
      secret_key: process.env.ZENO_SECRET_KEY!,
      account_id: process.env.ZENO_ACCOUNT_ID!,
    };

    // Combine the body with authentication details
    const requestData = {
      ...options,
      ...body,
    };

    // Post to ZenoPay using the utility function
    const response = await postRequest("", requestData);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: (error as Error).message,
    });
  }
}
