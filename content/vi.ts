// Toàn bộ nội dung tiếng Việt của landing page.
// Sửa chữ ở đây là trang tự cập nhật — không cần đụng vào component.
// File en.ts phải có cùng cấu trúc (TypeScript sẽ báo lỗi nếu thiếu).

const vi = {
  meta: {
    title: "Hi Daniel! — Nền tảng học tập thế hệ mới",
    description:
      "Hệ sinh thái LMS trẻ trung, thông minh cho trường học, trung tâm và doanh nghiệp: quản lý học tập, lớp học trực tuyến, soạn bài bằng AI và phân tích dữ liệu.",
  },

  nav: {
    links: [
      { label: "Sản phẩm", href: "#products" },
      { label: "Tính năng", href: "#features" },
      { label: "Khóa học", href: "#courses" },
      { label: "Bảng giá", href: "#pricing" },
      { label: "Blog", href: "/blog" },
    ],
    login: "Đăng nhập",
    cta: "Dùng thử miễn phí",
    menu: "Menu",
  },

  hero: {
    badge: "Mới · Hi Daniel! 2.0 với trợ giảng AI",
    titleLines: ["Học tập bừng sáng.", "Giảng dạy nhẹ tênh."],
    subtitle:
      "Một nền tảng duy nhất để tạo khóa học, dạy trực tuyến, chấm bài và theo dõi tiến bộ của từng học viên — nhanh, vui và cực kỳ dễ dùng.",
    primary: "Bắt đầu miễn phí",
    secondary: "Xem demo 2 phút",
    note: "Không cần thẻ tín dụng · Dùng thử 14 ngày",
  },

  mock: {
    greeting: "Chào buổi sáng, Minh Anh",
    sub: "Hôm nay bạn có 2 buổi học và 1 bài tập.",
    nav: ["Tổng quan", "Khóa học", "Lịch học", "Bài tập", "Thành tích"],
    weekly: "Thời gian học tuần này",
    days: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
    continue: "Tiếp tục học",
    streak: "ngày liên tiếp",
    upcoming: "Sắp diễn ra",
    liveNow: "Đang trực tiếp",
    chips: {
      xp: "+120 XP",
      assignment: "Bài tập đã được chấm: 9.5",
      live: "Lớp IELTS bắt đầu sau 5 phút",
    },
    studioPrompt: "Tạo bài kiểm tra 10 câu về thì hiện tại hoàn thành",
    studioGenerating: "AI đang soạn câu hỏi…",
    insightsKpi: ["Học viên hoạt động", "Tỉ lệ hoàn thành", "Điểm TB"],
    chat: ["Cô ơi em hỏi câu 3 ạ", "Slide rõ lắm ạ!", "Em hiểu rồi ạ 🎉"],
  },

  manifesto: {
    eyebrow: "Vì sao là Hi Daniel!",
    text: "Chúng tôi tin rằng học tập nên giống một cuộc trò chuyện — gần gũi, hứng khởi và không bao giờ nhàm chán. Hi Daniel! gom mọi công cụ dạy và học về một nơi, để giáo viên dành thời gian cho học trò thay vì cho giấy tờ.",
    highlight: ["cuộc trò chuyện", "một nơi", "học trò"],
  },

  stats: {
    items: [
      { value: 250, suffix: "K+", label: "Học viên đang học mỗi ngày" },
      { value: 1200, suffix: "+", label: "Trường học & doanh nghiệp tin dùng" },
      { value: 98, suffix: "%", label: "Giáo viên hài lòng sau 1 tháng" },
      { value: 40, suffix: "%", label: "Thời gian soạn bài được tiết kiệm" },
    ],
    trustedBy: "Được tin dùng bởi các đơn vị giáo dục hàng đầu",
    logos: [
      "Sao Mai Academy",
      "EduNova",
      "Lumos School",
      "Bright Minds",
      "Hanoi Tech Hub",
      "Kite English",
      "Vinh Quang College",
      "Orbit Labs",
    ],
  },

  products: {
    eyebrow: "Hệ sinh thái sản phẩm",
    title: "Một nền tảng. Bốn siêu năng lực.",
    subtitle: "Dùng riêng từng sản phẩm hoặc kết hợp tất cả — dữ liệu luôn đồng bộ.",
    items: [
      {
        key: "lms",
        name: "Hi Daniel! LMS",
        tagline: "Quản lý học tập trọn gói",
        description:
          "Tạo khóa học, phân lớp, giao bài và theo dõi tiến độ từng học viên trên một bảng điều khiển trực quan.",
        points: ["Lộ trình học cá nhân hóa", "Sổ điểm tự động", "Ứng dụng di động iOS & Android"],
      },
      {
        key: "live",
        name: "Hi Daniel! Live",
        tagline: "Lớp học trực tuyến sống động",
        description:
          "Video HD, bảng trắng tương tác, chia nhóm thảo luận và điểm danh tự động — không cần cài thêm phần mềm.",
        points: ["Bảng trắng cộng tác", "Ghi hình & phụ đề tự động", "Chia phòng thảo luận"],
      },
      {
        key: "studio",
        name: "Hi Daniel! Studio",
        tagline: "Soạn bài cùng trợ lý AI",
        description:
          "Biến một ý tưởng thành bài giảng, slide và đề kiểm tra hoàn chỉnh chỉ trong vài phút với trợ lý AI.",
        points: ["Sinh câu hỏi trắc nghiệm", "Thư viện 5.000+ mẫu", "Xuất SCORM / PDF"],
      },
      {
        key: "insights",
        name: "Hi Daniel! Insights",
        tagline: "Phân tích dữ liệu học tập",
        description:
          "Báo cáo thời gian thực giúp phát hiện sớm học viên cần hỗ trợ và đo hiệu quả từng khóa học.",
        points: ["Cảnh báo học viên tụt lại", "Báo cáo cho phụ huynh", "Dashboard cho ban giám hiệu"],
      },
    ],
    learnMore: "Tìm hiểu thêm",
  },

  features: {
    eyebrow: "Tính năng",
    title: "Mọi thứ bạn cần. Không thừa một cú nhấp.",
    items: [
      {
        icon: "bot",
        title: "Trợ giảng AI 24/7",
        text: "Giải đáp thắc mắc, gợi ý bài tập và tóm tắt bài giảng cho từng học viên.",
      },
      {
        icon: "trophy",
        title: "Gamification",
        text: "XP, huy hiệu, bảng xếp hạng và chuỗi ngày học giúp học viên quay lại mỗi ngày.",
      },
      {
        icon: "check",
        title: "Chấm bài tự động",
        text: "Trắc nghiệm, điền từ, nối cặp — có điểm ngay lập tức.",
      },
      {
        icon: "phone",
        title: "Học mọi lúc",
        text: "Ứng dụng di động tải bài để học offline.",
      },
      {
        icon: "plug",
        title: "Tích hợp sẵn",
        text: "Google Workspace, Microsoft 365, Zoom, Zalo và cổng thanh toán VNPay.",
      },
      {
        icon: "shield",
        title: "Bảo mật chuẩn doanh nghiệp",
        text: "Mã hóa dữ liệu, phân quyền chi tiết, sao lưu hằng ngày.",
      },
    ],
  },

  courses: {
    eyebrow: "Khóa học nổi bật",
    title: "Hàng trăm khóa học sẵn sàng để bắt đầu.",
    lessons: "bài học",
    students: "học viên",
    items: [
      { title: "IELTS 7.0+ Cấp tốc", teacher: "Daniel Nguyễn", lessons: 48, students: "12.4K", rating: 4.9, price: "1.290.000đ", tag: "Tiếng Anh", hue: "flame" },
      { title: "Lập trình Python cho người mới", teacher: "Trần Hoàng Long", lessons: 36, students: "8.9K", rating: 4.8, price: "990.000đ", tag: "Công nghệ", hue: "sky" },
      { title: "Thiết kế UI/UX thực chiến", teacher: "Lê Bảo Ngọc", lessons: 30, students: "6.1K", rating: 4.9, price: "1.490.000đ", tag: "Thiết kế", hue: "mint" },
      { title: "Toán tư duy lớp 6–9", teacher: "Phạm Minh Đức", lessons: 64, students: "15.2K", rating: 4.8, price: "790.000đ", tag: "Phổ thông", hue: "sun" },
      { title: "Marketing số 2026", teacher: "Võ Thanh Hà", lessons: 28, students: "4.7K", rating: 4.7, price: "1.190.000đ", tag: "Kinh doanh", hue: "violet" },
      { title: "Giao tiếp tiếng Nhật N4", teacher: "Sato Yuki", lessons: 40, students: "3.8K", rating: 4.9, price: "1.090.000đ", tag: "Ngoại ngữ", hue: "sky" },
    ],
    viewAll: "Xem tất cả khóa học",
  },

  testimonials: {
    eyebrow: "Người dùng nói gì",
    title: "Được yêu thích bởi giáo viên và học viên.",
    items: [
      { quote: "Từ ngày dùng Hi Daniel!, tôi tiết kiệm gần 6 tiếng soạn bài mỗi tuần.", name: "Cô Nguyễn Thu Trang", role: "Giáo viên Tiếng Anh, THPT Lê Quý Đôn" },
      { quote: "Học viên của trung tâm chủ động vào học hơn hẳn nhờ bảng xếp hạng và huy hiệu.", name: "Anh Hoàng Việt", role: "Giám đốc, Kite English" },
      { quote: "Giao diện đẹp, dễ dùng đến mức phụ huynh lớn tuổi cũng xem được báo cáo.", name: "Chị Lan Phương", role: "Phụ huynh học sinh lớp 8" },
      { quote: "Triển khai cho 2.000 nhân viên chỉ trong một tuần. Đội hỗ trợ cực nhiệt tình.", name: "Anh Minh Tuấn", role: "HR Manager, Orbit Labs" },
      { quote: "Trợ giảng AI giải thích bài cho em lúc 11 giờ đêm, đúng lúc em cần nhất.", name: "Bảo Anh", role: "Học viên IELTS" },
      { quote: "Báo cáo Insights giúp ban giám hiệu nắm tình hình toàn trường chỉ trong 1 màn hình.", name: "Thầy Trần Quốc Bảo", role: "Hiệu phó, Lumos School" },
    ],
  },

  pricing: {
    eyebrow: "Bảng giá",
    title: "Đơn giản, minh bạch, phù hợp mọi quy mô.",
    monthly: "Theo tháng",
    yearly: "Theo năm",
    save: "Tiết kiệm 20%",
    perMonth: "/tháng",
    popular: "Phổ biến nhất",
    plans: [
      {
        name: "Starter",
        desc: "Cho giáo viên và lớp học nhỏ",
        monthly: "0đ",
        yearly: "0đ",
        cta: "Bắt đầu miễn phí",
        features: ["Tối đa 50 học viên", "3 khóa học", "Chấm bài tự động", "Ứng dụng di động"],
      },
      {
        name: "Pro",
        desc: "Cho trung tâm đang phát triển",
        monthly: "499.000đ",
        yearly: "399.000đ",
        cta: "Dùng thử 14 ngày",
        features: ["Không giới hạn học viên", "Hi Daniel! Live", "Trợ giảng AI", "Báo cáo nâng cao", "Tên miền riêng"],
      },
      {
        name: "Enterprise",
        desc: "Cho trường học và doanh nghiệp",
        monthly: "Liên hệ",
        yearly: "Liên hệ",
        cta: "Nói chuyện với chúng tôi",
        features: ["Toàn bộ tính năng Pro", "SSO & phân quyền nâng cao", "Triển khai riêng (on-premise)", "Hỗ trợ 24/7 & SLA 99.9%"],
      },
    ],
  },

  cta: {
    title: "Sẵn sàng nói “Hi” với cách học mới?",
    subtitle: "Tạo lớp học đầu tiên trong chưa đầy 5 phút. Miễn phí mãi mãi cho lớp nhỏ.",
    primary: "Tạo tài khoản miễn phí",
    secondary: "Đặt lịch demo",
  },

  footer: {
    tagline: "Nền tảng học tập trẻ trung cho thế hệ mới.",
    columns: [
      { title: "Sản phẩm", links: ["LMS", "Live", "Studio", "Insights", "Ứng dụng di động"] },
      { title: "Giải pháp", links: ["Trường học", "Trung tâm", "Doanh nghiệp", "Giáo viên tự do"] },
      { title: "Tài nguyên", links: ["Blog", "Trung tâm trợ giúp", "Webinar", "Tài liệu API"] },
      { title: "Công ty", links: ["Về chúng tôi", "Tuyển dụng", "Liên hệ", "Báo chí"] },
    ],
    rights: "© 2026 Hi Daniel! Bảo lưu mọi quyền.",
    legal: ["Điều khoản", "Bảo mật", "Cookie"],
  },
};

export default vi;
export type Dictionary = typeof vi;
