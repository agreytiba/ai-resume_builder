import ZenoPay from "@/utils/zenopay";
import { NextRequest, NextResponse } from "next/server";

// Configure ZenoPay using environment variables
const zenoPayOptions = {
  accountID: process.env.ZENO_ACCOUNT_ID || "", // Replace with your Zeno account ID
  apiKey: process.env.ZENO_API_KEY || "", // Replace with your Zeno API key
  secretKey: process.env.ZENO_SECRET_KEY || "", // Replace with your ZenoPay secret key
};

const zenoPay = new ZenoPay(zenoPayOptions);

export async function GET(req: NextRequest) {
  try {
    // Parse query parameters from the request URL
    const orderId = req.nextUrl.searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required" },
        { status: 400 },
      );
    }

    // Call ZenoPay to check payment status
    const result = await zenoPay.CheckPaymentStatus(orderId);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching order status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to check status" },
      { status: 500 },
    );
  }
}
