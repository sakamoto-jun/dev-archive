import { NextResponse } from "next/server";
import { getPosts } from "@/lib/notion";

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[GET /api/posts]", error);
    return NextResponse.json({ error: "포스트를 불러오지 못했습니다." }, { status: 500 });
  }
}
