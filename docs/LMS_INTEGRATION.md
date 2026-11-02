# Kết nối website ↔ Hi Daniel! LMS

Website (site tĩnh) chỉ **dẫn link** sang LMS (ứng dụng riêng, có server và tài khoản).
Không có SSO, không gọi API, không chia sẻ cookie.

## Biến cấu hình

| Biến | Ý nghĩa |
|---|---|
| `NEXT_PUBLIC_LMS_URL` | Địa chỉ công khai của LMS, ví dụ `https://lms.example.com`. Được chép vào HTML lúc build nên **chỉ chứa URL**: không API key, không mật khẩu, không token. Không cần dấu `/` ở cuối; không có query hay `#`. |
| `NEXT_PUBLIC_BASE_PATH` | Thư mục con khi deploy (GitHub Pages: `/Hi-Daniel-Website-`). Workflow tự đặt. |
| `LMS_URL_ALLOW_LOCAL` | Chỉ để thử bản build tĩnh trên máy: `1` cho phép `NEXT_PUBLIC_LMS_URL` là localhost khi `npm run build`. |

`next.config.ts` kiểm tra giá trị trước khi build:
- URL sai định dạng, có thông tin đăng nhập, query hoặc `#`: **luôn báo lỗi**.
- Bản build production trỏ tới localhost (khi không có `LMS_URL_ALLOW_LOCAL=1`) hoặc dùng `http`: **báo lỗi**.

**Khi chưa đặt biến:** LMS được coi là chưa mở công khai.
- Mọi nút Đăng nhập / Đăng ký / Khóa học dẫn về trang giới thiệu `/lms/`.
- Trang `/lms/` hiện thông báo "chưa mở công khai" thay cho các nút.
- Đây là trạng thái hiện tại của bản GitHub Pages.

## Theo môi trường

| Môi trường | Cách đặt | Giá trị |
|---|---|---|
| Development | File `.env.development` (đã có trong repo, chỉ `npm run dev` đọc) | `http://localhost:52360` |
| Staging | Biến môi trường của nơi build staging, hoặc `.env.production.local` trên máy build (không commit) | `https://<host LMS staging>` |
| Production (GitHub Pages) | Repo **Settings → Secrets and variables → Actions → Variables**, tạo biến `LMS_URL`. Workflow chuyển nó thành `NEXT_PUBLIC_LMS_URL`. Đây là *variable*, không phải *secret*, vì giá trị là công khai | `https://<host LMS công khai>` |

Phía LMS cần đặt `MAIN_SITE_URL` trỏ ngược về website để hiện link "Về trang Hi Daniel!":
- dev: `http://localhost:3000`
- production: URL https của website.

## Chạy thử cả hai trên máy

1. LMS: trong repo LMS, chạy `npm run pg:real -- serve` (tab riêng).
2. LMS: đặt `MAIN_SITE_URL=http://localhost:3000` rồi chạy `npm run dev:real-pg` (cổng 52360).
3. Website: `npm run dev` (cổng 3000).
4. Thử bản tĩnh có basePath:
   ```bash
   NEXT_PUBLIC_BASE_PATH=/Hi-Daniel-Website- NEXT_PUBLIC_LMS_URL=http://localhost:52360 LMS_URL_ALLOW_LOCAL=1 npm run build
   ```
   Trên Git Bash/Windows, thêm `MSYS_NO_PATHCONV=1` để giữ nguyên `/Hi-Daniel-Website-`. Sau đó phục vụ `out/` dưới đường dẫn `/Hi-Daniel-Website-/`.

## Bảng CTA

| Nút | Đích |
|---|---|
| Đăng nhập (header, menu mobile, trang /lms/) | LMS `/login` |
| Đăng ký miễn phí (header, menu mobile), Bắt đầu miễn phí (hero, gói Starter), Tạo tài khoản miễn phí (CTA cuối trang) | LMS `/register` |
| Khóa học (menu), Xem tất cả khóa học | LMS `/courses` |
| Trải nghiệm LMS (trang /lms/) | LMS `/` |
| LMS (menu), Tìm hiểu thêm (Hi Daniel! LMS), LMS (footer) | Trang `/lms/` của website |

Live, Studio, Insights chưa tồn tại, nên hiện nhãn "Sắp ra mắt" và không có link.

Các nút chưa có đích thật vẫn trỏ `#`:
- Dùng thử 14 ngày, Nói chuyện với chúng tôi, Đặt lịch demo;
- phần lớn link footer và mạng xã hội.

Cách xử lý các nút này chờ chủ dự án quyết định.

Thêm một đích LMS mới: trong `content/*.ts` viết `href: "lms:/đường-dẫn"` và thêm đường dẫn đó vào kiểu `LmsPath` trong `lib/lms.ts`.
