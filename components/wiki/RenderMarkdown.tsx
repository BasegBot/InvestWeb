import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface RenderMarkdownProps {
  children: string;
  path: string;
  currentLanguage: string;
}

export default function RenderMarkdown(pageprops: RenderMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug]}
      components={{
        a: ({ node, ...props }) => {
          // if the link is internal, reformat it; if it ends with a slash, do not apply this
          let href = props.href as string;
          if (!href.endsWith("/") && !href.startsWith("http")) {
            if (href.startsWith("/wiki/")) {
              href = `/wiki/${pageprops.currentLanguage}${href.slice(5)}`;
            } else {
              // if single relative
              href = `/wiki/${pageprops.currentLanguage}/${pageprops.path}/${href}`;
            }
          }
          return (
            <Link legacyBehavior href={href as string}>
              <a>{props.children ? props.children[0] : href}</a>
            </Link>
          );
        },
        img: ({ node, ...props }) => {
          // if image is internal (relative), prefix it with the current page's path
          let src = props.src as string;
          if (!src.startsWith("http") && !src.startsWith("/")) {
            src = `/img/wiki/${pageprops.path}/${src}`;
          }
          return (
            <div className="flex w-full flex-col items-center justify-center">
              <img
                className="mb-2"
                src={src}
                alt={props.alt as string}
                title={props.title as string}
              />
              <p> {props.title as string} </p>
            </div>
          );
        },
      }}
    >
      {pageprops.children}
    </ReactMarkdown>
  );
}
