"use client";

import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import { useMemo, useState } from "react";

export type PortfolioProject = {
  title: string;
  category: "Nhà ở" | "Thi công" | "Hoàn thiện" | "Mẫu thiết kế";
  description: string;
  image: string;
  area: string;
  duration: string;
  material: string;
  location: string;
};

const filters = ["Tất cả", "Nhà ở", "Thi công", "Hoàn thiện", "Mẫu thiết kế"] as const;

export function PortfolioFilter({ projects }: { projects: PortfolioProject[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Tất cả");
  const visibleProjects = useMemo(
    () => projects.filter((project) => activeFilter === "Tất cả" || project.category === activeFilter),
    [activeFilter, projects]
  );

  return (
    <div className="portfolio-filter">
      <div className="filter-tabs" role="tablist" aria-label="Lọc công trình theo loại">
        {filters.map((filter) => (
          <button
            className={`filter-tab ${activeFilter === filter ? "is-active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter}
            key={filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <p className="mobile-swipe-hint" aria-hidden="true">Vuốt để xem thêm công trình <ArrowRight size={16} weight="bold" /></p>
      <div className="project-grid portfolio-projects">
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.title}>
            <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 82vw, 33vw" />
            <div className="project-overlay">
              <p className="project-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-meta-row" aria-label={`Thông tin ${project.title}`}>
                <span>{project.area}</span><span>{project.duration}</span><span>{project.material}</span><span>{project.location}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
