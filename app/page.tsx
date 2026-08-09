import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Buildings,
  CaretDown,
  Check,
  CheckCircle,
  FacebookLogo,
  Factory,
  Gauge,
  HouseLine,
  ThermometerCold,
  TiktokLogo,
  Wrench,
  X,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { CostEstimator } from "../components/CostEstimator";
import { ConsultationForm } from "../components/ConsultationForm";
import { ContactRail } from "../components/ContactRail";
import { FaqList } from "../components/FaqList";
import { HeroGallery } from "../components/HeroGallery";
import {
  LandingMotion,
  MobileNav,
  ThemeToggle,
} from "../components/LandingMotion";
import { MaterialBrands } from "../components/MaterialBrands";
import { RichText } from "../components/RichText";
import { SiteSearch } from "../components/SiteSearch";
import { TestimonialsCarousel } from "../components/TestimonialsCarousel";
import {
  PortfolioFilter,
  type PortfolioProject,
} from "../components/PortfolioFilter";
import { VideoGallery } from "../components/VideoGallery";
import { site } from "../lib/site";
import {
  getConsultationFormSettings,
  getManagedArticles,
  getManagedHome,
  getManagedSiteSettings,
} from "../lib/sanity";

export const dynamic = "force-dynamic";

const services = [
  [
    "Mẫu nhà paned dân dụng",
    "Nhiều kiểu dáng mái và phương án mặt tiền để tham khảo trước khi thiết kế.",
    "Nhà ở · Nhà cấp 4",
  ],
  [
    "Khung thép tiền chế",
    "Lắp dựng khung theo mặt bằng, khẩu độ và nhu cầu sử dụng thực tế.",
    "Kết cấu · Thi công",
  ],
  [
    "Nhà paned hoàn thiện",
    "Không gian sạch, gọn và sẵn sàng đưa vào sử dụng sau khi bàn giao.",
    "Nhà ở · Hoàn thiện",
  ],
  [
    "Thi công tấm panel",
    "Lắp đặt vách, mái và xử lý liên kết theo trình tự rõ ràng tại công trình.",
    "Panel · Lắp dựng",
  ],
  [
    "Cải tạo, mở rộng",
    "Bổ sung không gian sử dụng với tiến độ thi công gọn và dễ kiểm soát.",
    "Mở rộng · Cải tạo",
  ],
  [
    "Không gian nhà paned",
    "Tham khảo mặt tiền, nội thất và bố cục phù hợp nhu cầu ở thực tế.",
    "Nhà ở · Tham khảo",
  ],
];

const processSteps = [
  [
    "Khảo sát",
    "Đo mặt bằng, kiểm tra nền móng và điều kiện vận chuyển vật tư.",
  ],
  ["Tư vấn", "Xác định nhu cầu sử dụng, mức đầu tư và loại panel phù hợp."],
  ["Thiết kế", "Chốt mặt bằng, khẩu độ khung và giải pháp kỹ thuật."],
  ["Báo giá", "Bóc tách vật tư, tiến độ và phạm vi hoàn thiện minh bạch."],
  [
    "Thi công",
    "Gia công khung tại xưởng, lắp dựng và lắp panel tại công trình.",
  ],
  ["Bàn giao", "Kiểm tra mối nối, phụ kiện, vệ sinh và nghiệm thu công trình."],
  ["Bảo hành", "Hướng dẫn vận hành và tiếp nhận yêu cầu hỗ trợ sau bàn giao."],
];

const projects: PortfolioProject[] = [
  {
    title: "Mẫu nhà paned cấp 4",
    category: "Mẫu thiết kế",
    description:
      "Tổng hợp phương án mái và mặt tiền để tham khảo trước khi thiết kế.",
    image: site.images.projects[0],
    area: "12 mẫu",
    duration: "Tham khảo",
    material: "Đa dạng",
    location: "PANED",
  },
  {
    title: "Lắp dựng khung thép",
    category: "Thi công",
    description: "Khung thép được lắp dựng trực tiếp trên nền đã chuẩn bị.",
    image: site.images.projects[1],
    area: "Theo mặt bằng",
    duration: "Đang thi công",
    material: "Khung thép",
    location: "Công trình",
  },
  {
    title: "Nhà paned hoàn thiện",
    category: "Hoàn thiện",
    description:
      "Mặt tiền nhà ở hoàn thiện, có hiên che và không gian sân vườn.",
    image: site.images.projects[2],
    area: "Nhà ở",
    duration: "Hoàn thiện",
    material: "Panel",
    location: "Công trình",
  },
  {
    title: "Lắp đặt vách panel",
    category: "Thi công",
    description:
      "Các bước lắp vách và liên kết tấm panel tại công trình thực tế.",
    image: site.images.projects[3],
    area: "Theo thiết kế",
    duration: "Lắp dựng",
    material: "Panel EPS",
    location: "Công trình",
  },
  {
    title: "Nhà paned mái thái",
    category: "Nhà ở",
    description: "Mẫu nhà nhỏ gọn, hoàn thiện mặt tiền và cửa kính lấy sáng.",
    image: site.images.projects[4],
    area: "Nhà ở",
    duration: "Hoàn thiện",
    material: "Panel",
    location: "Công trình",
  },
  {
    title: "Không gian nhà paned",
    category: "Hoàn thiện",
    description: "Tham khảo mặt tiền, bố cục nội thất và phương án hiên che.",
    image: site.images.projects[5],
    area: "Nhà ở",
    duration: "Hoàn thiện",
    material: "Panel",
    location: "Công trình",
  },
];

const faqs = [
  [
    "Nhà tiền chế panel dùng được bao lâu?",
    "Tuổi thọ phụ thuộc vào thiết kế khung thép, loại lõi panel, điều kiện sử dụng và việc bảo trì định kỳ. Khi được thi công đúng kỹ thuật, xử lý mối nối tốt và kiểm tra mái/vách theo khuyến nghị, công trình có thể vận hành ổn định trong nhiều năm.",
  ],
  [
    "Giá thi công nhà panel/m2 tính thế nào?",
    "Đơn giá m² chỉ là mức tham khảo. Báo giá thực tế cần tính diện tích, loại lõi panel và độ dày, khung thép, nền móng, hệ cửa, điện nước, vận chuyển và mức hoàn thiện; vì vậy đội ngũ nên khảo sát hoặc nhận bản vẽ trước khi chốt ngân sách.",
  ],
  [
    "Có tháo dỡ và di dời được không?",
    "Có, nhiều hạng mục nhà lắp ghép có thể tháo theo module để di chuyển hoặc mở rộng. Khả năng tái sử dụng sẽ phụ thuộc vào thiết kế liên kết ban đầu, tình trạng vật tư và phương án nền móng tại vị trí mới.",
  ],
  [
    "Panel chống nóng và chống ồn ra sao?",
    "Panel giúp cải thiện khả năng cách nhiệt đáng kể so với mái/vách tôn đơn lớp. EPS là lựa chọn kinh tế, PU phù hợp khi cần giữ nhiệt tốt hơn, còn Rockwool thường được cân nhắc khi công trình ưu tiên chống cháy và cách âm; hiệu quả cuối cùng còn phụ thuộc độ dày và cách xử lý mối nối.",
  ],
  [
    "Thời gian thi công thường mất bao lâu?",
    "Công trình nhỏ có thể hoàn thành trong vài tuần sau khi chốt thiết kế, vật tư và mặt bằng. Tiến độ sẽ thay đổi theo diện tích, nền móng, thời tiết, điều kiện vận chuyển và các hạng mục hoàn thiện như điện nước, cửa, trần hoặc nội thất.",
  ],
  [
    "Panel có chống cháy không?",
    "Mức độ đáp ứng yêu cầu cháy phụ thuộc vào loại lõi panel, hệ kết cấu, vật liệu hoàn thiện và quy định áp dụng cho từng công trình. Rockwool thường được lựa chọn cho nhu cầu ưu tiên chống cháy; với dự án có yêu cầu PCCC, cần đối chiếu hồ sơ kỹ thuật và quy chuẩn cụ thể trước khi triển khai.",
  ],
  [
    "Thi công được ở tỉnh xa không?",
    "Có thể triển khai liên tỉnh sau khi kiểm tra đường vận chuyển, địa điểm tập kết vật tư và điều kiện thi công tại chỗ. Đội ngũ sẽ tư vấn phương án khảo sát, lịch giao hàng và chi phí di chuyển minh bạch theo từng địa điểm.",
  ],
  [
    "Có bảo hành sau khi bàn giao không?",
    "Có. Phạm vi bảo hành nên được nêu rõ trong báo giá và hợp đồng, bao gồm kết cấu, vật tư và các hạng mục hoàn thiện áp dụng. Khi bàn giao, khách hàng nên lưu lại hồ sơ nghiệm thu, hướng dẫn sử dụng và thông tin liên hệ để được hỗ trợ nhanh khi cần.",
  ],
  [
    "Nền móng cần chuẩn bị như thế nào?",
    "Mặt bằng cần được khảo sát để xác định cao độ, khả năng chịu tải, thoát nước và vị trí liên kết khung thép. Tùy công trình, nền có thể là bê tông, móng đơn hoặc giải pháp gia cố khác; không nên chốt phương án chỉ dựa trên diện tích mà chưa xem địa hình thực tế.",
  ],
  [
    "Panel EPS và PU khác nhau thế nào?",
    "EPS thường có chi phí hợp lý, phù hợp nhiều công trình dân dụng và không gian phổ thông. PU có khả năng giữ nhiệt tốt hơn, nên hay được dùng cho khu vực yêu cầu ổn định nhiệt; lựa chọn cuối cùng cần cân đối công năng, độ dày panel và tổng mức đầu tư.",
  ],
  [
    "Có thể tự thiết kế rồi thuê thi công không?",
    "Có. Đội ngũ có thể tiếp nhận bản vẽ sẵn có, rà soát khẩu độ khung, giải pháp panel, mối nối và phương án thi công trước khi báo giá. Nếu cần điều chỉnh, các thay đổi nên được thống nhất trên bản vẽ để hạn chế phát sinh ở công trường.",
  ],
  [
    "Nhà panel có chịu được bão không?",
    "Khả năng chịu gió không nằm ở panel đơn lẻ mà phụ thuộc hệ khung, liên kết, neo móng, tải trọng mái và vị trí xây dựng. Với khu vực có gió mạnh hoặc gần biển, cần tính toán giải pháp kết cấu phù hợp thay vì dùng một cấu hình chung cho mọi công trình.",
  ],
  [
    "Có hỗ trợ vay vốn không?",
    "Hiện chưa có gói vay trực tiếp được công bố trên website. Khi cần, đội ngũ có thể hỗ trợ chuẩn bị báo giá và thông tin hạng mục để khách hàng làm việc với đơn vị tài chính của mình; điều kiện phê duyệt sẽ do đơn vị cho vay quyết định.",
  ],
  [
    "Quy trình thanh toán như thế nào?",
    "Tiến độ thanh toán thường được chia theo các mốc khảo sát/chốt thiết kế, gia công vật tư, lắp dựng và nghiệm thu. Tỷ lệ, thời điểm thanh toán và điều kiện bàn giao cần được ghi rõ trong hợp đồng để hai bên cùng theo dõi minh bạch.",
  ],
  [
    "Có tư vấn và khảo sát miễn phí không?",
    "Tư vấn sơ bộ qua điện thoại hoặc Zalo được hỗ trợ miễn phí để xác định nhu cầu và mức đầu tư dự kiến. Việc khảo sát thực tế sẽ được xác nhận theo khu vực, quy mô công trình và lịch triển khai; hãy gửi diện tích, vị trí và mục đích sử dụng để nhận hướng dẫn phù hợp.",
  ],
];

const testimonials = [
  [
    "Anh Minh",
    "Chủ xưởng cơ khí, Bình Dương",
    "Tiến độ rõ ràng, đội thi công phối hợp tốt nên xưởng sớm đi vào hoạt động.",
  ],
  [
    "Chị Hương",
    "Chủ homestay, Đồng Nai",
    "Phương án panel giúp rút ngắn phần xây dựng và vẫn đảm bảo không gian sáng, sạch.",
  ],
  [
    "Anh Phúc",
    "Quản lý kho lạnh, TP.HCM",
    "Đội ngũ tư vấn kỹ về panel PU và xử lý mối nối trước khi triển khai.",
  ],
];

const stats = [
  { value: "200+", label: "Công trình đã triển khai" },
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "98%", label: "Khách hàng hài lòng" },
  { value: "24h", label: "Phản hồi báo giá sơ bộ" },
];

const panelTypes = [
  {
    name: "Panel PU",
    description: "Giữ nhiệt tốt cho kho lạnh và không gian cần ổn định nhiệt.",
  },
  {
    name: "Panel EPS",
    description: "Chi phí hợp lý cho nhà ở, văn phòng và công trình phổ thông.",
  },
  {
    name: "Panel Rockwool",
    description: "Ưu tiên chống cháy, cách âm cho xưởng và khu kỹ thuật.",
  },
];

const planningBenefits = [
  {
    title: "Tiến độ chủ động",
    description:
      "Khung có thể gia công trước tại xưởng; phần lắp dựng, mái và vách được sắp theo trình tự rõ ràng tại công trình.",
    checkpoints: [
      "Chốt mặt bằng và khẩu độ trước gia công",
      "Lập mốc giao vật tư và lắp dựng",
      "Theo dõi tiến độ theo từng hạng mục",
    ],
  },
  {
    title: "Ngân sách dễ kiểm soát",
    description:
      "Khối lượng vật tư được bóc tách theo cấu hình thực tế thay vì chỉ ước lượng theo diện tích sử dụng.",
    checkpoints: [
      "Phân tách khung, panel và hoàn thiện",
      "Làm rõ hạng mục bao gồm/không bao gồm",
      "Dự trù vận chuyển và điều kiện mặt bằng",
    ],
  },
  {
    title: "Cấu hình đúng nhu cầu",
    description:
      "Loại lõi panel, độ dày, hệ cửa và xử lý liên kết được cân đối theo công năng, môi trường và mức đầu tư.",
    checkpoints: [
      "Cân nhắc nhiệt, ồn và yêu cầu cháy",
      "Chọn quy cách theo không gian sử dụng",
      "Đối chiếu hồ sơ kỹ thuật trước thi công",
    ],
  },
  {
    title: "Hiện trường gọn hơn",
    description:
      "Phương án lắp ghép giúp giảm công đoạn ướt, thuận tiện tổ chức vật tư và phối hợp các hạng mục hoàn thiện.",
    checkpoints: [
      "Giảm thời gian chờ giữa các công đoạn",
      "Dễ bố trí khu vực tập kết vật tư",
      "Kiểm tra mối nối trước khi bàn giao",
    ],
  },
];

function SectionCta({ text, href = "#lien-he", label = "Nhận báo giá miễn phí" }: { text: string; href?: string; label?: string }) {
  return (
    <div className="section-cta">
      <div>
        <p>{text}</p>
        <span className="cta-trust">
          Tư vấn sơ bộ miễn phí · Báo giá theo mặt bằng thực tế · Không ràng
          buộc trước khảo sát
        </span>
      </div>
      <Link
        className="secondary-btn tooltip-top"
        href={href}
        data-tooltip="Chuyển đến form nhận báo giá"
      >
        {label} <ArrowRight size={17} weight="bold" />
      </Link>
    </div>
  );
}

export default async function Home() {
  const [managedHome, managedSettings, managedConsultation, managedArticles] = await Promise.all(
    [getManagedHome(), getManagedSiteSettings(), getConsultationFormSettings(), getManagedArticles()],
  );
  const logoText = managedSettings?.logoTextUrl || site.branding.logoText;
  const logoMark = managedSettings?.logoMarkUrl || site.branding.logoMark;
  const business = {
    name: managedSettings?.name || site.name,
    phone: managedSettings?.phone || site.contact.phone,
    phoneDisplay: managedSettings?.phone || site.contact.phoneDisplay,
    email: managedSettings?.email || site.contact.email,
    address: managedSettings?.address || site.company.address,
    workingHours: managedSettings?.workingHours || site.company.workingHours,
    taxCode: managedSettings?.taxCode || site.company.taxCode,
    zaloUrl: managedSettings?.zaloUrl || site.contact.zaloUrl,
    messengerUrl: managedSettings?.messengerUrl || site.contact.messengerUrl,
    facebookUrl: managedSettings?.facebookUrl || site.social.facebook,
    youtubeUrl: managedSettings?.youtubeUrl || site.social.youtube,
    tiktokUrl: managedSettings?.tiktokUrl || site.social.tiktok,
    mapUrl: managedSettings?.mapUrl || site.location.mapUrl,
  };
  const searchArticles = managedArticles.map((article) => ({
    id: `article-${article._id}`,
    title: article.title,
    description: article.excerpt,
    href: `/bai-viet/${article.slug}`,
    keywords: `${article.title} ${article.excerpt} ${(article.tags || []).join(" ")}`,
  }));
  const footerDescription =
    managedSettings?.footerDescription ||
    managedHome?.footerDescription ||
    "Đơn vị tư vấn, thiết kế và thi công nhà tiền chế tấm panel cho nhà ở, nhà xưởng, kho lạnh, văn phòng công trình và mô hình lưu trú lắp ghép.";
  const consultationSettings = {
    eyebrow: "Khảo sát và báo giá",
    heading: "Gửi diện tích, vị trí và nhu cầu sử dụng để nhận giá sơ bộ",
    description:
      "Đội ngũ sẽ tiếp nhận thông tin và phản hồi phương án phù hợp với mặt bằng của bạn.",
    hotline: business.phoneDisplay,
    displayEmail: business.email,
    commitmentText:
      "Tư vấn sơ bộ miễn phí · Báo giá theo mặt bằng thực tế · Không ràng buộc trước khảo sát",
    nameLabel: "Họ tên",
    namePlaceholder: "Nguyễn Văn A",
    phoneLabel: "Số điện thoại",
    phonePlaceholder: business.phoneDisplay,
    requirementLabel: "Nhu cầu",
    requirementPlaceholder: "Diện tích, địa điểm, loại công trình",
    submitButtonText: "Nhận tư vấn",
    callButtonText: "Gọi tư vấn",
    drawingButtonText: "Gửi bản vẽ",
    successMessage: "Đã gửi yêu cầu tư vấn thành công.",
    errorMessage: "Không thể gửi yêu cầu. Vui lòng thử lại hoặc gọi trực tiếp.",
    validationMessage: "Vui lòng kiểm tra lại thông tin đã nhập.",
    isEnabled: true,
    enableDrawingUpload: false,
    enableGoogleSheets: true,
    enableEmailNotification: true,
    ...managedConsultation,
  };
  const heroSlides = managedHome?.heroImages?.length
    ? managedHome.heroImages.map((item, index) => ({
        src:
          item.imageUrl ||
          site.images.heroGallery[index % site.images.heroGallery.length].src,
        alt:
          item.label ||
          site.images.heroGallery[index % site.images.heroGallery.length].alt,
        label:
          item.label ||
          site.images.heroGallery[index % site.images.heroGallery.length].label,
      }))
    : site.images.heroGallery;
  const fallbackServices = services.map(([title, description, tag], index) => ({
    title,
    description,
    tag,
    imageUrl: site.images.services[index],
  }));
  const managedServices = managedHome?.services?.length
    ? managedHome.services.map((item, index) => ({
        title: item.title,
        description: item.description,
        tag: item.tag || fallbackServices[index % fallbackServices.length].tag,
        imageUrl:
          item.imageUrl ||
          fallbackServices[index % fallbackServices.length].imageUrl,
      }))
    : fallbackServices;
  const fallbackProcessSteps = processSteps.map(
    ([title, description], index) => ({
      title,
      description,
      imageUrl: site.images.process[index],
    }),
  );
  const managedProcessSteps = managedHome?.processSteps?.length
    ? managedHome.processSteps.map((item, index) => ({
        title: item.title,
        description: item.description,
        imageUrl:
          item.imageUrl ||
          fallbackProcessSteps[index % fallbackProcessSteps.length].imageUrl,
      }))
    : fallbackProcessSteps;
  const anatomyImage = managedHome?.anatomy?.imageUrl || site.images.anatomy;
  const processFeatureImage =
    managedHome?.processFeature?.imageUrl || site.images.processFeature;
  const projectCategories = new Set<PortfolioProject["category"]>([
    "Thi công",
    "Mẫu thiết kế",
    "Nhà ở",
    "Hoàn thiện",
  ]);
  const managedProjects: PortfolioProject[] = managedHome?.projects?.length
    ? managedHome.projects.map((item, index) => {
        const fallbackProject = projects[index % projects.length];
        return {
          ...fallbackProject,
          title: item.title,
          category: projectCategories.has(
            item.category as PortfolioProject["category"],
          )
            ? (item.category as PortfolioProject["category"])
            : fallbackProject.category,
          description: item.description,
          image: item.imageUrl || fallbackProject.image,
        };
      })
    : projects;
  const managedFaqs = managedHome?.faqs?.length
    ? managedHome.faqs.map((item) => [item.question, item.answer])
    : faqs;
  const managedVideos = managedHome?.videos?.length
    ? managedHome.videos.map((item) => ({
        ...item,
        description: item.description ?? "Video công trình PANED",
      }))
    : site.videos;
  const fallbackPricing: { id: string; name: string; price: string; note: string; details?: never }[] = [
        { id: "pricing-package-1", name: "Gói cơ bản", price: "Từ 1.650.000đ/m2", note: "Khung thép, mái panel EPS, hoàn thiện tiêu chuẩn" },
        { id: "pricing-package-2", name: "Gói cách nhiệt tốt", price: "Từ 2.150.000đ/m2", note: "Panel PU dày hơn, xử lý mối nối kỹ hơn" },
        { id: "pricing-package-3", name: "Gói nhà xưởng", price: "Theo bản vẽ", note: "Khẩu độ lớn, tải trọng và PCCC theo yêu cầu" },
      ];
  const managedPricing = managedHome?.pricing?.length
    ? managedHome.pricing.map((item, index) => {
        const fallbackPackage = fallbackPricing[index % fallbackPricing.length];
        return {
          id: item._key || `pricing-package-${index + 1}`,
          name: item.name || fallbackPackage.name,
          price: item.price || fallbackPackage.price,
          note: item.note || fallbackPackage.note,
          details: item.details,
        };
      })
    : fallbackPricing;
  const managedPlanningBenefits = managedHome?.planningBenefits?.length
    ? managedHome.planningBenefits.map((item, index) => ({
        title:
          item.title || planningBenefits[index % planningBenefits.length].title,
        description:
          item.description ||
          planningBenefits[index % planningBenefits.length].description,
        checkpoints: item.checkpoints?.filter(Boolean).length
          ? item.checkpoints.filter(Boolean)
          : planningBenefits[index % planningBenefits.length].checkpoints,
      }))
    : planningBenefits;
  const managedStats = managedHome?.stats?.length
    ? managedHome.stats
        .filter((item) => item.value && item.label)
        .map((item) => ({ value: item.value!, label: item.label! }))
    : stats;
  const managedMaterialBrands = managedHome?.materialBrands
    ?.filter(
      (item) =>
        item._key &&
        item.name &&
        item.logoUrl &&
        item.category &&
        item.summary &&
        item.material &&
        item.benefit,
    )
    .map((item) => ({
      id: item._key!,
      name: item.name!,
      logo: item.logoUrl!,
      category: item.category!,
      summary: item.summary!,
      material: item.material!,
      benefit: item.benefit!,
    }));
  const managedTestimonials = managedHome?.testimonials?.length
    ? managedHome.testimonials
        .filter((item) => item.name && item.role && item.quote)
        .map((item) => ({
          name: item.name!,
          role: item.role!,
          quote: item.quote!,
        }))
    : testimonials.map(([name, role, quote]) => ({ name, role, quote }));
  const managedPanelTypes = managedHome?.anatomy?.panelTypes?.length
    ? managedHome.anatomy.panelTypes
        .filter((item) => item.name && item.description)
        .map((item) => ({ name: item.name!, description: item.description! }))
    : panelTypes;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: managedFaqs.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: site.url,
    description: managedHome?.seoDescription || site.seo.description,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: "Phan Rang",
      addressRegion: "Khánh Hòa",
      addressCountry: "VN",
    },
    areaServed: site.location.areas,
    sameAs: [
      business.facebookUrl,
      business.youtubeUrl,
      business.tiktokUrl,
    ].filter(Boolean),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nhà tiền chế panel",
        item: site.url,
      },
    ],
  };

  return (
    <main>
      <LandingMotion />
      <ContactRail />

      <nav className="site-nav" aria-label="Điều hướng chính">
        <a
          className="brand brand-logo"
          href="#hero"
          aria-label="PANED Ninh Thuận - Về đầu trang"
        >
          <span className="brand-wordmark">
            <Image
              src={logoText}
              alt={site.branding.logoAlt}
              width={220}
              height={60}
              priority
            />
          </span>
        </a>
        <div className="nav-links">
          <details className="nav-submenu">
            <summary>
              Giải pháp <CaretDown size={14} weight="bold" aria-hidden="true" />
            </summary>
            <div>
              <Link href="/cau-tao">Cấu tạo panel</Link>
              <Link href="/quy-trinh">Quy trình thi công</Link>
              <Link href="/du-an">Dự án thực tế</Link>
            </div>
          </details>
          <Link
            className="nav-tooltip"
            href="/bao-gia"
            data-tooltip="Xem mức giá tham khảo"
          >
            <span>Báo giá</span>
          </Link>
          <a
            className="nav-tooltip"
            href="#video-cong-trinh"
            data-tooltip="Xem video công trình thực tế"
          >
            <span>Video</span>
          </a>
          <a
            className="nav-tooltip"
            href="#faq"
            data-nav-target="faq"
            data-tooltip="Xem câu hỏi thường gặp"
          >
            <span>FAQ</span>
          </a>
          <Link
            className="nav-tooltip"
            href="/bai-viet"
            data-tooltip="Đọc kiến thức và kinh nghiệm về nhà panel"
          >
            <span>Bài viết</span>
          </Link>
          <a
            className="nav-tooltip"
            href="#lien-he"
            data-tooltip="Gửi nhu cầu để được tư vấn"
          >
            <span>Liên hệ</span>
          </a>
        </div>
        <div className="nav-actions">
          <SiteSearch articles={searchArticles} />
          <a
            className="nav-cta nav-tooltip"
            href={`tel:${business.phone}`}
            data-tooltip="Gọi để nhận báo giá sơ bộ"
          >
            Nhận báo giá
          </a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>

      <HeroGallery
        slides={heroSlides}
        phone={business.phone}
        phoneDisplay={business.phoneDisplay}
        title={managedHome?.heroTitle}
        description={managedHome?.heroDescription}
        ctaLabel={managedHome?.heroCtaLabel}
        ctaHref={managedHome?.heroCtaHref}
      />

      <section className="stats-strip" aria-label="Số liệu năng lực">
        {managedStats.map((item) => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section trust-section reveal">
        <div className="section-stack">
          <p className="kicker">Nền tảng tin cậy</p>
          <h2>Vật tư phù hợp, quy trình rõ ràng và cam kết sau bàn giao</h2>
        </div>
        <MaterialBrands brands={managedMaterialBrands} />
        <div className="badge-row">
          <span>
            <CheckCircle size={18} weight="fill" /> Bảo hành kết cấu 5 năm
          </span>
          <span>
            <CheckCircle size={18} weight="fill" /> Panel theo yêu cầu PCCC
          </span>
          <span>
            <CheckCircle size={18} weight="fill" /> Nhận thi công liên tỉnh
          </span>
        </div>
        <TestimonialsCarousel items={managedTestimonials} />
      </section>

      <section className="section comparison reveal">
        <div className="section-stack">
          <p className="kicker">Giải pháp xây nhanh</p>
          <h2>Nhà tiền chế panel giúp kiểm soát tiến độ và chi phí từ đầu</h2>
        </div>
        <p className="mobile-swipe-hint" aria-hidden="true">
          Vuốt để xem từng lợi ích <ArrowRight size={16} weight="bold" />
        </p>
        <div
          className="compare-grid compare-swipe"
          aria-label="Các lợi ích khi triển khai nhà panel"
        >
          {managedPlanningBenefits.map((item, index) => (
            <article className="compare-item" key={`${item.title}-${index}`}>
              <div className="compare-item-top">
                <span className="compare-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CheckCircle size={28} weight="fill" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="compare-checkpoints">
                <span>Điểm cần kiểm soát</span>
                <ul>
                  {item.checkpoints.map((checkpoint) => (
                    <li key={checkpoint}>{checkpoint}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section services-section">
        <div className="section-stack reveal">
          <p className="kicker">Dịch vụ trọn gói</p>
          <h2>Giải pháp panel theo đúng mô hình bạn đang vận hành</h2>
        </div>
        <p className="mobile-swipe-hint" aria-hidden="true">
          Vuốt để xem thêm <ArrowRight size={16} weight="bold" />
        </p>
        <div className="services-bento">
          {managedServices.map((item) => (
            <article className="service-card reveal" key={item.title}>
              <Image src={item.imageUrl} alt={item.title} width={1200} height={900} sizes="(max-width: 768px) 82vw, 33vw" />
              <div>
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href="#lien-he">
                  Tìm hiểu thêm <ArrowRight size={16} weight="bold" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <SectionCta text="Chưa chắc loại panel nào phù hợp? Gửi nhu cầu để nhận phương án sơ bộ." href="/cau-tao" label="Xem thêm cấu tạo" />
      </section>

      <section id="cau-tao" className="section anatomy">
        <div className="anatomy-visual reveal">
          <Image
            src={anatomyImage}
            alt="Cấu tạo tấm panel cách nhiệt"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
        <div className="anatomy-copy reveal">
          <p className="kicker">Tôn, lõi, tôn</p>
          <h2>
            {managedHome?.anatomy?.title ||
              "Cấu tạo tấm panel cách nhiệt cho công trình chắc và sạch"}
          </h2>
          <p>
            {managedHome?.anatomy?.description ||
              "Tấm panel gồm hai lớp tôn mạ màu kẹp lõi cách nhiệt. Lựa chọn lõi panel quyết định mức giữ nhiệt, chống cháy, cách âm và ngân sách."}
          </p>
          <div className="panel-types">
            {managedPanelTypes.map((item) => (
              <article key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SectionCta text="Xem rõ cấu tạo, đặc tính từng loại lõi và cách chọn panel phù hợp công trình." href="/cau-tao" label="Xem chi tiết cấu tạo" />

      <section id="quy-trinh" className="section process reveal">
        <div className="section-stack narrow">
          <p className="kicker">Quy trình rõ từng việc</p>
          <h2>7 bước triển khai nhà panel từ khảo sát đến bảo hành</h2>
        </div>
        <p className="mobile-swipe-hint" aria-hidden="true">
          Vuốt để xem các bước <ArrowRight size={16} weight="bold" />
        </p>
        <div className="process-board">
          <div className="process-feature">
            <Image
              src={processFeatureImage}
              alt="Quy trình thi công nhà panel"
              fill
              sizes="(max-width: 1080px) 100vw, 38vw"
            />
            <div className="process-feature-card">
              <span>7 bước</span>
              <strong>Từ khảo sát đến bảo hành</strong>
            </div>
          </div>
          <div className="process-masonry">
            {managedProcessSteps.map((item, index) => (
              <article
                className="timeline-step timeline-flip-card"
                key={item.title}
                tabIndex={0}
                aria-label={`${item.title}: rê chuột hoặc focus để xem mô tả`}
              >
                <div className="timeline-flip-inner">
                  <div className="timeline-flip-face timeline-flip-front">
                    <div className="step-photo">
                      <Image
                        src={item.imageUrl}
                        alt={`${item.title} trong quy trình thi công`}
                        fill
                        sizes="(max-width: 760px) 82vw, 260px"
                      />
                    </div>
                    <div className="timeline-step-title">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                  <div className="timeline-flip-face timeline-flip-back">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <small>Rê chuột ra ngoài để xem ảnh</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <SectionCta text="Bắt đầu với bước khảo sát miễn phí và phương án phù hợp mặt bằng." href="/quy-trinh" label="Xem thêm quy trình" />
      </section>

      <section id="du-an" className="section projects">
        <div className="section-stack reveal">
          <p className="kicker">Công trình tham khảo</p>
          <h2>Dự án nhà panel theo nhiều nhu cầu sử dụng</h2>
        </div>
        <PortfolioFilter projects={managedProjects} />
        <SectionCta text="Xem thêm hình ảnh, hạng mục và thông tin công trình tham khảo." href="/du-an" label="Xem thêm dự án" />
      </section>

      <section id="video-cong-trinh" className="section video-section">
        <div className="section-stack reveal">
          <p className="kicker">Video thực tế</p>
          <h2>Nhìn rõ hơn về nhà tiền chế panel qua từng thước phim</h2>
          <p>
            Các video ghi lại công trình và không gian nhà panel thực tế để bạn
            dễ hình dung giải pháp phù hợp.
          </p>
        </div>
        <VideoGallery videos={managedVideos} />
        <SectionCta text="Bạn muốn xem giải pháp phù hợp mặt bằng của mình? Gửi nhu cầu để nhận tư vấn sơ bộ." />
      </section>

      <CostEstimator />

      <section id="bao-gia" className="section pricing reveal">
        <div>
          <p className="kicker">Ngân sách minh bạch</p>
          <h2>Báo giá nhà tiền chế panel tham khảo theo m2</h2>
          <p>
            Giá thay đổi theo vật tư, nền móng, chiều cao, loại lõi panel và mức
            hoàn thiện.
          </p>
        </div>
        <div
          className="price-table"
          role="group"
          aria-label="Các gói báo giá tham khảo"
        >
          {managedPricing.map(({ id, name, price, note, details }, index) => (
            <details className={`price-row price-accordion ${index === 1 ? "is-recommended" : ""}`} key={id}>
              <summary>
              <div className="price-name">
                {index === 1 ? (
                  <span className="price-badge">Khuyến nghị</span>
                ) : null}
                <strong>{name}</strong>
                {index === 1 ? (
                  <small>
                    Phương án cân bằng chi phí, khả năng cách nhiệt và mức hoàn
                    thiện.
                  </small>
                ) : null}
              </div>
              <span>{price}</span>
              <p className="price-preview preserve-lines">{note}</p>
              </summary>
              <div className="price-expanded">{details?.length ? <RichText value={details} className="rich-text price-details" /> : <p className="preserve-lines">{note}</p>}</div>
            </details>
          ))}
        </div>
        <SectionCta text="Xem phạm vi từng gói, các hạng mục bao gồm và lưu ý trước khi lập báo giá theo mặt bằng." href="/bao-gia" label="Xem chi tiết báo giá" />
      </section>

      <section className="section comparison-table-section reveal">
        <div className="section-stack">
          <p className="kicker">So sánh giải pháp</p>
          <h2>Nhà panel và xây dựng truyền thống khác nhau thế nào?</h2>
        </div>
        <div className="comparison-table" role="table">
          <div className="comparison-row comparison-head" role="row">
            <strong>Tiêu chí</strong>
            <strong className="comparison-panel-head">
              Nhà panel<small>Phù hợp khi cần triển khai nhanh</small>
            </strong>
            <strong>Xây truyền thống</strong>
          </div>
          {[
            ["Thời gian thi công", "7-45 ngày", "3-12 tháng"],
            ["Chi phí tham khảo", "Từ 1.6tr/m²", "Từ 3.5tr/m²"],
            ["Mở rộng dễ dàng", "yes", "no"],
            ["Cách nhiệt", "yes", "Trung bình"],
            ["Bảo trì", "Thấp", "Cao hơn"],
          ].map(([label, panel, traditional]) => (
            <div className="comparison-row" role="row" key={label}>
              <span>{label}</span>
              <span className="panel-choice">
                {panel === "yes" ? <Check size={20} weight="bold" /> : panel}
              </span>
              <span>
                {traditional === "no" ? (
                  <X size={20} weight="bold" />
                ) : (
                  traditional
                )}
              </span>
            </div>
          ))}
        </div>
        <p className="comparison-note">
          Nhà panel thường phù hợp khi cần chủ động tiến độ và ngân sách; phương
          án cuối vẫn cần đối chiếu công năng, nền móng và yêu cầu kỹ thuật thực
          tế.
        </p>
        <SectionCta text="Cần so sánh theo mặt bằng thực tế? Nhận tư vấn miễn phí từ đội kỹ thuật." />
      </section>

      <section className="section capability reveal">
        <div className="capability-copy">
          <p className="kicker">Năng lực triển khai</p>
          <h2>Đội thi công quen vật tư, quen tiến độ, quen mặt bằng khó</h2>
          <p>
            Chúng tôi bóc tách khối lượng, tư vấn lõi panel, phối hợp xưởng gia
            công và đội lắp đặt để giảm phát sinh tại công trình.
          </p>
        </div>
        <div className="stats">
          {managedStats.slice(0, 3).map((item) => (
            <div className="stat" key={item.label}>
              <strong
                data-counter
                data-target={item.value.replace(/\D/g, "") || "0"}
              >
                0
              </strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section faq reveal" id="faq">
        <div className="section-stack narrow">
          <p className="kicker">Câu hỏi thường gặp</p>
          <h2>Những điều cần biết trước khi thi công nhà tiền chế panel</h2>
        </div>
        <FaqList items={managedFaqs} />
        <SectionCta text="Còn câu hỏi khác về giải pháp panel? Đội ngũ sẽ phản hồi trong thời gian sớm nhất." />
      </section>

      <section id="lien-he" className="section final-cta reveal">
        <div>
          <p className="kicker">{consultationSettings.eyebrow}</p>
          <h2>{consultationSettings.heading}</h2>
          <p>{consultationSettings.description}</p>
          <p>
            Hotline: {consultationSettings.hotline || business.phoneDisplay}.
            Email: {consultationSettings.displayEmail || business.email}.
          </p>
          <p className="cta-trust cta-trust-on-dark">
            {consultationSettings.commitmentText}
          </p>
          <div className="contact-links">
            <a
              className="primary-btn tooltip-top"
              href={`tel:${business.phone}`}
              data-tooltip="Gọi trực tiếp để trao đổi nhu cầu"
            >
              {consultationSettings.callButtonText}
            </a>
            {consultationSettings.enableDrawingUpload ? (
              <a
                className="secondary-btn tooltip-top"
                href={`mailto:${business.email}`}
                data-tooltip="Gửi bản vẽ hoặc yêu cầu qua email"
              >
                {consultationSettings.drawingButtonText}
              </a>
            ) : null}
          </div>
        </div>
        <ConsultationForm
          settings={consultationSettings}
          phonePlaceholder={
            consultationSettings.phonePlaceholder || business.phoneDisplay
          }
        />
      </section>

      <footer className="footer">
        <div className="footer-brand">
          <div className="footer-brand-lockup">
            <Image src={logoMark} alt="" width={48} height={48} />
            <span>
              {business.name}
              <small>Ninh Thuận</small>
            </span>
          </div>
          <p>{footerDescription}</p>
          <div className="footer-social">
            <a
              className="social-facebook"
              href={business.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FacebookLogo size={20} weight="fill" />
            </a>
            <a
              className="social-youtube"
              href={business.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <YoutubeLogo size={20} weight="fill" />
            </a>
            <a
              className="social-tiktok"
              href={business.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <TiktokLogo size={20} weight="fill" />
            </a>
          </div>
        </div>
        <div className="footer-column">
          <strong>Dịch vụ</strong>
          <a href="#cau-tao">Panel PU, EPS và Rockwool</a>
          <a href="#bao-gia">Báo giá nhà tiền chế panel</a>
          <a href="#du-an">Dự án thi công tham khảo</a>
        </div>
        <div className="footer-column">
          <strong>Liên hệ</strong>
          <a href={business.mapUrl} target="_blank" rel="noreferrer">
            {business.address}
          </a>
          <a href={`tel:${business.phone}`}>Hotline: {business.phoneDisplay}</a>
          <a href={`mailto:${business.email}`}>{business.email}</a>
          <span>{business.workingHours}</span>
        </div>
        <div className="footer-column">
          <strong>Thông tin</strong>
          <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
          <a href="/dieu-khoan-su-dung">Điều khoản sử dụng</a>
          <span>Khu vực: {site.location.label}</span>
        </div>
      </footer>
      <div className="footer-legal">
        <span>
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </span>
        <span>MST: {business.taxCode}</span>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </main>
  );
}
