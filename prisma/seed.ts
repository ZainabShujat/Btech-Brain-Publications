import { PrismaClient, Role, ArticleStatus, MagazineStatus, BookStatus, ProductType, ProductFormat, OrderStatus } from '@prisma/client';
import { CATEGORIES } from '../src/data/categories';
import { ARTICLES } from '../src/data/articles';
import { MAGAZINES } from '../src/data/magazines';
import { BOOKS } from '../src/data/books';
import { PRODUCTS } from '../src/data/products';
import { DEMO_USER, DEMO_SUBSCRIPTION, DEMO_LIBRARY } from '../src/data/user';
import { DEMO_ORDERS } from '../src/data/orders';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed for Notes From a B.Tech Brain Publications...');

  // 1. Seed Demo User
  console.log('Seeding demo user...');
  const user = await prisma.user.upsert({
    where: { email: DEMO_USER.email },
    update: {},
    create: {
      id: DEMO_USER.id,
      email: DEMO_USER.email,
      name: DEMO_USER.name,
      role: Role.SUBSCRIBER,
      bio: DEMO_USER.bio,
      avatar: DEMO_USER.avatar,
      joinedDate: new Date(DEMO_USER.joinedDate),
    },
  });

  // 2. Seed Categories
  console.log('Seeding categories...');
  for (const cat of CATEGORIES) {
    if (cat.slug === 'all') continue;
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: {
        id: cat.id,
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
      },
    });
  }

  // 3. Seed Articles
  console.log('Seeding articles...');
  for (const art of ARTICLES) {
    const categoryRecord = await prisma.category.findUnique({
      where: { slug: art.category.slug },
    });

    if (!categoryRecord) continue;

    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        subtitle: art.subtitle,
        excerpt: art.excerpt,
        content: art.content,
        readingTimeMinutes: art.readingTimeMinutes,
        featured: art.featured || false,
        tags: art.tags,
      },
      create: {
        id: art.id,
        slug: art.slug,
        title: art.title,
        subtitle: art.subtitle,
        excerpt: art.excerpt,
        content: art.content,
        coverImage: art.coverImage,
        readingTimeMinutes: art.readingTimeMinutes,
        publishedAt: new Date(art.publishedAt),
        status: ArticleStatus.PUBLISHED,
        featured: art.featured || false,
        issueSlug: art.issueSlug,
        tags: art.tags,
        categoryId: categoryRecord.id,
      },
    });
  }

  // 4. Seed Magazine Issues
  console.log('Seeding magazine issues...');
  for (const mag of MAGAZINES) {
    const createdMag = await prisma.magazineIssue.upsert({
      where: { slug: mag.slug },
      update: {
        title: mag.title,
        subtitle: mag.subtitle,
        description: mag.description,
        digitalPrice: mag.digitalPrice,
        printPrice: mag.printPrice,
      },
      create: {
        id: mag.id,
        slug: mag.slug,
        issueNumber: mag.issueNumber,
        volumeNumber: mag.volumeNumber,
        title: mag.title,
        subtitle: mag.subtitle,
        description: mag.description,
        coverImage: mag.coverImage,
        publicationDate: new Date(mag.publicationDate),
        season: mag.season,
        pageCount: mag.pageCount,
        status: MagazineStatus.PUBLISHED,
        digitalPrice: mag.digitalPrice,
        printPrice: mag.printPrice,
        isAvailableInPrint: mag.isAvailableInPrint,
        pdfDownloadUrl: mag.pdfDownloadUrl,
      },
    });

    // Seed TOC relations
    for (const toc of mag.articles) {
      const art = await prisma.article.findUnique({ where: { id: toc.articleId } });
      if (art) {
        await prisma.magazineArticle.upsert({
          where: {
            magazineId_articleId: {
              magazineId: createdMag.id,
              articleId: art.id,
            },
          },
          update: { pageNumber: toc.pageNumber, summary: toc.summary },
          create: {
            magazineId: createdMag.id,
            articleId: art.id,
            pageNumber: toc.pageNumber,
            summary: toc.summary,
          },
        });
      }
    }
  }

  // 5. Seed Books & Chapters
  console.log('Seeding books...');
  for (const bk of BOOKS) {
    const createdBook = await prisma.book.upsert({
      where: { slug: bk.slug },
      update: {
        title: bk.title,
        subtitle: bk.subtitle,
        description: bk.description,
        digitalPrice: bk.digitalPrice,
        printPrice: bk.printPrice,
      },
      create: {
        id: bk.id,
        slug: bk.slug,
        title: bk.title,
        subtitle: bk.subtitle,
        author: bk.author,
        description: bk.description,
        longDescription: bk.longDescription,
        coverImage: bk.coverImage,
        genre: bk.genre,
        isbn: bk.isbn,
        pageCount: bk.pageCount,
        publicationDate: new Date(bk.publicationDate),
        status: bk.status === 'published' ? BookStatus.PUBLISHED : BookStatus.COMING_SOON,
        digitalPrice: bk.digitalPrice,
        printPrice: bk.printPrice,
        sampleChapterText: bk.sampleChapterText,
        dimensions: bk.dimensions,
        publisher: bk.publisher,
      },
    });

    // Seed TOC chapters
    for (const ch of bk.tableOfContents) {
      await prisma.bookChapter.upsert({
        where: {
          bookId_number: {
            bookId: createdBook.id,
            number: ch.number,
          },
        },
        update: { title: ch.title, pageCount: ch.pageCount },
        create: {
          bookId: createdBook.id,
          number: ch.number,
          title: ch.title,
          pageCount: ch.pageCount,
          description: ch.description,
        },
      });
    }

    // Seed reviews
    for (const rev of bk.reviews) {
      await prisma.bookReview.upsert({
        where: { id: rev.id },
        update: {
          authorName: rev.authorName,
          authorTitle: rev.authorTitle,
          rating: rev.rating,
          comment: rev.comment,
          date: rev.date,
        },
        create: {
          id: rev.id,
          bookId: createdBook.id,
          authorName: rev.authorName,
          authorTitle: rev.authorTitle,
          rating: rev.rating,
          comment: rev.comment,
          date: rev.date,
        },
      });
    }
  }

  // 6. Seed Products and Variants (E-Commerce Layer)
  console.log('Seeding products & variants...');
  for (const prod of PRODUCTS) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: { title: prod.title, description: prod.description },
      create: {
        id: prod.id,
        type: prod.type === 'magazine' ? ProductType.MAGAZINE : ProductType.BOOK,
        title: prod.title,
        slug: prod.slug,
        coverImage: prod.coverImage,
        description: prod.description,
        contentRefId: prod.contentRefId,
        featured: prod.featured || false,
      },
    });

    for (const v of prod.variants) {
      const formatEnum =
        v.format === 'digital'
          ? ProductFormat.DIGITAL
          : v.format === 'print'
            ? ProductFormat.PRINT
            : ProductFormat.BUNDLE;

      await prisma.productVariant.upsert({
        where: { sku: v.sku },
        update: { price: v.price, inStock: v.inStock },
        create: {
          id: v.id,
          productId: createdProduct.id,
          format: formatEnum,
          name: v.name,
          price: v.price,
          currency: v.currency,
          inStock: v.inStock,
          sku: v.sku,
        },
      });
    }
  }

  // 7. Seed Demo Library Items for user
  console.log('Seeding customer digital library...');
  for (const item of DEMO_LIBRARY) {
    await prisma.libraryItem.upsert({
      where: { id: item.id },
      update: {
        title: item.title,
        readingProgressPercent: item.readingProgressPercent,
      },
      create: {
        id: item.id,
        userId: user.id,
        title: item.title,
        subtitle: item.subtitle,
        type: item.type,
        coverImage: item.coverImage,
        slug: item.slug,
        format: item.format,
        downloadUrl: item.downloadUrl,
        readingProgressPercent: item.readingProgressPercent,
        acquiredDate: new Date(item.acquiredDate),
        lastReadDate: item.lastReadDate ? new Date(item.lastReadDate) : null,
      },
    });
  }

  console.log('✅ Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
