import { onCallGenkit } from 'firebase-functions/https'
import { googleAIapiKey } from './genkit'
import { helloGemini } from './genkit-flows/helloGeminiFlow'

const opts = { secrets: [googleAIapiKey], region: `asia-northeast1`, cors: true }

export const helloGenkit = onCallGenkit(opts, helloGemini)

