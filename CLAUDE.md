# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `cd functions && npm run start` - Start Genkit development server with hot reload
- `cd functions && npm run lint` - Run ESLint for code quality
- `cd functions && npm run build` - Compile TypeScript
- `firebase deploy --only functions` - Deploy to Firebase Functions

### Setup Commands
```bash
gcloud auth login
gcloud config set project <projectID>
export GOOGLE_GENAI_API_KEY=<apikey>
cd functions && npm ci
```

## Architecture Overview

This is a Firebase Functions backend built with TypeScript and Google's Genkit AI framework. The architecture follows a flow-based pattern where AI operations are defined as reusable flows with proper authentication and validation.

### Core Components

**Entry Points:**
- `functions/index.ts` - Firebase Functions endpoints (`helloGenkit`, `GenerateImagen`)
- `functions/genkit.ts` - Genkit AI framework configuration with Vertex AI plugin
- `functions/firebaseAdmin.ts` - Authentication verification using Firebase Admin SDK

**AI Flow Architecture:**
- `functions/genkit-flows/` - Contains AI processing flows (helloGeminiFlow.ts, imagenFlow.ts)
- `functions/prompts/` - YAML-frontmatter prompt templates with model configuration
- Flows use `ai.defineFlow()` with Zod schemas for input/output validation

### Authentication Pattern
All endpoints require Firebase Authentication:
```typescript
export const functionName = onCall(opts, async (request: CallableRequest) => {
  verifyAuth(request); // Always first line
  return await flowFunction(request.data);
});
```

### Prompt Template Structure
Prompts are stored as `.prompt` files with YAML frontmatter:
```yaml
---
model: vertexai/gemini-2.0-flash-lite
config:
  temperature: 1.4
  maxOutputTokens: 400
---
Prompt content with {{variable}} substitution
```

## Configuration Details

**Runtime:** Node.js 22, deployed to `asia-northeast1` region
**Dependencies:** Firebase Functions, Genkit AI, Vertex AI, Firebase Admin SDK
**Secrets:** `GOOGLE_GENAI_API_KEY` (Firebase Functions secret), service account key JSON

## AI Models Configuration
- **Text Generation:** `vertexai/gemini-2.0-flash-lite` (temperature: 1.4, max tokens: 400)
- **Image Generation:** `vertexai/imagen-3.0-generate-002` (temperature: 0.7, Ukiyo-e art style)

## Development Patterns

**Adding New AI Flows:**
1. Create flow in `genkit-flows/` directory using `ai.defineFlow()`
2. Add corresponding prompt template in `prompts/`
3. Export flow and add Firebase Function in `index.ts`
4. Include authentication verification with `verifyAuth()`

**Error Handling:**
Use Firebase HTTPS errors: `throw new functions.https.HttpsError('error-code', 'message')`

## Deployment

Auto-deployment via GitHub Actions:
1. Lint workflow runs on PR/push
2. Deploy workflow triggers after successful lint (main branch only)
3. Requires GitHub Secrets: `FIREBASE_TOKEN`, `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64`, `GOOGLE_GENAI_API_KEY`

## Testing and Quality

- ESLint configuration in `functions/eslint.config.mjs`
- TypeScript strict mode enabled
- All functions require proper TypeScript typing
- Authentication required for all callable functions

## VS Code Integration

- GitHub Copilot configured with project-specific instructions in `.github/instructions/copilot-instructions.md`
- Format-on-save enabled
- MCP configuration for GitHub Copilot and Notion integration in `.vscode/mcp.json`