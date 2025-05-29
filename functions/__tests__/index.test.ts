import './setup';
import { CallableRequest } from 'firebase-functions/v2/https';
import './types';

const mockVerifyAuth = jest.fn();
const mockHelloGemini = jest.fn();

jest.mock('../firebaseAdmin', () => ({
  verifyAuth: mockVerifyAuth,
}));

jest.mock('../genkit-flows/helloGeminiFlow', () => ({
  helloGemini: mockHelloGemini,
}));

jest.mock('firebase-functions/v2/https', () => ({
  onCall: jest.fn((opts, handler) => handler),
  CallableRequest: jest.fn(),
}));

describe('helloGenkit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call verifyAuth and helloGemini in sequence', async () => {
    const mockRequest: Partial<CallableRequest> = {
      auth: { uid: 'test-uid', token: {} as any }, // Cast to any to bypass type checking
      data: { text: 'test input' },
    };

    const expectedResponse = { text: 'AI response' };
    mockHelloGemini.mockResolvedValue(expectedResponse);

    const { helloGenkit } = require('../index');
    
    const result = await helloGenkit(mockRequest as CallableRequest);

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

    const { helloGenkit } = require('../index');

    await expect(helloGenkit(mockRequest as CallableRequest)).rejects.toThrow('Authentication failed');
    expect(mockVerifyAuth).toHaveBeenCalledWith(mockRequest);
    expect(mockHelloGemini).not.toHaveBeenCalled();
  });
});
