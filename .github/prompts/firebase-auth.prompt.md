---
mode: agent
tools: ['codebase', 'editFiles', 'githubRepo', 'new']
description: A prompt for working with Firebase Authentication in the project
---

# Firebase Authentication Helper

I'll help you work with Firebase Authentication in the zenn_ai_agent_hackathon_2_backend project. This project uses:

- Firebase Admin SDK for authentication verification
- Firebase Cloud Functions with authenticated endpoints
- Service account credentials for Firebase Admin initialization

## Common Patterns

### Firebase Admin Initialization

The project initializes Firebase Admin in `firebaseAdmin.ts`:

```typescript
import * as admin from "firebase-admin";
import serviceAccountJson from "./service-account-key.json";

// Initialize Firebase Admin (if not already initialized)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountJson as admin.ServiceAccount),
  });
}
```

### Authentication Verification

The project uses a `verifyAuth` function to check if requests are authenticated:

```typescript
import * as functions from "firebase-functions";
import { CallableRequest } from 'firebase-functions/v2/https';

export const verifyAuth = (request: CallableRequest): void => {
  if (!request.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
  }
};
```

### Using Authentication in Functions

```typescript
import { onCall, CallableRequest } from 'firebase-functions/v2/https';
import { verifyAuth } from './firebaseAdmin';

export const myAuthenticatedFunction = onCall(
  { /* options */ },
  async (request: CallableRequest) => {
    // Verify authentication
    verifyAuth(request);
    
    // Access user ID
    const userId = request.auth.uid;
    
    // Function logic
    return { result: 'Success' };
  }
);
```

### Testing Authentication

```typescript
import * as functions from 'firebase-functions';
import { CallableRequest } from 'firebase-functions/v2/https';
import { verifyAuth } from '../firebaseAdmin';

describe('verifyAuth', () => {
  it('should pass when user is authenticated', () => {
    const mockRequest: Partial<CallableRequest> = {
      auth: { uid: 'test-uid', token: {} },
    };

    expect(() => verifyAuth(mockRequest as CallableRequest)).not.toThrow();
  });

  it('should throw HttpsError when user is not authenticated', () => {
    const mockRequest: Partial<CallableRequest> = {
      auth: undefined,
    };

    expect(() => verifyAuth(mockRequest as CallableRequest)).toThrow(
      functions.https.HttpsError
    );
  });
});
```

## Security Best Practices

1. Always verify authentication for all callable functions
2. Store service account credentials securely (as GitHub Secrets for CI/CD)
3. Use Firebase Security Rules for additional data access control
4. Implement proper error handling for authentication failures
5. Never expose sensitive user information in function responses
