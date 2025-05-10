// This file is machine-generated - do not edit!

'use server';

/**
 * @fileOverview A flow to generate personalized affirmations and calming responses based on the user's detected emotional state and situation.
 *
 * - generatePersonalizedSupport - A function that generates personalized support messages.
 * - GeneratePersonalizedSupportInput - The input type for the generatePersonalizedSupport function.
 * - GeneratePersonalizedSupportOutput - The return type for the generatePersonalizedSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedSupportInputSchema = z.object({
  situation: z.string().describe('The user provided situation.'),
  emotionalState: z.string().describe('The detected emotional state of the user.'),
  legalInformationNeeded: z.boolean().describe('Whether or not to include legal information in the message.'),
  inputLanguage: z.string().optional().default('en').describe('The ISO 639-1 code of the language of the user input (e.g., en, hi, te). Defaults to "en".'),
});
export type GeneratePersonalizedSupportInput = z.infer<typeof GeneratePersonalizedSupportInputSchema>;

const GeneratePersonalizedSupportOutputSchema = z.object({
  message: z.string().describe('A personalized affirmation and calming response, in the specified inputLanguage.'),
  legalGuidance: z.optional(z.string()).describe('Optional legal guidance based on the situation (primarily in English).'),
});
export type GeneratePersonalizedSupportOutput = z.infer<typeof GeneratePersonalizedSupportOutputSchema>;

const getLegalInformation = ai.defineTool(
  {
    name: 'getLegalInformation',
    description: 'Retrieves relevant legal information based on the user-provided situation.',
    inputSchema: z.object({
      situation: z.string().describe('The user-provided situation.'),
    }),
    outputSchema: z.string(),
  },
  async input => {
    if (!input.situation) {
      return '';
    }
    // TODO: implement fetching relevant legal information from the resource directory
    // based on the situation. If no relevant legal information is found, return an empty string.
    // Currently, this tool returns English placeholder text.
    return 'Based on your situation, you may consider the following: [Placeholder Legal Info]. Please consult with a legal professional for personalized advice.';
  }
);

export async function generatePersonalizedSupport(input: GeneratePersonalizedSupportInput): Promise<GeneratePersonalizedSupportOutput> {
  return generatePersonalizedSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedSupportPrompt',
  input: {
    schema: GeneratePersonalizedSupportInputSchema,
  },
  output: {
    schema: GeneratePersonalizedSupportOutputSchema,
  },
  tools: [getLegalInformation],
  prompt: `You are an AI assistant designed to provide personalized emotional support. Your response must be a JSON object matching the specified output schema.

User's situation: {{{situation}}}
User's emotional state: {{{emotionalState}}}
User's input language code: {{{inputLanguage}}} (e.g., 'en' for English, 'hi' for Hindi, 'te' for Telugu)

Instructions:
1. Craft a personalized affirmation and calming response for the user. This should be a single, supportive message, approximately 100 words or less. This message will be the value for the "message" field in the JSON output. **The "message" MUST be in the language specified by \`inputLanguage\`.**

{{#if legalInformationNeeded}}
2. It has been determined that legal information is needed. You MUST use the 'getLegalInformation' tool to obtain relevant legal guidance for the user's situation.
   The situation to pass to the tool is the "User's situation" provided above ("{{{situation}}}").
   The information returned by the tool (which is currently in English) should be the value for the "legalGuidance" field in the JSON output. If the tool returns an empty string, use that as the value.
   While the legalGuidance may be in English, ensure the main 'message' (point 1) remains strictly in the language specified by \`inputLanguage\`.
{{else}}
2. Legal information is not required. The "legalGuidance" field in the JSON output should be omitted.
{{/if}}

Remember to structure your entire output as a valid JSON object conforming to the schema. The "message" field is always required and must be in the specified \`inputLanguage\`. The "legalGuidance" field is optional.
`,
});

const generatePersonalizedSupportFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedSupportFlow',
    inputSchema: GeneratePersonalizedSupportInputSchema,
    outputSchema: GeneratePersonalizedSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
