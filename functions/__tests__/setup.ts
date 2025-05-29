import './types';

jest.mock('firebase-admin', () => ({
  apps: [],
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
}));

jest.mock('firebase-functions', () => ({
  https: {
    HttpsError: class HttpsError extends Error {
      constructor(public code: string, message: string) {
        super(message);
        this.name = 'HttpsError';
      }
    },
  },
}));

jest.mock('../genkit', () => ({
  googleAIapiKey: 'mock-api-key',
  ai: {
    defineFlow: jest.fn(),
    prompt: jest.fn(),
  },
}));
