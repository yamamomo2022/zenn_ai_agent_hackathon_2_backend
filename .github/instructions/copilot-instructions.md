# GitHub Copilot Instructions for zenn_ai_agent_hackathon_2_backend

You are assisting with the development of a Firebase Cloud Functions backend for the "zenn AI agent hackathon 2" project. This backend serves as a secure API gateway connecting client applications to Google's Gemini AI model through Google's Genkit AI framework.

## Project Overview

- **Primary Purpose**: Provide authenticated access to AI text generation via serverless HTTP API
- **Technology Stack**: Firebase Cloud Functions, TypeScript, Genkit AI, Vertex AI
- **Key Components**:
  - Firebase Functions for serverless execution
  - Genkit AI for text generation with Gemini models
  - Firebase Admin for authentication
  - GitHub Actions for CI/CD

## Code Style and Conventions

When suggesting code:

1. **TypeScript**: Use proper TypeScript types for all variables, parameters, and return values
2. **Error Handling**: Use Firebase HttpsError for error responses with appropriate error codes
3. **Authentication**: Always include authentication verification for callable functions
4. **Async/Await**: Use async/await pattern for asynchronous operations
5. **Comments**: Add JSDoc comments for functions and complex logic
6. **Testing**: Include Jest test cases for new functionality

## Project Structure

- `functions/index.ts`: Main entry point with Cloud Function definitions
- `functions/genkit.ts`: Genkit AI framework configuration
- `functions/firebaseAdmin.ts`: Firebase Admin SDK and authentication
- `functions/genkit-flows/`: AI processing flow definitions
- `functions/prompts/`: AI prompt templates

## Common Tasks

- **Creating new Cloud Functions**: Use the `onCall` method with proper authentication
- **Adding AI capabilities**: Create new flows in `genkit-flows/` directory
- **Testing**: Write Jest tests in the `__tests__/` directory
- **Deployment**: Handled automatically by GitHub Actions when merged to main

## Security Considerations

- Never expose API keys or secrets in code
- Always verify authentication for callable functions
- Use Firebase Security Rules for additional data access control
- Store sensitive configuration in GitHub Secrets for CI/CD

## Deployment

The project is deployed to Firebase Functions in the `asia-northeast1` region. Deployment is handled automatically by GitHub Actions when changes are merged to the main branch.
