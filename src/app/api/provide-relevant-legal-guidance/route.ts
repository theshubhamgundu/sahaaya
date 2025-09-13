import { NextResponse } from 'next/server';
import { provideRelevantLegalGuidance } from '@/ai/flows/provide-relevant-legal-guidance';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { situationDescription } = body ?? {};
    if (typeof situationDescription !== 'string' || !situationDescription.trim()) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const result = await provideRelevantLegalGuidance({ situationDescription });
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Internal error' }, { status: 500 });
  }
}
