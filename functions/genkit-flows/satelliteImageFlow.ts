import { ai } from '../genkit';
import { z } from 'genkit';

// Define the output schema for the coordinates
const coordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  confidence: z.enum(['high', 'medium', 'low']),
  placeName: z.string()
});

// Define the output schema for the satellite image
const satelliteImageSchema = z.object({
  imageUrl: z.string(),
  coordinates: coordinatesSchema,
  originalPlaceName: z.string()
});

export const satelliteImage = ai.defineFlow(
  {
    name: 'satellite-image',
    inputSchema: z.object({
      placeName: z.string(),
      zoom: z.number().min(1).max(21).default(15), // Google Maps zoom level (1-21)
      mapType: z.enum(['satellite', 'hybrid']).default('satellite'),
      size: z.string().default('600x400') // Image size in pixels (width x height)
    }),
    outputSchema: satelliteImageSchema,
  },
  async (input) => {
    try {
      // Step 1: Convert place name to coordinates using AI
      const placeToCoordinatesPrompt = ai.prompt("placeToCoordinates");
      const coordinatesResponse = await placeToCoordinatesPrompt({ placeName: input.placeName });
      
      // Parse the response to extract coordinates
      let coordinates;
      try {
        // The response should be a JSON string
        coordinates = JSON.parse(coordinatesResponse.text);
        
        // Validate the coordinates
        if (!coordinates.latitude || !coordinates.longitude) {
          throw new Error('Invalid coordinates format');
        }
      } catch (error) {
        throw new Error(`Failed to parse coordinates: ${error.message}`);
      }
      
      // Step 2: Generate Google Static Maps API URL for satellite image
      const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
      const center = `${coordinates.latitude},${coordinates.longitude}`;
      const zoom = input.zoom;
      const size = input.size;
      const mapType = input.mapType;
      
      // Create the URL (no API key required for basic usage, but has usage limits)
      const imageUrl = `${baseUrl}?center=${center}&zoom=${zoom}&size=${size}&maptype=${mapType}`;
      
      // Return the result
      return {
        imageUrl,
        coordinates: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          confidence: coordinates.confidence || 'medium',
          placeName: coordinates.placeName || input.placeName
        },
        originalPlaceName: input.placeName
      };
    } catch (error) {
      throw new Error(`Failed to generate satellite image: ${error.message}`);
    }
  }
);