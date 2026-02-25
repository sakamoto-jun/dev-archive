import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  console.log(req.headers);
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (token !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/posts/[id]', 'page');

  return Response.json({ revalidated: true });
}
