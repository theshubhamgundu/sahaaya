'use server';
/**
 * @fileOverview An AI flow to interpret a hand gesture from an image.
 * This is a conceptual implementation.
 *
 * - interpretHandGesture - A function that takes an image of a hand gesture and attempts to interpret it.
 * - InterpretHandGestureInput - The input type.
 * - InterpretHandGestureOutput - The return type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretHandGestureInputSchema = z.object({
  gestureImageUri: z
    .string()
    .describe(
      "A still image of a hand gesture, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type InterpretHandGestureInput = z.infer<typeof InterpretHandGestureInputSchema>;

const InterpretHandGestureOutputSchema = z.object({
  interpretedText: z.string().describe('The textual interpretation of the hand gesture.'),
  confidence: z.number().min(0).max(1).optional().describe('The confidence score of the interpretation (0.0 to 1.0).'),
  error: z.string().optional().describe('Any error message if interpretation failed.'),
});
export type InterpretHandGestureOutput = z.infer<typeof InterpretHandGestureOutputSchema>;

export async function interpretHandGesture(input: InterpretHandGestureInput): Promise<InterpretHandGestureOutput> {
  return interpretHandGestureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretHandGesturePrompt',
  input: {schema: InterpretHandGestureInputSchema},
  output: {schema: InterpretHandGestureOutputSchema},
  prompt: `You are an AI assistant specialized in understanding basic sign language gestures from images.
Analyze the provided image of a hand gesture.

Image of hand gesture: {{media url=gestureImageUri}}

Describe the gesture you see or interpret the common meaning of the sign if it's a recognizable one (e.g., "thumbs up", "hello", "help", "yes", "no").
Keep the interpretation brief. If the gesture is unclear or not a common sign, state that.
For now, as a conceptual model, you can respond with a placeholder interpretation if the gesture is complex.
Provide a confidence score if possible (e.g., 0.7 for 70% confident). If not confident, set it low.
If you cannot interpret it, set interpretedText to "Gesture unclear" and provide an error message.
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

const interpretHandGestureFlow = ai.defineFlow(
  {
    name: 'interpretHandGestureFlow',
    inputSchema: InterpretHandGestureInputSchema,
    outputSchema: InterpretHandGestureOutputSchema,
  },
  async (input: InterpretHandGestureInput) => {
    try {
      const {output} = await prompt(input);
      if (!output) {
        return { interpretedText: "Interpretation failed", error: "No output from AI model." };
      }
      return output;
    } catch (e: any) {
      console.error("Error in interpretHandGestureFlow:", e);
      return { interpretedText: "Interpretation error", error: e.message || "Unknown error during gesture interpretation." };
    }
  }
);
