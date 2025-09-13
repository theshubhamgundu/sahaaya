import { NextResponse } from 'next/server';
import { generatePersonalizedSupport } from '@/ai/flows/generate-personalized-support';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { situation, emotionalState, legalInformationNeeded, inputLanguage } = body ?? {};
    if (typeof situation !== 'string' || !situation.trim() || typeof emotionalState !== 'string' || !emotionalState.trim()) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const result = await generatePersonalizedSupport({ situation, emotionalState, legalInformationNeeded: Boolean(legalInformationNeeded), inputLanguage });
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Internal error' }, { status: 500 });
  }
}
