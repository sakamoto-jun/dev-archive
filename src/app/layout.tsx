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
  // 인라인 스크립트(즉시실행함수로 하이드레이션 전에 실행하고 없어짐)
  const themeInitScript = `
    (function() {
      var s = localStorage.getItem('theme');
      var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var shouldDark = (s === 'dark') || (s === null && d);
      
      document.documentElement.classList.toggle('dark', shouldDark);
    })();
  `;

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
