import Razorpay from "razorpay";

// Lazy singleton — only initializes when first called at runtime,
// so the build doesn't crash when env vars aren't set yet.
let razorpayInstance: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (razorpayInstance) return razorpayInstance;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      "Missing Razorpay environment variables: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET"
    );
  }

  razorpayInstance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  return razorpayInstance;
}
