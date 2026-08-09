import type { Metadata } from "next";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { ArticleBrowser } from "../../components/ArticleBrowser";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { getManagedArticles } from "../../lib/sanity";
import { site } from "../../lib/site";

export const metadata: Metadata = { title: `Bài viết | ${site.name}`, description: "Kiến thức, kinh nghiệm và thông tin tham khảo về nhà tiền chế tấm panel." };

export default async function ArticlesPage() {
  const articles = await getManagedArticles();
  const articleSummaries = articles.map((article) => ({ id: article._id, slug: article.slug, title: article.title, excerpt: article.excerpt, coverImageUrl: article.coverImageUrl, publishedLabel: article.publishedAt ? new Intl.DateTimeFormat("vi-VN", { dateStyle: "long" }).format(new Date(article.publishedAt)) : "Bài viết mới", badge: article.tags?.[0] || "Kiến thức panel" }));
  const featuredIds = articles.filter((article) => article.featured).slice(0, 6).map((article) => article._id);

  return <main className="content-page"><SiteHeader /><section className="article-hero"><Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Bài viết" }]} /><p className="kicker">Góc kiến thức</p><h1>Thông tin hữu ích về nhà tiền chế tấm panel</h1><p>Những bài viết giúp bạn chuẩn bị rõ hơn về vật tư, tiến độ, chi phí và phương án thi công.</p></section><ArticleBrowser articles={articleSummaries} featuredIds={featuredIds} /><SiteFooter /></main>;
}
