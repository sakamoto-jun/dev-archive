'use client';

import { useState, useMemo } from 'react';
import { Post } from '@/types/post';
import PostCard from '@/components/PostCard';
import SearchFilter from '@/components/SearchFilter';

interface Props {
  posts: Post[];
}

export default function PostListClient({ posts }: Props) {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    <>
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-xl font-bold text-text shrink-0">포스트</h1>
        <div className="flex-1 max-w-sm ml-auto">
          <SearchFilter
            allTags={allTags}
            onSearch={setQuery}
            onTagFilter={setSelectedTags}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-text/50 text-center py-10">
            포스트가 없습니다.
          </p>
        )}
      </div>
    </>
  );
}
