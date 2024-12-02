import { NextRequest, NextResponse } from "next/server";
import { mnemonicController } from "../../lib/controllers/MnemonicController";
import { MnemonicRequest } from "@/app/types/mnemonic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const mnemonicRequest: MnemonicRequest = {
      prompt: body.prompt,
    };

    const result = await mnemonicController.generateMnemonic(mnemonicRequest);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate mnemonic",
      },
      { status: 500 }
    );
  }
}
