import { genkit } from 'genkit';
import { vertexAI, gemini20FlashLite } from '@genkit-ai/vertexai';

const ai = genkit({
  plugins: [vertexAI()],
  model: gemini20FlashLite,
});

async function main() {
  // make a generation request
  const { text } = await ai.generate('Hello, Gemini!');
  console.log(text);
}

main();