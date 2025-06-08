import { ai } from '../genkit';
import { z } from 'genkit';

export const helloImagen = ai.defineFlow(
    {
        name: `hello-Imagen`,
        inputSchema: z.object({
            prompt: z.string(),
        }),
        outputSchema: z.any(),
    },
    async (input) => {
        const helloImagenPrompt = ai.prompt("helloImagen");
        const media = helloImagenPrompt(input);
        return media;
    }
)