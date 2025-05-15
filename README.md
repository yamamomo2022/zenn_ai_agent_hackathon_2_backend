# zenn_ai_agent_hackathon_2_backend

zenn_ai_agent_hackathon_2のバックエンドです。

## HelloFlow Implementation

This project demonstrates the use of Genkit Flow with prompt files for better readability and maintainability of prompt engineering.

### Project Structure

- `src/index.ts`: Main entry point that implements the HelloFlow
- `prompts/hello.prompt`: Prompt file for the HelloFlow

### How It Works

The HelloFlow is defined using a prompt file (`hello.prompt`) instead of hardcoding prompts in the code. This approach improves:

1. **Readability**: Prompts are separated from code logic
2. **Maintainability**: Prompts can be updated without changing code
3. **Reusability**: Prompts can be reused across different flows

### Running the Project

```bash
npm install
npm start
```

### Implementation Details

The HelloFlow:
1. Takes a name as input
2. Uses the HelloPrompt from the prompt file to generate a greeting
3. Returns the greeting as output

This demonstrates how to use prompt files with Genkit Flow for better prompt engineering practices.
