// ===== STORAGE & DATA =====
const PETS = {
  cat: { emoji: '🐱', name: 'Mèo', evolutions: ['🐱','😺','🐈','🦁'] },
  dog: { emoji: '🐶', name: 'Chó', evolutions: ['🐶','🐕','🦮','🐺'] },
  dragon: { emoji: '🐲', name: 'Rồng', evolutions: ['🥒','🦎','🐉','🐲'] },
  rabbit: { emoji: '🐰', name: 'Thỏ', evolutions: ['🐰','🐇','🐰','🐰'] },
  hamster: { emoji: '🐹', name: 'Hamster', evolutions: ['🐹','🐹','🐹','🐹'] }
};

const DAILY_TASKS = [
  { id: 'd1', name: 'Không dùng TikTok 2 giờ liên tục', desc: 'Tránh xa TikTok trong 2 giờ', xp: 30, coins: 10, type: 'no_use', target: 120 },
  { id: 'd2', name: 'Dưới giới hạn hôm nay', desc: 'Không vượt giới hạn TikTok', xp: 20, coins: 5, type: 'under_limit' },
  { id: 'd3', name: 'Cho thú cưng ăn', desc: 'Tương tác với thú cưng', xp: 10, coins: 5, type: 'feed_pet' },
  { id: 'd4', name: 'Hoàn thành 3 phiên nghỉ', desc: 'Nghỉ ngơi đúng giờ 3 lần', xp: 25, coins: 8, type: 'breaks', target: 3 },
  { id: 'd5', name: 'Đọc sách 30 phút', desc: 'Thay thế TikTok bằng đọc sách', xp: 35, coins: 15, type: 'manual' }
];

const WEEKLY_TASKS = [
  { id: 'w1', name: 'Streak 7 ngày', desc: 'Dưới giới hạn 7 ngày liên tiếp', xp: 100, coins: 50, type: 'streak', target: 7 },
  { id: 'w2', name: 'Giảm 30% thời gian', desc: 'So với tuần trước', xp: 80, coins: 40, type: 'reduce' },
  { id: 'w3', name: 'Thú cưng hạnh phúc', desc: 'Giữ happiness trên 80% cả tuần', xp: 60, coins: 30, type: 'happy_pet' }
];

const SPECIAL_TASKS = [
  { id: 's1', name: '24h MindResst', desc: 'Không dùng TikTok cả ngày', xp: 150, coins: 80, type: 'no_tiktok_day' },
  { id: 's2', name: 'Weekend Detox', desc: 'Không TikTok cả cuối tuần', xp: 300, coins: 150, type: 'weekend_detox' },
  { id: 's3', name: 'Pet Level 10', desc: 'Nâng thú cưng lên Level 10', xp: 200, coins: 100, type: 'pet_level', target: 10 }
];

const MOCK_USERS = [
  { name: 'Minh', pet: 'dragon', petName: 'Rồng Lửa', level: 15, xp: 340, streak: 12, tasks: 45, happiness: 95 },
  { name: 'Linh', pet: 'cat', petName: 'Miu', level: 12, xp: 180, streak: 8, tasks: 38, happiness: 88 },
  { name: 'Hùng', pet: 'dog', petName: 'Buddy', level: 10, xp: 90, streak: 15, tasks: 52, happiness: 92 },
  { name: 'Trang', pet: 'rabbit', petName: 'Bông', level: 9, xp: 60, streak: 6, tasks: 28, happiness: 78 },
  { name: 'Đức', pet: 'hamster', petName: 'Ham', level: 8, xp: 40, streak: 5, tasks: 22, happiness: 70 },
  { name: 'Hà', pet: 'cat', petName: 'Kitty', level: 7, xp: 55, streak: 4, tasks: 18, happiness: 82 },
  { name: 'Nam', pet: 'dragon', petName: 'Shenron', level: 6, xp: 30, streak: 3, tasks: 15, happiness: 65 },
  { name: 'Thảo', pet: 'dog', petName: 'Lucky', level: 5, xp: 20, streak: 10, tasks: 30, happiness: 85 }
];

const FEED_MESSAGES = [
  { user: 'Minh', icon: '🔥', text: 'vừa đạt streak 12 ngày!', time: '5 phút trước' },
  { user: 'Linh', icon: '⬆️', text: 'thú cưng lên Level 12!', time: '15 phút trước' },
  { user: 'Hùng', icon: '🏆', text: 'hoàn thành Weekend Detox!', time: '1 giờ trước' },
  { user: 'Trang', icon: '✅', text: 'hoàn thành 5 nhiệm vụ hôm nay', time: '2 giờ trước' },
  { user: 'Đức', icon: '🐹', text: 'nhận thú cưng mới!', time: '3 giờ trước' }
];

function getDefaultState() {
  return {
    user: null,
    pet: null,
    timer: { todayUsage: 0, sessions: [], history: {}, currentSession: null, breakCount: 0, lastNoUseStart: Date.now() },
    tasks: { dailyCompleted: [], weeklyCompleted: [], specialCompleted: [] },
    friends: MOCK_USERS.slice(0, 4).map(u => ({ ...u })),
    friendRequests: [MOCK_USERS[4], MOCK_USERS[5]].map(u => ({ ...u })),
    streak: 0,
    totalTasksDone: 0,
    lastDate: new Date().toDateString()
  };
}

function loadState() {
  try {
    const s = localStorage.getItem('ddp_state');
    if (s) {
      const state = JSON.parse(s);
      // Reset daily if new day
      if (state.lastDate !== new Date().toDateString()) {
        state.timer.todayUsage = 0;
        state.timer.sessions = [];
        state.timer.currentSession = null;
        state.timer.breakCount = 0;
        state.timer.lastNoUseStart = Date.now();
        state.tasks.dailyCompleted = [];
        state.lastDate = new Date().toDateString();
        // Check streak
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        const yKey = yesterday.toDateString();
        const yUsage = state.timer.history[yKey] || 0;
        if (yUsage <= (state.user?.tiktokLimit || 60)) { state.streak++; } else { state.streak = 0; }
      }
      return state;
    }
  } catch (e) { console.error(e); }
  return getDefaultState();
}

function saveState() { localStorage.setItem('ddp_state', JSON.stringify(state)); }

let state = loadState();
