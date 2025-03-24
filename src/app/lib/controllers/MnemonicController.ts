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
      context: "To remember the first ten elements of the periodic table",
      input:
        "Hydrogen, Helium, Lithium, Beryllium, Boron, Carbon, Nitrogen, Oxygen, Fluorine, Neon",
      expected:
        "Happy Henry Likes Beans Brown, Crispy, Not Overly Fried, Nonetheless",
    },
    {
      context: "To remember lakes according to their flow from West to East",
      input: "Superior, Michigan, Huron, Erie, Ontario",
      expected: "Superman Helps Everyone",
    },
    {
      context: "To remember the planets in order",
      input: "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune",
      expected: "My Very Energetic Mother Just Served Us Noodles",
    },
    {
      context: "To remember the taxonomy hierarchy",
      input: "Kingdom, Phylum, Class, Order, Family, Genus, Species",
      expected: "Keep Pots Clean, Otherwise Family Gets Sick",
    },
    {
      context: "To remember state functions",
      input: "Enthalpy, Entropy, Gibbs free energy, Heat, Temperature",
      expected: "Elephant has Short Green Tongue",
    },
    {
      context: "To remember steps in the Krebs cycle",
      input:
        "Citrate, Isocitrate, α-Ketoglutarate, Succinyl-CoA, Succinate, Fumarate, Malate, Oxaloacetate",
      expected: "Clever Insects Keep Showing Such Funny Moving Objects",
    },
  ];

  constructor() {
    const apiKey = process.env.GEMINIAI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }
    this.apiKey = apiKey;
  }

  private cleanInput(input: string): string[] {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  private selectRelevantExamples(input: string): ExamplePrompt[] {
    const inputLength = this.cleanInput(input).length;
    const examples = [...this.examples].sort((a, b) => {
      const aDiff = Math.abs(this.cleanInput(a.input).length - inputLength);
      const bDiff = Math.abs(this.cleanInput(b.input).length - inputLength);
      return aDiff - bDiff;
    });

    return examples.slice(0, 2);
  }

  private createFewShotPrompt(input: string): string {
    const selectedExamples = this.selectRelevantExamples(input);
    const examples = selectedExamples
      .map(
        (example) => `Context: ${example.context}
Input: ${example.input}
Expected Mnemonic: ${example.expected}
---`
      )
      .join("\n\n");

    const items = this.cleanInput(input);

    if (items.length === 0) {
      throw new Error("Please provide valid input items separated by commas");
    }

    const firstLetters = items.map((item) => item[0].toUpperCase()).join("");

    return `Create a simple, easy-to-remember mnemonic device.

Given these example mnemonics:

${examples}

For this list: ${items.join(", ")}

The first letters are: ${firstLetters}

Requirements:
1. Create a simple sentence using common, everyday words
2. Each word should start with one of these letters in order: ${firstLetters}
3. The sentence should:
   - Be easy to remember
   - Use simple, familiar words
   - Make sense as a complete thought (even if silly or imaginative)
   - Ideally have the same number of words as the input items (${items.length})
4. Avoid:
   - Complex or technical terms
   - Subject-specific terminology
   - Overly long sentences

Output format:
Mnemonic: [Your simple, memorable sentence]

Remember: Simpler is better. Think everyday situations, common objects, or familiar activities.`;
  }

  private async callGeminiAPI(prompt: string): Promise<string> {
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent";
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
        maxOutputTokens: 300,
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
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("Invalid response format from Gemini API");
      }

      return text;
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  }

  public async generateMnemonic(
    request: MnemonicRequest
  ): Promise<MnemonicResponse> {
    const { prompt } = request;
    if (!prompt?.trim()) {
      throw new Error("Please provide input to generate a mnemonic");
    }

    try {
      const response = await this.callGeminiAPI(
        this.createFewShotPrompt(prompt)
      );

      const mnemonicMatch = response.match(/Mnemonic:\s*(.+)/i);
      if (!mnemonicMatch) {
        throw new Error("Response does not contain a valid mnemonic.");
      }

      return {
        mnemonic: mnemonicMatch[1].trim(),
      };
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }
  }
}

export const mnemonicController = new MnemonicController();
