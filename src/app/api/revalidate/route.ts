import { revalidatePath } from 'next/cache';

// Notion API -> Next 서버 흐름

export async function GET() {
  return Response.json({ ok: true });
}

export async function POST(req: Request) {
  const { secret } = await req.json();

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/posts/[id]', 'page');

  return Response.json({ revalidated: true });
}
