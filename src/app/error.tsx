'use client';

import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('[Error Boundary]', error);
  }, [error]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10 text-center">
      <h1 className="text-2xl font-bold text-text mb-4">문제가 발생했습니다</h1>
      <p className="text-text/50 font-light mb-8">잠시 후 다시 시도해 주세요.</p>
      <button
        onClick={reset}
        className="px-4 py-2 text-sm border border-border rounded-lg text-text hover:border-accent hover:text-accent transition-colors duration-200"
      >
        다시 시도
      </button>
    </main>
  );
}
