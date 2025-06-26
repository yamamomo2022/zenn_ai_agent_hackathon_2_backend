import { ai } from '../genkit';
import { z } from 'genkit';
import { geocoding } from './geocodingFlow';
import { satelliteImage } from './satelliteImageFlow';

export const satelliteImageByLocation = ai.defineFlow(
    {
        name: `satellite-image-by-location`,
        inputSchema: z.object({
            locationName: z.string(),
            zoom: z.number().default(15),
            size: z.string().default("600x400"),
        }),
        outputSchema: z.object({
            imageBase64: z.string(),
            coordinates: z.object({
                latitude: z.number(),
                longitude: z.number(),
            }),
            locationName: z.string(),
        }),
    },
    async (input) => {
        try {
            // Step 1: Get coordinates from location name using geocoding flow
            const coordinates = await geocoding({ locationName: input.locationName });
            
            // Step 2: Get satellite image using the coordinates
            const satelliteResult = await satelliteImage({
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                zoom: input.zoom,
                size: input.size,
            });
            
            // Step 3: Return combined result
            return {
                imageBase64: satelliteResult.imageBase64,
                coordinates: satelliteResult.coordinates,
                locationName: input.locationName,
            };
        } catch (error) {
            // Enhanced error handling
            if (error instanceof Error) {
                if (error.message.includes('geocoding') || error.message.includes('coordinates')) {
                    throw new Error(`地名「${input.locationName}」の座標を取得できませんでした: ${error.message}`);
                } else if (error.message.includes('Maps API') || error.message.includes('satellite')) {
                    throw new Error(`衛星画像の取得に失敗しました: ${error.message}`);
                }
            }
            throw new Error(`衛星画像の取得処理でエラーが発生しました: ${error}`);
        }
    }
)