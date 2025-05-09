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
});
export type GeneratePersonalizedSupportInput = z.infer<typeof GeneratePersonalizedSupportInputSchema>;

const GeneratePersonalizedSupportOutputSchema = z.object({
  message: z.string().describe('A personalized affirmation and calming response.'),
  legalGuidance: z.optional(z.string()).describe('Optional legal guidance based on the situation.'),
});
export type GeneratePersonalizedSupportOutput = z.infer<typeof GeneratePersonalizedSupportOutputSchema>;

const getLegalInformation = ai.defineTool(
  {
    name: 'getLegalInformation',
    description: 'Retrieves relevant legal information based on the user-provided situation if legalInformationNeeded is true, otherwise returns an empty string.',
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
  prompt: `You are an AI assistant providing emotional support. The user is in distress.

  Situation: {{{situation}}}
  Emotional State: {{{emotionalState}}}

  Generate a personalized affirmation and calming response that is no more than 100 words.

  {{#if legalInformationNeeded}}
  Include the following legal guidance from the getLegalInformation tool in your message:\n{{tool_result 'getLegalInformation'}}
  {{/if}}

  Response:
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
