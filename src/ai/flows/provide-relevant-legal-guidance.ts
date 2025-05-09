'use server';

/**
 * @fileOverview Provides relevant legal information based on the user's situation.
 *
 * - provideRelevantLegalGuidance - A function that takes user input and returns legal guidance.
 * - ProvideRelevantLegalGuidanceInput - The input type for the provideRelevantLegalGuidance function.
 * - ProvideRelevantLegalGuidanceOutput - The return type for the provideRelevantLegalGuidance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideRelevantLegalGuidanceInputSchema = z.object({
  situationDescription: z
    .string()
    .describe('A detailed description of the user\'s situation.'),
});
export type ProvideRelevantLegalGuidanceInput = z.infer<
  typeof ProvideRelevantLegalGuidanceInputSchema
>;

const LegalInformationSchema = z.object({
  legalRights: z
    .string()
    .describe('Explanation of the user\'s legal rights based on the situation.'),
  applicableLaws: z
    .string()
    .describe('List of applicable laws (e.g., POCSO, POSH, SC/ST Act).'),
  complaintFilingProcedures: z
    .string()
    .describe('Step-by-step instructions on how to file a complaint.'),
  verifiedHelplines: z
    .string()
    .describe('Contact information for verified helplines.'),
  ngos: z.string().describe('Contact information for relevant NGOs.'),
  supportCenters: z
    .string()
    .describe('Contact information for support centers.'),
});

const ProvideRelevantLegalGuidanceOutputSchema = z.object({
  legalGuidance: LegalInformationSchema.describe(
    'Relevant legal information and guidance based on the user\'s situation.'
  ),
  includeResources: z
    .boolean()
    .describe(
      'A boolean indicating whether to include resource information in the output.'
    ),
});
export type ProvideRelevantLegalGuidanceOutput = z.infer<
  typeof ProvideRelevantLegalGuidanceOutputSchema
>;

const getLegalGuidanceTool = ai.defineTool({
  name: 'getLegalGuidance',
  description:
    'This tool provides legal rights, applicable laws, complaint filing procedures, and contact information for helplines, NGOs, and support centers based on the user\'s situation.',
  inputSchema: z.object({
    situationDescription: z
      .string()
      .describe('A detailed description of the user\'s situation.'),
  }),
  outputSchema: LegalInformationSchema,
},
async (input) => {
  // Placeholder implementation - replace with actual logic to fetch legal guidance
  return {
    legalRights: `Based on the situation: ${input.situationDescription}, you have the right to seek legal counsel and protection under the relevant laws.`, // Replace with actual legal rights
    applicableLaws: 'POCSO, POSH, SC/ST Act (if applicable)', // Replace with actual applicable laws
    complaintFilingProcedures: 'Contact a lawyer or legal aid organization for assistance with filing a complaint.', // Replace with actual complaint filing procedures
    verifiedHelplines: '1098 (Childline India), 181 (Women Helpline)', // Replace with actual helpline numbers
    ngos: 'List of relevant NGOs will be here', // Replace with actual NGO contact info
    supportCenters: 'List of support centers will be here',
  };
});

const provideRelevantLegalGuidancePrompt = ai.definePrompt({
  name: 'provideRelevantLegalGuidancePrompt',
  input: {schema: ProvideRelevantLegalGuidanceInputSchema},
  output: {schema: ProvideRelevantLegalGuidanceOutputSchema},
  tools: [getLegalGuidanceTool],
  prompt: `Based on the user\'s situation:
  {{situationDescription}}

  Provide relevant legal information. Use the getLegalGuidance tool to obtain the legal information. If the user would benefit from a list of resources, set includeResources to true. Otherwise, set it to false. Return the legal guidance.`, 
});

const provideRelevantLegalGuidanceFlow = ai.defineFlow(
  {
    name: 'provideRelevantLegalGuidanceFlow',
    inputSchema: ProvideRelevantLegalGuidanceInputSchema,
    outputSchema: ProvideRelevantLegalGuidanceOutputSchema,
  },
  async input => {
    const {output} = await provideRelevantLegalGuidancePrompt(input);
    return output!;
  }
);

export async function provideRelevantLegalGuidance(
  input: ProvideRelevantLegalGuidanceInput
): Promise<ProvideRelevantLegalGuidanceOutput> {
  return provideRelevantLegalGuidanceFlow(input);
}

export type {LegalInformationSchema};
