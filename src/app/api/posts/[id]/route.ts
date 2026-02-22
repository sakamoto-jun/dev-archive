import { NextResponse } from "next/server";
import { getPostDetail } from "@/lib/notion";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await getPostDetail(id);
    return NextResponse.json(post);
  } catch (error) {
    console.error("[GET /api/posts/[id]]", error);
    return NextResponse.json({ error: "포스트를 불러오지 못했습니다." }, { status: 500 });
  }
}
