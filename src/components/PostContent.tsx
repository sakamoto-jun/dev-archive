import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import HtmlContent from '@/components/HtmlContent';

interface Props {
  content: string;
}

export default async function PostContent({ content }: Props) {
  const markup = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrettyCode, {
      theme: { light: 'github-light', dark: 'github-dark-dimmed' },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(content);

  return <HtmlContent html={String(markup)} />;
}
