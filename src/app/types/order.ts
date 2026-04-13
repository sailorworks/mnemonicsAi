export type PaymentMethod = "online" | "COD";
export type OrderStatus = "paid" | "pending" | "failed";

export interface OrderData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  amount: number;
  paymentMethod: PaymentMethod;
}

export interface Order extends OrderData {
  id: string;
  razorpayOrderId: string | null;
  paymentId: string | null;
  status: OrderStatus;
  createdAt: string;
}

export interface CreateOrderResponse {
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  key: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderData: OrderData;
}
