# Implementation Plan: Pet Garden & Interaction Zone

Nâng cấp MindResst từ một ứng dụng theo dõi đơn thuần thành một không gian sống ảo sinh động cho thú cưng, giúp tăng tính tương tác và thẩm mỹ.

## User Review Required

> [!IMPORTANT]
> **Giao diện mới:** Chúng ta sẽ thêm một Tab "Khu Vườn" vào thanh điều hướng dưới cùng. Điều này có thể làm thanh điều hướng hơi chật trên các dòng điện thoại cũ, tôi sẽ tối ưu hóa icon để đảm bảo hiển thị tốt.
> **Dữ liệu:** Tôi sẽ thêm mảng `gardenItems` vào state của người dùng để lưu trữ các vật phẩm đã trang trí.

## Proposed Changes

### 1. UI & Layout

#### [MODIFY] [index.html](file:///c:/Users/tungh/.gemini/antigravity/scratch/digital-detox-pet/index.html)
- Thêm section `#page-garden` vào container các trang.
- Thiết kế cấu trúc Khu vườn: `garden-scene`, `pet-hero-container`, `speech-bubble`.
- Cập nhật thanh điều hướng (Bottom Nav) để thêm nút "Khu Vườn".

#### [MODIFY] [style.css](file:///c:/Users/tungh/.gemini/antigravity/scratch/digital-detox-pet/style.css)
- Tạo phong cách "Nature Glassmorphism" cho khu vườn với gradient xanh dịu mắt.
- Thêm các animation: `pet-float` (thú cưng bay bổng), `leaf-fall` (lá rơi nhẹ nhàng).
- Style cho các vật phẩm trang trí (ghế, cây, đèn...).

### 2. Logic & Data

#### [MODIFY] [app.js](file:///c:/Users/tungh/.gemini/antigravity/scratch/digital-detox-pet/app.js)
- **Data:** Mở rộng `STORE_ITEMS` thêm hạng mục `furniture` (nội thất).
- **State:** Bổ sung `gardenItems` vào `getDefaultState`.
- **Render:** 
    - Viết hàm `renderGarden()` để hiển thị thú cưng lớn hơn và các vật phẩm đã mua.
    - Viết logic `handlePetClick()` để hiển thị lời thoại ngẫu nhiên của thú cưng.
- **Store Logic:** Cập nhật hàm mua hàng để tự động đưa vật phẩm vào khu vườn nếu là đồ nội thất.

## Verification Plan

### Automated Tests
- Kiểm tra việc chuyển đổi tab sang "Khu Vườn".
- Kiểm tra việc mua một vật phẩm nội thất và xác nhận nó xuất hiện trong Garden.

### Manual Verification
- Bấm vào thú cưng trong Garden để xem lời thoại có hiện ra không.
- Kiểm tra giao diện Garden trên chế độ Responsive (điện thoại).
