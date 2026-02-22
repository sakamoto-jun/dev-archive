'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface Props {
  allTags: string[];
  onSearch: (query: string) => void;
  onTagFilter: (tags: string[]) => void;
}

export default function SearchFilter({
  allTags,
  onSearch,
  onTagFilter,
}: Props) {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(next);
    onTagFilter(next);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button
          onClick={() => setShowFilter((v) => !v)}
          aria-label="필터"
          className={`p-2 rounded-lg transition-colors ${
            showFilter || selectedTags.length > 0
              ? 'bg-primary text-white'
              : 'text-primary hover:bg-secondary dark:text-secondary dark:hover:bg-primary/30'
          }`}
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {showFilter && allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary dark:hover:border-secondary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
