import { PortableText as SanityPortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";

type BlockProps = {
  children?: React.ReactNode;
  value?: PortableTextBlock;
};

type MarkProps = {
  children?: React.ReactNode;
  value?: {
    href: string;
  };
};

const components: Partial<PortableTextComponents> = {
  block: {
    h1: ({ children }: BlockProps) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: BlockProps) => (
      <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: BlockProps) => (
      <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }: BlockProps) => <p className="mb-4">{children}</p>,
  },
  marks: {
    link: ({ value, children }: MarkProps) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <Link
          href={value?.href || "#"}
          target={target}
          className="text-blue-600 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <SanityPortableText value={value} components={components} />;
}
