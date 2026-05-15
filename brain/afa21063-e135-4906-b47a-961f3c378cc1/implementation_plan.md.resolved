# Digital Detox Pet - App Giới Hạn Mạng Xã Hội & Nuôi Thú Cưng Ảo

## Tổng Quan

Xây dựng một web app giúp người dùng giảm thời gian sử dụng mạng xã hội thông qua gamification: nuôi thú cưng ảo, hoàn thành nhiệm vụ detox, xếp hạng và kết bạn. Thú cưng sẽ phát triển khi người dùng không dùng mạng xã hội, và suy yếu khi người dùng dùng quá nhiều.

## User Review Required

> [!IMPORTANT]
> **Lưu trữ dữ liệu**: App sẽ dùng **localStorage** để lưu dữ liệu trên máy cục bộ. Các tính năng nhiều người dùng (xếp hạng, kết bạn) sẽ được **mô phỏng** với dữ liệu mẫu. Nếu bạn muốn backend thực (Node.js + database), vui lòng cho tôi biết.

> [!IMPORTANT]
> **Nền tảng**: Tôi sẽ xây dựng dưới dạng **Single Page Web App** (HTML/CSS/JS thuần) chạy trên trình duyệt. Bạn có muốn dùng framework nào khác (React, Vue...) không?

## Open Questions

1. **Loại thú cưng**: Bạn muốn người dùng chọn nuôi loại thú cưng nào? (Mèo, Chó, Rồng, Hamster...?) Hay cho chọn nhiều loại?
2. **Mạng xã hội theo dõi**: App có cần liệt kê cụ thể các mạng xã hội (Facebook, TikTok, Instagram...) hay chỉ cần đếm tổng thời gian?
3. **Cơ chế timer**: Người dùng tự bấm bắt đầu/kết thúc khi dùng mạng xã hội, hay đặt giới hạn thời gian hàng ngày?

## Proposed Changes

### 1. Core Structure & Design System

Tạo project trong `C:\Users\tungh\.gemini\antigravity\scratch\` với cấu trúc:

```
scratch/
├── index.html          # Entry point, SPA router
├── css/
│   ├── index.css       # Design system, variables, utilities
│   ├── components.css  # Component styles
│   └── animations.css  # Keyframes & micro-animations
├── js/
│   ├── app.js          # Main app, routing, state management
│   ├── timer.js        # Social media timer logic
│   ├── pet.js          # Pet system (growth, mood, animation)
│   ├── tasks.js        # Mission/quest system
│   ├── ranking.js      # Leaderboard logic
│   ├── friends.js      # Friend system
│   └── storage.js      # LocalStorage wrapper + mock data
└── assets/
    └── (generated pet images)
```

---

### 2. Tính Năng Chi Tiết

#### 🕐 Timer - Giới Hạn Mạng Xã Hội
- Dashboard hiển thị thời gian sử dụng hôm nay vs giới hạn
- Circular progress bar với animation
- Bấm Start/Stop khi bắt đầu/kết thúc dùng MXH
- Đặt giới hạn thời gian hàng ngày (VD: 1 giờ/ngày)
- Thông báo cảnh báo khi sắp hết giới hạn
- Thống kê tuần/tháng dạng biểu đồ

#### 🐾 Thú Cưng Ảo
- Chọn thú cưng khi đăng ký (Mèo, Chó, Rồng, Thỏ)
- Hệ thống level (1-50) & XP
- Thanh sức khỏe, vui vẻ, năng lượng
- Thú cưng có animation idle, happy, sad, sleeping
- **Cơ chế**: 
  - Mỗi giờ KHÔNG dùng MXH → +10 XP, +5 Happiness
  - Vượt giới hạn MXH → -20 Happiness, pet buồn
  - Hoàn thành nhiệm vụ → +XP bonus, items trang trí

#### ✅ Nhiệm Vụ Detox
- **Nhiệm vụ hàng ngày**: "Không dùng MXH 2 giờ liên tục", "Đọc sách 30 phút"
- **Nhiệm vụ tuần**: "Giảm 30% thời gian MXH so với tuần trước"
- **Thử thách đặc biệt**: "24h Digital Detox", "Weekend không MXH"
- Phần thưởng: XP, coins, items trang trí cho pet
- Progress tracking với animations

#### 🏆 Xếp Hạng (Leaderboard)
- Xếp hạng theo level thú cưng
- Xếp hạng theo streak (số ngày liên tiếp dưới giới hạn)
- Xếp hạng theo nhiệm vụ hoàn thành
- Tab: Toàn cầu / Bạn bè
- Hiển thị top 3 đặc biệt với crown/medal animation

#### 👥 Kết Bạn
- Danh sách bạn bè với avatar thú cưng
- Gửi/nhận lời mời kết bạn
- Xem profile bạn bè (pet, stats, achievements)
- Feed hoạt động bạn bè ("Minh vừa hoàn thành 7-day streak!")

---

### 3. Design & UI/UX

#### Phong cách thiết kế
- **Dark mode** chủ đạo với gradient tím-xanh dương
- **Glassmorphism** cho các card và panel
- **Neumorphism** nhẹ cho buttons
- Màu chủ đạo: Deep Purple (#6C5CE7), Electric Blue (#0984E3), Mint (#00B894)
- Font: **Inter** (headings) + **Nunito** (body - friendly feel)
- Rounded corners, soft shadows

#### Navigation
- Bottom tab bar (mobile-first):
  - 🏠 Home (Timer + Pet)
  - ✅ Tasks (Nhiệm vụ)
  - 🏆 Ranking
  - 👥 Friends
  - ⚙️ Settings

#### Animations
- Pet idle breathing animation
- XP bar fill animation
- Timer countdown with pulse effect
- Confetti khi hoàn thành nhiệm vụ
- Smooth page transitions
- Ranking position change animation

---

## Verification Plan

### Automated Tests
- Mở app trong browser qua Live Server
- Test tất cả navigation tabs
- Test timer start/stop
- Test hoàn thành nhiệm vụ
- Test pet level up
- Kiểm tra responsive trên mobile viewport

### Manual Verification
- Screenshot các trang chính
- Quay video demo flow người dùng
- Kiểm tra animations hoạt động mượt mà
