"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle, Phone } from "@phosphor-icons/react";
import { useState } from "react";

type HeroSlide = {
  src: string;
  alt: string;
  label: string;
};

type HeroGalleryProps = {
  slides: HeroSlide[];
  phone: string;
  phoneDisplay: string;
};

export function HeroGallery({ slides, phone, phoneDisplay }: HeroGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  return (
    <section id="hero" className="hero-showcase" aria-label="Giới thiệu nhà tiền chế tấm panel">
      <div className="hero-showcase-stage" aria-hidden="true">
        <Image key={activeSlide.src} className="hero-showcase-image" src={activeSlide.src} alt="" fill priority sizes="100vw" />
      </div>
      <div className="hero-showcase-content">
        <div className="hero-showcase-copy">
          <p className="hero-showcase-brand">PANED Ninh Thuận</p>
          <h1>Nhà tiền chế <span>tấm panel</span></h1>
          <p className="hero-showcase-tagline">Giải pháp xây dựng hiện đại, triển khai gọn và phù hợp nhu cầu sử dụng thực tế.</p>
          <ul className="hero-showcase-benefits">
            <li><CheckCircle size={20} weight="fill" /> Thi công nhanh chóng</li>
            <li><CheckCircle size={20} weight="fill" /> Cách nhiệt, cách âm tốt</li>
            <li><CheckCircle size={20} weight="fill" /> Tối ưu chi phí đầu tư</li>
            <li><CheckCircle size={20} weight="fill" /> Bền đẹp theo thời gian</li>
          </ul>
          <div className="hero-showcase-actions">
            <a className="primary-btn tooltip-top" href="#lien-he" data-tooltip="Gửi nhu cầu để nhận tư vấn miễn phí">Nhận tư vấn <ArrowRight size={18} weight="bold" /></a>
            <a className="hero-showcase-phone tooltip-top" href={`tel:${phone}`} data-tooltip="Gọi trực tiếp để được tư vấn"><Phone size={19} weight="fill" /> {phoneDisplay}</a>
          </div>
        </div>

        <div className="hero-showcase-gallery" aria-label="Chọn ảnh công trình hiển thị chính">
          <p>Hình ảnh công trình</p>
          <div className="hero-showcase-thumbnails">
            {slides.map((slide, index) => (
              <button
                className={`hero-showcase-thumbnail ${activeIndex === index ? "is-active" : ""}`}
                type="button"
                key={slide.src}
                aria-label={`Hiển thị ảnh ${slide.label}`}
                aria-pressed={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              >
                <Image src={slide.src} alt={slide.alt} fill sizes="(max-width: 760px) 23vw, 125px" />
                <span>{slide.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
