import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface RenderMarkdownProps {
  children: string;
}

export default function RenderMarkdown({ children }: RenderMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug]}
      components={{
        a: ({ node, ...props }) => {
          return (
            <Link legacyBehavior href={props.href as string}>
              <a>{props.children ? props.children[0] : props.href}</a>
            </Link>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
