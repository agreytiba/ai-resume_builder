/** @format */

export type PaymentOptionsType = {
  customerName: string;
  customerEmail: string;
  amountToCharge: number;
  customerPhoneNumber: string;
};

export type RequestResponseType = {
  message: unknown;
  success: boolean;
};

export type ZenoPayOptionsType = {
  apiKey: string;
  secretKey: string;
  accountID: string;
};
