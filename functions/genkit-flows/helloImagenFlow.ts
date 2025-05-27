import { ai } from '../genkit';
import { z } from 'genkit';

interface ImageResponse {
    bytesBase64Encoded: string;
    mimeType: string;
}

export const helloImagen = ai.defineFlow(
    {
        name: `hello-Imagen`,
        inputSchema: z.object({
            prompt: z.string(),
            aspectRatio: z.string().optional(),
            sampleCount: z.number().optional(),
        }),
        outputSchema: z.object({
            images: z.array(z.object({
                bytesBase64Encoded: z.string(),
                mimeType: z.string(),
            })),
        }),
    },
    async (input) => {
        const helloImagenPrompt = ai.prompt("helloImagen");
        
        const response = await helloImagenPrompt(input.prompt);
        
        const images: ImageResponse[] = [];
        
        const customData = response.custom as any;
        
        if (customData) {
            if (customData.bytesBase64Encoded) {
                images.push({
                    bytesBase64Encoded: customData.bytesBase64Encoded,
                    mimeType: customData.mimeType || 'image/png'
                });
            } 
            else if (Array.isArray(customData.images)) {
                customData.images.forEach((image: any) => {
                    if (image.bytesBase64Encoded) {
                        images.push({
                            bytesBase64Encoded: image.bytesBase64Encoded,
                            mimeType: image.mimeType || 'image/png'
                        });
                    }
                });
            }
        }
        
        return { images };
    }
)
