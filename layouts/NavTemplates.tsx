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
    <Link href={href} key={label} className="w-full text-center">
      <m.div
        initial={{
          scale: 1,
        }}
        whileHover={{
          scale: 1.05,
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
        <p className="pointer-events-auto relative select-none pl-3 pr-3 font-plusJakarta text-white md:pl-5 md:pr-5">
          {label}
        </p>
      </m.div>
    </Link>
  );
};

interface NavTemplate {
  content: ReactComponentElement<any> | ReactElement;
}

const homeMain: NavTemplate[] = [
  { content: <DefaultNavOption label="Home" href="/" /> },
  { content: <DefaultNavOption label="About" href="/about" /> },
  { content: <DefaultNavOption label="Team" href="/team" /> },
  { content: <DefaultNavOption label="Contact" href="/contact" /> },
];

export { type NavTemplate, homeMain };
