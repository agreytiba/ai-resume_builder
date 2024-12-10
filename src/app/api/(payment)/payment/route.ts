import ZenoPay from "@/utils/zenopay";
// Configure ZenoPay using environment variables
const zenoPayOptions = {
  accountID: process.env.ZENO_ACCOUNT_ID || "", // Replace with your Zeno account ID
  apiKey: process.env.ZENO_API_KEY || "", // Replace with your Zeno API key
  secretKey: process.env.ZENO_SECRET_KEY || "", // Replace with your ZenoPay secret key
};

const zenoPay = new ZenoPay(zenoPayOptions);

export async function POST(req: {
  json: () =>
    | PromiseLike<{
        amountToCharge: string;
        customerName: string;
        customerEmail: string;
        customerPhoneNumber: string;
      }>
    | {
        amountToCharge: string;
        customerName: string;
        customerEmail: string;
        customerPhoneNumber: string;
      };
}) {
  try {
    // Parse the JSON payload
    const { amountToCharge, customerName, customerEmail, customerPhoneNumber } =
      await req.json();

    // Ensure amountToCharge is a number
    const paymentOptions = {
      amountToCharge: Number(amountToCharge), // Explicitly convert to number
      customerName,
      customerEmail,
      customerPhoneNumber,
    };

    // Call the payment logic (replace this with the actual logic)
    const result = await zenoPay.Pay(paymentOptions);

    // Send response
    return new Response(JSON.stringify({ ...result }), { status: 200 });
  } catch (error) {
    console.error("Payment error:", error);
    return new Response(
      JSON.stringify({ message: "Payment processing error" }),
      { status: 500 },
    );
  }
}
