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
    .describe('A personalized affirmation to provide comfort, in the detected language.'),
  calmingResponse: z
    .string()
    .optional()
    .describe('A calming response to provide mental clarity, in the detected language.'),
  legalInformationNeeded: z
    .boolean()
    .describe('Whether legal information is needed based on the user input.'),
  detectedLanguage: z
    .string()
    .optional()
    .describe('The ISO 639-1 code of the language detected in the user input (e.g., en, hi, te).'),
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

  Analyze the following user input:
  User Input: {{{userInput}}}

  Follow these steps:
  1.  Detect the primary language of the user input (e.g., English, Hindi, Telugu).
  2.  Based on your analysis of the content, determine if emotional distress is present. If so, identify the type of distress.
  3.  If distress is detected, provide a personalized affirmation and a calming response. **These responses MUST be in the SAME language as the detected user input language.**
  4.  Determine if legal information is needed based on the user's situation.

  Output the response in JSON format, ensuring that:
  -   \`emotionalDistressDetected\` is a boolean value.
  -   If distress is detected, \`distressType\`, \`affirmation\`, and \`calmingResponse\` fields are populated. The affirmation and calming response must be in the detected language.
  -   \`legalInformationNeeded\` is true if the situation warrants legal advice.
  -   \`detectedLanguage\` field is set to the ISO 639-1 code of the detected language (e.g., 'en' for English, 'hi' for Hindi, 'te' for Telugu). If the language is mixed or unclear, default to 'en'.
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
