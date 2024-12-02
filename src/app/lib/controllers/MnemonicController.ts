import { MnemonicRequest, MnemonicResponse } from "@/app/types/mnemonic";

const PROXY_URL = "https://chatcfapi.r12.top/v1/chat/completions";

export class MnemonicController {
  private createListMnemonicPrompt(items: string): string {
    return `Generate a mnemonic device to help memorize this list: ${items}

Output only the following, with no additional explanation:
1. Memorable acronym: [Your acronym here]
2. Easy-to-remember phrase: [Your phrase here]

Example format:
1. Memorable acronym: HOMES
2. Easy-to-remember phrase: Harry Orders More Eggs Soon`;
  }

  private createSequentialProcessPrompt(steps: string): string {
    return `Create a mnemonic to remember this sequence: ${steps}

Output only the following, with no additional explanation:
1. Letter-based sentence: [Your sentence here]
2. Visual connection: [Your brief visual chain here]

Example format:
1. Letter-based sentence: Pretty Monkeys Act Tired
2. Visual connection: Picture -> Mirror -> Arrow -> Target`;
  }

  private determinePromptType(input: string): string {
    const processKeywords = [
      "steps",
      "process",
      "sequence",
      "phases",
      "stages",
    ];
    const isProcess = processKeywords.some((keyword) =>
      input.toLowerCase().includes(keyword)
    );

    if (isProcess) {
      return this.createSequentialProcessPrompt(input);
    } else {
      return this.createListMnemonicPrompt(input);
    }
  }

  public async generateMnemonic(
    request: MnemonicRequest
  ): Promise<MnemonicResponse> {
    const { prompt } = request;

    if (!prompt || prompt.trim() === "") {
      throw new Error("Please provide input to generate a mnemonic");
    }

    const systemPrompt = `You are an expert mnemonic device creator. Your responses should be clear, concise, and follow the exact format requested. Do not include any explanations or additional text beyond the numbered format provided.`;

    const mnemonicPrompt = this.determinePromptType(prompt);

    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: mnemonicPrompt,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    };

    try {
      const response = await fetch(PROXY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Proxy API Error:", errorData);
        throw new Error("Failed to generate mnemonic");
      }

      const data = await response.json();
      return { mnemonic: data.choices[0].message.content?.trim() };
    } catch (error) {
      console.error("Mnemonic Generation Error:", error);
      throw error;
    }
  }
}

export const mnemonicController = new MnemonicController();
