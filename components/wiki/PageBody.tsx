import mdStyles from "./markdown.module.css";
import RenderMarkdown from "./RenderMarkdown";

interface PageBodyProps {
  children: string;
}

export default function PageBody({ children }: PageBodyProps) {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <div className={mdStyles["markdown-body"]}>
        <div className="text-left">
          <RenderMarkdown>{children}</RenderMarkdown>
        </div>
      </div>
    </div>
  );
}
