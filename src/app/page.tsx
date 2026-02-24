import { getPosts } from '@/lib/notion';
import PostListClient from '@/components/PostListClient';

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <PostListClient posts={posts} />
    </main>
  );
}
