/** @format */
"use client";

import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const [orderStatus, setOrderStatus] = useState<boolean>(false);
  const [orderResponse, setOrderResponse] = useState<string | null>(
    "Order is being processed...",
  );
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    throw new Error("Order ID is missing."); // Handle gracefully if needed
  }

  // Decode the URL parameter
  const decodedId = orderId ? decodeURIComponent(orderId) : null;

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const checkOrderStatus = async () => {
      if (!decodedId) {
        setOrderResponse("Order ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/check-order?orderId=${decodedId}`);
        const data = await res.json();
        console.log("Check order:", data);

        if (data.success && data.message.payment_status === "PENDING") {
          setOrderResponse("Check your phone for payment verification.");
          setOrderStatus(false);
          setLoading(true);
        } else if (
          data.success &&
          data.message.payment_status === "COMPLETED"
        ) {
          setOrderResponse("Order is completed.");
          setOrderStatus(true);
          setLoading(false);
          clearInterval(intervalId!);
          clearTimeout(timeoutId!);
          router.push(`/order-summary?orderId=${decodedId}`);
        } else {
          setOrderResponse(data.message || "No order found.");
          setOrderStatus(false);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking order status:", error);
        setOrderResponse("An error occurred while checking order status.");
        setOrderStatus(false);
        setLoading(false);
      }
    };

    // Start polling every 5 seconds
    intervalId = setInterval(() => {
      checkOrderStatus();
    }, 5000);

    // Set timeout to stop polling after 40 seconds
    timeoutId = setTimeout(() => {
      clearInterval(intervalId!);
      setOrderResponse("Order status check timed out. Please try again later.");
      setLoading(false);
    }, 40000);

    // Clear interval and timeout when component unmounts
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [decodedId, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-md">
          <Loader2 className="mx-auto my-4 h-12 w-12 animate-spin text-blue-600" />
          <p className="text-lg font-medium text-gray-700">{orderResponse}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-md">
        {orderStatus ? (
          <div className="rounded-lg border border-gray-200 bg-green-50 p-4">
            <p className="text-lg font-medium text-green-600">
              Order completed successfully.
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-lg font-medium text-red-600">{orderResponse}</p>
          </div>
        )}
        {!orderStatus && (
          <p className="mt-4 text-sm text-gray-500">
            If this issue persists, contact support for assistance.
          </p>
        )}
      </div>
    </div>
  );
}
