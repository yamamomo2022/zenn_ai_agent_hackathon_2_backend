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

        if (!IdToken) {
            throw new Error("Authentication information is missing.");
        }
        try {
            await verifyIdToken(IdToken);
        } catch {
            throw new Error("Authentication failed.");
        }

        const helloGeminiPrompt = ai.prompt(input.text);
        const response = await helloGeminiPrompt();
        const output = {text: response.text };
        return output;
    }
)
