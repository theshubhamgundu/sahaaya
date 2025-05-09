'use server';
/**
 * @fileOverview An AI flow to generate a textual response to an interpreted sign language gesture.
 * This is a conceptual implementation.
 *
 * - generateSignLanguageResponse - A function that takes interpreted gesture text and generates a response.
 * - GenerateSignLanguageResponseInput - The input type.
 * - GenerateSignLanguageResponseOutput - The return type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSignLanguageResponseInputSchema = z.object({
  interpretedGestureText: z.string().describe('The text interpretation of the user\'s sign language gesture.'),
  conversationContext: z.string().optional().describe('Optional context from previous turns in the conversation.'),
});
export type GenerateSignLanguageResponseInput = z.infer<typeof GenerateSignLanguageResponseInputSchema>;

const GenerateSignLanguageResponseOutputSchema = z.object({
  responseText: z.string().describe('The AI\'s textual response to the user.'),
  suggestedSignVisual: z.string().optional().describe('A brief textual description of a key sign the AI might use in its response (for conceptual display).'),
});
export type GenerateSignLanguageResponseOutput = z.infer<typeof GenerateSignLanguageResponseOutputSchema>;

export async function generateSignLanguageResponse(input: GenerateSignLanguageResponseInput): Promise<GenerateSignLanguageResponseOutput> {
  return generateSignLanguageResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSignLanguageResponsePrompt',
  input: {schema: GenerateSignLanguageResponseInputSchema},
  output: {schema: GenerateSignLanguageResponseOutputSchema},
  prompt: `You are an empathetic AI assistant communicating with a user who is deaf or mute and uses sign language.
The user signed: "{{interpretedGestureText}}"
{{#if conversationContext}}Previous context: "{{conversationContext}}"{{/if}}

Generate a helpful, clear, and concise textual response.
If appropriate, you can also provide a very brief textual description of a key sign you might use in your response (e.g., "AI shows: Thumbs up sign"). This is for conceptual purposes.
Keep responses friendly and supportive.
Respond in the specified JSON format.
`,
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    ],
  },
});

const generateSignLanguageResponseFlow = ai.defineFlow(
  {
    name: 'generateSignLanguageResponseFlow',
    inputSchema: GenerateSignLanguageResponseInputSchema,
    outputSchema: GenerateSignLanguageResponseOutputSchema,
  },
  async (input: GenerateSignLanguageResponseInput) => {
     try {
      const {output} = await prompt(input);
      if (!output) {
        return { responseText: "Sorry, I couldn't generate a response right now." };
      }
      return output;
    } catch (e: any) {
      console.error("Error in generateSignLanguageResponseFlow:", e);
      return { responseText: `An error occurred: ${e.message || "Unknown error"}` };
    }
  }
);
