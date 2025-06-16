---
mode: agent
tools: ['codebase', 'editFiles', 'githubRepo', 'new']
description: A prompt for working with Genkit AI framework in the project
---

# Genkit AI Framework Helper

I'll help you develop with the Genkit AI framework for the zenn_ai_agent_hackathon_2_backend project. This project uses:

- Genkit for AI text generation
- Vertex AI integration for Google's Gemini models
- Firebase Functions for serverless execution

## Common Patterns

### Setting up Genkit

The project already has Genkit configured in `genkit.ts`:

```typescript
import { genkit } from 'genkit';
import { vertexAI } from '@genkit-ai/vertexai';
import { defineSecret } from 'firebase-functions/params';

// Define API key secret
export const googleAIapiKey = defineSecret('GOOGLE_GENAI_API_KEY');

// Initialize Genkit with Vertex AI
export const ai = genkit({
  plugins: [vertexAI()],
});
```

### Creating a Genkit Flow

To create a new AI flow:

```typescript
import { ai } from '../genkit';
import { z } from 'genkit';

export const myAIFlow = ai.defineFlow(
  {
    name: 'my-ai-flow',
    inputSchema: z.object({
      text: z.string(),
      // Add other input fields
    }),
    outputSchema: z.object({
      text: z.string(),
      // Add other output fields
    }),
  },
  async (input) => {
    // Get prompt from prompts directory
    const myPrompt = ai.prompt("myPromptName");
    
    // Process with AI
    const response = await myPrompt(input.text);
    
    // Return formatted response
    return { text: response.text };
  }
);
```

### Creating Prompt Files

Prompt files are stored in the `functions/prompts/` directory with the `.prompt` extension:

```yaml
---
model: vertexai/gemini-2.0-flash-lite
config:
  temperature: 1.4
  topK: 50
  topP: 0.4
  maxOutputTokens: 400
  stopSequences:
    - "<end>"
    - "<fin>"
---
Your prompt text goes here. This is what will be sent to the AI model.
```

### Using Prompts in Code

```typescript
// Import the AI instance
import { ai } from '../genkit';

// Load the prompt
const myPrompt = ai.prompt("myPromptName");

// Use the prompt with input
const response = await myPrompt("User input text");
```

## Testing Genkit Flows

```typescript
// Mock the AI instance
jest.mock('../genkit', () => ({
  ai: {
    defineFlow: jest.fn(),
    prompt: jest.fn(() => mockPrompt),
  },
}));

const mockPrompt = jest.fn();

// Test the flow
describe('myAIFlow', () => {
  it('should process input and return response', async () => {
    mockPrompt.mockResolvedValue({ text: 'AI response' });
    
    // Test implementation
  });
});
```

## Best Practices

1. Keep prompts in separate files for better organization
2. Use Zod schemas for type-safe input/output validation
3. Handle AI errors gracefully with appropriate error messages
4. Set appropriate model parameters (temperature, tokens) for your use case
