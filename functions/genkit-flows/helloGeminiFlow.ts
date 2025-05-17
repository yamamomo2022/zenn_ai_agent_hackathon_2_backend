import { ai } from '../genkit';
import { z } from 'genkit';


export const helloGemini = ai.defineFlow(
    {
        name: `hello-Gemini`,
        outputSchema: z.object({
            text: z.string(),
        }),
    },
    async () => {

        const helloGeminiPrompt = ai.prompt('helloGemini');
        const response = await helloGeminiPrompt();
        const output = { text: response.text }
        return output;
    }
)
