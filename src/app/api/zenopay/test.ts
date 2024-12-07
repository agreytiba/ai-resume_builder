import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const ZENO_API_URL = "https://api.zeno.africa";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "Get") {
    return res.status(200).json({ success: true, message: "Success" });
  }
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { customerName, customerEmail, customerPhoneNumber, amountToCharge } =
    req.body;

  // Basic validation
  if (
    !customerName ||
    !customerEmail ||
    !customerPhoneNumber ||
    !amountToCharge
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid request data" });
  }

  try {
    const apiKey = process.env.ZENO_API_KEY!;
    const secretKey = process.env.ZENO_SECRET_KEY!;
    const accountID = process.env.ZENO_ACCOUNT_ID!;

    // Construct the payload
    const requestData = JSON.stringify({
      create_order: 1,
      api_key: apiKey,
      account_id: accountID,
      secret_key: secretKey,
      amount: amountToCharge,
      buyer_name: customerName,
      buyer_email: customerEmail,
      buyer_phone: customerPhoneNumber,
    });

    // Make the API call
    const response = await axios.post(ZENO_API_URL, requestData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    // Respond back to the client
    return res.status(200).json({ success: true, data: response.data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
