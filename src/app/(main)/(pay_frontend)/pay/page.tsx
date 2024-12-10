/** @format */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Import Clerk hook

export default function Home() {
  const { user } = useUser(); // Get authenticated user details
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhoneNumber: "",
    amountToCharge: "1000",
  });
  const [feedback, setFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // Save orderId to local storage
  const saveOrderIdToLocalStorage = (orderId: string) => {
    localStorage.setItem("orderId", orderId);
  };

  // Pre-fill `customerName` and `customerEmail` from Clerk's auth
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        customerName: user.fullName || "",
        customerEmail: user.emailAddresses[0]?.emailAddress || "",
      }));
    }
  }, [user]);

  // Handle input field changes
  const handleChange = (e: {
    target: { name: string; value: string | number };
  }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        const currentOrderId = data.message.order_id;
        setFeedback({ success: true, message: "Order created successfully!" });

        saveOrderIdToLocalStorage(currentOrderId); // Save to local storage

        const encodedId = encodeURIComponent(currentOrderId);

        router.push(`/check-order?orderId=${encodedId}`);
      } else {
        setFeedback({
          success: false,
          message: data.message || "Failed to create order.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setFeedback({
        success: false,
        message: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-uppercase mb-6 text-center text-3xl font-bold text-yellow-600">
          PAYMENT FORM
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            {/* <label className="block border-none text-sm font-medium text-gray-600">
              Amount to Charge
            </label>
            <input
              type="number"
              name="amountToCharge"
              value={formData.amountToCharge}
              onChange={handleChange}
              min="0"
              className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              disabled
            /> */}
            <p> Amount you will be charged</p>
            <p className="tex-center text-bold text-xl text-black">
              {formData.amountToCharge}Tsh
            </p>
          </div>
          <div>
            <label className="my-2 block text-sm font-medium text-gray-600">
              Enter your phone number which will be used for payment.
            </label>
            <input
              type="tel"
              name="customerPhoneNumber"
              value={formData.customerPhoneNumber}
              onChange={handleChange}
              placeholder="e.g., 0700-000-000"
              className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full rounded-lg py-2 text-sm font-bold text-white transition duration-200 ${
              loading
                ? "cursor-not-allowed bg-blue-300"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit Payment"}
          </button>
        </form>
        {feedback && (
          <div
            className={`mt-4 flex items-center justify-center space-x-2 rounded-lg px-4 py-3 text-center text-sm font-semibold ${
              feedback.success
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {feedback.success ? (
              <span className="material-icons-outlined">check_circle</span>
            ) : (
              <span className="material-icons-outlined">error</span>
            )}
            <p>{feedback.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
