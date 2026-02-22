'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Post } from '@/types/post';
import PostCard from '@/components/PostCard';
import SearchFilter from '@/components/SearchFilter';

// Skeleton UI
function PostCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 p-6 animate-pulse">
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
      <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700 mb-4" />
      <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

// Home
export default function HomePage() {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then((r) => r.json()),
  });

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))),
    [posts],
  );

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchQuery =
        query === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase());
      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.every((t) => p.tags.includes(t));
      return matchQuery && matchTags;
    });
  }, [posts, query, selectedTags]);

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50 shrink-0">
          포스트
        </h1>
        <div className="flex-1 max-w-sm ml-auto">
          <SearchFilter
            allTags={allTags}
            onSearch={setQuery}
            onTagFilter={setSelectedTags}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))
          : filtered.map((post) => <PostCard key={post.id} post={post} />)}
        {!isLoading && filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-10">
            포스트가 없습니다.
          </p>
        )}
      </div>
    </main>
  );
}
