import './setup';
import { CallableRequest } from 'firebase-functions/v2/https';
import './types';
import * as admin from 'firebase-admin';

const mockVerifyAuth = jest.fn();
const mockHelloGemini = jest.fn();

jest.mock('../firebaseAdmin', () => ({
  verifyAuth: mockVerifyAuth,
}));

jest.mock('../genkit-flows/helloGeminiFlow', () => ({
  helloGemini: mockHelloGemini,
}));

const mockHandler = jest.fn();
jest.mock('firebase-functions/v2/https', () => ({
  onCall: jest.fn(() => mockHandler),
  CallableRequest: jest.fn(),
}));

describe('helloGenkit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockHandler.mockImplementation(async (request: CallableRequest) => {
      mockVerifyAuth(request);
      return await mockHelloGemini(request.data);
    });
  });

  it('should call verifyAuth and helloGemini in sequence', async () => {
    const mockRequest: Partial<CallableRequest> = {
      auth: { uid: 'test-uid', token: {} as admin.auth.DecodedIdToken },
      data: { text: 'test input' },
    };

    const expectedResponse = { text: 'AI response' };
    mockHelloGemini.mockResolvedValue(expectedResponse);
    
    const result = await mockHandler(mockRequest as CallableRequest);

    expect(mockVerifyAuth).toHaveBeenCalledWith(mockRequest);
    expect(mockHelloGemini).toHaveBeenCalledWith({ text: 'test input' });
    expect(result).toEqual(expectedResponse);
  });

  it('should propagate authentication errors', async () => {
    const mockRequest: Partial<CallableRequest> = {
      auth: undefined,
      data: { text: 'test input' },
    };

    const authError = new Error('Authentication failed');
    mockVerifyAuth.mockImplementation(() => {
      throw authError;
    });

    await expect(mockHandler(mockRequest as CallableRequest)).rejects.toThrow('Authentication failed');
    expect(mockVerifyAuth).toHaveBeenCalledWith(mockRequest);
    expect(mockHelloGemini).not.toHaveBeenCalled();
  });
});
