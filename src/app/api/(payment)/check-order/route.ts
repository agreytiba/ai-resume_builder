import ZenoPay from "@/utils/zenopay";
// Configure ZenoPay using environment variables
const zenoPayOptions = {
  accountID: process.env.ZENO_ACCOUNT_ID || "", // Replace with your Zeno account ID
  apiKey: process.env.ZENO_API_KEY || "", // Replace with your Zeno API key
  secretKey: process.env.ZENO_SECRET_KEY || "", // Replace with your ZenoPay secret key
};

const zenoPay = new ZenoPay(zenoPayOptions);

export async function GET(req: { url: string | URL }) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const orderId: string | null = searchParams.get("orderId");

    if (!orderId) {
      throw new Error("Order ID is missing."); // Or handle this gracefully based on your use case
    }

    const result = await zenoPay.CheckPaymentStatus(orderId);

    return new Response(JSON.stringify({ ...result }), { status: 200 });

    // Validate the presence of orderId
    // if (!orderId) {
    //   return new Response(
    //     JSON.stringify({ success: false, message: "Order ID is required" }),
    //     { status: 400 }
    //   );
    // }

    // Simulated database or service check for order status
    // Replace this with actual logic to fetch order status from your database or payment service
    // const fakeOrderDatabase = {
    //   "ORD-123456": { status: "completed", message: "Order has been completed." },
    //   "ORD-654321": { status: "pending", message: "Order is still pending." },
    // };

    // const order = fakeOrderDatabase[orderId];

    // if (order) {
    //   return new Response(
    //     JSON.stringify({
    //       success: true,
    //       status: order.status,
    //       message: order.message,
    //     }),
    //     { status: 200 }
    //   );
    // } else {
    //   return new Response(
    //     JSON.stringify({ success: false, message: "Order not found" }),
    //     { status: 404 }
    //   );
    // }
  } catch (error) {
    console.error("Error fetching order status:", error);
    return new Response(JSON.stringify({ message: "Failed to check status" }), {
      status: 500,
    });
  }
}
