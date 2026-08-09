import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { RichText } from "../../../components/RichText";
import { SiteFooter } from "../../../components/SiteFooter";
import { SiteHeader } from "../../../components/SiteHeader";
import { getManagedArticle, getRelatedArticles } from "../../../lib/sanity";
import { site } from "../../../lib/site";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const article = await getManagedArticle((await params).slug); if (!article) return {}; return { title: article.seoTitle || `${article.title} | ${site.name}`, description: article.seoDescription || article.excerpt, alternates: { canonical: `/bai-viet/${article.slug}` } }; }

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { const article = await getManagedArticle((await params).slug); if (!article) notFound(); const relatedArticles = article.tags?.length ? await getRelatedArticles(article.slug, article.tags) : []; return <main className="content-page"><SiteHeader /><article className="article-detail"><Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Bài viết", href: "/bai-viet" }, { label: article.title }]} /><time dateTime={article.publishedAt}>{article.publishedAt ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(article.publishedAt)) : "Bài viết"}</time><h1>{article.title}</h1><p className="article-excerpt">{article.excerpt}</p>{article.coverImageUrl ? <div className="article-detail-cover"><Image src={article.coverImageUrl} alt={article.title} fill priority sizes="(max-width: 920px) 100vw, 820px" /></div> : null}<RichText value={article.body} className="rich-text article-body" /><p><Link className="secondary-btn" href="/bai-viet">← Xem tất cả bài viết</Link></p></article>{relatedArticles.length ? <section className="related-articles" aria-labelledby="related-articles-heading"><div className="article-section-heading"><p className="kicker">Cùng chủ đề</p><h2 id="related-articles-heading">Bài viết liên quan</h2></div><div className="related-articles-grid">{relatedArticles.map((relatedArticle) => <article className="related-article-card" key={relatedArticle._id}><h3><Link href={`/bai-viet/${relatedArticle.slug}`}>{relatedArticle.title}</Link></h3><p>{relatedArticle.excerpt}</p><Link className="article-link" href={`/bai-viet/${relatedArticle.slug}`}>Đọc bài viết <span aria-hidden="true">→</span></Link></article>)}</div></section> : null}<SiteFooter /></main>; }
