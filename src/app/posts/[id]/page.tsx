"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { PostDetail } from "@/types/post";

interface Props {
  params: Promise<{ id: string }>;
}

export default function PostPage({ params }: Props) {
  const { id } = use(params);

  const { data: post, isLoading } = useQuery<PostDetail>({
    queryKey: ["post", id],
    queryFn: () => fetch(`/api/posts/${id}`).then((r) => r.json()),
  });

  if (isLoading) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-10 animate-pulse">
        <div className="flex gap-2 mb-4">
          <div className="h-5 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700 mb-3" />
        <div className="h-5 w-1/2 rounded bg-gray-200 dark:bg-gray-700 mb-6" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>
      </main>
    );
  }

  if (!post) return null;

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-[#DCE2F0] text-[#50586C] dark:bg-[#50586C]/30 dark:text-[#DCE2F0]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
        {post.title}
      </h1>
      {post.subtitle && (
        <p className="text-lg font-light text-gray-600 dark:text-gray-400 mb-4">
          {post.subtitle}
        </p>
      )}
      <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-10 pb-6 border-b border-gray-200 dark:border-gray-800">
        <span>Sakamoto</span>
        <span>·</span>
        <time>{formattedDate}</time>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none font-light">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
