import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderData } = body;

    // Validate required fields
    if (
      !orderData?.customerName ||
      !orderData?.email ||
      !orderData?.phone ||
      !orderData?.address ||
      !orderData?.amount
    ) {
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderData.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Basic phone validation (Indian numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(orderData.phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Save COD order to database
    const { data, error } = await supabaseAdmin.from("orders").insert({
      customer_name: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      razorpay_order_id: null,
      payment_id: null,
      payment_method: "COD",
      amount: orderData.amount,
      status: "pending",
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
      message: "COD order placed successfully",
      order: data,
    });
  } catch (error) {
    console.error("COD Order Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create COD order",
      },
      { status: 500 }
    );
  }
}
