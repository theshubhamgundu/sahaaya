import { NextResponse } from 'next/server';
import { generateSignLanguageResponse } from '@/ai/flows/generate-sign-language-response';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { interpretedGestureText, conversationContext } = body ?? {};
    if (typeof interpretedGestureText !== 'string' || !interpretedGestureText.trim()) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const result = await generateSignLanguageResponse({ interpretedGestureText, conversationContext });
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Internal error' }, { status: 500 });
  }
}
