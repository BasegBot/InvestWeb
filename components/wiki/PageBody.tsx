import mdStyles from "./markdown.module.css";
import RenderMarkdown from "./RenderMarkdown";

interface PageBodyProps {
  children: string;
  currentLanguage: string;
  path: string;
}

export default function PageBody(props: PageBodyProps) {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      <div className={mdStyles["markdown-body"]}>
        <div className="text-left">
          <RenderMarkdown
            path={props.path}
            currentLanguage={props.currentLanguage}
          >
            {props.children}
          </RenderMarkdown>
        </div>
      </div>
    </div>
  );
}
