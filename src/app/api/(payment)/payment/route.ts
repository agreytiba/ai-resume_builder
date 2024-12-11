import ZenoPay from "@/utils/zenopay";
import { NextRequest, NextResponse } from "next/server";

// Configure ZenoPay using environment variables
const zenoPayOptions = {
  accountID: process.env.ZENO_ACCOUNT_ID || "", // Replace with your Zeno account ID
  apiKey: process.env.ZENO_API_KEY || "", // Replace with your Zeno API key
  secretKey: process.env.ZENO_SECRET_KEY || "", // Replace with your ZenoPay secret key
};

const zenoPay = new ZenoPay(zenoPayOptions);

// Define a type for the request body
interface PaymentRequestBody {
  amountToCharge: string;
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON payload
    const body: PaymentRequestBody = await req.json();

    // Destructure the body
    const { amountToCharge, customerName, customerEmail, customerPhoneNumber } =
      body;

    // Ensure amountToCharge is a number
    const paymentOptions = {
      amountToCharge: Number(amountToCharge), // Explicitly convert to number
      customerName,
      customerEmail,
      customerPhoneNumber,
    };

    // Call the payment logic
    const result = await zenoPay.Pay(paymentOptions);

    // Send a successful response
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { message: "Payment processing error", error },
      { status: 500 },
    );
  }
}
