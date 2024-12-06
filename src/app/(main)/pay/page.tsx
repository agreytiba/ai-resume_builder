"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const PayComponent = () => {
  const [response, setResponse] = useState(null);

  const handlePayment = async () => {
    const paymentDetails = {
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      customerPhoneNumber: "1234567890",
      amountToCharge: 500,
    };

    try {
      const res = await fetch("/api/zenoPay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentDetails),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div>
      <Button onClick={handlePayment}>Make Payment</Button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default PayComponent;
