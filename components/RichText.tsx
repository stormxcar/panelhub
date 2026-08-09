import { PortableText, type PortableTextComponents } from "next-sanity";
import type { TypedObject } from "@portabletext/types";

export type RichTextValue = TypedObject[];

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return <a href={href} target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noreferrer" : undefined}>{children}</a>;
    }
  }
};

export function RichText({ value, className = "rich-text" }: { value?: RichTextValue; className?: string }) {
  if (!value?.length) return null;
  return <div className={className}><PortableText value={value} components={components} /></div>;
}
