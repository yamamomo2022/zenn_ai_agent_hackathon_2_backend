import { onCall, CallableRequest} from 'firebase-functions/v2/https'
import { googleAIapiKey } from './genkit'
import { helloGemini } from './genkit-flows/helloGeminiFlow'
import { imageGeneration } from './genkit-flows/imageGenerationFlow'
import { verifyAuth } from './firebaseAdmin'

const opts = { secrets: [googleAIapiKey], region: `asia-northeast1`, cors: true }

export const helloGenkit = onCall(
  opts,
  async (request: CallableRequest) => {
    verifyAuth(request);
    return await helloGemini(request.data);
  }
);

export const generateImage = onCall(
  opts,
  async (request: CallableRequest) => {
    verifyAuth(request);
    return await imageGeneration(request.data);
  }
);