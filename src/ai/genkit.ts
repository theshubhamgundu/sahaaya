import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({
    apiKey: 'AIzaSyA17Rcqp0dm1luZ13CLIfeDKdfwCG3xjEc',
  })],
  model: 'googleai/gemini-2.0-flash',
});
