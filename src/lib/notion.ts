import { cache } from 'react';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { Post, PostDetail } from '@/types/post';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

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
