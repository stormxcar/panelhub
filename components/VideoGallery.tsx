"use client";

import { useState } from "react";

export type VideoItem = {
  title: string;
  description: string;
  url: string;
};

const INITIAL_VISIBLE_VIDEOS = 4;

export function VideoGallery({ videos }: { videos: VideoItem[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_VIDEOS);
  const visibleVideos = videos.slice(0, visibleCount);
  const hasMoreVideos = visibleCount < videos.length;

  return (
    <div className="video-gallery">
      <div className="video-grid" aria-label="Video công trình nhà tiền chế panel">
        {visibleVideos.map((video, index) => (
          <article className="video-card" key={video.url}>
            <div className="video-card-label">
              <span>Video {String(index + 1).padStart(2, "0")}</span>
              <strong>{video.title}</strong>
              <small>{video.description}</small>
            </div>
            <video controls playsInline preload="metadata" aria-label={video.title}>
              <source src={video.url} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ phát video.
            </video>
          </article>
        ))}
      </div>

      {hasMoreVideos ? (
        <div className="video-gallery-more">
          <button
            className="secondary-btn tooltip-top"
            type="button"
            data-tooltip="Tải thêm video công trình"
            onClick={() => setVisibleCount((count) => Math.min(count + INITIAL_VISIBLE_VIDEOS, videos.length))}
          >
            Xem thêm video
          </button>
          <span aria-live="polite">Đang hiển thị {visibleVideos.length}/{videos.length} video</span>
        </div>
      ) : null}
    </div>
  );
}
