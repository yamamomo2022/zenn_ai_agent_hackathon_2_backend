# Image Generation Flow

This document explains how to use the image generation flow implemented with Genkit and Imagen 3.

## Overview

The image generation flow allows you to generate high-quality images using Google's Imagen 3 model through a simple API call. The flow takes a text prompt as input and returns a URL to the generated image.

## Usage

### API Endpoint

The image generation flow is exposed through a Firebase Cloud Function called `generateImage`. You can call this function from your client application using the Firebase SDK.

### Request Format

```typescript
{
  prompt: string; // The text prompt describing the image you want to generate
}
```

### Response Format

```typescript
{
  imageUrl: string; // URL to the generated image
}
```

### Example

```typescript
// Using Firebase SDK in a client application
import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const generateImage = httpsCallable(functions, "generateImage");

// Call the function
generateImage({ prompt: "A beautiful Japanese garden with cherry blossoms" })
  .then((result) => {
    const imageUrl = result.data.imageUrl;
    console.log("Generated image URL:", imageUrl);
    // Use the image URL in your application
  })
  .catch((error) => {
    console.error("Error generating image:", error);
  });
```

## Writing Effective Prompts

To get the best results from Imagen 3, consider the following tips for writing effective prompts:

1. **Be Specific**: Provide detailed descriptions of what you want in the image.
   - Good: "A serene Japanese garden with blooming cherry trees, a red wooden bridge over a koi pond, with Mount Fuji in the background at sunset"
   - Less effective: "A Japanese garden"

2. **Specify Style**: Mention the artistic style or medium you want.
   - Examples: "photorealistic", "oil painting", "watercolor", "digital art", "anime style"

3. **Mention Lighting and Atmosphere**: Describe the lighting conditions and mood.
   - Examples: "soft morning light", "dramatic sunset", "moody with fog", "bright and cheerful"

4. **Avoid Prohibited Content**: Imagen 3 has content filters that prevent generating:
   - Violent or graphic content
   - Adult or sexually explicit content
   - Hateful or discriminatory content
   - Personal information or identifiable individuals

5. **Use Negative Prompts**: The system already includes some negative prompts to avoid common issues like blurriness or distortion.

## Technical Details

- The flow uses Imagen 3.0 model through Vertex AI
- Default image aspect ratio is 1:1 (square)
- The system includes negative prompts to avoid common issues

## Limitations

- Image generation may take several seconds to complete
- There are rate limits on the number of images that can be generated
- Some prompts may be rejected by content filters
- The generated images are temporary and may expire after some time

## Troubleshooting

If you encounter issues with image generation:

1. Check that your prompt doesn't contain prohibited content
2. Try simplifying your prompt if it's very complex
3. Ensure you have proper authentication set up
4. Check your API quota and limits