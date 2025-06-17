import { onCall, CallableRequest } from 'firebase-functions/v2/https'
import { googleAIapiKey } from './genkit'
import { helloGemini } from './genkit-flows/helloGeminiFlow'
import { verifyAuth } from './firebaseAdmin'
import { helloImagen } from './genkit-flows/imagenFlow'
import { locationToCoordinates } from './genkit-flows/locationToCoordinatesFlow'

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

export const GetLocationCoordinates = onCall(
  opts,
  async (request: CallableRequest) => {
    verifyAuth(request);
    return await locationToCoordinates(request.data);
  }
);