import { z, genkit } from 'genkit';
import { vertexAI, gemini20FlashLite } from '@genkit-ai/vertexai';
import { onCallGenkit } from 'firebase-functions/https'
import { defineSecret } from 'firebase-functions/params'
import { enableGoogleCloudTelemetry } from '@genkit-ai/google-cloud'
import { logger } from 'genkit/logging'

logger.setLogLevel(`debug`)

enableGoogleCloudTelemetry()

const googleAIapiKey = defineSecret(`GOOGLE_GENAI_API_KEY`)

const ai = genkit({
  plugins: [vertexAI()],
  model: gemini20FlashLite,
});

const helloGemini = ai.defineFlow(
  {
    name: `hello-Gemini`,
    outputSchema: z.object({
      text: z.string(),
    }),
  },
  async () => {
        try {
            const { text } = await ai.generate(`Hello, Gemini!`);
            const output = {text: text}
            return output;
        } catch (error) {
            logger.error("Error in helloGemini flow", error);
            throw new Error(`Failed to generate output: ${error}`);
        }  }
)

const opts = { secrets: [googleAIapiKey], region: `asia-northeast1`, cors: true }

export const helloGenkit = onCallGenkit(opts, helloGemini)

