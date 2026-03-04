interface RichText {
  plain_text: string;
  href: string | null;
  annotations: {
    code: boolean;
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
  };
}

export function richTextToHtml(richTexts: RichText[]): string {
  return richTexts
    .map((t) => {
      let text = t.plain_text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
      if (t.href) text = `<a href="${t.href}">${text}</a>`;
      if (t.annotations?.code) text = `<code>${text}</code>`;
      if (t.annotations?.bold) text = `<strong>${text}</strong>`;
      if (t.annotations?.italic) text = `<em>${text}</em>`;
      if (t.annotations?.strikethrough) text = `<s>${text}</s>`;
      return text;
    })
    .join('');
}
