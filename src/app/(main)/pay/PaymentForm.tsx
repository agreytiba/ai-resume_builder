import { useState } from "react";
import axios from "axios";

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhoneNumber: "",
    amountToCharge: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post("/api/zenopay", {
        action: "pay",
        data: { ...formData, amountToCharge: Number(formData.amountToCharge) },
      });

      if (response.data.success) {
        setResponseMessage("Payment initiated successfully.");
      } else {
        setResponseMessage(response.data.message);
      }
    } catch (error) {
      setResponseMessage("An error occurred while initiating payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Make a Payment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Customer Email</label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleInputChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Customer Phone Number
          </label>
          <input
            type="text"
            name="customerPhoneNumber"
            value={formData.customerPhoneNumber}
            onChange={handleInputChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Amount to Charge</label>
          <input
            type="number"
            name="amountToCharge"
            value={formData.amountToCharge}
            onChange={handleInputChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {responseMessage && (
        <p className="mt-4 text-center text-sm">{responseMessage}</p>
      )}
    </div>
  );
}
