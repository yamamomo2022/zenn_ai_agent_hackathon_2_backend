import { ai } from '../genkit';
import { z } from 'genkit';

export const imageGeneration = ai.defineFlow(
    {
        name: `image-generation`,
        inputSchema: z.object({
            prompt: z.string().describe('The prompt to generate an image from'),
        }),
        outputSchema: z.object({
            imageUrl: z.string().describe('The URL of the generated image'),
        }),
    },
    async (input) => {
        // Use the imageGeneration prompt with Imagen 3
        const imageGenerationPrompt = ai.prompt("imageGeneration");
        
        // Generate the image using the provided prompt
        const response = await imageGenerationPrompt({
            prompt: input.prompt
        });
        
        // Return the URL of the generated image
        return {
            imageUrl: response.imageUrl,
        };
    }
);