import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

import '@/ai/flows/detect-emotional-distress.ts';
import '@/ai/flows/generate-personalized-support.ts';
import '@/ai/flows/provide-relevant-legal-guidance.ts';
import '@/ai/flows/interpret-hand-gesture.ts';
import '@/ai/flows/generate-sign-language-response.ts';
