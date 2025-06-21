import { ai } from '../genkit';
import { z } from 'genkit';

export const geocoding = ai.defineFlow(
    {
        name: `geocoding`,
        inputSchema: z.object({
            locationName: z.string(),
        }),
        outputSchema: z.object({
            latitude: z.number(),
            longitude: z.number(),
        }),
    },
    async (input) => {
        const geocodingPrompt = ai.prompt("geocoding");
        const response = await geocodingPrompt(input);

        // JSONレスポンスをパース
        const parsedResponse = JSON.parse(response.text);

        return {
            latitude: parsedResponse.latitude,
            longitude: parsedResponse.longitude,
        };
    }
)