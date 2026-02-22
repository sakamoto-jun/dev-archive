'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label="테마 전환"
      className="p-2 rounded-lg text-text hover:bg-accent/10 transition-colors"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
