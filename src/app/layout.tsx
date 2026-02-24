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
  title: 'Archive.sakamoto',
  description:
    '프론트엔드 개발자 sakamoto의 개발 아카이브, 배운 것들을 기록합니다.',
  openGraph: {
    title: 'Archive.sakamoto',
    description:
      '프론트엔드 개발자 sakamoto의 개발 아카이브, 배운 것들을 기록합니다.',
    url: 'https://archive-sakamoto.vercel.app',
    siteName: 'Archive.sakamoto',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Archive.sakamoto',
    description:
      '프론트엔드 개발자 sakamoto의 개발 아카이브, 배운 것들을 기록합니다.',
    images: ['/og-default.png'],
  },
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
