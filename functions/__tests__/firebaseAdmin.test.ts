import './setup';
import { verifyAuth } from '../firebaseAdmin';
import * as functions from 'firebase-functions';
import { CallableRequest } from 'firebase-functions/v2/https';
import './types';

describe('verifyAuth', () => {
  it('should pass when user is authenticated', () => {
    const mockRequest: Partial<CallableRequest> = {
      auth: {
        uid: 'test-uid',
        token: {} as any, // Cast to any to bypass type checking
      },
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

  it('should throw error with correct code and message', () => {
    const mockRequest: Partial<CallableRequest> = {
      auth: undefined, // Changed from null to undefined to match the type
    };

    try {
      verifyAuth(mockRequest as CallableRequest);
    } catch (error) {
      expect(error).toBeInstanceOf(functions.https.HttpsError);
      expect((error as any).code).toBe('unauthenticated');
      expect((error as any).message).toBe('User is not authenticated');
    }
  });
});
