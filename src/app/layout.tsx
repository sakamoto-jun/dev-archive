import type { Metadata } from 'next';
import { JetBrains_Mono, Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Providers from '@/components/Providers';

const notoSansKR = Noto_Sans_KR({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
});

const jetBrainsMono = JetBrains_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  fallback: ['monospace'],
});

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
    <html lang="ko" suppressHydrationWarning className={jetBrainsMono.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${notoSansKR.className} min-h-screen bg-bg text-text antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
