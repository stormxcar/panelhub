import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { getManagedArticles } from "../../lib/sanity";
import { site } from "../../lib/site";

export const metadata: Metadata = { title: `Bài viết | ${site.name}`, description: "Kiến thức, kinh nghiệm và thông tin tham khảo về nhà tiền chế tấm panel." };

export default async function ArticlesPage() {
  const articles = await getManagedArticles();
  const featuredArticles = articles.filter((article) => article.featured).slice(0, 6);
  const regularArticles = articles.filter((article) => !article.featured);
  const visibleArticles = regularArticles;

  return <main className="content-page"><SiteHeader /><section className="article-hero"><Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Bài viết" }]} /><p className="kicker">Góc kiến thức</p><h1>Thông tin hữu ích về nhà tiền chế tấm panel</h1><p>Những bài viết giúp bạn chuẩn bị rõ hơn về vật tư, tiến độ, chi phí và phương án thi công.</p></section>{featuredArticles.length ? <section className="featured-articles" aria-labelledby="featured-articles-heading"><div className="article-section-heading"><p className="kicker">Nổi bật</p><h2 id="featured-articles-heading">Bài viết được quan tâm</h2></div><div className="featured-track">{featuredArticles.map((article) => <article className="featured-article-card" key={article._id}>{article.coverImageUrl ? <div className="featured-article-cover"><Image src={article.coverImageUrl} alt="" fill sizes="(max-width: 760px) 88vw, 420px" /></div> : null}<div><time dateTime={article.publishedAt}>{article.publishedAt ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(article.publishedAt)) : "Bài viết mới"}</time><h2><Link href={`/bai-viet/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="article-link" href={`/bai-viet/${article.slug}`}>Đọc bài viết <span aria-hidden="true">→</span></Link></div></article>)}</div></section> : null}{visibleArticles.length || !articles.length ? <section className="article-list-section" aria-labelledby="article-list-heading"><div className="article-section-heading"><p className="kicker">Tất cả bài viết</p><h2 id="article-list-heading">Kiến thức và kinh nghiệm thực tế</h2></div><div className="article-grid" aria-label="Danh sách bài viết">{visibleArticles.length ? visibleArticles.map((article) => <article className="article-card" key={article._id}>{article.coverImageUrl ? <div className="article-cover"><Image src={article.coverImageUrl} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div> : null}<div><time dateTime={article.publishedAt}>{article.publishedAt ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(article.publishedAt)) : "Bài viết mới"}</time><h2><Link href={`/bai-viet/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="article-link" href={`/bai-viet/${article.slug}`}>Đọc bài viết <span aria-hidden="true">→</span></Link></div></article>) : <div className="article-empty"><h2>Chưa có bài viết</h2><p>Người quản trị có thể tạo bài viết đầu tiên trong Sanity Studio, mục “Bài viết”.</p></div>}</div></section> : null}<SiteFooter /></main>;
}
