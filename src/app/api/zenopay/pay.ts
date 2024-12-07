/** @format */

import ZenoPay from "@/utils/zenopay"; // Adjust path if `zenopay` is in a different directory
import { NextApiRequest, NextApiResponse } from "next";

// Configure ZenoPay using environment variables
const zenoPayOptions = {
  accountID: process.env.ZENO_ACCOUNT_ID || "", // Replace with your Zeno account ID
  apiKey: process.env.ZENO_API_KEY || "", // Replace with your Zeno API key
  secretKey: process.env.ZENO_SECRET_KEY || "", // Replace with your ZenoPay secret key
};

const zenoPay = new ZenoPay(zenoPayOptions);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    console.log(req.body);
    const result = await zenoPay.Pay(req.body);

    // Return a success response
    return res.status(200).json({ result });
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({ error: "An error occurred during payment" });
  }
}
