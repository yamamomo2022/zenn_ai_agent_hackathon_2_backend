import { ai } from '../genkit';
import { z } from 'genkit';

export const helloImagen = ai.defineFlow(
    {
        name: `hello-Imagen`,
        inputSchema: z.object({
            prompt: z.string(),
        }),
        outputSchema: z.object({
            base64Image: z.string(),
            mimeType: z.string(),
        }),
    },
    async (input) => {
        const helloImagenPrompt = ai.prompt("helloImagen");
        const response = await helloImagenPrompt(input);

        // レスポンスからメディアデータを取得
        if (response.media) {
            const mediaItem = response.media;

            if (mediaItem.url) {
                // URLから画像データを取得してbase64に変換
                const imageResponse = await fetch(mediaItem.url);
                const arrayBuffer = await imageResponse.arrayBuffer();
                const base64 = Buffer.from(arrayBuffer).toString('base64');

                return {
                    base64Image: base64,
                    mimeType: mediaItem.contentType || 'image/png'
                };
            }
        }

        throw new Error('画像の生成に失敗しました');
    }
)