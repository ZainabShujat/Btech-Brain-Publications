import { NextResponse } from 'next/server';
import { getLibraryItems } from '@/lib/services/library';

export async function GET() {
  try {
    const items = await getLibraryItems();
    return NextResponse.json(items);
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to fetch library items.' }, { status: 500 });
  }
}
