import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing payment verification fields" },
        { status: 400 }
      );
    }

    if (!orderData) {
      return NextResponse.json(
        { error: "Missing order data" },
        { status: 400 }
      );
    }

    // Verify signature using HMAC SHA256
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed — invalid signature" },
        { status: 400 }
      );
    }

    // Signature valid — save order to database as "paid"
    const { data, error } = await supabaseAdmin.from("orders").insert({
      customer_name: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      razorpay_order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      payment_method: "online",
      amount: orderData.amount,
      status: "paid",
    }).select().single();

    if (error) {
      console.error("Database Error:", error);
      return NextResponse.json(
        { error: "Failed to save order to database" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and order saved",
      order: data,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Payment verification failed",
      },
      { status: 500 }
    );
  }
}
