import { m } from "framer-motion";
import Link from "next/link";
import { ReactComponentElement, ReactElement } from "react";

const DefaultNavOption = ({
  label,
  href,
}: {
  label: string;
  href: string;
}): ReactElement => {
  return (
    <m.div
      initial={{
        scale: 1,
      }}
      whileHover={{
        transition: {
          duration: 0.2,
        },
      }}
      whileTap={{
        scale: 0.95,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <Link href={href} key={label}>
        <p className="pointer-events-auto relative select-none pl-3 pr-3 text-white md:pl-5 md:pr-5">
          {label}
        </p>
      </Link>
    </m.div>
  );
};

interface NavTemplate {
  content: ReactComponentElement<any> | ReactElement;
}

const homeMain: NavTemplate[] = [
  { content: <DefaultNavOption label="Home" href="/" /> },
  { content: <DefaultNavOption label="About" href="/about" /> },
  { content: <DefaultNavOption label="Contact" href="/contact" /> },
];

export { type NavTemplate, homeMain };
