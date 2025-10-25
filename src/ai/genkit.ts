import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({
    apiKey: 'AIzaSyDOx0W-espS2CDRk0D2l3WwccwFIguC_cY',
  })],
  model: 'googleai/gemini-2.0-flash',
});
