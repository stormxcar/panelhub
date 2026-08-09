import { PortableText, type PortableTextComponents } from "next-sanity";
import type { TypedObject } from "@portabletext/types";
import Image from "next/image";

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
  },
  types: {
    contentImage: ({ value }) => {
      const imageUrl = typeof value?.imageUrl === "string" ? value.imageUrl : undefined;
      if (!imageUrl) return null;
      const alt = typeof value?.alt === "string" ? value.alt : "Ảnh minh họa nội dung";
      const caption = typeof value?.caption === "string" ? value.caption : undefined;
      return <figure className="rich-text-image"><Image src={imageUrl} alt={alt} width={1400} height={900} sizes="(max-width: 760px) 100vw, 760px" />{caption ? <figcaption>{caption}</figcaption> : null}</figure>;
    }
  }
};

export function RichText({ value, className = "rich-text" }: { value?: RichTextValue; className?: string }) {
  if (!value?.length) return null;
  return <div className={className}><PortableText value={value} components={components} /></div>;
}
