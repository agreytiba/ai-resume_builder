import qs from "qs";
import axios from "axios";
import { string, number, email } from "fast-web-kit";
import { PaymentOptionsType, RequestResponseType } from "./validation";

const BASE_URL = "https://api.zeno.africa";

/**
 * Creates headers for API requests.
 * @returns An object containing HTTP headers.
 */
const createHeaders = () => ({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

/**
 * Handles making POST requests to the ZenoPay API.
 * @param route - API endpoint route.
 * @param requestData - Data to send with the request.
 * @returns A promise resolving to the API response.
 */
export const postRequest = async (
  route: string,
  requestData: unknown,
): Promise<RequestResponseType> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await axios.post(
      `${BASE_URL}/${route}`,
      qs.stringify(requestData),
      createHeaders(),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { status }: any = response.data;

    if (status === "success") {
      return { success: true, message: { ...response.data } };
    }

    return { success: false, message: response.data.message };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

/**
 * Validates and initiates a payment request.
 * @param options - ZenoPay configuration options.
 * @param paymentOptions - Details of the payment including customer info and amount.
 * @returns A promise resolving to the payment API response.
 */
export const Pay = async (
  paymentOptions: PaymentOptionsType,
): Promise<RequestResponseType> => {
  if (string.isEmpty(paymentOptions.customerName)) {
    return { success: false, message: "Customer name is required" };
  }

  if (string.isEmpty(paymentOptions.customerEmail)) {
    return { success: false, message: "Customer email is required" };
  }

  if (!email.isValid(paymentOptions.customerEmail)) {
    return { success: false, message: "Invalid customer email" };
  }

  if (string.isEmpty(paymentOptions.customerPhoneNumber)) {
    return { success: false, message: "Customer phone number is required" };
  }

  const phoneNumberLength = string.getLength(
    paymentOptions.customerPhoneNumber,
  );
  if (phoneNumberLength !== 10 && phoneNumberLength !== 12) {
    return {
      success: false,
      message: "Customer phone number must have 10 or 12 characters",
    };
  }

  if (!number.isValid(paymentOptions.amountToCharge)) {
    return { success: false, message: "Invalid amount" };
  }

  if (paymentOptions.amountToCharge <= 0) {
    return {
      success: false,
      message: "Amount cannot be less than or equal to 0",
    };
  }

  const requestData = {
    create_order: 1,
    amount: paymentOptions.amountToCharge,
    buyer_name: paymentOptions.customerName,
    buyer_email: paymentOptions.customerEmail,
    buyer_phone: paymentOptions.customerPhoneNumber,
  };

  return postRequest("", requestData);
};

/**
 * Checks the status of a payment using its order ID.
 * @param options - ZenoPay configuration options.
 * @param orderID - The unique identifier of the order.
 * @returns A promise resolving to the payment status API response.
 */
export const checkPaymentStatus = async (
  orderID: string,
): Promise<RequestResponseType> => {
  if (string.isEmpty(orderID)) {
    return { success: false, message: "Order ID is required" };
  }

  const requestData = {
    check_status: 1,
    order_id: orderID,
  };

  return postRequest("order-status", requestData);
};
