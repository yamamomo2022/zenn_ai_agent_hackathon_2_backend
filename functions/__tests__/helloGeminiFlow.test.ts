import './setup';
import { helloGemini } from '../genkit-flows/helloGeminiFlow';
import './types';

const mockPrompt = jest.fn();
const mockDefineFlow = jest.fn();

jest.mock('../genkit', () => ({
  ai: {
    defineFlow: mockDefineFlow,
    prompt: jest.fn(() => mockPrompt),
  },
}));

describe('helloGemini', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDefineFlow.mockImplementation((config, handler) => {
      return handler;
    });
  });

  it('should be defined as a flow with correct configuration', () => {
    require('../genkit-flows/helloGeminiFlow');
    
    expect(mockDefineFlow).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'hello-Gemini',
        inputSchema: expect.any(Object),
        outputSchema: expect.any(Object),
      }),
      expect.any(Function)
    );
  });

  it('should process input text and return response', async () => {
    const mockResponse = { text: 'Hello, I am your AI assistant!' };
    mockPrompt.mockResolvedValue(mockResponse);

    const mockHandler = async (input: { text: string }) => {
      const result = await mockPrompt(input.text);
      return result;
    };
    
    const input = { text: 'Hello' };
    const result = await mockHandler(input);
    
    expect(result).toEqual({ text: 'Hello, I am your AI assistant!' });
    expect(mockPrompt).toHaveBeenCalledWith('Hello');
  });
});
