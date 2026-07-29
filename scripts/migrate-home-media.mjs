import { createClient } from "@sanity/client";

const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_WRITE_TOKEN. Load it from .env before running this migration.");
}

const client = createClient({
  projectId: "syr5q4gg",
  dataset: "production",
  apiVersion: "2026-07-28",
  token,
  useCdn: false
});

const imageBase = "https://res.cloudinary.com/dzwjgfd7t/image/upload/";
const image = (version, filename) => `${imageBase}${version}/panelhub/${filename}`;

const media = {
  heroImages: [
    { _key: "hero-01", label: "Nhà hoàn thiện", imageUrl: image("v1785220656", "1785218999987_7856060850081443329_7856060850081443329_8c1f360a38ea0b570e94b010932b9e04_mokzsn.jpg") },
    { _key: "hero-02", label: "Lắp khung thép", imageUrl: image("v1785220655", "1785218999860_7856060850081443329_7856060850081443329_11733a1d5e67c093f88347c884cc708d_smwdnb.jpg") },
    { _key: "hero-03", label: "Lắp tấm panel", imageUrl: image("v1785220652", "1785218999851_7856060850081443329_7856060850081443329_b4f43c3f4eae9fa17af6f94748f3e901_frw0sh.jpg") },
    { _key: "hero-04", label: "Không gian hoàn thiện", imageUrl: image("v1785220651", "1785218999933_7856060850081443329_7856060850081443329_19b5b30fad125f119d0d546ff1146f08_jsodvw.jpg") }
  ],
  services: [
    { _key: "service-01", title: "Mẫu nhà paned dân dụng", description: "Nhiều kiểu dáng mái và phương án mặt tiền để tham khảo trước khi thiết kế.", tag: "Nhà ở · Nhà cấp 4", imageUrl: image("v1785220664", "1785218999979_7856060850081443329_7856060850081443329_96881a0f9f0fef85aff738988950bf2e_eneobw.jpg") },
    { _key: "service-02", title: "Khung thép tiền chế", description: "Lắp dựng khung theo mặt bằng, khẩu độ và nhu cầu sử dụng thực tế.", tag: "Kết cấu · Thi công", imageUrl: image("v1785220655", "1785218999860_7856060850081443329_7856060850081443329_11733a1d5e67c093f88347c884cc708d_smwdnb.jpg") },
    { _key: "service-03", title: "Nhà paned hoàn thiện", description: "Không gian sạch, gọn và sẵn sàng đưa vào sử dụng sau khi bàn giao.", tag: "Nhà ở · Hoàn thiện", imageUrl: image("v1785220656", "1785218999987_7856060850081443329_7856060850081443329_8c1f360a38ea0b570e94b010932b9e04_mokzsn.jpg") },
    { _key: "service-04", title: "Thi công tấm panel", description: "Lắp đặt vách, mái và xử lý liên kết theo trình tự rõ ràng tại công trình.", tag: "Panel · Lắp dựng", imageUrl: image("v1785220652", "1785218999851_7856060850081443329_7856060850081443329_b4f43c3f4eae9fa17af6f94748f3e901_frw0sh.jpg") },
    { _key: "service-05", title: "Cải tạo, mở rộng", description: "Bổ sung không gian sử dụng với tiến độ thi công gọn và dễ kiểm soát.", tag: "Mở rộng · Cải tạo", imageUrl: image("v1785220653", "1785218999971_7856060850081443329_7856060850081443329_0523e9897b0d7e91f58f3af4910e215f_kniv8e.jpg") },
    { _key: "service-06", title: "Không gian nhà paned", description: "Tham khảo mặt tiền, nội thất và bố cục phù hợp nhu cầu ở thực tế.", tag: "Nhà ở · Tham khảo", imageUrl: image("v1785220651", "1785218999933_7856060850081443329_7856060850081443329_19b5b30fad125f119d0d546ff1146f08_jsodvw.jpg") }
  ],
  anatomy: {
    title: "Cấu tạo tấm panel cách nhiệt cho công trình chắc và sạch",
    description: "Tấm panel gồm hai lớp tôn mạ màu kẹp lõi cách nhiệt. Lựa chọn lõi panel quyết định mức giữ nhiệt, chống cháy, cách âm và ngân sách.",
    imageUrl: image("v1785220652", "1785218999851_7856060850081443329_7856060850081443329_b4f43c3f4eae9fa17af6f94748f3e901_frw0sh.jpg"),
    panelTypes: [
      { _key: "panel-pu", name: "Panel PU", description: "Giữ nhiệt tốt cho kho lạnh và không gian cần ổn định nhiệt." },
      { _key: "panel-eps", name: "Panel EPS", description: "Chi phí hợp lý cho nhà ở, văn phòng và công trình phổ thông." },
      { _key: "panel-rockwool", name: "Panel Rockwool", description: "Ưu tiên chống cháy, cách âm cho xưởng và khu kỹ thuật." }
    ]
  },
  processFeature: { imageUrl: image("v1785220660", "1785218999995_7856060850081443329_7856060850081443329_5354f22394ff58ecef8e3c2f8667db2b_f7btqr.jpg") },
  processSteps: [
    { _key: "process-01", title: "Khảo sát", description: "Đo mặt bằng, kiểm tra nền móng và điều kiện vận chuyển vật tư.", imageUrl: image("v1785220655", "1785218999860_7856060850081443329_7856060850081443329_11733a1d5e67c093f88347c884cc708d_smwdnb.jpg") },
    { _key: "process-02", title: "Tư vấn", description: "Xác định nhu cầu sử dụng, mức đầu tư và loại panel phù hợp.", imageUrl: image("v1785220652", "1785218999851_7856060850081443329_7856060850081443329_b4f43c3f4eae9fa17af6f94748f3e901_frw0sh.jpg") },
    { _key: "process-03", title: "Thiết kế", description: "Chốt mặt bằng, khẩu độ khung và giải pháp kỹ thuật.", imageUrl: image("v1785220653", "1785218999971_7856060850081443329_7856060850081443329_0523e9897b0d7e91f58f3af4910e215f_kniv8e.jpg") },
    { _key: "process-04", title: "Báo giá", description: "Bóc tách vật tư, tiến độ và phạm vi hoàn thiện minh bạch.", imageUrl: image("v1785220660", "1785218999995_7856060850081443329_7856060850081443329_5354f22394ff58ecef8e3c2f8667db2b_f7btqr.jpg") },
    { _key: "process-05", title: "Thi công", description: "Gia công khung tại xưởng, lắp dựng và lắp panel tại công trình.", imageUrl: image("v1785220654", "1785218999813_7856060850081443329_7856060850081443329_bdd6db19a7f4c690e1980aac400a09c5_iqsd4b.jpg") },
    { _key: "process-06", title: "Bàn giao", description: "Kiểm tra mối nối, phụ kiện, vệ sinh và nghiệm thu công trình.", imageUrl: image("v1785220651", "1785218999933_7856060850081443329_7856060850081443329_19b5b30fad125f119d0d546ff1146f08_jsodvw.jpg") },
    { _key: "process-07", title: "Bảo hành", description: "Hướng dẫn vận hành và tiếp nhận yêu cầu hỗ trợ sau bàn giao.", imageUrl: image("v1785220656", "1785218999987_7856060850081443329_7856060850081443329_8c1f360a38ea0b570e94b010932b9e04_mokzsn.jpg") }
  ],
  projects: [
    { _key: "project-01", title: "Mẫu nhà paned cấp 4", category: "Mẫu thiết kế", description: "Tổng hợp phương án mái và mặt tiền để tham khảo trước khi thiết kế.", imageUrl: image("v1785220664", "1785218999979_7856060850081443329_7856060850081443329_96881a0f9f0fef85aff738988950bf2e_eneobw.jpg") },
    { _key: "project-02", title: "Lắp dựng khung thép", category: "Thi công", description: "Khung thép được lắp dựng trực tiếp trên nền đã chuẩn bị.", imageUrl: image("v1785220655", "1785218999860_7856060850081443329_7856060850081443329_11733a1d5e67c093f88347c884cc708d_smwdnb.jpg") },
    { _key: "project-03", title: "Nhà paned hoàn thiện", category: "Hoàn thiện", description: "Mặt tiền nhà ở hoàn thiện, có hiên che và không gian sân vườn.", imageUrl: image("v1785220656", "1785218999987_7856060850081443329_7856060850081443329_8c1f360a38ea0b570e94b010932b9e04_mokzsn.jpg") },
    { _key: "project-04", title: "Lắp đặt vách panel", category: "Thi công", description: "Các bước lắp vách và liên kết tấm panel tại công trình thực tế.", imageUrl: image("v1785220652", "1785218999851_7856060850081443329_7856060850081443329_b4f43c3f4eae9fa17af6f94748f3e901_frw0sh.jpg") },
    { _key: "project-05", title: "Nhà paned mái thái", category: "Nhà ở", description: "Mẫu nhà nhỏ gọn, hoàn thiện mặt tiền và cửa kính lấy sáng.", imageUrl: image("v1785220654", "1785218999813_7856060850081443329_7856060850081443329_bdd6db19a7f4c690e1980aac400a09c5_iqsd4b.jpg") },
    { _key: "project-06", title: "Không gian nhà paned", category: "Hoàn thiện", description: "Tham khảo mặt tiền, bố cục nội thất và phương án hiên che.", imageUrl: image("v1785220651", "1785218999933_7856060850081443329_7856060850081443329_19b5b30fad125f119d0d546ff1146f08_jsodvw.jpg") }
  ],
  videos: [
    { _key: "video-01", title: "Công trình nhà tiền chế panel", description: "Góc quay thực tế tại công trình", url: "https://res.cloudinary.com/dzwjgfd7t/video/upload/v1785220803/panelhub/1785219000011_7856060850081443329_7856060850081443329_ewuxnf.mp4" },
    { _key: "video-02", title: "Không gian hoàn thiện", description: "Hình ảnh thực tế nhà panel", url: "https://res.cloudinary.com/dzwjgfd7t/video/upload/v1785220754/panelhub/1785218999925_7856060850081443329_7856060850081443329_hxbm46.mp4" },
    { _key: "video-03", title: "Thi công và lắp dựng", description: "Quy trình triển khai tại công trình", url: "https://res.cloudinary.com/dzwjgfd7t/video/upload/v1785220716/panelhub/1785218999920_7856060850081443329_7856060850081443329_yusqqm.mp4" },
    { _key: "video-04", title: "Giải pháp nhà panel", description: "Tham khảo chi tiết công trình", url: "https://res.cloudinary.com/dzwjgfd7t/video/upload/v1785220711/panelhub/1785218999810_7856060850081443329_7856060850081443329_nqrqfp.mp4" },
    { _key: "video-05", title: "Góc nhìn công trình", description: "Không gian sau khi hoàn thiện", url: "https://res.cloudinary.com/dzwjgfd7t/video/upload/v1785220660/panelhub/1785218999967_7856060850081443329_7856060850081443329_a3gc3f.mp4" },
    { _key: "video-06", title: "Nhà tiền chế thực tế", description: "Video cập nhật từ công trình", url: "https://res.cloudinary.com/dzwjgfd7t/video/upload/v1785220688/panelhub/1785218999964_7856060850081443329_7856060850081443329_kk5k41.mp4" }
  ]
};

const allImageUrls = [
  ...media.heroImages,
  ...media.services,
  media.anatomy,
  media.processFeature,
  ...media.processSteps,
  ...media.projects
].map((item) => item.imageUrl);

const allItems = [
  ...media.heroImages,
  ...media.services,
  ...media.processSteps,
  ...media.projects,
  ...media.videos,
  ...media.anatomy.panelTypes
];

if (media.heroImages.length !== 4 || media.services.length !== 6 || media.processSteps.length !== 7 || media.projects.length !== 6 || media.videos.length !== 6) {
  throw new Error("Media counts do not match the approved website structure.");
}
if (allItems.some((item) => !item._key) || allImageUrls.some((url) => !url.startsWith("https://res.cloudinary.com/dzwjgfd7t/")) || media.videos.some((video) => !video.url.startsWith("https://res.cloudinary.com/dzwjgfd7t/video/"))) {
  throw new Error("A migration item is missing its key or has an invalid Cloudinary URL.");
}

const existing = await client.fetch(`*[_id == "homePage"][0]{_id}`);
if (!existing?._id) {
  throw new Error("Singleton homePage does not exist. Create it in Studio before importing media.");
}

await client.patch("homePage").set(media).commit();

const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id}`);
if (!settings?._id) {
  throw new Error("The siteSettings document does not exist. Create it in Studio before importing branding.");
}

await client.patch(settings._id).set({
  logoTextUrl: "https://res.cloudinary.com/dzwjgfd7t/image/upload/v1785221937/panelhub/logo_text_i7kfp4.png",
  logoMarkUrl: "https://res.cloudinary.com/dzwjgfd7t/image/upload/v1785221937/panelhub/logo_no_text_oiboay.png",
  footerDescription: "Đơn vị tư vấn, thiết kế và thi công nhà tiền chế tấm panel cho nhà ở, nhà xưởng, kho lạnh, văn phòng công trình và mô hình lưu trú lắp ghép."
}).commit();

const result = await client.fetch(`*[_id == "homePage"][0]{heroImages[]{_key,imageUrl},services[]{_key,imageUrl},anatomy{imageUrl,panelTypes[]{_key}},processFeature{imageUrl},processSteps[]{_key,imageUrl},projects[]{_key,imageUrl},videos[]{_key,url}}`);

const valid = result.heroImages?.length === 4
  && result.services?.length === 6
  && result.processSteps?.length === 7
  && result.projects?.length === 6
  && result.videos?.length === 6
  && result.anatomy?.panelTypes?.length === 3
  && [...result.heroImages, ...result.services, result.anatomy, result.processFeature, ...result.processSteps, ...result.projects].every((item) => item.imageUrl?.startsWith("https://res.cloudinary.com/dzwjgfd7t/"))
  && result.videos.every((video) => video.url?.startsWith("https://res.cloudinary.com/dzwjgfd7t/video/"));

if (!valid) {
  throw new Error("Sanity verification failed after patch. No deployment should continue until this is fixed.");
}

const importedSettings = await client.fetch(`*[_id == $id][0]{logoTextUrl,logoMarkUrl,footerDescription}`, { id: settings._id });
if (!importedSettings?.logoTextUrl?.startsWith("https://res.cloudinary.com/dzwjgfd7t/") || !importedSettings?.logoMarkUrl?.startsWith("https://res.cloudinary.com/dzwjgfd7t/") || !importedSettings.footerDescription) {
  throw new Error("Branding verification failed after patch.");
}

console.log("Imported and verified: 4 hero, 6 services, 1 anatomy, 1+7 process, 6 projects, 6 videos, and branding settings.");
