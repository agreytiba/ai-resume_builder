/** @format */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const savedOrderId = localStorage.getItem("orderId");

    if (orderId && savedOrderId) {
      if (orderId == savedOrderId) {
        setIsValid(true);
        setMessage("Payment Successful");
        localStorage.removeItem("orderId"); // Remove saved orderId
      } else {
        setIsValid(false);
        setMessage("Invalid Payment");
      }
    } else {
      setIsValid(false);
      setMessage("Invalid Payment");
    }
  }, [orderId]);

  console.log(isValid);
  console.log(message);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2
            className={`text-2xl font-semibold ${
              isValid ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </h2>
          {isValid ? (
            <p className="mt-4 text-lg text-gray-700">
              Your Order Number:{" "}
              <span className="font-medium text-gray-900">{orderId}</span>
            </p>
          ) : (
            <div className="mt-4">
              <p className="text-gray-700">
                Unfortunately, we couldn&apos;t verify your payment. Please
                verify your details or contact support.
              </p>
              <div className="mt-4">
                <p className="font-medium text-gray-800">Contact Support:</p>
                <p className="text-gray-600">Phone: 0735 38149</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-block rounded-md bg-green-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
