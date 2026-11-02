# Hi Daniel! — Landing page

Next.js 15 · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText) · Lenis (cuộn mượt)

## Chạy thử

```bash
npm install
npm run dev        # mở http://localhost:3000 (tiếng Việt) và /en/ (tiếng Anh)
```

## Sửa nội dung

Toàn bộ chữ nằm trong `content/vi.ts` và `content/en.ts` — sửa ở đó, không cần đụng component.
Hai file phải cùng cấu trúc; nếu thiếu trường TypeScript sẽ báo lỗi khi build.

## Đưa lên hosting riêng

```bash
npm run build      # tạo thư mục out/ gồm HTML/CSS/JS tĩnh
```

Upload toàn bộ thư mục `out/` lên hosting (cPanel, Nginx, Apache, S3…). Không cần Node.js trên server.

## Cấu trúc

| Thư mục | Nội dung |
| --- | --- |
| `app/` | Trang `/` (VI), `/en/` (EN), `/blog/` (placeholder) |
| `components/sections/` | Từng section của landing page |
| `components/mockups.tsx` | Mockup giao diện sản phẩm — thay bằng ảnh chụp thật khi có |
| `components/anim/` | Hiệu ứng chữ chạy lên khi cuộn |
| `app/globals.css` | Bảng màu thương hiệu & tiện ích CSS |
