# LOAN HÀ CAMERA & VI TÍNH - Premium Landing Page

Landing Page bán hàng online cực kỳ hiện đại, chuyên nghiệp và tối ưu di động dành cho cửa hàng **LOAN HÀ CAMERA & VI TÍNH**.
Website được thiết kế theo phong cách công nghệ cao, uy tín, mang lại trải nghiệm người dùng (UX) mượt mà và tối ưu hóa tỷ lệ chuyển đổi khách hàng tại khu vực **Trà Tân**.

---

## 🚀 Tính Năng Nổi Bật của Website

1.  **Thiết kế Premium & WOW**: Giao diện mang đậm phong cách công nghệ với hệ màu Slate Deep Navy (`#0F172A`), Cyan/Teal hiện đại kết hợp điểm nhấn CTA màu Cam rực rỡ kích thích người dùng hành động.
2.  **Hero Banner Độc Quyền**: Sử dụng hình ảnh không gian IT và camera an ninh giám sát thông minh chất lượng cực cao được tạo bằng AI chuyên biệt, tạo ấn tượng chuyên nghiệp ngay từ lần tải trang đầu tiên.
3.  **Responsive Hoàn Hảo**: Tương thích 100% trên các thiết bị Di động (Mobile), Máy tính bảng (Tablet) và Máy tính để bàn (Desktop). Có menu di động mượt mà, sticky header biến đổi khi cuộn trang, và các nút CTA nổi/floating widgets liên hệ nhanh tiện lợi.
4.  **Tối ưu Tốc Độ & SEO**: Xây dựng trên nền tảng HTML5 ngữ nghĩa (Semantic HTML), CSS3 hiện đại và Vanilla JS tối giản. Không lạm dụng các thư viện cồng kềnh, tối ưu tải trang dưới 1.5 giây, tích hợp đầy đủ thẻ Meta SEO, Open Graph cho Facebook/Zalo.
5.  **Tương Tác Linh Hoạt**:
    *   *Products Filter Tab*: Lọc sản phẩm theo danh mục động (Tất cả, Camera, Laptop, Máy in/Khác) mượt mà.
    *   *Feedback Carousel*: Slider đánh giá từ khách hàng tự động chạy và có dot chọn chuyển động mượt.
    *   *Interactive Form*: Form gửi yêu cầu dịch vụ có validation dữ liệu thời gian thực đầy đủ, hiệu ứng nút gửi đang truyền và Custom Toast hiển thị thông báo thành công cực đẹp.
6.  **Google Map**: Bản đồ nhúng định vị trực quan khu vực Tổ 1, Thôn 5, Trà Tân hỗ trợ khách hàng tìm kiếm địa điểm dễ dàng.

---

## 📂 Cấu Trúc Thư Mục Dự Án

```bash
camera/
├── assets/
│   ├── css/
│   │   └── style.css            # Toàn bộ CSS (Design System, Flexbox/Grid, Glassmorphism, Animations)
│   ├── js/
│   │   └── main.js              # Logic JS (Sticky Nav, Mobile Menu, Filter, Carousel, Form, Toast)
│   └── images/
│       └── hero-bg.png          # Ảnh Hero Banner công nghệ cao sắc nét được tạo độc quyền
├── tests/
│   └── e2e.test.js              # Kịch bản kiểm thử tự động toàn diện bằng Playwright
├── index.html                   # Trang cấu trúc layout chính tối ưu SEO & Semantic HTML
├── package.json                 # Quản lý script và các thư viện hỗ trợ (Playwright)
├── playwright.config.js         # Cấu hình Playwright test, tự khởi động server, xuất video và screenshot
└── README.md                    # Tài liệu hướng dẫn sử dụng tiếng Việt này
```

---

## 🛠️ Hướng Dẫn Cài Đặt & Sử Dụng

### 1. Cài đặt môi trường
Đảm bảo bạn đã cài đặt **Node.js** trên máy tính. Tại thư mục gốc của dự án, mở Terminal và chạy lệnh sau để cài đặt các dependency cần thiết (Playwright và các gói phụ trợ):

```bash
npm install
```

Tiếp tục tải về và cài đặt trình duyệt phục vụ cho việc test tự động Playwright (chỉ cần chạy một lần duy nhất):

```bash
npx playwright install chromium
```

### 2. Chạy Môi Trường Phát Triển (Local Dev Server)
Để khởi chạy trang web trên máy tính của bạn ở chế độ server tĩnh giúp lập trình hoặc chỉnh sửa nội dung dễ dàng có tự động reload, hãy chạy:

```bash
npm run dev
```

Sau khi chạy, mở trình duyệt và truy cập: **`http://localhost:3000`** để xem trang web hoạt động trực quan.

### 3. Chạy Kiểm Thử Tự Động (QA Automation)
Chúng tôi đã tích hợp sẵn một kịch bản kiểm thử tự động e2e toàn diện (`tests/e2e.test.js`). Script này sẽ tự động:
- Khởi chạy web server tĩnh.
- Mở trình duyệt giả lập Desktop và Mobile (iPhone 12).
- Tự động cuộn trang kiểm tra animations, đổi tab lọc sản phẩm.
- Điền dữ liệu giả lập vào Form Liên Hệ và bấm Gửi, xác minh Toast xuất hiện và console.log in ra dữ liệu JSON chuẩn.
- **Chụp ảnh màn hình (Screenshots)** toàn trang và lưu tại thư mục `screenshots/`.
- **Ghi hình video quá trình kiểm thử** và lưu tại thư mục `videos/` hoặc thư mục kết quả test.

Để chạy kiểm thử ở chế độ Terminal (Headless - chạy ngầm nhanh chóng):

```bash
npm run test
```

Để chạy kiểm thử ở chế độ giao diện UI trực quan của Playwright (để xem từng bước chạy chi tiết):

```bash
npm run test:ui
```

---

## ✍️ Chỉnh Sửa Nội Dung Sau Này

Website được thiết kế cực kỳ thân thiện cho việc bảo trì:
*   **Chữ & Thông tin**: Bạn có thể mở trực tiếp file `index.html` bằng bất kỳ trình soạn thảo văn bản nào (như Notepad, VS Code) tìm kiếm các văn bản hiển thị (như giá tiền, tên sản phẩm, hotline...) và sửa đổi. Lưu lại là trang web sẽ tự cập nhật.
*   **Giao diện & Màu sắc**: Bạn có thể tùy biến bảng màu chính, độ bo góc, hoặc phông chữ tại phần `:root` ở đầu file `assets/css/style.css`.
*   **Hình ảnh**: Chỉ cần chuẩn bị các ảnh mới dưới định dạng JPG/PNG/WebP, đặt tên trùng với ảnh cũ và ghi đè vào thư mục `assets/images/` hoặc thay thế đường link ảnh trực tiếp tại `index.html`.

---
*Thiết kế và phát triển bởi **Minh Đỗ** dành cho cửa hàng **LOAN HÀ CAMERA & VI TÍNH**.*
