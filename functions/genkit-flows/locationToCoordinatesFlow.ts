import { ai } from '../genkit';
import { z } from 'genkit';

export const locationToCoordinates = ai.defineFlow(
    {
        name: `location-to-coordinates`,
        inputSchema: z.object({
            locationName: z.string().describe('The name of the location to convert to coordinates'),
        }),
        outputSchema: z.object({
            locationName: z.string().describe('The original location name'),
            latitude: z.number().describe('The latitude of the location'),
            longitude: z.number().describe('The longitude of the location'),
        }),
    },
    async (input) => {
        const locationToCoordinatesPrompt = ai.prompt("locationToCoordinates");
        const response = await locationToCoordinatesPrompt(input);
        
        // Parse the response to extract latitude and longitude
        const coordinates = JSON.parse(response.text);
        
        const output = {
            locationName: input.locationName,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
        };
        
        return output;
    }
)