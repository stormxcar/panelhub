"use client";

import { ArrowUp, Moon, Sun } from "@phosphor-icons/react";
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

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
      faqHandlers.forEach(({ button, handler }) => {
        button.removeEventListener("click", handler);
      });
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
    const useDarkTheme = window.localStorage.getItem("panelbuild-theme") === "dark";
    setDarkMode(useDarkTheme);
    document.documentElement.dataset.theme = useDarkTheme ? "dark" : "light";
  }, []);

  const toggleTheme = () => {
    const nextDarkMode = !darkMode;
    setDarkMode(nextDarkMode);
    document.documentElement.dataset.theme = nextDarkMode ? "dark" : "light";
    window.localStorage.setItem("panelbuild-theme", nextDarkMode ? "dark" : "light");
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
