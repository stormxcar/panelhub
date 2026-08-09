import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN. Add it to .env before running this migration.");

const client = createClient({ projectId: "syr5q4gg", dataset: "production", apiVersion: "2026-07-28", token, useCdn: false });
const benefits = [
  { _key: "planning-schedule", title: "Tiến độ chủ động", description: "Khung có thể gia công trước tại xưởng; phần lắp dựng, mái và vách được sắp theo trình tự rõ ràng tại công trình.", checkpoints: ["Chốt mặt bằng và khẩu độ trước gia công", "Lập mốc giao vật tư và lắp dựng", "Theo dõi tiến độ theo từng hạng mục"] },
  { _key: "planning-budget", title: "Ngân sách dễ kiểm soát", description: "Khối lượng vật tư được bóc tách theo cấu hình thực tế thay vì chỉ ước lượng theo diện tích sử dụng.", checkpoints: ["Phân tách khung, panel và hoàn thiện", "Làm rõ hạng mục bao gồm/không bao gồm", "Dự trù vận chuyển và điều kiện mặt bằng"] },
  { _key: "planning-configuration", title: "Cấu hình đúng nhu cầu", description: "Loại lõi panel, độ dày, hệ cửa và xử lý liên kết được cân đối theo công năng, môi trường và mức đầu tư.", checkpoints: ["Cân nhắc nhiệt, ồn và yêu cầu cháy", "Chọn quy cách theo không gian sử dụng", "Đối chiếu hồ sơ kỹ thuật trước thi công"] },
  { _key: "planning-site", title: "Hiện trường gọn hơn", description: "Phương án lắp ghép giúp giảm công đoạn ướt, thuận tiện tổ chức vật tư và phối hợp các hạng mục hoàn thiện.", checkpoints: ["Giảm thời gian chờ giữa các công đoạn", "Dễ bố trí khu vực tập kết vật tư", "Kiểm tra mối nối trước khi bàn giao"] }
];

const documents = await client.fetch(`*[_id in ["homePage", "drafts.homePage"]]{_id}`);
for (const document of documents) await client.patch(document._id).setIfMissing({ planningBenefits: benefits }).commit();
console.log(`Seeded planning benefits for ${documents.length} home document(s) without replacing existing edits.`);
