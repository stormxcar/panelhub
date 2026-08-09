"use client";

import Link from "next/link";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useEffect, useMemo, useRef, useState } from "react";

type SearchItem = { id: string; title: string; description: string; href: string; keywords: string };
const recentKey = "paned-recent-searches";
const quickItems: SearchItem[] = [
  { id: "anatomy", title: "Cấu tạo tấm panel", description: "Lớp tôn, lõi cách nhiệt và quy cách panel.", href: "/cau-tao", keywords: "cấu tạo panel eps pu rockwool tôn lõi" },
  { id: "process", title: "Quy trình thi công", description: "Các bước từ khảo sát đến bàn giao.", href: "/quy-trinh", keywords: "quy trình thi công khảo sát bàn giao" },
  { id: "projects", title: "Dự án nhà panel", description: "Hình ảnh và mô hình công trình tham khảo.", href: "/du-an", keywords: "dự án nhà xưởng nhà ở công trình" },
  { id: "pricing", title: "Báo giá nhà panel", description: "Gói giá và phạm vi thi công tham khảo.", href: "/bao-gia", keywords: "báo giá chi phí m2 nhà tiền chế" },
  { id: "video", title: "Video công trình", description: "Xem công trình thực tế qua video.", href: "/#video-cong-trinh", keywords: "video công trình thực tế" },
  { id: "faq", title: "Câu hỏi thường gặp", description: "Giải đáp về panel, thi công và chi phí.", href: "/#faq", keywords: "faq hỏi đáp bảo hành" },
  { id: "contact", title: "Liên hệ tư vấn", description: "Gửi nhu cầu để nhận phương án sơ bộ.", href: "/#lien-he", keywords: "liên hệ hotline tư vấn nhận báo giá" }
];

function loadRecent() { try { return JSON.parse(window.localStorage.getItem(recentKey) || "[]") as SearchItem[]; } catch { return []; } }

export function SiteSearch({ articles }: { articles: SearchItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [recent, setRecent] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const items = useMemo(() => [...quickItems, ...articles], [articles]);
  useEffect(() => { const timer = window.setTimeout(() => setDebouncedQuery(query.trim().toLocaleLowerCase("vi")), 220); return () => window.clearTimeout(timer); }, [query]);
  useEffect(() => { if (!isOpen) return; setRecent(loadRecent()); window.setTimeout(() => inputRef.current?.focus(), 30); }, [isOpen]);
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setIsOpen(true); } if (event.key === "Escape") setIsOpen(false); }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); }, []);
  const results = debouncedQuery ? items.filter((item) => `${item.title} ${item.description} ${item.keywords}`.toLocaleLowerCase("vi").includes(debouncedQuery)).slice(0, 8) : [];
  const openItem = (item: SearchItem) => { const next = [item, ...recent.filter((recentItem) => recentItem.id !== item.id)].slice(0, 6); window.localStorage.setItem(recentKey, JSON.stringify(next)); setRecent(next); setIsOpen(false); };
  const clearRecent = () => { window.localStorage.removeItem(recentKey); setRecent([]); };
  return <><button type="button" className="search-trigger has-tooltip" aria-label="Tìm kiếm trên website" data-tooltip="Tìm kiếm (Ctrl K)" onClick={() => setIsOpen(true)}><MagnifyingGlass size={21} weight="bold" /></button>{isOpen ? <div className="site-search-backdrop" role="presentation" onMouseDown={() => setIsOpen(false)}><section className="site-search-dialog" role="dialog" aria-modal="true" aria-label="Tìm kiếm trên website" onMouseDown={(event) => event.stopPropagation()}><div className="site-search-input"><MagnifyingGlass size={21} aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm báo giá, quy trình, dự án, bài viết..." /><button type="button" aria-label="Đóng tìm kiếm" onClick={() => setIsOpen(false)}><X size={20} weight="bold" /></button></div>{debouncedQuery ? <div className="site-search-results"><p className="search-label">Kết quả phù hợp</p>{results.length ? results.map((item) => <Link key={item.id} href={item.href} onClick={() => openItem(item)}><strong>{item.title}</strong><span>{item.description}</span></Link>) : <p className="search-empty">Chưa tìm thấy nội dung phù hợp. Hãy thử “báo giá”, “dự án” hoặc “panel”.</p>}</div> : <div className="site-search-results">{recent.length ? <div className="search-recent"><div><p className="search-label">Tìm kiếm gần đây</p><button type="button" onClick={clearRecent}>Xóa lịch sử</button></div>{recent.map((item) => <Link key={item.id} href={item.href} onClick={() => openItem(item)}><strong>{item.title}</strong><span>{item.description}</span></Link>)}</div> : null}<p className="search-label">Tìm kiếm nhanh</p><div className="search-suggestions">{quickItems.slice(0, 5).map((item) => <Link key={item.id} href={item.href} onClick={() => openItem(item)}>{item.title}</Link>)}</div></div>}<p className="search-shortcut">Nhấn <kbd>Esc</kbd> để đóng</p></section></div> : null}</>;
}
