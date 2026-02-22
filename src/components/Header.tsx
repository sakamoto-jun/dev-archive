import Link from 'next/link';
import { Github } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-bg">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold text-text tracking-tight"
        >
          Archive.Sakamoto
        </Link>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/sakamoto-jun"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-lg text-text hover:bg-accent/10 transition-colors"
          >
            <Github size={18} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
