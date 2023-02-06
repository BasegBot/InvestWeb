---
layout: "home"
title: "some data"
---

# toffee wiki

Official WIP wiki!!

## Stuffs

Some wiki stuff will go here

Check out an actual example page [over here](/wiki/en/ex/next/)

多[言語](/wiki/ja/)化！？

## Markdown Support

```jsx
export default function RenderMarkdown({ children }: RenderMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight, rehypeSlug]}
    >
      {children}
    </ReactMarkdown>
  );
}
```

## GFM

### Autolink literals

www.example.com, <https://example.com>, and contact@example.com.

### Footnote

A note[^1]

[^1]: Big note.

### Strikethrough

~one~ or ~~two~~ tildes.

### Table

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

### Tasklist

- [ ] to do
- [x] done
