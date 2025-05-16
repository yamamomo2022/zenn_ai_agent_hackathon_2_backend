import { genkit } from 'genkit';
import { vertexAI, gemini20FlashLite } from '@genkit-ai/vertexai';
import * as functions from 'firebase-functions';


const ai = genkit({
  plugins: [vertexAI()],
  model: gemini20FlashLite,
});

async function main() {
  // make a generation request
  const { text } = await ai.generate('Hello, Gemini!');
  console.log(text);
}

export const helloGemini = functions.https.onRequest(async (req, res) => {
  const { text } = await ai.generate('Hello, Gemini!');
  res.send(text);
});

main();