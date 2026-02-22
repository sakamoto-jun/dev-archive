import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Archive.Sakamoto',
  description: '개인 블로그',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-50 antialiased">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
