# 개발 아카이브 블로그

Notion을 CMS로 활용하여 글을 작성하면 블로그에 자동으로 반영되는 구조로 제작했습니다.

🔗 [www.sakamotoarchive.dev](https://www.sakamotoarchive.dev)

---

## 프로젝트 목표

- Notion DB를 CMS로 사용하는 개인 기술 블로그 구축
- 글 작성 → 자동 노출되는 워크플로우 실현
- ISR(Incremental Static Regeneration) 기반으로 정적 사이트의 성능과 동적 콘텐츠 갱신을 동시에 확보

---

## 기술 스택

| 분류        | 기술                                 |
| ----------- | ------------------------------------ |
| Framework   | Next.js (App Router)                 |
| Language    | TypeScript                           |
| Styling     | TailwindCSS, @tailwindcss/typography |
| Notion 연동 | @notionhq/client, notion-to-md       |
| 상태 관리   | Context API (테마)                   |
| 아이콘      | lucide-react                         |
| 배포        | Vercel (Cloudflare 도메인 연결)      |

---

## 주요 기능

- Notion DB 연동 — `Published` 프로퍼티 체크된 글만 자동 노출
- 태그 멀티셀렉트 필터 + 검색 (클라이언트 사이드)
- 다크/라이트 테마 토글 (localStorage 유지)
- ISR — Notion Webhook 수신 시 캐시 자동 갱신
- SEO — 페이지별 메타태그, OG 태그, sitemap.xml, robots.txt

---

## 트러블슈팅

### 1. 전역 테마 하이드레이션 미스매치

**문제**  
다크모드 상태를 localStorage에서 읽어 적용하는 구조였는데, React 하이드레이션 이전에 DOM이 먼저 그려지면서 테마가 잠깐 반전되는 플래시 현상(FOUC)이 발생했다.

**해결**  
`layout.tsx`의 `<head>`에 즉시실행함수(IIFE) 스크립트를 인라인으로 직접 삽입했다.  
하이드레이션 전에 스크립트가 실행되어 localStorage 값을 읽고 `<html>`에 `dark` 클래스를 즉시 부여하는 방식으로 플래시 현상을 제거했다.

```ts
// layout.tsx
const themeInitScript = `
  (function() {
    var s = localStorage.getItem('theme');
    var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', s === 'dark' || (s === null && d));
  })();
`;
```

---

### 2. 코드 블록 렌더링 개선 (shiki + rehype-pretty-code 전환)

**문제**
기존에는 `react-markdown` + `rehype-highlight`로 클라이언트에서 마크업 변환과 코드 하이라이팅을 처리했다.
주석(`//`, `/* */`)이 제대로 하이라이팅되지 않는 경우가 있었고, 마크업 변환 자체가 클라이언트에서 실행되다 보니 포스트 상세 페이지 진입 시 렌더링이 눈에 띄게 느렸다.

**해결**
`rehype-pretty-code` + `shiki`로 교체하고, 마크업 변환 과정 전체를 서버 컴포넌트(`PostContent`)에서 처리하도록 변경했다.
빌드 또는 요청 시 서버에서 HTML로 완전히 변환된 결과를 클라이언트에 내려주기 때문에 클라이언트 측 렌더링 부담이 없어졌고, shiki의 정확한 토크나이징 덕분에 주석 처리도 올바르게 동작한다.

```ts
// PostContent.tsx (서버 컴포넌트)
const markup = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypePrettyCode, {
    theme: { light: 'github-light', dark: 'github-dark-dimmed' },
    keepBackground: false,
  })
  .use(rehypeStringify)
  .process(content);
```

---

### 3. CSR → ISR 전환 (서버/클라이언트 컴포넌트 분리)

**문제**  
초기에는 React Query를 사용한 CSR 방식으로 클라이언트에서 데이터를 fetch 했다.  
검색엔진 크롤링이 불가하고, 매 요청마다 Notion API를 호출하는 성능 문제가 있었다.

**해결**  
Next.js App Router의 서버 컴포넌트 구조로 전환했다.

- `page.tsx` (서버 컴포넌트) — `getPosts()`를 직접 import해서 서버에서 데이터를 fetch 하고 props 로 전달
- `PostListClient.tsx` (클라이언트 컴포넌트) — 검색/필터 등 인터랙션만 담당
- `api/revalidate` — Notion Webhook에서 POST 요청이 들어오면 `revalidatePath`를 실행해 ISR 캐시를 갱신

이 구조로 초기 렌더링 성능과 SEO를 확보하면서, Notion에 글을 작성하면 Webhook → 캐시 갱신 → 자동 반영되는 워크플로우를 구현했다.

---

### 4. 포스트 상세 페이지 SEO (generateStaticParams)

**문제**  
동적 라우트(`/posts/[id]`)는 기본적으로 요청 시 서버 렌더링되어 초기 응답이 느리고, 검색엔진이 각 페이지를 제대로 수집하지 못할 수 있었다.

**해결**  
`generateStaticParams`로 빌드 시 모든 포스트 ID를 미리 가져와 정적 페이지를 사전 생성했다.  
각 포스트 페이지는 `generateMetadata`로 고유한 title, description, OG 태그를 동적으로 생성한다.

```ts
// posts/[id]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ id: post.id }));
}
```
