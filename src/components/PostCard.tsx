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
      <article className="rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-border">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h2 className="text-lg font-bold text-text mb-1">{post.title}</h2>
        {post.subtitle && (
          <p className="text-sm text-text/70 mb-3">{post.subtitle}</p>
        )}
        <time className="text-xs text-text/50">{formattedDate}</time>
      </article>
    </Link>
  );
}
