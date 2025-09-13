import { NextResponse } from 'next/server';
import { interpretHandGesture } from '@/ai/flows/interpret-hand-gesture';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { gestureImageUri } = body ?? {};
    if (typeof gestureImageUri !== 'string' || !gestureImageUri.startsWith('data:')) {
      return NextResponse.json({ error: 'Invalid image data' }, { status: 400 });
    }
    const result = await interpretHandGesture({ gestureImageUri });
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Internal error' }, { status: 500 });
  }
}
