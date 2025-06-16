import { onCall, CallableRequest } from 'firebase-functions/v2/https'
import { googleAIapiKey } from './genkit'
import { helloGemini } from './genkit-flows/helloGeminiFlow'
import { verifyAuth } from './firebaseAdmin'
import { helloImagen } from './genkit-flows/imagenFlow'
import { satelliteImage } from './genkit-flows/satelliteImageFlow'

const opts = { secrets: [googleAIapiKey], region: `asia-northeast1`, cors: true }

export const helloGenkit = onCall(
  opts,
  async (request: CallableRequest) => {
    verifyAuth(request);
    return await helloGemini(request.data);
  }
);

export const GenerateImagen = onCall(
  opts,
  async (request: CallableRequest) => {
    verifyAuth(request);
    return await helloImagen(request.data);
  }
);

export const GetSatelliteImage = onCall(
  opts,
  async (request: CallableRequest) => {
    verifyAuth(request);
    return await satelliteImage(request.data);
  }
);