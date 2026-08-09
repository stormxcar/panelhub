import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { ArticleReadTracker, RelatedArticlesCarousel } from "../../../components/ArticleBrowser";
import { RichText } from "../../../components/RichText";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { getManagedArticle, getRelatedArticles } from "../../../lib/sanity";
import { site } from "../../../lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = await getManagedArticle((await params).slug); if (!article) return {}; return { title: article.seoTitle || `${article.title} | ${site.name}`, description: article.seoDescription || article.excerpt, alternates: { canonical: `/bai-viet/${article.slug}` } }; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { const article = await getManagedArticle((await params).slug); if (!article) notFound(); const relatedArticles = article.tags?.length ? await getRelatedArticles(article.slug, article.tags) : []; const relatedSummaries = relatedArticles.map((relatedArticle) => ({ id: relatedArticle._id, slug: relatedArticle.slug, title: relatedArticle.title, excerpt: relatedArticle.excerpt, coverImageUrl: relatedArticle.coverImageUrl, publishedLabel: relatedArticle.publishedAt ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(relatedArticle.publishedAt)) : "Bài viết mới", badge: relatedArticle.tags?.[0] || "Cùng chủ đề" })); return <main className="content-page"><SiteHeader /><ArticleReadTracker articleId={article._id} /><article className="article-detail"><Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Bài viết", href: "/bai-viet" }, { label: article.title }]} /><time dateTime={article.publishedAt}>{article.publishedAt ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(article.publishedAt)) : "Bài viết"}</time><h1>{article.title}</h1><p className="article-excerpt">{article.excerpt}</p>{article.coverImageUrl ? <div className="article-detail-cover"><Image src={article.coverImageUrl} alt={article.title} fill priority sizes="(max-width: 920px) 100vw, 820px" /></div> : null}<RichText value={article.body} className="rich-text article-body" /><p><Link className="secondary-btn" href="/bai-viet">← Xem tất cả bài viết</Link></p></article><RelatedArticlesCarousel articles={relatedSummaries} /><SiteFooter /></main>; }
