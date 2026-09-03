import { NextRequest, NextResponse } from 'next/server';
import { updateReadingProgress } from '@/lib/services/library';

export async function POST(req: NextRequest) {
  try {
    const { itemId, progress } = await req.json();

    if (!itemId || typeof progress !== 'number') {
      return NextResponse.json({ error: 'itemId and progress number are required.' }, { status: 400 });
    }

    await updateReadingProgress(itemId, progress);
    return NextResponse.json({ success: true, progress });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update reading progress.' }, { status: 500 });
  }
}
