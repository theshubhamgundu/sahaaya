'use server';

/**
 * @fileOverview Detects emotional distress from user input and provides support.
 *
 * - detectEmotionalDistress - A function that analyzes user input for emotional distress.
 * - DetectEmotionalDistressInput - The input type for the detectEmotionalDistress function.
 * - DetectEmotionalDistressOutput - The return type for the detectEmotionalDistress function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectEmotionalDistressInputSchema = z.object({
  userInput: z
    .string()
    .describe('The user input text or voice transcription.'),
});
export type DetectEmotionalDistressInput = z.infer<
  typeof DetectEmotionalDistressInputSchema
>;

const DetectEmotionalDistressOutputSchema = z.object({
  emotionalDistressDetected: z
    .boolean()
    .describe('Whether emotional distress is detected in the user input.'),
  distressType: z
    .string()
    .optional()
    .describe('The type of emotional distress detected (e.g., shame, fear, anxiety).'),
  affirmation: z
    .string()
    .optional()
    .describe('A personalized affirmation to provide comfort.'),
  calmingResponse: z
    .string()
    .optional()
    .describe('A calming response to provide mental clarity.'),
  legalInformationNeeded: z
    .boolean()
    .describe('Whether legal information is needed based on the user input.'),
});
export type DetectEmotionalDistressOutput = z.infer<
  typeof DetectEmotionalDistressOutputSchema
>;

export async function detectEmotionalDistress(
  input: DetectEmotionalDistressInput
): Promise<DetectEmotionalDistressOutput> {
  return detectEmotionalDistressFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectEmotionalDistressPrompt',
  input: {schema: DetectEmotionalDistressInputSchema},
  output: {schema: DetectEmotionalDistressOutputSchema},
  prompt: `You are an AI assistant designed to detect emotional distress from user input and provide support.

  Analyze the following user input for signs of emotional distress, such as shame, fear, or anxiety.

  User Input: {{{userInput}}}

  Based on your analysis, determine if emotional distress is present and, if so, identify the type of distress.
  Provide a personalized affirmation and a calming response to offer comfort and mental clarity.

  Also, determine if legal information is needed based on the user's situation.

  Output the response in JSON format, ensuring that emotionalDistressDetected is a boolean value.
  If distress is detected, populate the distressType, affirmation, and calmingResponse fields.
  Set legalInformationNeeded to true if the situation warrants legal advice.
  `,
});

const detectEmotionalDistressFlow = ai.defineFlow(
  {
    name: 'detectEmotionalDistressFlow',
    inputSchema: DetectEmotionalDistressInputSchema,
    outputSchema: DetectEmotionalDistressOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
