import Link from 'next/link';
import { Post } from '@/types/post';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <Link href={`/posts/${post.id}`}>
      <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-zinc-800">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-secondary text-primary dark:bg-pritext-primary/30 dark:text-secbg-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-1">
          {post.title}
        </h2>
        {post.subtitle && (
          <p className="text-sm font-light text-gray-600 dark:text-gray-400 mb-3">
            {post.subtitle}
          </p>
        )}
        <time className="text-xs text-gray-400 dark:text-gray-500">
          {formattedDate}
        </time>
      </article>
    </Link>
  );
}
