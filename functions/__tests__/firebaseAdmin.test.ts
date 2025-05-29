import './setup';
import { verifyAuth } from '../firebaseAdmin';
import * as functions from 'firebase-functions';
import { CallableRequest } from 'firebase-functions/v2/https';
import './types';
import * as admin from 'firebase-admin';

describe('verifyAuth', () => {
  it('should pass when user is authenticated', () => {
    const mockRequest: Partial<CallableRequest> = {
      auth: {
        uid: 'test-uid',
        token: {} as admin.auth.DecodedIdToken,
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
      expect((error as functions.https.HttpsError).code).toBe('unauthenticated');
      expect((error as functions.https.HttpsError).message).toBe('User is not authenticated');
    }
  });
});
