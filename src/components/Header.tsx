import Link from 'next/link';
import { Github } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-950">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold text-primary dark:text-secondary tracking-tight"
        >
          Archive.Sakamoto
        </Link>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/sakamoto-jun"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-lg text-primary hover:bg-sectext-secondary dark:text-secondary dark:hover:bg-prtext-primary/30 transition-colors"
          >
            <Github size={18} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
