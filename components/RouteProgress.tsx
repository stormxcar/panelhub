"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function RouteProgress() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const start = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      const href = target?.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || target?.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (href.startsWith("/") && !href.startsWith("//")) setLoading(true);
    };
    document.addEventListener("click", start, true);
    return () => document.removeEventListener("click", start, true);
  }, []);

  useEffect(() => {
    if (!loading) return;
    resetTimer.current = setTimeout(() => setLoading(false), 340);
    return () => { if (resetTimer.current) clearTimeout(resetTimer.current); };
  }, [pathname, loading]);

  return <div className={`route-progress ${loading ? "is-loading" : ""}`} aria-hidden="true" />;
}
