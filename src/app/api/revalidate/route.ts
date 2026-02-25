import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.json();
  if (body.verification_token) {
    console.log(body.verification_token);
    return Response.json({ ok: true });
  }

  const rawBody = await req.text();
  const notionSignature = req.headers.get('X-Notion-Signature');

  if (!notionSignature) {
    return Response.json({ error: 'Missing signature' }, { status: 401 });
  }

  const hmac = crypto
    .createHmac('sha256', process.env.REVALIDATE_SECRET!)
    .update(rawBody)
    .digest('hex');

  const calculatedSignature = `sha256=${hmac}`;

  const isTrustedPayload = crypto.timingSafeEqual(
    Buffer.from(calculatedSignature),
    Buffer.from(notionSignature),
  );

  if (!isTrustedPayload) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }

  revalidatePath('/');
  revalidatePath('/posts/[id]', 'page');

  return Response.json({ revalidated: true });
}
