'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="테마 전환"
      className="p-2 rounded-lg text-primary hover:bg-secondary dark:text-secbg-secondary dark:hover:bg-pritext-primary/30 transition-colors"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
