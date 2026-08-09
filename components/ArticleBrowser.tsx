"use client";

import Image from "next/image";
import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";

export type ArticleSummary = { id: string; slug: string; title: string; excerpt: string; coverImageUrl?: string; publishedLabel: string; badge?: string };

const RECENT_KEY = "paned-recent-articles";
const PAGE_SIZE = 6;

function rememberArticle(id: string) {
  const current = getRecentIds();
  window.localStorage.setItem(RECENT_KEY, [id, ...current.filter((currentId) => currentId !== id)].slice(0, 8).join(","));
}

function getRecentIds() {
  const raw = window.localStorage.getItem(RECENT_KEY) || "";
  try { return raw.startsWith("[") ? JSON.parse(raw) as string[] : raw.split(",").filter(Boolean); } catch { return []; }
}

function ArticleCard({ article, compact = false, isRead, onOpen }: { article: ArticleSummary; compact?: boolean; isRead?: boolean; onOpen: (id: string) => void }) {
  return <article className={`${compact ? "article-card article-card-compact" : "featured-article-card"} ${isRead ? "is-read" : ""}`}>{article.coverImageUrl ? <div className={compact ? "article-cover" : "featured-article-cover"}><Image src={article.coverImageUrl} alt="" fill sizes={compact ? "(max-width: 760px) 80vw, 25vw" : "(max-width: 760px) 84vw, 380px"} /><span className="article-badge">{article.badge || "Kiến thức panel"}</span></div> : null}<div><time>{article.publishedLabel}</time><h2><Link href={`/bai-viet/${article.slug}`} onClick={() => onOpen(article.id)}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="article-link" href={`/bai-viet/${article.slug}`} onClick={() => onOpen(article.id)}>Đọc bài viết <span aria-hidden="true">→</span></Link></div></article>;
}

function ArticleCarousel({ title, articles, readIds, onOpen, recent = false }: { title: string; articles: ArticleSummary[]; readIds: string[]; onOpen: (id: string) => void; recent?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) => trackRef.current?.scrollBy({ left: direction * Math.max(trackRef.current.clientWidth * 0.8, 320), behavior: "smooth" });
  if (!articles.length) return null;
  return <section className={`featured-articles ${recent ? "recent-articles" : ""}`} aria-label={title}><div className="article-section-heading"><p className="kicker">{recent ? "Đã xem" : "Nổi bật"}</p><h2>{title}</h2><div className="article-carousel-controls"><button type="button" aria-label={`Xem ${title} trước`} onClick={() => scroll(-1)}><CaretLeft size={20} weight="bold" /></button><button type="button" aria-label={`Xem ${title} tiếp theo`} onClick={() => scroll(1)}><CaretRight size={20} weight="bold" /></button></div></div><div className="featured-track" ref={trackRef}>{articles.map((article) => <ArticleCard article={article} key={article.id} isRead={readIds.includes(article.id)} onOpen={onOpen} />)}</div></section>;
}

export function RelatedArticlesCarousel({ articles }: { articles: ArticleSummary[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) => trackRef.current?.scrollBy({ left: direction * Math.max(trackRef.current.clientWidth * 0.8, 300), behavior: "smooth" });
  if (!articles.length) return null;
  return <section className="related-articles" aria-labelledby="related-articles-heading"><div className="article-section-heading"><div><p className="kicker">Cùng chủ đề</p><h2 id="related-articles-heading">Bài viết liên quan</h2></div><div className="article-carousel-controls"><button type="button" aria-label="Xem bài viết liên quan trước" onClick={() => scroll(-1)}><CaretLeft size={20} weight="bold" /></button><button type="button" aria-label="Xem bài viết liên quan tiếp theo" onClick={() => scroll(1)}><CaretRight size={20} weight="bold" /></button></div></div><div className="related-articles-track" ref={trackRef}>{articles.map((article) => <article className="related-article-card" key={article.id}>{article.coverImageUrl ? <div className="related-article-cover"><Image src={article.coverImageUrl} alt="" fill sizes="(max-width: 760px) 82vw, 340px" /><span className="article-badge">{article.badge || "Cùng chủ đề"}</span></div> : null}<div><time>{article.publishedLabel}</time><h3><Link href={`/bai-viet/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link className="article-link" href={`/bai-viet/${article.slug}`}>Đọc bài viết <span aria-hidden="true">→</span></Link></div></article>)}</div></section>;
}

function ArticleRowList({ articles, readIds, onOpen }: { articles: ArticleSummary[]; readIds: string[]; onOpen: (id: string) => void }) {
  if (!articles.length) return null;
  return <section className="article-row-list-section" aria-labelledby="quick-read-heading"><div className="article-section-heading"><p className="kicker">Đọc nhanh</p><h2 id="quick-read-heading">Mới cập nhật</h2></div><div className="article-row-list">{articles.slice(0, 5).map((article, index) => <article className={`article-row ${readIds.includes(article.id) ? "is-read" : ""}`} key={article.id}>{article.coverImageUrl ? <div className="article-row-cover"><Image src={article.coverImageUrl} alt="" fill sizes="(max-width: 760px) 96px, 130px" /></div> : <span className="article-row-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}<div><time>{article.publishedLabel}</time><h3><Link href={`/bai-viet/${article.slug}`} onClick={() => onOpen(article.id)}>{article.title}</Link></h3><p>{article.excerpt}</p></div><Link className="article-row-link" href={`/bai-viet/${article.slug}`} aria-label={`Đọc ${article.title}`} onClick={() => onOpen(article.id)}>Đọc</Link></article>)}</div></section>;
}

export function ArticleBrowser({ articles, featuredIds }: { articles: ArticleSummary[]; featuredIds: string[] }) {
  const [readIds, setReadIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => setReadIds(getRecentIds()), []);
  const markRead = (id: string) => { rememberArticle(id); setReadIds((current) => [id, ...current.filter((currentId) => currentId !== id)]); };
  const featured = articles.filter((article) => featuredIds.includes(article.id));
  const recent = useMemo(() => readIds.map((id) => articles.find((article) => article.id === id)).filter((article): article is ArticleSummary => Boolean(article)), [articles, readIds]);
  const nonFeaturedArticles = articles.filter((article) => !featuredIds.includes(article.id));
  const gridArticles = nonFeaturedArticles.length ? nonFeaturedArticles : articles;
  const pages = Math.max(1, Math.ceil(gridArticles.length / PAGE_SIZE));
  const visibleArticles = gridArticles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return <><ArticleCarousel title="Bài viết được quan tâm" articles={featured} readIds={readIds} onOpen={markRead} />{recent.length ? <ArticleCarousel title="Đọc gần đây" articles={recent} readIds={readIds} onOpen={markRead} recent /> : null}<ArticleRowList articles={gridArticles} readIds={readIds} onOpen={markRead} /><section className="article-list-section" aria-labelledby="article-list-heading"><div className="article-section-heading"><p className="kicker">Thư viện kiến thức</p><h2 id="article-list-heading">Tất cả bài viết</h2></div>{articles.length ? <><div className="article-grid article-grid-compact">{visibleArticles.map((article) => <ArticleCard article={article} compact key={article.id} isRead={readIds.includes(article.id)} onOpen={markRead} />)}</div>{pages > 1 ? <nav className="article-pagination" aria-label="Phân trang bài viết"><button type="button" className="pagination-direction" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Trước</button>{Array.from({ length: pages }, (_, index) => <button key={index + 1} type="button" aria-current={page === index + 1 ? "page" : undefined} onClick={() => { setPage(index + 1); document.getElementById("article-list-heading")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>{index + 1}</button>)}<button type="button" className="pagination-direction" disabled={page === pages} onClick={() => setPage((current) => Math.min(pages, current + 1))}>Sau</button><span className="pagination-status">Trang {page}/{pages}</span></nav> : null}</> : <div className="article-empty"><h2>Chưa có bài viết</h2><p>Người quản trị có thể tạo bài viết đầu tiên trong Sanity Studio, mục “Bài viết”.</p></div>}</section></>;
}

export function ArticleReadTracker({ articleId }: { articleId: string }) {
  useEffect(() => { rememberArticle(articleId); }, [articleId]);
  return null;
}
