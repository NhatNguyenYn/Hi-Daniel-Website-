// Ảnh chụp màn hình sản phẩm thật.
// 1. Bỏ file ảnh vào thư mục public/screens/ (PNG/JPG/WebP, nên rộng ≥ 1600px, tỉ lệ ~16:10).
// 2. Ghi đường dẫn vào đây, ví dụ: lms: "/screens/lms.png"
// Để trống ("") thì trang tự dùng mockup vẽ bằng code.
// Muốn ảnh khác nhau cho từng ngôn ngữ: dùng { vi: "/screens/lms-vi.png", en: "/screens/lms-en.png" }.

type Src = string | { vi: string; en: string };

export const screens: Record<"hero" | "lms" | "live" | "studio" | "insights", Src> = {
  hero: "",
  lms: "",
  live: "",
  studio: "",
  insights: "",
};

// Địa chỉ hiển thị trên thanh trình duyệt giả phía trên mỗi ảnh.
export const screenUrls: Record<keyof typeof screens, string> = {
  hero: "app.hidaniel.vn",
  lms: "app.hidaniel.vn",
  live: "live.hidaniel.vn",
  studio: "studio.hidaniel.vn",
  insights: "insights.hidaniel.vn",
};
