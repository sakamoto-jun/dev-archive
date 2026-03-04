/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from 'react';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { Post, PostDetail } from '@/types/post';
import { richTextToHtml } from '@/lib/richText';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

// 새 블록 빈값 부여 처리
n2m.setCustomTransformer('paragraph', async (block: any) => {
  const { paragraph } = block;
  // parent가 비어있으면 빈 블록 → &nbsp; 반환
  if (!paragraph.rich_text.length) {
    return '\n&nbsp;\n';
  }
  return false; // 기본 변환 사용
});

// callout 블록 커스텀
n2m.setCustomTransformer('callout', async (block: any) => {
  const { callout } = block;
  const icon = callout.icon?.emoji ?? '';
  const color: string = callout.color ?? 'default';
  const colorClass = color.includes('yellow')
    ? 'callout-yellow'
    : 'callout-blue';
  const text = richTextToHtml(callout.rich_text ?? []);

  return `\n<div class="callout ${colorClass}"><span class="callout-icon">${icon}</span><div class="callout-body">${text}</div></div>\n`;
});

export const getPosts = cache(async function (): Promise<Post[]> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: 'Published',
        checkbox: { equals: true },
      },
      sorts: [{ property: 'Date', direction: 'descending' }],
    });

    return response.results.map((page: any) => {
      const props = page.properties;

      return {
        id: page.id,
        title: props.Title?.title?.[0]?.plain_text ?? '',
        subtitle: props.Subtitle?.rich_text?.[0]?.plain_text ?? '',
        date: props.Date?.date?.start ?? '',
        tags:
          props.Tags?.multi_select?.map((t: { name: string }) => t.name) ?? [],
      };
    });
  } catch (e) {
    console.error('[getPosts] Notion API error:', e);
    return [];
  }
});

export const getPostDetail = cache(async function (
  id: string,
): Promise<PostDetail> {
  const page = await notion.pages.retrieve({ page_id: id });
  const props = (page as any).properties;

  const mdBlocks = await n2m.pageToMarkdown(id);
  const content = n2m.toMarkdownString(mdBlocks).parent;

  return {
    id: page.id,
    title: props.Title?.title?.[0]?.plain_text ?? '',
    subtitle: props.Subtitle?.rich_text?.[0]?.plain_text ?? '',
    date: props.Date?.date?.start ?? '',
    tags: props.Tags?.multi_select?.map((t: { name: string }) => t.name) ?? [],
    content,
  };
});
