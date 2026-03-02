'use client';

import { useRef, useEffect } from 'react';

const COPY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 15 4 10"/></svg>`;

interface Props {
  html: string;
}

export default function HtmlContent({ html }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll('pre').forEach((pre) => {
      if (pre.parentElement?.classList.contains('code-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'relative group code-wrapper';
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement('button');
      btn.setAttribute('aria-label', '코드 복사');
      btn.className =
        'absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded bg-text/10 hover:bg-text/20 text-text/50 hover:text-text z-10 cursor-pointer';
      btn.innerHTML = COPY_ICON;

      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(pre.textContent ?? '');
        btn.innerHTML = CHECK_ICON;
        setTimeout(() => {
          btn.innerHTML = COPY_ICON;
        }, 2000);
      });

      wrapper.appendChild(btn);
    });
  }, [html]);

  return (
    <article className="prose max-w-none">
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
