import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPosts, getPostDetail } from '@/lib/notion';
import PostContent from '@/components/PostContent';

// Post 정적 생성
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ id: post.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

// Post 디테일 Metadata 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostDetail(id).catch(() => null);
  if (!post) return {};

  return {
    title: `${post.title} | Archive.sakamoto`,
    description: post.subtitle || post.title,
    openGraph: {
      title: `${post.title} | Archive.sakamoto`,
      description: post.subtitle || post.title,
      images: [{ url: '/og-default.png', width: 1200, height: 630 }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Archive.sakamoto`,
      description: post.subtitle || post.title,
      images: ['/og-default.png'],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostDetail(id).catch(() => null);
  if (!post) notFound();

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
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

      <h1 className="text-3xl font-bold text-text mb-2">{post.title}</h1>
      {post.subtitle && (
        <p className="text-lg text-text/70 mb-4">{post.subtitle}</p>
      )}
      <div className="flex items-center gap-2 text-sm text-text/50 mb-10 pb-6 border-b border-border">
        <span>Sakamoto</span>
        <span>·</span>
        <time>{formattedDate}</time>
      </div>

      <PostContent content={post.content} />
    </main>
  );
}
