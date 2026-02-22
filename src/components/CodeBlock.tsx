'use client';

import { useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  children?: React.ReactNode;
}

export default function CodeBlock({ children }: Props) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(preRef.current?.textContent ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        aria-label="코드 복사"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded bg-text/10 hover:bg-text/20 text-text/50 hover:text-text"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre ref={preRef}>{children}</pre>
    </div>
  );
}
