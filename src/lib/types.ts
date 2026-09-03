export type Role = 'reader' | 'subscriber' | 'author' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  bio?: string;
  joinedDate: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  articleCount?: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string; // Markdown or rich HTML
  coverImage?: string;
  category: Category;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  readingTimeMinutes: number;
  publishedAt: string;
  status: 'draft' | 'published' | 'scheduled';
  featured?: boolean;
  issueSlug?: string; // If included in a magazine issue
  tags: string[];
}

export interface MagazineArticleRef {
  articleId: string;
  title: string;
  author: string;
  readingTime: number;
  category: string;
  pageNumber: number;
  summary: string;
}

export interface MagazineIssue {
  id: string;
  slug: string;
  issueNumber: number;
  volumeNumber: number;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  publicationDate: string;
  season?: string;
  pageCount: number;
  status: 'published' | 'upcoming' | 'archive';
  articles: MagazineArticleRef[];
  digitalPrice: number;
  printPrice?: number;
  isAvailableInPrint: boolean;
  pdfDownloadUrl?: string;
}

export type BookStatus = 'published' | 'coming_soon' | 'preview_edition';

export interface BookReview {
  id: string;
  authorName: string;
  authorTitle: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BookChapter {
  number: number;
  title: string;
  pageCount: number;
  description?: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  description: string;
  longDescription: string;
  coverImage: string;
  genre: string;
  isbn?: string;
  pageCount: number;
  publicationDate: string;
  status: BookStatus;
  digitalPrice: number;
  printPrice?: number;
  formats: ('digital' | 'paperback' | 'hardcover')[];
  tableOfContents: BookChapter[];
  reviews: BookReview[];
  sampleChapterText?: string;
  dimensions?: string;
  publisher: string;
}

// E-commerce separation: A Product wraps a purchasable asset (MagazineIssue, Book, Subscription)
export type ProductType = 'magazine' | 'book' | 'subscription' | 'print_issue';

export interface ProductVariant {
  id: string;
  productId: string;
  format: 'digital' | 'print' | 'bundle';
  name: string;
  price: number;
  currency: string;
  inStock: boolean;
  sku: string;
}

export interface Product {
  id: string;
  type: ProductType;
  title: string;
  slug: string;
  coverImage: string;
  description: string;
  contentRefId: string; // References MagazineIssue.id or Book.id
  variants: ProductVariant[];
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  variantId: string;
  title: string;
  subtitle?: string;
  format: 'digital' | 'print' | 'bundle';
  productType: ProductType;
  unitPrice: number;
  quantity: number;
  coverImage: string;
  slug: string;
}

export type OrderStatus = 'pending' | 'processing' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  title: string;
  format: 'digital' | 'print' | 'bundle';
  productType: ProductType;
  unitPrice: number;
  quantity: number;
  coverImage: string;
  slug: string;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  isPhysicalDelivery: boolean;
  shippingAddress?: ShippingAddress;
  paymentMethod: string;
}

export type SubscriptionPlanTier = 'monthly' | 'annual';

export interface SubscriptionPlan {
  id: string;
  tier: SubscriptionPlanTier;
  name: string;
  price: number;
  period: string;
  billingInterval: string;
  savingsBadge?: string;
  benefits: string[];
  popular?: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  tier: SubscriptionPlanTier;
  status: 'active' | 'cancelled' | 'past_due';
  startedAt: string;
  renewsAt: string;
  cancelAtPeriodEnd: boolean;
  price: number;
}

export interface LibraryItem {
  id: string;
  title: string;
  subtitle?: string;
  type: 'magazine' | 'book';
  coverImage: string;
  acquiredDate: string;
  slug: string;
  format: 'digital' | 'print_digital_access';
  downloadUrl?: string;
  readingProgressPercent: number;
  lastReadDate?: string;
}
