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

Instructions:
1. Identify the most prominent hand gesture in the image. If multiple people are visible, focus on the clearest and most central hand gestures, likely belonging to the primary user facing the camera.
2. Describe the gesture you see or interpret its common meaning if it's a recognizable basic sign (e.g., "thumbs up", "hello", "help", "yes", "no", "thank you", "please").
3. Keep the interpretation brief and focused on a single, clear gesture if possible.
4. If the gesture is unclear, ambiguous, not a common sign, or too complex for basic interpretation, clearly state that (e.g., "Gesture unclear or complex").
5. Provide a confidence score (0.0 to 1.0) for your interpretation. If highly uncertain, set it low (e.g., below 0.5).
6. If you cannot interpret the gesture or an error occurs, set interpretedText to "Gesture unclear" or a similar descriptive message, and provide an error message in the 'error' field.
7. Respond in the specified JSON format.

Example of a good response for a clear gesture:
{
  "interpretedText": "Thumbs up",
  "confidence": 0.85
}

Example of a response for an unclear gesture:
{
  "interpretedText": "Gesture unclear",
  "confidence": 0.3,
  "error": "The hand position is ambiguous or partially obscured."
}
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
        return { interpretedText: "Interpretation failed", error: "No output from AI model.", confidence: 0 };
      }
      // Ensure confidence is always present, defaulting to 0 if not provided by the model
      return { ...output, confidence: output.confidence ?? 0 };
    } catch (e: any) {
      console.error("Error in interpretHandGestureFlow:", e);
      return { interpretedText: "Interpretation error", error: e.message || "Unknown error during gesture interpretation.", confidence: 0 };
    }
  }
);

