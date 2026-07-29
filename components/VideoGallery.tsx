"use client";

import { ArrowRight, WarningCircle } from "@phosphor-icons/react";
import { useState } from "react";

export type VideoItem = {
  title: string;
  description: string;
  url: string;
  captionUrl?: string;
};

const INITIAL_VISIBLE_VIDEOS = 4;

function getPosterUrl(videoUrl: string) {
  return videoUrl
    .replace("/video/upload/", "/video/upload/so_0/")
    .replace(/\.(mp4|webm|mov)$/i, ".jpg");
}

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const [hasError, setHasError] = useState(false);
  const descriptionId = `video-description-${index}`;

  return (
    <article className="video-card">
      <div className="video-card-label" id={descriptionId}>
        <span>Video {String(index + 1).padStart(2, "0")}</span>
        <strong>{video.title}</strong>
        <small>{video.description}</small>
      </div>
      {hasError ? (
        <div className="video-card-fallback" role="status">
          <WarningCircle size={28} weight="fill" aria-hidden="true" />
          <p>Không thể tải video trên kết nối hiện tại.</p>
          <a href={video.url} target="_blank" rel="noreferrer">Mở video trong tab mới <ArrowRight size={16} weight="bold" /></a>
        </div>
      ) : (
        <video controls playsInline preload="metadata" poster={getPosterUrl(video.url)} aria-describedby={descriptionId} onError={() => setHasError(true)}>
          <source src={video.url} type="video/mp4" />
          {video.captionUrl ? <track kind="captions" src={video.captionUrl} srcLang="vi" label="Tiếng Việt" default /> : null}
          Trình duyệt của bạn không hỗ trợ phát video. Bạn có thể <a href={video.url}>mở video trong tab mới</a>.
        </video>
      )}
    </article>
  );
}

export function VideoGallery({ videos }: { videos: VideoItem[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_VIDEOS);
  const visibleVideos = videos.slice(0, visibleCount);
  const hasMoreVideos = visibleCount < videos.length;

  return (
    <div className="video-gallery">
      <p className="mobile-swipe-hint" aria-hidden="true">Vuốt để xem thêm <ArrowRight size={16} weight="bold" /></p>
      <div className="video-grid" aria-label="Video công trình nhà tiền chế panel">
        {visibleVideos.map((video, index) => <VideoCard video={video} index={index} key={video.url} />)}
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
