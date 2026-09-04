import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/commerce/CartDrawer';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { SITE_CONFIG } from '@/lib/constants';
import { Analytics } from '@vercel/analytics/next';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — An Independent Publication by ${SITE_CONFIG.founder}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.founder }],
  creator: SITE_CONFIG.founder,
  publisher: SITE_CONFIG.name,
  keywords: [
    'Notes From a B.Tech Brain',
    'Zainab Shujat',
    'Computer Science',
    'Systems Engineering',
    'Independent Publishing',
    'Software Architecture',
    'Technical Essays',
    'Engineering Student Publication',
  ],
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF9F5] text-[#1C1917]">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-37H7X01N6B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-37H7X01N6B');
          `}
        </Script>
        <AuthProvider>
          <CartProvider>
            <DemoBanner />
            <Header />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <Footer />
            <Analytics />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
