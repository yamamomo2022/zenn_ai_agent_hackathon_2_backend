import { locationToCoordinates } from '../genkit-flows/locationToCoordinatesFlow';

/**
 * This is a simple test script to demonstrate how to use the locationToCoordinates flow.
 * To run this test, you need to have the necessary environment variables set up.
 * 
 * Example usage:
 * npx ts-node tests/locationToCoordinatesTest.ts
 */
async function testLocationToCoordinates() {
  try {
    // Test with a few sample locations
    const testLocations = [
      '東京タワー',
      '大阪城',
      'Mount Fuji',
      'Shibuya Crossing',
      'Kyoto Imperial Palace'
    ];

    for (const location of testLocations) {
      console.log(`Testing location: ${location}`);
      const result = await locationToCoordinates({ locationName: location });
      console.log(`Result: ${JSON.stringify(result, null, 2)}`);
      console.log('-----------------------------------');
    }
  } catch (error) {
    console.error('Error testing locationToCoordinates:', error);
  }
}

// Run the test
testLocationToCoordinates();