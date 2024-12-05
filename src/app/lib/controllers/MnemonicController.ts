import { MnemonicRequest, MnemonicResponse } from "@/app/types/mnemonic";

interface ExamplePrompt {
  context: string;
  input: string;
  expected: string;
}

export class MnemonicController {
  private apiKey: string;
  private readonly examples: ExamplePrompt[] = [
    {
      context: "To remember the first 10 elements of the periodic table",
      input:
        "Hydrogen (H), Helium (He), Lithium (Li), Beryllium (Be), Boron (B), Carbon (C), Nitrogen (N), Oxygen (O), Fluorine (F), and Neon (Ne)",
      expected: "Hi Hello Listen B B C News On Friday Night",
    },
    {
      context: "To remember lakes according to their flow from West to East",
      input: "Superior, Michigan, Huron, Erie, Ontario",
      expected: "Superman Helps Everyone",
    },
    {
      context: "To remember the planets in order",
      input:
        "M-Mercury, V-Venus, E-Earth, M-Mars, J-Jupiter, S-Saturn, U-Uranus, N-Neptune",
      expected: "My Very Energetic Mother Just Served Us Noodles",
    },
  ];

  constructor() {
    const apiKey = process.env.GEMINIAI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }
    this.apiKey = apiKey;
  }

  private createFewShotPrompt(input: string, isSequential: boolean): string {
    const examples = this.examples
      .map(
        (example) => `Context: ${example.context}
Input: ${example.input}
Expected Mnemonic: ${example.expected}
---`
      )
      .join("\n\n");

    const firstLetters = input
      .split(",")
      .map((item) => item.trim()[0].toUpperCase())
      .join("");

    const promptTemplate = isSequential
      ? `Given these example mnemonics:

${examples}

Now, create a mnemonic device for remembering this sequence: ${input}

Requirements:
1. Create a sentence where each word starts with the same letter as the sequence in order (${firstLetters})
2. Make it memorable and easy to recall
3. Ensure it follows the style of the examples above

Output format:
Letter-Based Sentence: [creative sentence with words starting with ${firstLetters}]`
      : `Given these example mnemonics:

${examples}

Now, create a mnemonic for this list: ${input}

Requirements:
1. Create an acronym using the first letters of each item (${firstLetters})
2. Create a memorable sentence where each word starts with the letters of the acronym
3. Ensure it follows the style of the examples above

Output format:
Acronym: [acronym from ${firstLetters}]
Sentence: [creative and memorable sentence using the acronym]`;

    return promptTemplate;
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
    return this.createFewShotPrompt(input, isProcess);
  }

  private async callGeminiAPI(prompt: string): Promise<string> {
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    const payload = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 200,
      },
    };

    try {
      const response = await fetch(`${url}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Gemini API Error: ${errorData.error?.message || "Unknown error"}`
        );
      }

      const data = await response.json();
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error("Invalid response format from Gemini API");
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }

  public async generateMnemonic(
    request: MnemonicRequest
  ): Promise<MnemonicResponse> {
    const { prompt } = request;
    if (!prompt?.trim()) {
      throw new Error("Please provide input to generate a mnemonic");
    }

    const systemContext =
      "You are an expert mnemonic device creator. Your task is to create mnemonic devices that are strictly based on the input format and follow the style of the provided examples.";

    const fullPrompt = `${systemContext}\n\n${this.determinePromptType(
      prompt
    )}`;

    try {
      const response = await this.callGeminiAPI(fullPrompt);
      if (!response.match(/Acronym:|Letter-Based Sentence:/)) {
        throw new Error("Response does not match expected mnemonic format.");
      }

      return {
        mnemonic: response.trim(),
      };
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  }
}

export const mnemonicController = new MnemonicController();
