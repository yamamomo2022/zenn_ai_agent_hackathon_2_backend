import { onCall, CallableRequest } from 'firebase-functions/v2/https'
import { googleAIapiKey } from './genkit'
import { helloGemini } from './genkit-flows/helloGeminiFlow'
import { verifyAuth } from './firebaseAdmin'
import { helloImagen } from './genkit-flows/imagenFlow'
import { geocoding } from './genkit-flows/geocodingFlow'
import { withErrorHandler } from './utils'

const opts = { secrets: [googleAIapiKey], region: `asia-northeast1`, cors: true }

export const helloGenkit = onCall(
  opts,
  withErrorHandler(async (request: CallableRequest) => {
    verifyAuth(request);
    return await helloGemini(request.data);
  })
);

export const GenerateImagen = onCall(
  opts,
  withErrorHandler(async (request: CallableRequest) => {
    verifyAuth(request);
    return await helloImagen(request.data);
  })
);

export const Geocoding = onCall(
  opts,
  withErrorHandler(async (request: CallableRequest) => {
    verifyAuth(request);
    return await geocoding(request.data);
  })
);