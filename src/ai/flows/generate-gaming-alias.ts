'use server';
/**
 * @fileOverview A Genkit flow for generating creative and unique gamer tags based on user preferences.
 *
 * - generateGamingAlias - A function that generates gaming aliases.
 * - GenerateGamingAliasInput - The input type for the generateGamingAlias function.
 - GenerateGamingAliasOutput - The return type for the generateGamingAlias function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateGamingAliasInputSchema = z.object({
  interests: z.string().optional().describe('Comma-separated list of user interests (e.g., "fantasy, sci-fi, cyberpunk").'),
  favoriteGames: z.string().optional().describe('Comma-separated list of favorite games (e.g., "PUBG, Free Fire, Valorant").'),
  personalityTraits: z.string().optional().describe('Comma-separated list of personality traits (e.g., "aggressive, tactical, stealthy, chill").')
});
export type GenerateGamingAliasInput = z.infer<typeof GenerateGamingAliasInputSchema>;

const GenerateGamingAliasOutputSchema = z.object({
  aliases: z.array(z.string()).describe('A list of creative and unique gaming aliases.')
});
export type GenerateGamingAliasOutput = z.infer<typeof GenerateGamingAliasOutputSchema>;

export async function generateGamingAlias(input: GenerateGamingAliasInput): Promise<GenerateGamingAliasOutput> {
  return generateGamingAliasFlow(input);
}

const generateGamingAliasPrompt = ai.definePrompt({
  name: 'generateGamingAliasPrompt',
  input: {schema: GenerateGamingAliasInputSchema},
  output: {schema: GenerateGamingAliasOutputSchema},
  prompt: `You are an expert at generating creative, unique, and stylish gamer tags.
Your task is to generate 5 distinct gaming aliases based on the user's provided information.
The aliases should be suitable for various games like PUBG, Free Fire, BGMI, COD, Roblox, Minecraft, etc.

Consider the following input to inspire your creations:
{{#if interests}}
User Interests: {{{interests}}}
{{/if}}
{{#if favoriteGames}}
Favorite Games: {{{favoriteGames}}}
{{/if}}
{{#if personalityTraits}}
Personality Traits: {{{personalityTraits}}}
{{/if}}

Generate 5 unique gamer tags. Ensure they are creative and memorable.
Output your response as a JSON object with a single key 'aliases' which is an array of strings.`
});

const generateGamingAliasFlow = ai.defineFlow(
  {
    name: 'generateGamingAliasFlow',
    inputSchema: GenerateGamingAliasInputSchema,
    outputSchema: GenerateGamingAliasOutputSchema
  },
  async (input) => {
    const {output} = await generateGamingAliasPrompt(input);
    if (!output) {
      throw new Error('Failed to generate gaming aliases.');
    }
    return output;
  }
);
