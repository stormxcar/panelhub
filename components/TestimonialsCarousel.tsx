"use client";

import { CaretLeft, CaretRight, Star } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(items.length > 3);
  const isCarousel = items.length > 3;

  const updateControls = () => {
    const track = trackRef.current;
    if (!track) return;
    setCanGoBack(track.scrollLeft > 2);
    setCanGoNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isCarousel) return;
    updateControls();
    track.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    return () => {
      track.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, [isCarousel]);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(".testimonial-card");
    if (!track || !card) return;
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return <div className={`testimonials-carousel ${isCarousel ? "is-carousel" : ""}`}>
    <div className="testimonials-track" ref={trackRef} aria-label="Đánh giá từ khách hàng">
      {items.map((item) => <article className="testimonial-card" key={`${item.name}-${item.role}`}><div className="stars" aria-label="5 trên 5 sao">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={16} weight="fill" />)}</div><p>“{item.quote}”</p><strong>{item.name}</strong><span>{item.role}</span></article>)}
    </div>
    {isCarousel ? <div className="testimonial-controls" aria-label="Điều khiển đánh giá"><button type="button" onClick={() => move(-1)} disabled={!canGoBack} aria-label="Xem đánh giá trước"><CaretLeft size={19} weight="bold" /></button><button type="button" onClick={() => move(1)} disabled={!canGoNext} aria-label="Xem đánh giá tiếp theo"><CaretRight size={19} weight="bold" /></button></div> : null}
  </div>;
}
