"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export type MaterialBrand = {
  id: string;
  name: string;
  logo: string;
  category: string;
  summary: string;
  material: string;
  benefit: string;
};

export const fallbackMaterialBrands: MaterialBrand[] = [
  {
    id: "ton-dong-a",
    name: "Tôn Đông Á",
    logo: "https://printgo.vn/uploads/file-logo/1/512x512.5af9a328a27bd479100d48611407e2da.ai.1.png",
    category: "Tôn mạ & panel",
    summary:
      "Danh mục vật liệu kim loại cho các hạng mục mái, vách và bao che.",
    material: "Tôn mạ, tôn màu và panel theo yêu cầu kỹ thuật.",
    benefit:
      "Có thêm phương án về bề mặt, màu sắc và cấu hình cho từng công trình.",
  },
  {
    id: "bluescope",
    name: "BlueScope",
    logo: "https://printgo.vn/uploads/file-logo/1/512x512.951708e46eb4a9fcb31ba6c6d015220a.ai.1.png",
    category: "Thép mạ & tôn màu",
    summary: "Giải pháp thép mạ và tôn màu cho bề mặt mái, vách.",
    material: "Thép mạ, tôn màu cho hạng mục bao che.",
    benefit: "Hỗ trợ cân nhắc độ bền bề mặt phù hợp điều kiện sử dụng.",
  },
  {
    id: "hoa-sen",
    name: "Hoa Sen",
    logo: "https://printgo.vn/uploads/file-logo/1/512x512.73f67dab9b66df8ff6ae15a0705d275a.ai.1.png",
    category: "Tôn mạ & thép",
    summary: "Nguồn tham khảo cho hạng mục tôn mạ, thép và ống.",
    material: "Tôn mạ, thép và vật tư liên quan.",
    benefit:
      "Đa dạng lựa chọn khi cần đồng bộ vật tư phần mái, vách hoặc phụ trợ.",
  },
  {
    id: "nam-kim",
    name: "Nam Kim",
    logo: "https://printgo.vn/uploads/file-logo/1/512x512.dd73f55dd4db6b29be92ea8a8c581fc4.ai.1.png",
    category: "Tôn mạ & thép",
    summary: "Danh mục vật tư thép mạ cho các giải pháp bao che.",
    material: "Tôn mạ, tôn màu theo hồ sơ vật tư.",
    benefit: "Có thể đối chiếu quy cách, màu sắc và bề mặt theo nhu cầu.",
  },
  {
    id: "kingspan",
    name: "Kingspan",
    logo: "https://banner2.cleanpng.com/20180608/fvt/aa8go57wi.webp",
    category: "Panel cách nhiệt",
    summary: "Tham khảo các giải pháp panel cho mái và vách công trình.",
    material: "Panel cách nhiệt theo cấu hình phù hợp.",
    benefit: "Hỗ trợ cân đối hiệu quả nhiệt, hoàn thiện bề mặt và công năng.",
  },
  {
    id: "metecno",
    name: "Metecno",
    logo: "https://multipanelmexico.com/wp-content/uploads/2018/05/Logo-Metecno.png",
    category: "Panel cách nhiệt",
    summary: "Nhóm giải pháp panel cho không gian cần thi công gọn.",
    material: "Panel mái, vách và phụ kiện đồng bộ.",
    benefit: "Có thêm lựa chọn theo mục tiêu cách nhiệt và tiến độ lắp dựng.",
  },
  {
    id: "panel-plus",
    name: "Panel Plus",
    logo: "https://file.hstatic.net/200000908573/file/logo-panelplus_ff31f46843c44b879fd40696e3f5fd6e.png",
    category: "Panel cách nhiệt",
    summary: "Nguồn tham khảo vật liệu panel cho hạng mục bao che.",
    material: "Panel và phụ kiện mái, vách.",
    benefit: "Linh hoạt đối chiếu quy cách với thiết kế và ngân sách.",
  },
  {
    id: "sika",
    name: "Sika",
    logo: "https://printgo.vn/uploads/file-logo/1/512x512.ef0302c5ae9cd1afaa298a9927624def.ai.1.png",
    category: "Keo & chống thấm",
    summary: "Giải pháp hóa chất xây dựng cho các điểm nối và hoàn thiện.",
    material: "Keo, trám khe và vật liệu chống thấm theo hạng mục.",
    benefit: "Hỗ trợ xử lý chi tiết liên kết và bảo vệ bề mặt phù hợp.",
  },
  {
    id: "mapei",
    name: "Mapei",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx3132EqGZHPk2JyRa34zadqd7Mzrpj7RFQ7FKuq6g6w&s=10",
    category: "Hóa chất xây dựng",
    summary: "Nhóm sản phẩm hỗ trợ hoàn thiện và xử lý bề mặt.",
    material: "Keo dán, vữa và vật liệu hoàn thiện theo yêu cầu.",
    benefit:
      "Có thêm giải pháp cho các hạng mục cần độ bám dính và hoàn thiện kỹ.",
  },
  {
    id: "hilti",
    name: "Hilti",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFn2ubocGtvTLGBUFkk62Gs0zMk8qKMtyLbbryyWxkqg&s=10",
    category: "Neo & dụng cụ",
    summary: "Thiết bị, dụng cụ và giải pháp liên kết cho thi công kỹ thuật.",
    material: "Neo, khoan cấy và dụng cụ thi công chuyên dụng.",
    benefit: "Giúp cân nhắc phương án liên kết phù hợp theo điều kiện kết cấu.",
  },
  {
    id: "knauf",
    name: "Knauf",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoUW0PT9ocSKrMQQArzxfVgyBGBjEWttUoW81J6k0tdo_Iuxhau80TAN4P&s=10",
    category: "Trần & vách",
    summary:
      "Giải pháp hoàn thiện cho các hệ trần, vách và không gian nội thất.",
    material: "Tấm, hệ khung và vật liệu hoàn thiện phù hợp.",
    benefit: "Bổ sung lựa chọn cho không gian cần hoàn thiện sạch và đồng bộ.",
  },
  {
    id: "hoa-phat",
    name: "Hòa Phát",
    logo: "https://printgo.vn/uploads/file-logo/1/512x512.9b08e35cf45e7cbe1d3b895e964ac3e1.ai.1.png",
    category: "Thép & kết cấu",
    summary: "Tham khảo vật tư thép cho phần khung và cấu kiện liên quan.",
    material: "Thép xây dựng, thép kết cấu theo hồ sơ công trình.",
    benefit: "Có cơ sở đối chiếu quy cách thép với tải trọng và thiết kế.",
  },
  {
    id: "panasonic",
    name: "Panasonic",
    logo: "https://printgo.vn/uploads/file-logo/1/512x512.51f95cfc6b9bba5429673176c7aa2eaa.ai.1.png",
    category: "Điện & thông gió",
    summary: "Nhóm thiết bị phục vụ điện dân dụng và tiện nghi công trình.",
    material: "Thiết bị điện, chiếu sáng hoặc thông gió theo hạng mục.",
    benefit:
      "Bổ sung lựa chọn cho không gian cần vận hành tiện nghi, gọn gàng.",
  },
  {
    id: "binh-minh",
    name: "Bình Minh",
    logo: "https://printgo.vn/uploads/file-logo/1/512x512.632b67409ac3fcf8b7d32ca4c95718f2.ai.1.png",
    category: "Ống & phụ kiện nước",
    summary: "Nguồn tham khảo cho hệ ống và phụ kiện cấp thoát nước.",
    material: "Ống nhựa và phụ kiện theo thiết kế MEP.",
    benefit: "Giúp đồng bộ các hạng mục nước trong giai đoạn hoàn thiện.",
  },
];

function BrandPill({
  brand,
  onOpen,
}: {
  brand: MaterialBrand;
  onOpen?: (id: string, target: HTMLButtonElement) => void;
}) {
  return (
    <button
      className="material-brand-pill"
      type="button"
      onMouseEnter={(event) => onOpen?.(brand.id, event.currentTarget)}
      onFocus={(event) => onOpen?.(brand.id, event.currentTarget)}
      onClick={(event) => onOpen?.(brand.id, event.currentTarget)}
      aria-label={`Xem thông tin vật tư tham khảo: ${brand.name}`}
    >
      <Image
        src={brand.logo}
        alt={`Logo ${brand.name}`}
        width={164}
        height={54}
        sizes="164px"
      />
      <small>{brand.category}</small>
    </button>
  );
}

export function MaterialBrands({
  brands = fallbackMaterialBrands,
}: {
  brands?: MaterialBrand[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [popoverLeft, setPopoverLeft] = useState(16);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeBrand = brands.find((brand) => brand.id === activeId);

  const openBrand = (id: string, target: HTMLButtonElement) => {
    const root = rootRef.current?.getBoundingClientRect();
    const pill = target.getBoundingClientRect();
    if (root) {
      const popupWidth = Math.min(390, root.width - 32);
      const centeredLeft =
        pill.left - root.left + pill.width / 2 - popupWidth / 2;
      setPopoverLeft(
        Math.max(16, Math.min(centeredLeft, root.width - popupWidth - 16)),
      );
    }
    setActiveId(id);
  };

  return (
    <div
      className={`material-brands ${activeBrand ? "is-paused" : ""}`}
      ref={rootRef}
    >
      <div className="material-marquee" onMouseLeave={() => setActiveId(null)}>
        <div className="material-marquee-viewport">
          <div className="material-marquee-track">
            <div className="material-marquee-set">
              {brands.map((brand) => (
                <BrandPill key={brand.id} brand={brand} onOpen={openBrand} />
              ))}
            </div>
            <div className="material-marquee-set" aria-hidden="true">
              {brands.map((brand) => (
                <span
                  className="material-brand-pill material-brand-pill-duplicate"
                  key={`duplicate-${brand.id}`}
                >
                  <Image
                    src={brand.logo}
                    alt=""
                    width={164}
                    height={54}
                    sizes="164px"
                  />
                  <small>{brand.category}</small>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {activeBrand ? (
        <article
          className="material-brand-popover"
          style={{ left: `${popoverLeft}px` }}
          aria-label={`Thông tin ${activeBrand.name}`}
        >
          <div>
            <p className="material-brand-eyebrow">
              Vật tư tham khảo · {activeBrand.category}
            </p>
            <h3>{activeBrand.name}</h3>
            <p>{activeBrand.summary}</p>
          </div>
          <dl>
            <div>
              <dt>Hạng mục</dt>
              <dd>{activeBrand.material}</dd>
            </div>
            <div>
              <dt>Lợi ích</dt>
              <dd>{activeBrand.benefit}</dd>
            </div>
            <div>
              <dt>Bảo hành</dt>
              <dd>
                Theo chính sách công bố và chứng từ của nhà sản xuất/nhà cung
                cấp cho từng hạng mục.
              </dd>
            </div>
          </dl>
        </article>
      ) : null}
      <p className="material-brand-note">
        Danh mục mang tính tham khảo, không hàm ý quan hệ đại lý. Chủng loại,
        xuất xứ và bảo hành được chốt theo báo giá cùng hồ sơ kỹ thuật của từng
        công trình.
      </p>
    </div>
  );
}
