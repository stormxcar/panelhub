import { PortableText, type PortableTextComponents } from "next-sanity";
import type { TypedObject } from "@portabletext/types";
import Image from "next/image";

export type RichTextValue = TypedObject[];
type ComparisonRow = { criterion?: string; leftValue?: string; rightValue?: string };

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
    },
    comparisonTable: ({ value }) => {
      const rawRows: unknown[] = Array.isArray(value?.rows) ? value.rows : [];
      const rows = rawRows.filter((row): row is ComparisonRow => Boolean(row && typeof row === "object"));
      if (!rows.length) return null;
      const title = typeof value?.title === "string" ? value.title : undefined;
      const leftTitle = typeof value?.leftColumnTitle === "string" ? value.leftColumnTitle : "Nhà Panel";
      const rightTitle = typeof value?.rightColumnTitle === "string" ? value.rightColumnTitle : "Xây dựng truyền thống";
      return <section className="rich-comparison-table" aria-label={title || "Bảng so sánh"}>{title ? <h3>{title}</h3> : null}<div className="rich-comparison-scroll"><table><thead><tr><th scope="col">Tiêu chí</th><th scope="col">{leftTitle}</th><th scope="col">{rightTitle}</th></tr></thead><tbody>{rows.map((row, index) => <tr key={`${row.criterion || "row"}-${index}`}><th scope="row">{row.criterion || "Tiêu chí"}</th><td>{row.leftValue || "-"}</td><td>{row.rightValue || "-"}</td></tr>)}</tbody></table></div></section>;
    }
  }
};

export function RichText({ value, className = "rich-text" }: { value?: RichTextValue; className?: string }) {
  if (!value?.length) return null;
  return <div className={className}><PortableText value={value} components={components} /></div>;
}
