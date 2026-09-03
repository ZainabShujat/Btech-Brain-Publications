import { PRODUCTS } from '@/data/products';
import { Product } from '@/lib/types';

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.id === id);
}
