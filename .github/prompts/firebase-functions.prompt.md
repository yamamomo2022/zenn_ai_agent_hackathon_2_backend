---
mode: agent
tools: githubRepo, terminalLastCommand
description: A prompt for working with Firebase Cloud Functions in TypeScript
---

# Firebase Cloud Functions Helper

I'll help you develop Firebase Cloud Functions for the zenn_ai_agent_hackathon_2_backend project. This project uses:

- Firebase Cloud Functions v2 with TypeScript
- Genkit AI framework for AI text generation
- Firebase Admin SDK for authentication

## Common Patterns

### Creating a new Cloud Function

```typescript
import { onCall, CallableRequest } from 'firebase-functions/v2/https';
import { verifyAuth } from './firebaseAdmin';
import { defineSecret } from 'firebase-functions/params';

// Define secrets if needed
const mySecret = defineSecret('MY_SECRET_NAME');

// Define function options
const opts = { 
  secrets: [mySecret], 
  region: 'asia-northeast1', 
  cors: true 
};

// Create and export the function
export const myFunction = onCall(
  opts,
  async (request: CallableRequest) => {
    // Verify authentication
    verifyAuth(request);
    
    // Function logic here
    const { data } = request;
    
    // Return response
    return { result: 'Success' };
  }
);
```

### Authentication Verification

Always use the `verifyAuth` function to check authentication:

```typescript
import { verifyAuth } from './firebaseAdmin';

// In your function
verifyAuth(request);
```

### Error Handling

Use Firebase HttpsError for proper error responses:

```typescript
import * as functions from 'firebase-functions';

try {
  // Your code
} catch (error) {
  throw new functions.https.HttpsError(
    'internal', // Error code
    'An error occurred', // Error message
    { details: error } // Optional details
  );
}
```

## Testing

Use Jest for testing Firebase Functions:

```typescript
// Mock dependencies
jest.mock('../firebaseAdmin', () => ({
  verifyAuth: jest.fn(),
}));

// Test the function
describe('myFunction', () => {
  it('should handle valid requests', async () => {
    const mockRequest = {
      auth: { uid: 'test-uid' },
      data: { /* test data */ },
    };
    
    // Test implementation
  });
});
```

## Deployment

The project uses GitHub Actions for CI/CD. Functions are automatically deployed when changes are merged to main.
