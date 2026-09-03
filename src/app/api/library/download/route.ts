import { NextRequest, NextResponse } from 'next/server';
import { getSignedDownloadUrl } from '@/lib/services/library';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get('itemId');
  const format = (searchParams.get('format') || 'pdf') as 'pdf' | 'epub';

  if (!itemId) {
    return NextResponse.json({ error: 'Item ID is required.' }, { status: 400 });
  }

  try {
    const signedData = await getSignedDownloadUrl(itemId, format);
    return NextResponse.json(signedData);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to generate download link.' }, { status: 500 });
  }
}
