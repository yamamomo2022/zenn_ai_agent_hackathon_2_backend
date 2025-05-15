import { HelloFlow } from './index';

/**
 * Simple test for HelloFlow
 */
async function testHelloFlow() {
  console.log('Testing HelloFlow...');
  
  try {
    // Test with default name
    const result1 = await HelloFlow({});
    console.log('Test 1 (Default name):', result1.greeting);
    
    // Test with custom name
    const result2 = await HelloFlow({ name: 'Test User' });
    console.log('Test 2 (Custom name):', result2.greeting);
    
    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testHelloFlow();