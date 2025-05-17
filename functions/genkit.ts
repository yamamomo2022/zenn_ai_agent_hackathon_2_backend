import { genkit } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';
import { defineSecret } from 'firebase-functions/params'
import { enableGoogleCloudTelemetry } from '@genkit-ai/google-cloud'
import { logger } from 'genkit/logging'

logger.setLogLevel(`debug`)

enableGoogleCloudTelemetry()

export const googleAIapiKey = defineSecret(`GOOGLE_GENAI_API_KEY`)

export const ai = genkit({
  plugins: [vertexAI()],
});

