import { ai } from '../genkit';
import { z } from 'genkit';
import { verifyIdToken } from "../firebaseAdmin";

export const helloGemini = ai.defineFlow(
    {
        name: `hello-Gemini`,
        inputSchema: z.object({
            text: z.string(),
        }),
        outputSchema: z.object({
            text: z.string(),
        }),
    },
    async (input, context) => {

        const IdToken = context?.context?.auth?.authorization;
        console.log(`IdToken: ${IdToken}`);

    if (!IdToken) {
            throw new Error("Authentication information is missing.");
        }
        try {
            verifyIdToken(IdToken);
        } catch {
            throw new Error("Authentication failed.");
        }

        const helloGeminiPrompt = ai.prompt(input.text);
        const response = await helloGeminiPrompt();
        const output = {text: response.text }  // 認証済みのuidを出力に設定
        return output;
    }
)
