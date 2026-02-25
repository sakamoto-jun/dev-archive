import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const body = await req.json();

  // Notion 엔드포인트 인증 요청
  if (body.verification_token) {
    return Response.json({ verification_token: body.verification_token });
  }

  // 일반 웹훅 이벤트 — Authorization 검증
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (token !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/posts/[id]', 'page');

  return Response.json({ revalidated: true });
}
