import { genkit, flow } from 'genkit';
import { vertexAI, gemini20FlashLite } from '@genkit-ai/vertexai';
import { loadPrompt } from 'dotprompt';
import path from 'path';

// Initialize Genkit with VertexAI
const ai = genkit({
  plugins: [vertexAI()],
  model: gemini20FlashLite,
});

// Load the HelloPrompt from the prompt file
const HelloPrompt = loadPrompt(path.join(__dirname, '../prompts/hello.prompt'), 'HelloPrompt');

// Define the HelloFlow using the prompt
export const HelloFlow = flow({
  name: 'HelloFlow',
  description: 'A simple flow that greets the user using a prompt file',
  
  // Define the input schema for the flow
  input: {
    name: {
      type: 'string',
      description: 'The name of the person to greet',
      default: 'World',
    },
  },
  
  // Define the output schema for the flow
  output: {
    greeting: {
      type: 'string',
      description: 'The greeting message',
    },
  },
  
  // Define the steps of the flow
  async execute({ name }) {
    // Generate text using the HelloPrompt
    const { text } = await ai.generate(HelloPrompt({ name }));
    
    // Return the greeting
    return {
      greeting: text,
    };
  },
});

// Main function to run the HelloFlow
async function main() {
  try {
    // Execute the HelloFlow
    const result = await HelloFlow({ name: 'Genkit User' });
    
    // Log the result
    console.log('HelloFlow Result:');
    console.log(result.greeting);
  } catch (error) {
    console.error('Error executing HelloFlow:', error);
  }
}

// Run the main function
main();