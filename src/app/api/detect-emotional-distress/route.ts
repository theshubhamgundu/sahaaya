import { NextResponse } from 'next/server';
import { detectEmotionalDistress } from '@/ai/flows/detect-emotional-distress';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userInput } = body ?? {};
    if (typeof userInput !== 'string' || !userInput.trim()) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const result = await detectEmotionalDistress({ userInput });
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Internal error' }, { status: 500 });
  }
}
