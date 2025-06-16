import { satelliteImage } from '../genkit-flows/satelliteImageFlow';

async function testSatelliteImage() {
  try {
    console.log('Testing satellite image flow with Tokyo...');
    const result = await satelliteImage({ placeName: 'Tokyo, Japan' });
    console.log('Result:', JSON.stringify(result, null, 2));
    
    console.log('\nTesting satellite image flow with Mount Fuji...');
    const result2 = await satelliteImage({ 
      placeName: 'Mount Fuji, Japan',
      zoom: 12,
      mapType: 'hybrid'
    });
    console.log('Result:', JSON.stringify(result2, null, 2));
    
    console.log('\nTesting satellite image flow with Shibuya Crossing...');
    const result3 = await satelliteImage({ 
      placeName: 'Shibuya Crossing, Tokyo',
      zoom: 18,
      size: '800x600'
    });
    console.log('Result:', JSON.stringify(result3, null, 2));
    
  } catch (error) {
    console.error('Error testing satellite image flow:', error);
  }
}

// Run the test
testSatelliteImage();