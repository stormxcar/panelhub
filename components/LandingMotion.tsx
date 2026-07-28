"use client";

import { ArrowUp, List, Moon, Sun, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function LandingMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .timeline-step"));

    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    if (!reduceMotion) {
      revealItems.forEach((item) => observer.observe(item));
    }

    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-counter]"));
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          const target = Number(node.dataset.target || "0");
          const start = performance.now();
          const duration = 1100;

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            node.textContent = String(Math.round(target * progress));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          counterObserver.unobserve(node);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));

    const faqButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".faq-item button"));
    const faqHandlers = faqButtons.map((button) => {
      const handler = () => {
        const item = button.closest(".faq-item");
        const isOpen = item?.classList.toggle("is-open") || false;
        button.setAttribute("aria-expanded", String(isOpen));
      };
      button.addEventListener("click", handler);
      return { button, handler };
    });

    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-target]"));
    const setActiveNav = (activeId: string | null) => {
      navLinks.forEach((link) => {
        const isActive = link.dataset.navTarget === activeId;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const updateActiveNav = () => {
      const navHeight = document.querySelector<HTMLElement>(".site-nav")?.offsetHeight || 0;
      const scrollMarker = navHeight + 56;
      const activeId = navLinks.reduce<string | null>((currentId, link) => {
        const targetId = link.dataset.navTarget;
        const section = targetId ? document.getElementById(targetId) : null;
        return section && section.getBoundingClientRect().top <= scrollMarker ? targetId || currentId : currentId;
      }, null);
      setActiveNav(activeId);
    };

    const navHandlers = navLinks.map((link) => {
      const handler = () => setActiveNav(link.dataset.navTarget || null);
      link.addEventListener("click", handler);
      return { link, handler };
    });

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("hashchange", updateActiveNav);
    updateActiveNav();

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
      faqHandlers.forEach(({ button, handler }) => {
        button.removeEventListener("click", handler);
      });
      navHandlers.forEach(({ link, handler }) => link.removeEventListener("click", handler));
      window.removeEventListener("scroll", updateActiveNav);
      window.removeEventListener("hashchange", updateActiveNav);
    };
  }, []);

  return null;
}

export function ScrollTop() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("#hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowTop(!entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      className={`scroll-top ${showTop ? "is-visible" : ""}`}
      type="button"
      aria-label="Cuộn lên đầu trang"
      data-tooltip="Cuộn lên đầu trang"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={22} weight="bold" />
    </button>
  );
}

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const useDarkTheme = window.localStorage.getItem("paned-theme") === "dark";
    setDarkMode(useDarkTheme);
    document.documentElement.dataset.theme = useDarkTheme ? "dark" : "light";
  }, []);

  const toggleTheme = () => {
    const nextDarkMode = !darkMode;
    setDarkMode(nextDarkMode);
    document.documentElement.dataset.theme = nextDarkMode ? "dark" : "light";
    window.localStorage.setItem("paned-theme", nextDarkMode ? "dark" : "light");
  };

  return (
    <button
      className="theme-toggle has-tooltip"
      type="button"
      aria-label={darkMode ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      data-tooltip={darkMode ? "Giao diện sáng" : "Giao diện tối"}
      onClick={toggleTheme}
    >
      {darkMode ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
    </button>
  );
}

const mobileLinks = [
  ["Cấu tạo", "#cau-tao"],
  ["Dự án", "#du-an"],
  ["Báo giá", "#bao-gia"],
  ["FAQ", "#faq"],
  ["Liên hệ", "#lien-he"]
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mobile-nav">
      <button
        className="mobile-menu-trigger"
        type="button"
        aria-label={isOpen ? "Đóng menu" : "Mở menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
      </button>
      {isOpen && (
        <div className="mobile-menu" id="mobile-menu">
          {mobileLinks.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setIsOpen(false)}>{label}</a>
          ))}
        </div>
      )}
    </div>
  );
}
