"use client";

import { CaretDown, Check } from "@phosphor-icons/react";
import { useMemo, useState } from "react";

const panelRates = { EPS: 1650000, PU: 2150000, Rockwool: 2450000 };

type SelectOption<T extends string> = { label: string; value: T };

function SelectBox<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: SelectOption<T>[]; onChange: (value: T) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <div className="custom-select">
      <span className="custom-select-label">{label}</span>
      <button
        className="custom-select-trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => { if (event.key === "Escape") setIsOpen(false); }}
      >
        <span>{selected?.label}</span><CaretDown size={18} weight="bold" aria-hidden="true" />
      </button>
      {isOpen && (
        <div className="custom-select-options" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              className={option.value === value ? "is-selected" : ""}
              type="button"
              role="option"
              aria-selected={option.value === value}
              key={option.value}
              onClick={() => { onChange(option.value); setIsOpen(false); }}
            >
              <span>{option.label}</span>{option.value === value && <Check size={17} weight="bold" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CostEstimator() {
  const [area, setArea] = useState(120);
  const [panel, setPanel] = useState<keyof typeof panelRates>("EPS");
  const [building, setBuilding] = useState("Nhà ở dân dụng");
  const [province, setProvince] = useState("TP.HCM");
  const estimate = useMemo(() => Math.round(area * panelRates[panel]), [area, panel]);
  const min = Math.round(estimate * 0.92 / 100000) * 100000;
  const max = Math.round(estimate * 1.12 / 100000) * 100000;
  const currency = (value: number) => `${new Intl.NumberFormat("vi-VN").format(value)}đ`;

  return (
    <section className="estimator-section" aria-labelledby="estimator-title">
      <div className="estimator-copy">
        <p className="kicker">Dự toán nhanh</p>
        <h2 id="estimator-title">Ước tính chi phí nhà panel theo nhu cầu của bạn</h2>
        <p>Kết quả là khoảng tham khảo. Báo giá chính xác cần bản vẽ, nền móng và điều kiện thi công thực tế.</p>
      </div>
      <div className="estimator-form">
        <SelectBox label="Loại công trình" value={building} onChange={setBuilding} options={[{ label: "Nhà ở dân dụng", value: "Nhà ở dân dụng" }, { label: "Nhà xưởng", value: "Nhà xưởng" }, { label: "Kho lạnh", value: "Kho lạnh" }, { label: "Văn phòng panel", value: "Văn phòng panel" }]} />
        <SelectBox label="Loại panel" value={panel} onChange={setPanel} options={[{ label: "Panel EPS", value: "EPS" }, { label: "Panel PU", value: "PU" }, { label: "Panel Rockwool", value: "Rockwool" }]} />
        <SelectBox label="Tỉnh thành" value={province} onChange={setProvince} options={[{ label: "TP.HCM", value: "TP.HCM" }, { label: "Bình Dương", value: "Bình Dương" }, { label: "Đồng Nai", value: "Đồng Nai" }, { label: "Tỉnh khác", value: "Tỉnh khác" }]} />
        <label className="area-range">Diện tích: <strong>{area} m²</strong><input type="range" min="30" max="1000" step="10" value={area} onChange={(event) => setArea(Number(event.target.value))} /></label>
        <div className="estimator-result" aria-live="polite"><span>Khoảng chi phí dự kiến</span><strong>{currency(min)} đến {currency(max)}</strong><small>{building} · Panel {panel} · {province}</small></div>
        <a className="primary-btn tooltip-top" href="#lien-he" data-tooltip="Gửi thông tin để nhận báo giá chính xác">Nhận báo giá chính xác</a>
      </div>
    </section>
  );
}
