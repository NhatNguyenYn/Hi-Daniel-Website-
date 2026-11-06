# Hi Daniel! Design System

> **Dành cho người và AI (Claude Code, Codex, Cursor…).** Mọi giao diện thuộc hệ thống Hi Daniel!
> (website, LMS, app quản trị, email, slide…) **phải** tuân theo file này.
> Khi file này mâu thuẫn với một yêu cầu trong prompt, hãy hỏi lại người dùng trước khi làm khác đi.
>
> Phiên bản token: xem `version` trong [`tokens.json`](tokens.json). Nguồn gốc: website Hi Daniel! (repo `Hi-Daniel-Website-`).

---

## 0. Gắn vào một dự án mới

1. Copy nguyên thư mục `design-system/` vào gốc dự án. **Không sửa** các file `*.theme.css` và `*.tokens.css` (chúng được sinh tự động).
2. Nạp CSS:
   - **Tailwind CSS v4** (khuyến nghị):
     ```css
     @import "tailwindcss";
     @import "./design-system/hi-daniel.theme.css";
     @import "./design-system/hi-daniel.components.css";
     ```
   - **Không dùng Tailwind** (CSS thuần, SCSS, CSS-in-JS…): nạp `design-system/hi-daniel.tokens.css` và dùng biến `var(--hd-…)`.
3. Font **Be Vietnam Pro**, subset `latin` + `vietnamese`, weight 400/500/600/700/800.
   Next.js: `next/font/google` → `Be_Vietnam_Pro`. Nơi khác: Google Fonts.
4. Cho AI đọc quy tắc này mỗi lần (không cần gõ lại prompt):
   - **Codex** (và các agent đọc `AGENTS.md`): thêm vào `AGENTS.md` ở gốc repo:
     ```md
     ## Design system
     Before any UI work, read and follow `design-system/DESIGN.md` (Hi Daniel! design rules).
     Use only its tokens and utilities; never hard-code brand colours.
     ```
   - **Claude Code**: tạo `CLAUDE.md` ở gốc repo chứa dòng `@AGENTS.md` (Claude sẽ nạp luôn nội dung `AGENTS.md`) — hoặc trực tiếp `@design-system/DESIGN.md`.
5. **Đổi token** (màu, cỡ chữ…): chỉ sửa `tokens.json` → chạy `node design-system/build.mjs` → tăng `version` → copy thư mục sang các dự án khác. Script tự kiểm tra độ tương phản và báo lỗi nếu vi phạm.

---

## 1. Tính cách thương hiệu

**Trẻ trung · Năng động · Rõ ràng · Thân thiện.** Giao diện sạch, nhiều khoảng trắng, chữ lớn đậm, một điểm nhấn cam ở mỗi màn hình.

Tỉ lệ màu **60 / 30 / 10**:
- ~60% nền sáng (`paper`, `white`) hoặc nền navy rất tối cho section tối.
- ~30% navy (chữ, khối nội dung, section tối).
- ~10% cam `flame` (nút chính, điểm nhấn, số liệu nổi bật).
- Màu phụ (`sky`, `mint`, `sun`, `violet`) chỉ dùng cho **nhận diện sản phẩm, biểu đồ, huy hiệu, minh hoạ** — không dùng cho nút chính hay chữ dài.

---

## 2. Bảng màu gốc

| Token | Hex | Tailwind | CSS thuần | Dùng cho |
|---|---|---|---|---|
| `navy-950` | `#060f2c` | `bg-navy-950` | `--hd-navy-950` | Nền section tối, footer |
| `navy-900` | `#0a1a47` | `text-navy-900` | `--hd-navy-900` | Chữ tiêu đề, nền tối thứ cấp |
| `navy-800` | `#0e2460` | `bg-navy-800` | `--hd-navy-800` | **Màu logo**, nút phụ, icon nền |
| `navy-700` → `navy-50` | xem `tokens.json` | | | Hover, viền, nền nhạt (`navy-50 #eef2fb`) |
| `flame-500` | `#ff6a13` | `bg-flame-500` | `--hd-flame-500` | **Cam thương hiệu**: nút chính, dấu "!" |
| `flame-600` | `#eb5200` | | | Hover của nút cam |
| `flame-700` | `#c24100` | `text-flame-700` | | **Chữ cam nhỏ trên nền sáng** (link) |
| `flame-400` | `#ff8236` | `text-flame-400` | | Chữ/điểm nhấn cam trên nền tối |
| `flame-50` | `#fff4ec` | | | Nền nhạt cho khối nhấn cam |
| `sky-brand` | `#3d8bff` | | | Sản phẩm Live, biểu đồ |
| `mint-brand` | `#1fc8a0` | | | Sản phẩm Insights, trạng thái tốt (nền/icon) |
| `sun-brand` | `#ffbf2e` | | | Huy hiệu, XP, cảnh báo (nền/icon) |
| `violet-brand` | `#8b5cf6` | | | Sản phẩm Studio, AI |
| `paper` | `#f6f7fb` | `bg-paper` | `--hd-paper` | Nền trang mặc định |
| `ink` | `#0b1433` | `text-ink` | `--hd-ink` | Chữ thân bài |

Gradient (chỉ 3 loại, không tự chế thêm):

| Biến | Dùng cho |
|---|---|
| `--hd-gradient-cta` | Khối CTA lớn màu cam (135°, flame-500 → flame-400 → sun) |
| `--hd-gradient-text` | Chữ tiêu đề nhấn (`text-gradient`), tối đa 1 cụm/màn hình |
| `--hd-gradient-progress` | Thanh tiến độ, thanh cuộn |

---

## 3. Màu ngữ nghĩa (ưu tiên dùng trong app)

Trong ứng dụng (LMS, trang quản trị) **luôn dùng token ngữ nghĩa** thay vì màu gốc, để chế độ sáng/tối tự đổi đúng.
Bật nền tối cho một vùng bằng class `hd-dark` (hoặc `data-theme="dark"`) trên phần tử bao ngoài.

| Token | Tailwind | Sáng | Tối | Dùng cho |
|---|---|---|---|---|
| `canvas` | `bg-canvas` | `paper` | `navy-950` | Nền trang |
| `surface` | `bg-surface` | `#ffffff` | `navy-900` | Thẻ, bảng, hộp thoại |
| `surface-muted` | `bg-surface-muted` | `navy-50` | trắng 6% | Vùng phụ, hàng xen kẽ |
| `line` / `line-strong` | `ring-line`, `border-line` | navy 10% / 20% | trắng 10% / 20% | Viền, đường kẻ |
| `fg` | `text-fg` | `ink` | trắng | Chữ chính |
| `fg-muted` | `text-fg-muted` | navy 65% | trắng 60% | Chữ phụ, mô tả |
| `fg-subtle` | `text-fg-subtle` | navy 45% | trắng 45% | **Chỉ** placeholder, chú thích trang trí, chữ ≥ 24px |
| `primary` / `primary-hover` / `on-primary` | `bg-primary`… | flame-500 / 600 / trắng | flame-500 / 400 / trắng | Nút chính |
| `secondary` / `secondary-hover` / `on-secondary` | `bg-secondary`… | navy-800 / 700 / trắng | trắng / navy-50 / navy-900 | Nút mặc định trong app |
| `link` | `text-link` | flame-700 | flame-400 | Link trong đoạn văn |
| `focus` | `ring-focus`, `outline-focus` | flame-500 | flame-400 | Viền focus bàn phím |
| `success` (+`-soft`) | `text-success`, `bg-success-soft` | `#0b7d62` | mint | Thành công, đạt |
| `warning` (+`-soft`) | | `#a86400` | sun | Cảnh báo, sắp hết hạn |
| `danger` (+`-soft`) | | `#d4183d` | `#ff7088` | Lỗi, xoá, trực tiếp (LIVE) |
| `info` (+`-soft`) | | `#2563eb` | `#7fb0ff` | Thông tin |

Badge trạng thái: `badge bg-success-soft text-success` (tương tự cho `warning`, `danger`, `info`).

---

## 4. Màu theo sản phẩm

| Sản phẩm | Token | Màu |
|---|---|---|
| Hi Daniel! LMS | `product-lms` | flame `#ff6a13` |
| Hi Daniel! Live | `product-live` | sky `#3d8bff` |
| Hi Daniel! Studio | `product-studio` | violet `#8b5cf6` |
| Hi Daniel! Insights | `product-insights` | mint `#1fc8a0` |

Màu sản phẩm dùng cho: icon, chấm trạng thái, nhãn nhỏ, quầng sáng nền, biểu đồ. Nút chính **vẫn là cam** ở mọi sản phẩm.

---

## 5. Độ tương phản (bắt buộc — WCAG 2.x AA)

Kết quả kiểm tra của `node design-system/build.mjs`:

| Cặp chữ / nền | Sáng | Tối | |
|---|---|---|---|
| `fg` / `canvas` | 16.88 | 18.88 | ✅ |
| `fg-muted` / `surface` | 5.36 | 6.69 | ✅ |
| `link` / `surface` | 5.19 | 6.79 | ✅ |
| `success` · `warning` · `danger` · `info` / `surface` | 5.09 · 4.68 · 5.25 · 5.17 | 7.85 · 10.18 · 6.33 · 7.64 | ✅ |
| `on-secondary` / `secondary` | 14.58 | 16.78 | ✅ |
| `fg-subtle` / `surface` | 2.88 | 4.32 | ⚠️ chỉ trang trí |
| **trắng / `flame-500`** (nút cam) | **2.87** | 2.87 | ⚠️ ngoại lệ thương hiệu |

Quy tắc:
- Chữ thường (< 24px, hoặc < 18.66px nếu đậm) cần **≥ 4.5:1**; chữ lớn và viền/icon cần **≥ 3:1**.
- **Chữ cam trên nền sáng:** chữ nhỏ dùng `flame-700`; `flame-500` chỉ dùng cho chữ ≥ 24px đậm, icon, nền.
- **Nút cam chữ trắng** (`btn-primary`) là ngoại lệ có chủ đích của thương hiệu (2.87:1): chỉ dùng cho CTA ngắn, chữ ≥ 15px semibold, tối đa 1 nút/màn hình. Hành động quan trọng trong form/app (Lưu, Nộp bài, Thanh toán) dùng `btn-secondary` (navy, 14.58:1).
- Chữ phụ không nhạt hơn `fg-muted` (navy 65% / trắng 60%). Không dùng navy < 60% hay trắng < 50% cho chữ cần đọc.
- Không đặt chữ trên màu phụ sáng (`mint`, `sky`, `sun`) trừ khi chữ là `navy-900`.

---

## 6. Chữ (Typography)

Font duy nhất: **Be Vietnam Pro**. Không dùng font thứ hai (trừ font mono cho code).

| Token | Tailwind | Cỡ | Line-height | Tracking | Weight | Dùng cho |
|---|---|---|---|---|---|---|
| `display` | `text-display` / `heading-xl` | clamp(40px, 7vw, 92px) | 1.02 | −0.035em | 800 | Tiêu đề hero, CTA lớn (1/trang) |
| `headline` | `text-headline` / `heading-lg` | clamp(32px, 4.8vw, 64px) | 1.06 | −0.03em | 800 | Tiêu đề section |
| `title` | `text-title` | 22px | 1.25 | −0.015em | 700 | Tiêu đề thẻ, hộp thoại |
| `body-lg` | `text-body-lg` | 17px | 1.65 | 0 | 400 | Đoạn mở đầu |
| `body` | `text-body` | 15px | 1.6 | 0 | 400 | Chữ thân bài, form |
| `caption` | `text-caption` | 13px | 1.45 | 0 | 500 | Chú thích, meta |
| `eyebrow` | `eyebrow` | 14px | 1.2 | 0.18em | 600, IN HOA, cam | Nhãn nhỏ trên tiêu đề |

- Tiêu đề: tối đa ~16 ký tự mỗi dòng (`max-w-[16ch]`), câu ngắn có dấu chấm ("Học tập bừng sáng.").
- Đoạn văn: tối đa ~65 ký tự mỗi dòng (`max-w-[46ch]`–`max-w-[620px]`).
- Không dùng chữ nghiêng cho tiếng Việt; nhấn mạnh bằng màu cam hoặc đậm.

---

## 7. Bo góc, đổ bóng, khoảng cách

| Bo góc | Tailwind | Giá trị | Dùng cho |
|---|---|---|---|
| `pill` | `rounded-full` | 9999px | Nút, badge, công tắc, ô tìm kiếm |
| `control` | `rounded-control` | 12px | Ô nhập liệu, menu thả xuống, ô nhỏ |
| `chip` | `rounded-chip` | 16px | Icon nền, thẻ nổi nhỏ |
| `window` | `rounded-window` | 18px | Khung ảnh chụp màn hình / mockup |
| `quote` | `rounded-quote` | 24px | Thẻ trích dẫn, thẻ phụ |
| `card` | `rounded-card` | 28px | Thẻ chính, thẻ bảng giá |

| Bóng | Tailwind | Dùng cho |
|---|---|---|
| `cta` / `cta-hover` | `shadow-cta` | Chỉ nút cam |
| `card-hover` | `hover:shadow-card-hover` | Thẻ khi rê chuột |
| `float` | `shadow-float` | Thẻ nổi, toast, popover |
| `window` | `shadow-window` | Khung mockup lớn |

Thẻ ở trạng thái thường **không có bóng**, chỉ có viền `ring-1 ring-line`.

Khoảng cách: container `container-x` (tối đa 1200px, lề 20px mobile / 32px desktop); section `py-28 sm:py-36`; lưới thẻ `gap-5`–`gap-6`; nội dung thẻ `p-7`–`p-8`.

---

## 8. Thành phần (utilities trong `hi-daniel.components.css`)

| Class | Khi nào dùng |
|---|---|
| `btn-primary` | CTA chính (Bắt đầu, Đăng ký, Dùng thử). **Tối đa 1 nút/màn hình.** |
| `btn-secondary` | Hành động mặc định trong app/form (Lưu, Tiếp tục, Nộp bài). |
| `btn-ghost` | Hành động phụ trên nền sáng (Xem demo, Huỷ). |
| `btn-ghost-dark` | Hành động phụ trên nền navy hoặc cam. |
| `card` | Thẻ nội dung trên `canvas`. |
| `field` | Ô nhập liệu; thêm `aria-invalid="true"` để hiện viền lỗi. |
| `badge` + màu ngữ nghĩa | Nhãn trạng thái, danh mục. |
| `eyebrow`, `heading-xl`, `heading-lg`, `text-gradient` | Tiêu đề kiểu landing. |
| `glass` | Chỉ header cố định / overlay. |
| `container-x` | Khung nội dung chính. |

- Icon: bộ **lucide** (nét 2px, góc tròn), cỡ 16–22px; icon trong ô nền dùng `rounded-chip bg-navy-800 text-white`.
- Nút có icon mũi tên: mũi tên dịch phải 4px khi hover.
- Mọi phần tử bấm được phải có trạng thái `hover`, `focus-visible` (viền `focus`), `active` (thu nhỏ 3%), `disabled` (mờ 50%).
- Vùng bấm tối thiểu 40×40px trên mobile.

---

## 9. Chuyển động

- Easing mặc định: `ease-out-expo` = `cubic-bezier(0.16, 1, 0.3, 1)`.
- Thời lượng: `--hd-duration-fast` 200ms (hover nhỏ) · `base` 300ms (nút) · `slow` 600ms (mở/đóng) · `reveal` 1200ms (chữ/khối xuất hiện khi cuộn).
- Kiểu xuất hiện chuẩn: trượt lên 40–50px + hiện dần; tiêu đề tách từng dòng/từ chạy lên từ dưới mặt nạ.
- **Bắt buộc** tôn trọng `prefers-reduced-motion: reduce`: tắt cuộn mượt, hiện nội dung ngay, không chạy vòng lặp.
- Hiệu năng (để không giật): chỉ animate `transform` và `opacity`; không dùng `backdrop-filter` hay `filter: blur()` trên phần tử đang chuyển động; quầng sáng dùng `radial-gradient` thay vì blur; dừng animation lặp vô hạn khi ra khỏi màn hình.
- Trong app (LMS): chuyển động tiết chế hơn website — không ghim màn hình, không cuộn ngang; chỉ dùng hiệu ứng ≤ 300ms cho phản hồi thao tác.

---

## 10. Logo

| File | Dùng trên |
|---|---|
| `assets/logo-mark.svg` | Nền sáng (bong bóng navy) |
| `assets/logo-mark-on-dark.svg` | Nền navy / tối (bong bóng trắng) |
| `assets/logo-full.png` | Logo đầy đủ gốc (bản in, tài liệu) |

- Chữ đi kèm: "Hi Daniel" weight 800, tracking −0.02em, màu `navy-800` (nền sáng) hoặc trắng (nền tối); dấu **"!" luôn màu `flame-500`**.
- Cỡ tối thiểu: biểu tượng 24px. Khoảng trống quanh logo ≥ ½ chiều cao biểu tượng.
- Không xoay, kéo méo, đổi màu bong bóng sang màu khác navy/trắng, không đặt logo lên nền cam (dùng bản trắng nếu bắt buộc).

---

## 11. Không được làm

- ❌ Gõ mã màu trực tiếp (`#ff6a13`, `bg-[#0a1a47]`…) — luôn dùng token.
- ❌ Dùng màu ngoài bảng (đỏ thuần, tím khác, xám Tailwind mặc định như `gray-500`, `slate-*`) cho giao diện thương hiệu.
- ❌ Hơn 1 nút `btn-primary` trên một màn hình; nút cam cho hành động xoá/huỷ.
- ❌ Chữ cam `flame-500` cỡ nhỏ trên nền trắng; chữ xám nhạt hơn `fg-muted`.
- ❌ Font khác ngoài Be Vietnam Pro; chữ nghiêng tiếng Việt.
- ❌ Bóng đổ đen/xám mặc định — chỉ dùng bóng ánh navy/cam trong token.
- ❌ Gradient tự chế, nhiều hơn 1 cụm `text-gradient` trên màn hình.
- ❌ Animation chỉ để trang trí trong luồng thao tác quan trọng (làm bài, thanh toán).

---

## 12. Checklist trước khi hoàn tất (AI phải tự kiểm)

- [ ] Đã nạp `hi-daniel.theme.css` + `hi-daniel.components.css` (hoặc `hi-daniel.tokens.css`) và font Be Vietnam Pro.
- [ ] Không còn mã màu hex/rgb gõ tay ngoài thư mục `design-system/` (tìm `#[0-9a-f]{3,6}` và `bg-[#`).
- [ ] Mỗi màn hình có đúng 0–1 nút cam; hành động chính trong form dùng `btn-secondary`.
- [ ] Chữ phụ dùng `text-fg-muted`; chữ cam nhỏ dùng `text-link`/`flame-700`.
- [ ] Nền tối dùng `hd-dark` + token ngữ nghĩa, không đổi màu thủ công từng phần tử.
- [ ] Có `focus-visible` rõ ràng và hoạt động được bằng bàn phím.
- [ ] Đã kiểm tra ở 375px và 1440px, không tràn ngang.
- [ ] Có xử lý `prefers-reduced-motion`.
- [ ] Nếu sửa token: đã chạy `node design-system/build.mjs` và không có `FAIL`.
