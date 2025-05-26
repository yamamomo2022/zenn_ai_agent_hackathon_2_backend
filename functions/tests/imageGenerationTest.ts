import { imageGeneration } from '../genkit-flows/imageGenerationFlow';

/**
 * This is a simple test file to demonstrate how to use the image generation flow.
 * To run this test, use the following command:
 * npx ts-node functions/tests/imageGenerationTest.ts
 */
async function testImageGeneration() {
  try {
    console.log('Testing image generation flow...');
    
    // Example prompt for generating an image
    const result = await imageGeneration({
      prompt: 'A beautiful Japanese garden with cherry blossoms, a small bridge over a pond with koi fish, in a photorealistic style',
    });
    
    console.log('Image generated successfully!');
    console.log('Image URL:', result.imageUrl);
    
    return result;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testImageGeneration()
    .then(() => console.log('Test completed successfully'))
    .catch((error) => console.error('Test failed:', error));
}

export { testImageGeneration };