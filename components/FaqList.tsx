"use client";

import { useState } from "react";

const INITIAL_COUNT = 5;
const STEP = 5;

export function FaqList({ items }: { items: string[][] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const visibleItems = items.slice(0, visibleCount);
  const remaining = Math.max(items.length - visibleItems.length, 0);
  const hasMore = remaining > 0;

  return <div className="faq-list-wrap">
    <div className="faq-list">
      {visibleItems.map(([question, answer]) => {
        const isOpen = openQuestion === question;
        const answerId = `faq-answer-${items.findIndex(([itemQuestion]) => itemQuestion === question)}`;
        return <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={question}><button className="tooltip-top" type="button" aria-expanded={isOpen} aria-controls={answerId} data-tooltip="Bấm để xem câu trả lời" onClick={() => setOpenQuestion(isOpen ? null : question)}>{question}</button><p id={answerId}>{answer}</p></article>;
      })}
    </div>
    {hasMore ? <button className="faq-more" type="button" onClick={() => setVisibleCount((count) => Math.min(count + STEP, items.length))}>Xem thêm {Math.min(STEP, remaining)} câu hỏi <span aria-hidden="true">↓</span></button> : items.length > INITIAL_COUNT ? <button className="faq-more is-collapse" type="button" onClick={() => { setVisibleCount(INITIAL_COUNT); setOpenQuestion(null); }}>Thu gọn câu hỏi <span aria-hidden="true">↑</span></button> : null}
  </div>;
}
