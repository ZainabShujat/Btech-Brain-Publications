import { LibraryItem } from '@/lib/types';
import { DEMO_LIBRARY } from '@/data/user';

let sessionLibrary: LibraryItem[] = [...DEMO_LIBRARY];

export async function getLibraryItems(userId?: string): Promise<LibraryItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const { prisma } = await import('@/lib/prisma');
      const items = await prisma.libraryItem.findMany({
        where: userId ? { userId } : undefined,
        orderBy: { acquiredDate: 'desc' },
      });

      if (items && items.length > 0) {
        return items.map((it: any) => ({
          id: it.id,
          title: it.title,
          subtitle: it.subtitle || undefined,
          type: it.type as 'magazine' | 'book',
          coverImage: it.coverImage,
          acquiredDate: it.acquiredDate.toISOString(),
          slug: it.slug,
          format: it.format as 'digital' | 'print_digital_access',
          downloadUrl: it.downloadUrl || undefined,
          readingProgressPercent: it.readingProgressPercent,
          lastReadDate: it.lastReadDate ? it.lastReadDate.toISOString() : undefined,
        }));
      }
    }
  } catch (e) {
    console.warn('Database query failed in getLibraryItems, falling back to mock:', e);
  }

  return sessionLibrary;
}

export async function addLibraryItem(
  item: Omit<LibraryItem, 'id' | 'acquiredDate'>,
  userId = 'usr_zainab_reader'
): Promise<LibraryItem> {
  const newItem: LibraryItem = {
    ...item,
    id: `lib_${Date.now()}`,
    acquiredDate: new Date().toISOString().split('T')[0],
  };

  try {
    if (process.env.DATABASE_URL) {
      const { prisma } = await import('@/lib/prisma');
      await prisma.libraryItem.create({
        data: {
          id: newItem.id,
          userId,
          title: newItem.title,
          subtitle: newItem.subtitle,
          type: newItem.type,
          coverImage: newItem.coverImage,
          slug: newItem.slug,
          format: newItem.format,
          downloadUrl: newItem.downloadUrl,
          readingProgressPercent: newItem.readingProgressPercent,
        },
      });
    }
  } catch (e) {
    console.warn('Database insert failed in addLibraryItem, keeping in session:', e);
  }

  // Prevent duplicates in session
  const exists = sessionLibrary.some((i) => i.slug === newItem.slug);
  if (!exists) {
    sessionLibrary.unshift(newItem);
  }

  return newItem;
}

export async function updateReadingProgress(id: string, progress: number): Promise<void> {
  const clamped = Math.max(0, Math.min(100, progress));

  try {
    if (process.env.DATABASE_URL) {
      const { prisma } = await import('@/lib/prisma');
      await prisma.libraryItem.update({
        where: { id },
        data: { readingProgressPercent: clamped, lastReadDate: new Date() },
      });
    }
  } catch (e) {
    console.warn('Database update failed in updateReadingProgress:', e);
  }

  sessionLibrary = sessionLibrary.map((it) =>
    it.id === id ? { ...it, readingProgressPercent: clamped, lastReadDate: new Date().toISOString() } : it
  );
}

export async function getSignedDownloadUrl(
  itemId: string,
  format: 'pdf' | 'epub'
): Promise<{ url: string; fileName: string; expiresAt: string }> {
  const items = await getLibraryItems();
  const item = items.find((i) => i.id === itemId);

  const fileName = item
    ? `${item.slug}.${format}`
    : `publication.${format}`;

  // In production, this generates an S3 / Supabase Storage signed time-limited URL
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const url = `/downloads/samples/${fileName}?expires=${encodeURIComponent(expiresAt)}`;

  return {
    url,
    fileName,
    expiresAt,
  };
}
