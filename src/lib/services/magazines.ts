import { MAGAZINES } from '@/data/magazines';
import { MagazineIssue } from '@/lib/types';

export async function getMagazines(): Promise<MagazineIssue[]> {
  return MAGAZINES;
}

export async function getLatestMagazine(): Promise<MagazineIssue> {
  return MAGAZINES[0];
}

export async function getMagazineBySlug(slug: string): Promise<MagazineIssue | undefined> {
  return MAGAZINES.find((mag) => mag.slug === slug);
}
