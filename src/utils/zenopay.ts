/** @format */

import {
  PaymentOptionsType,
  RequestResponseType,
  ZenoPayOptionsType,
} from "./validation";
import qs from "qs";
import axios, { AxiosResponse } from "axios";
import { string, number, email } from "fast-web-kit";

class ZenoPay {
  // Class properties
  private apiKey: string; // API key for authenticating requests.
  private baseURL: string | undefined; // Base URL for the ZenoPay API.
  private secretKey: string; // Secret key for secure API requests.
  private accountID: string; // Unique identifier for the ZenoPay account.
  private headers: { headers: { "Content-Type": string } }; // HTTP headers for API requests.

  /**
   * Initializes a new instance of the ZenoPay class.
   * @param zenoPayOptions - Configuration options including API key, secret key, and account ID.
   */
  constructor(zenoPayOptions: ZenoPayOptionsType) {
    this.apiKey = zenoPayOptions.apiKey;
    this.secretKey = zenoPayOptions.secretKey;
    this.accountID = zenoPayOptions.accountID;
    this.baseURL = process.env.NEXT_PUBLIC_API_URL;
    this.headers = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // API requires form-encoded data.
      },
    };
  }

  /**
   * Handles making POST requests to the ZenoPay API.
   * @param route - API endpoint route.
   * @param requestData - Data to send with the request.
   * @returns A promise resolving to the API response.
   */
  private postRequest = async (
    route: string,
    requestData: Record<string, string | number>,
  ): Promise<RequestResponseType> => {
    try {
      // Convert request data to query string format.
      const newData = qs.stringify(requestData);

      // console.log(`data in post`);
      const response: AxiosResponse = await axios.post(
        `${this.baseURL}/${route}`,
        newData,
        this.headers,
      );

      // console.log(`response: `, response);
      const { status, ...responseData } = response.data;

      // Return success or failure based on the API response status.
      if (status === "success") {
        return { success: true, message: responseData };
      }

      return { success: false, message: responseData.message as string };
    } catch (error) {
      // Handle errors and return a failure response with the error message.
      return { success: false, message: (error as Error).message };
    }
  };

  /**
   * Initiates a payment request.
   * @param paymentOptions - Details of the payment including customer info and amount.
   * @returns A promise resolving to the payment API response.
   */
  public Pay = async (
    paymentOptions: PaymentOptionsType,
  ): Promise<RequestResponseType> => {
    // console.log(paymentOptions);
    try {
      // Validate required payment details.
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

      // Construct the request payload for the API.
      const requestData = {
        create_order: 1,
        api_key: this.apiKey,
        account_id: this.accountID,
        secret_key: this.secretKey,
        amount: paymentOptions.amountToCharge,
        buyer_name: paymentOptions.customerName,
        buyer_email: paymentOptions.customerEmail,
        buyer_phone: paymentOptions.customerPhoneNumber,
      };
      // console.log(`payData :`, requestData);
      // Make the API call and return the response.
      return this.postRequest("", requestData);
    } catch (error) {
      // Handle errors and return a failure response.
      return { success: false, message: (error as Error).message };
    }
  };

  /**
   * Checks the status of a payment using its order ID.
   * @param orderID - The unique identifier of the order.
   * @returns A promise resolving to the payment status API response.
   */
  public CheckPaymentStatus = async (
    orderID: string,
  ): Promise<RequestResponseType> => {
    try {
      // Validate the order ID.
      if (string.isEmpty(orderID)) {
        return { success: false, message: "Order ID is required" };
      }

      // Construct the request payload for the API.
      const requestData = {
        check_status: 1,
        order_id: orderID,
      };

      // Make the API call and return the response.
      return this.postRequest("order-status", requestData);
    } catch (error) {
      // Handle errors and return a failure response.
      return { success: false, message: (error as Error).message };
    }
  };
}

export default ZenoPay;
