'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import CodeBlock from '@/components/CodeBlock';

interface Props {
  content: string;
}

export default function PostContent({ content }: Props) {
  return (
    <article className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{ pre: CodeBlock }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
