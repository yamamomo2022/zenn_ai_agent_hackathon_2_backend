import * as functions from "firebase-functions";
import { onCall, CallableOptions, CallableRequest, CallableResponse } from 'firebase-functions/v2/https'
import { googleAIapiKey } from './genkit'
import { helloGemini } from './genkit-flows/helloGeminiFlow'

const opts = { secrets: [googleAIapiKey], region: `asia-northeast1`, cors: true }

export const helloGenkit = onCall(
  opts,
  async (request: CallableRequest) => {
    if (!request.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
    }
    return helloGemini();
  }
);