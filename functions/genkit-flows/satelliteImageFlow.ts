import { ai } from '../genkit';
import { z } from 'genkit';

export const satelliteImage = ai.defineFlow(
    {
        name: `satellite-image`,
        inputSchema: z.object({
            latitude: z.number(),
            longitude: z.number(),
            zoom: z.number().default(15),
            size: z.string().default("600x400"),
        }),
        outputSchema: z.object({
            imageBase64: z.string(),
            coordinates: z.object({
                latitude: z.number(),
                longitude: z.number(),
            }),
        }),
    },
    async (input) => {
        const { latitude, longitude, zoom, size } = input;

        // Google Maps Static API URL construction
        const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

        if (!googleMapsApiKey) {
            throw new Error('Google Maps API key not configured');
        }

        const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
        const params = new URLSearchParams({
            center: `${latitude},${longitude}`,
            zoom: zoom.toString(),
            size: size,
            maptype: 'satellite',
            format: 'png',
            key: googleMapsApiKey,
        });

        const imageUrl = `${baseUrl}?${params.toString()}`;

        // Fetch the image and convert to base64
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch satellite image: ${response.status} ${response.statusText}`);
        }

        const imageBuffer = await response.arrayBuffer();
        const imageBase64 = Buffer.from(imageBuffer).toString('base64');

        return {
            imageBase64,
            coordinates: {
                latitude,
                longitude,
            },
        };
    }
)