// ===== STORAGE & DATA =====
const PETS = {
  cat: { emoji: '🐱', name: 'Mèo', evolutions: ['🐱','😺','🐈','🦁'] },
  dog: { emoji: '🐶', name: 'Chó', evolutions: ['🐶','🐕','🦮','🐺'] },
  dragon: { emoji: '🐲', name: 'Rồng', evolutions: ['🥒','🦎','🐉','🐲'] },
  rabbit: { emoji: '🐰', name: 'Thỏ', evolutions: ['🐰','🐇','🐰','🐰'] },
  hamster: { emoji: '🐹', name: 'Hamster', evolutions: ['🐹','🐹','🐹','🐹'] }
};

const DAILY_TASKS = [
  { id: 'd1', name: 'Không dùng TikTok 2 giờ', desc: 'Tự động tính thời gian', xp: 30, coins: 10, type: 'auto_no_use', target: 120 },
  { id: 'd2', name: 'Dưới giới hạn hôm nay', desc: 'Tự động hoàn thành nếu đạt', xp: 20, coins: 5, type: 'auto_under_limit' },
  { id: 'd3', name: 'Cho thú cưng ăn', desc: 'Tự động hoàn thành khi mua đồ ăn', xp: 10, coins: 5, type: 'auto_feed_pet' },
  { id: 'd4', name: 'Hoàn thành 3 phiên nghỉ', desc: 'Tự động tính', xp: 25, coins: 8, type: 'auto_breaks', target: 3 },
  { id: 'd5', name: 'Đọc sách 30 phút', desc: 'Bấm bắt đầu để tính giờ', xp: 35, coins: 15, type: 'timer', duration: 1800 }
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

const ACHIEVEMENTS = [
  { id: 'a1', name: 'Bậc Thầy Detox', desc: 'Đạt Streak 7 ngày', icon: '🏆', condition: s => s.streak >= 7 },
  { id: 'a2', name: 'Người Yêu Thú Cưng', desc: 'Pet đạt Level 10', icon: '💖', condition: s => s.pet.level >= 10 },
  { id: 'a3', name: 'Chuyên Gia Nhiệm Vụ', desc: 'Hoàn thành 50 nhiệm vụ', icon: '🎯', condition: s => s.totalTasksDone >= 50 },
  { id: 'a4', name: 'Kỷ Luật Thép', desc: 'Không dùng TikTok cả ngày (Special Task)', icon: '🛡️', condition: s => s.tasks.specialCompleted.includes('s1') },
  { id: 'a5', name: 'Triệu Phú MindResst', desc: 'Sở hữu 1000 Coins', icon: '💰', condition: s => s.pet.coins >= 1000 }
];

const STORE_ITEMS = {
  food: [
    { id: 'f1', name: 'Táo', emoji: '🍎', desc: '+10 Thể lực, +5 Vui vẻ', cost: 15, stats: { energy: 10, happiness: 5 } },
    { id: 'f2', name: 'Thịt bò', emoji: '🥩', desc: '+30 Thể lực, +10 Vui vẻ', cost: 40, stats: { energy: 30, happiness: 10 } },
    { id: 'f3', name: 'Sushi', emoji: '🍣', desc: '+50 Thể lực, +20 Vui vẻ', cost: 80, stats: { energy: 50, happiness: 20 } }
  ],
  toys: [
    { id: 't1', name: 'Quả bóng', emoji: '⚽', desc: '+15 Vui vẻ', cost: 20, stats: { happiness: 15 } },
    { id: 't2', name: 'Cuộn len', emoji: '🧶', desc: '+30 Vui vẻ', cost: 45, stats: { happiness: 30 } },
    { id: 't3', name: 'Gấu bông', emoji: '🧸', desc: '+50 Vui vẻ', cost: 100, stats: { happiness: 50 } }
  ],
  furniture: [
    { id: 'h1', name: 'Thảm cỏ', emoji: '🍀', desc: 'Trang trí khu vườn', cost: 50, stats: {} },
    { id: 'h2', name: 'Ghế bành', emoji: '🛋️', desc: 'Cho Pet nghỉ ngơi', cost: 120, stats: { happiness: 10 } },
    { id: 'h3', name: 'Cây bonsai', emoji: '🌳', desc: 'Không khí trong lành', cost: 200, stats: { happiness: 20 } },
    { id: 'h4', name: 'Đèn lồng', emoji: '🏮', desc: 'Ấm áp ban đêm', cost: 150, stats: { happiness: 15 } }
  ]
};

function getDefaultState() {
  return {
    user: null,
    pet: null,
    timer: { todayUsage: 0, sessions: [], history: {}, currentSession: null, breakCount: 0, lastNoUseStart: Date.now() },
    tasks: { dailyCompleted: [], weeklyCompleted: [], specialCompleted: [], activeTasks: {} },
    friends: MOCK_USERS.slice(0, 4).map(u => ({ ...u })),
    friendRequests: [MOCK_USERS[4], MOCK_USERS[5]].map(u => ({ ...u })),
    streak: 0,
    totalTasksDone: 0,
    achievements: [],
    journal: [],
    gardenItems: [],
    lastDate: new Date().toDateString()
  };
}

let currentUser = localStorage.getItem('ddp_currentUser');

function loadState() {
  if (!currentUser) return getDefaultState();
  try {
    const s = localStorage.getItem('ddp_state_' + currentUser);
    if (s) {
      const state = JSON.parse(s);
      
      // Migration for new features
      if (!state.achievements) state.achievements = [];
      if (!state.journal) state.journal = [];
      if (!state.gardenItems) state.gardenItems = [];
      if (!state.totalTasksDone) state.totalTasksDone = 0;
      if (!state.streak) state.streak = 0;
      
      // Reset daily if new day
      if (state.lastDate !== new Date().toDateString()) {
        // Save history
        state.timer.history[state.lastDate] = state.timer.todayUsage;
        
        state.timer.todayUsage = 0;
        state.timer.sessions = [];
        state.timer.currentSession = null;
        state.timer.breakCount = 0;
        state.timer.lastNoUseStart = Date.now();
        state.tasks.dailyCompleted = [];
        
        // Check streak
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        const yKey = yesterday.toDateString();
        const yUsage = state.timer.history[yKey] || 0;
        if (yUsage <= (state.user?.tiktokLimit || 60)) { 
          state.streak++; 
        } else { 
          state.streak = 0; 
        }
        
        state.lastDate = new Date().toDateString();
      }
      return state;
    }
  } catch (e) { console.error(e); }
  return getDefaultState();
}

function saveState() {
  if (currentUser) {
    localStorage.setItem('ddp_state_' + currentUser, JSON.stringify(state));
  }
}

let state = loadState();
// ===== UI HELPERS =====
function $(id) { return document.getElementById(id); }
function $$(sel) { return document.querySelectorAll(sel); }
function show(el) { if (typeof el === 'string') el = $(el); if (el) el.classList.remove('hidden'); }
function hide(el) { if (typeof el === 'string') el = $(el); if (el) el.classList.add('hidden'); }

function showToast(msg, type = 'info') {
  const c = $('toast-container');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}

function confetti() {
  const canvas = $('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];
  const colors = ['#6C5CE7','#0984E3','#00B894','#ffd700','#fd79a8','#e74c3c'];
  for (let i = 0; i < 80; i++) {
    particles.push({ x: Math.random() * canvas.width, y: -20, vx: (Math.random() - 0.5) * 8, vy: Math.random() * 4 + 2, color: colors[Math.floor(Math.random() * colors.length)], size: Math.random() * 6 + 3, rotation: Math.random() * 360 });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.rotation += 5;
    });
    frame++;
    if (frame < 120) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

function createParticles() {
  const container = $('particles');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    const colors = ['var(--purple)','var(--blue)','var(--mint)','var(--gold)'];
    p.style.cssText = `width:${size}px;height:${size}px;background:${colors[i%4]};left:${Math.random()*100}%;animation-duration:${Math.random()*4+3}s;animation-delay:${Math.random()*3}s`;
    container.appendChild(p);
  }
}

// ===== PET SYSTEM =====
function getPetEmoji() {
  if (!state.pet) return '🐱';
  const p = PETS[state.pet.type];
  if (!p) return '🐱';
  let evoIndex = 0;
  if (state.pet.level >= 15) evoIndex = 3;
  else if (state.pet.level >= 10) evoIndex = 2;
  else if (state.pet.level >= 5) evoIndex = 1;
  return p.evolutions[evoIndex] || p.emoji;
}

function xpForLevel(lv) { return 50 + lv * 30; }

function addXP(amount) {
  state.pet.xp += amount;
  const needed = xpForLevel(state.pet.level);
  while (state.pet.xp >= needed) {
    state.pet.xp -= needed;
    state.pet.level++;
    showLevelUp();
  }
  saveState();
  updateUI();
}

function addCoins(amount) {
  state.pet.coins += amount;
  saveState();
  updateUI();
}

function changePetStat(stat, amount) {
  state.pet[stat] = Math.max(0, Math.min(100, state.pet[stat] + amount));
  saveState();
  updateUI();
}

function showLevelUp() {
  const emoji = getPetEmoji();
  const petEl = $('levelup-pet');
  petEl.textContent = emoji;
  petEl.classList.remove('evolution-glow');
  
  let text = `${state.pet.name} đã lên Level ${state.pet.level}!`;
  if ([5, 10, 15].includes(state.pet.level)) {
    text = `🎉 Tiến hóa! ${state.pet.name} đã lên Level ${state.pet.level} và có hình dáng mới!`;
    petEl.classList.add('evolution-glow');
  }
  
  $('levelup-text').textContent = text;
  $('levelup-rewards').textContent = `+50 🪙 Coins`;
  state.pet.coins += 50;
  show('levelup-modal');
  confetti();
}

// ===== TIMER ENGINE =====
let timerInterval = null;
let sessionStart = null;
let breakMode = false;
let breakInterval = null;
let sessionSeconds = 0;

function startTimer() {
  if (state.timer.todayUsage >= (state.user?.tiktokLimit || 60)) {
    showToast('⚠️ Bạn đã hết giới hạn TikTok hôm nay!', 'warning');
    return;
  }
  sessionStart = Date.now();
  sessionSeconds = 0;
  state.timer.currentSession = { start: sessionStart };
  
  timerInterval = setInterval(() => {
    sessionSeconds++;
    const sessionMin = sessionSeconds / 60;
    const breakAfter = state.user?.breakInterval || 15;
    
    // Update UI
    updateTimerDisplay();
    
    // Check break enforcement
    if (sessionMin >= breakAfter) {
      stopTimer(true);
      startBreak();
      return;
    }
    
    // Every minute, add to usage
    if (sessionSeconds % 60 === 0) {
      state.timer.todayUsage++;
      // Pet gets sad when using TikTok
      if (state.timer.todayUsage > (state.user?.tiktokLimit || 60) * 0.8) {
        changePetStat('happiness', -2);
      }
      saveState();
      updateTimerDisplay();
    }
  }, 1000);
  
  updateTimerButtons(true);
  showToast('📱 Bắt đầu phiên TikTok', 'info');
}

function stopTimer(forced = false) {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  if (sessionStart) {
    const duration = Math.round((Date.now() - sessionStart) / 60000);
    state.timer.sessions.push({ start: sessionStart, end: Date.now(), duration: Math.max(1, duration) });
    const today = new Date().toDateString();
    state.timer.history[today] = state.timer.todayUsage;
    sessionStart = null;
    sessionSeconds = 0;
    state.timer.currentSession = null;
    
    // Reward for stopping
    if (!forced) {
      addXP(5);
      changePetStat('happiness', 3);
      state.timer.lastNoUseStart = Date.now();
    }
    saveState();
  }
  
  updateTimerButtons(false);
  if (!forced) showToast('✅ Đã dừng phiên TikTok', 'success');
}

function startBreak() {
  breakMode = true;
  show('break-alert');
  let breakSeconds = 300; // 5 min break
  
  $('break-countdown').textContent = '5:00';
  showToast('⏸️ Nghỉ bắt buộc 5 phút!', 'warning');
  state.timer.breakCount++;
  
  breakInterval = setInterval(() => {
    breakSeconds--;
    const m = Math.floor(breakSeconds / 60);
    const s = breakSeconds % 60;
    $('break-countdown').textContent = `${m}:${s.toString().padStart(2, '0')}`;
    
    if (breakSeconds <= 0) {
      clearInterval(breakInterval);
      breakInterval = null;
      breakMode = false;
      hide('break-alert');
      showToast('✅ Nghỉ xong! Bạn có thể tiếp tục.', 'success');
      addXP(10);
      changePetStat('happiness', 5);
      changePetStat('energy', 10);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const usage = state.timer.todayUsage;
  const limit = state.user?.tiktokLimit || 60;
  const pct = Math.min(100, Math.round((usage / limit) * 100));
  
  // Home widget
  if ($('home-usage')) $('home-usage').textContent = `${usage} / ${limit} phút`;
  if ($('timer-percent')) $('timer-percent').textContent = `${pct}%`;
  
  // Ring progress
  const ring = $('timer-ring');
  if (ring) {
    const circumference = 2 * Math.PI * 52;
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = circumference - (pct / 100) * circumference;
    ring.style.stroke = pct > 80 ? 'var(--red)' : pct > 50 ? 'var(--orange)' : 'var(--purple)';
  }
  
  // Timer page
  if ($('timer-current')) $('timer-current').textContent = usage;
  if ($('timer-limit')) $('timer-limit').textContent = limit;
  
  const ringLg = $('timer-ring-lg');
  if (ringLg) {
    const circ = 2 * Math.PI * 88;
    ringLg.style.strokeDasharray = circ;
    ringLg.style.strokeDashoffset = circ - (pct / 100) * circ;
    ringLg.style.stroke = pct > 80 ? 'var(--red)' : pct > 50 ? 'var(--orange)' : 'var(--purple)';
  }
  
  // Session time
  if ($('session-time') && sessionSeconds > 0) {
    const m = Math.floor(sessionSeconds / 60);
    const s = sessionSeconds % 60;
    $('session-time').textContent = `${m}:${s.toString().padStart(2, '0')}`;
  }
  
  // Break after
  if ($('break-after') && timerInterval) {
    const breakAfter = (state.user?.breakInterval || 15) * 60 - sessionSeconds;
    if (breakAfter > 0) {
      const bm = Math.floor(breakAfter / 60);
      const bs = breakAfter % 60;
      $('break-after').textContent = `${bm}:${bs.toString().padStart(2, '0')}`;
    }
  }
  
  // Status
  if ($('timer-status')) {
    if (timerInterval) $('timer-status').textContent = '🔴 Đang sử dụng TikTok...';
    else if (breakMode) $('timer-status').textContent = '⏸️ Đang nghỉ bắt buộc';
    else if (usage >= limit) $('timer-status').textContent = '🚫 Đã hết giới hạn hôm nay';
    else if (usage > 0) $('timer-status').textContent = `✅ Đã dùng ${usage} phút hôm nay`;
    else $('timer-status').textContent = 'Chưa sử dụng hôm nay';
  }
}

function updateTimerButtons(running) {
  const btns = [$('btn-timer-toggle'), $('btn-timer-main')];
  btns.forEach(btn => {
    if (!btn) return;
    if (running) {
      btn.classList.add('active');
      btn.querySelector('span:first-child').textContent = '⏹️';
      btn.querySelector('span:last-child').textContent = 'Dừng TikTok';
    } else {
      btn.classList.remove('active');
      btn.querySelector('span:first-child').textContent = '▶️';
      btn.querySelector('span:last-child').textContent = 'Bắt đầu dùng TikTok';
    }
  });
}

// ===== PASSIVE XP (not using TikTok) =====
setInterval(() => {
  if (!state.user || !state.pet) return;
  if (!timerInterval && !breakMode) {
    const noUseMin = (Date.now() - (state.timer.lastNoUseStart || Date.now())) / 60000;
    if (noUseMin >= 60 && noUseMin % 60 < 1) {
      addXP(10);
      changePetStat('happiness', 5);
      showToast('🎉 +10 XP vì không dùng TikTok 1 giờ!', 'success');
    }
  }
}, 60000);
// ===== UI RENDERING =====
function updateUI() {
  if (!state.user || !state.pet) return;
  
  // Header
  $('header-avatar').textContent = getPetEmoji();
  $('header-username').textContent = state.user.username;
  $('header-level').textContent = `Lv. ${state.pet.level}`;
  $('header-coins').textContent = state.pet.coins;
  
  // Pet display
  $('pet-emoji').textContent = getPetEmoji();
  $('pet-name').textContent = state.pet.name;
  $('pet-level-badge').textContent = `Lv. ${state.pet.level}`;
  
  // Pet stats
  $('bar-hp').style.width = state.pet.health + '%';
  $('val-hp').textContent = state.pet.health;
  $('bar-happy').style.width = state.pet.happiness + '%';
  $('val-happy').textContent = state.pet.happiness;
  $('bar-energy').style.width = state.pet.energy + '%';
  $('val-energy').textContent = state.pet.energy;
  
  // XP
  const needed = xpForLevel(state.pet.level);
  const xpPct = Math.round((state.pet.xp / needed) * 100);
  $('xp-fill').style.width = xpPct + '%';
  $('xp-text').textContent = `${state.pet.xp} / ${needed} XP`;
  
  // Pet mood
  const mood = state.pet.happiness;
  $('pet-mood').textContent = mood > 70 ? '💚' : mood > 40 ? '💛' : '❤️';
  
  // Pet animation based on mood
  const petChar = $('pet-character');
  if (petChar) petChar.style.animationName = mood > 70 ? 'petBounce' : mood > 40 ? 'pulse' : 'shake';
  
  updateTimerDisplay();
}

function evaluateAutoTasks() {
  if (!state.user || !state.pet) return;
  let changed = false;

  const tryComplete = (taskId, type, condition) => {
    if (state.tasks.dailyCompleted.includes(taskId)) return;
    const task = DAILY_TASKS.find(t => t.id === taskId);
    if (!task) return;
    
    if (condition) {
      state.tasks.dailyCompleted.push(taskId);
      state.totalTasksDone++;
      addXP(task.xp);
      addCoins(task.coins);
      showToast(`🌟 Nhiệm vụ tự động hoàn thành: ${task.name}!`, 'success');
      confetti();
      changed = true;
    }
  };

  // no_use: 2 hours
  const noUseElapsed = (Date.now() - state.timer.lastNoUseStart) / 60000;
  tryComplete('d1', 'auto_no_use', noUseElapsed >= 120);
  
  // breaks: 3 times
  tryComplete('d4', 'auto_breaks', state.timer.breakCount >= 3);
  
  // under_limit: We auto complete it if current time is past 22:00 and usage <= limit
  const hour = new Date().getHours();
  tryComplete('d2', 'auto_under_limit', hour >= 22 && state.timer.todayUsage <= state.user.tiktokLimit);

  if (changed) {
    saveState();
    renderTasks();
  }
  checkAchievements();
}

function checkAchievements() {
  if (!state.user || !state.pet) return;
  let changed = false;
  
  ACHIEVEMENTS.forEach(ach => {
    if (state.achievements.includes(ach.id)) return;
    
    if (ach.condition(state)) {
      state.achievements.push(ach.id);
      showToast(`🏆 Thành tựu mới: ${ach.name}!`, 'success');
      confetti();
      changed = true;
    }
  });
  
  if (changed) {
    saveState();
    renderAchievements();
  }
}

function saveJournal(mood, note) {
  if (!state.user || !state.pet) return;
  const entry = {
    date: new Date().toLocaleDateString('vi-VN'),
    mood: mood,
    note: note,
    timestamp: Date.now()
  };
  state.journal.unshift(entry);
  if (state.journal.length > 30) state.journal.pop(); // Keep last 30 entries
  saveState();
  renderJournal();
  showToast('📝 Đã lưu nhật ký!', 'success');
}

function renderJournal() {
  const container = $('journal-list');
  if (!container) return;
  
  if (state.journal.length === 0) {
    container.innerHTML = '<div class="empty-state">Chưa có nhật ký nào</div>';
    return;
  }
  
  container.innerHTML = state.journal.map(j => `
    <div class="journal-item">
      <div class="journal-header">
        <span class="journal-mood">${j.mood}</span>
        <span class="journal-date">${j.date}</span>
      </div>
      <div class="journal-note">${j.note}</div>
    </div>
  `).join('');
}

function renderAchievements() {
  const container = $('home-achievements');
  if (!container) return;
  
  if (state.achievements.length === 0) {
    container.innerHTML = '<div class="empty-state">Chưa có thành tựu nào</div>';
    return;
  }
  
  container.innerHTML = '<div class="achievements-grid">' + state.achievements.map(aid => {
    const ach = ACHIEVEMENTS.find(a => a.id === aid);
    return `<div class="achievement-badge" title="${ach.desc}">
      <span class="ach-icon">${ach.icon}</span>
      <span class="ach-name">${ach.name}</span>
    </div>`;
  }).join('') + '</div>';
}

function renderTasks() {
  renderTaskList('task-list-daily', DAILY_TASKS, state.tasks.dailyCompleted);
  renderTaskList('task-list-weekly', WEEKLY_TASKS, state.tasks.weeklyCompleted);
  renderTaskList('task-list-special', SPECIAL_TASKS, state.tasks.specialCompleted);
  
  // Home quick tasks (first 3 daily)
  const homeList = $('home-tasks');
  if (homeList) {
    homeList.innerHTML = DAILY_TASKS.slice(0, 3).map(t => {
      const done = state.tasks.dailyCompleted.includes(t.id);
      const { icon, cls } = getTaskIconAndClass(t, done);
      return `<div class="task-item ${done ? 'completed' : ''}">
        <div class="task-check ${cls}" data-task="${t.id}" data-cat="daily">${icon}</div>
        <div class="task-body"><div class="task-name">${t.name}</div><div class="task-desc">${t.desc}</div></div>
        <div class="task-reward">+${t.xp} XP</div>
      </div>`;
    }).join('');
  }
}

function getTaskIconAndClass(t, done) {
  if (done) return { icon: '✓', cls: 'done' };
  if (t.type?.startsWith('auto_')) return { icon: '🔒', cls: 'locked' };
  
  if (t.type === 'timer') {
    const active = state.tasks.activeTasks[t.id];
    if (!active) return { icon: '▶️', cls: 'play' };
    const elapsed = Math.floor((Date.now() - active) / 1000);
    const remaining = t.duration - elapsed;
    if (remaining <= 0) return { icon: '🎁', cls: 'claim' };
    
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    return { icon: `${m}:${s.toString().padStart(2,'0')}`, cls: 'timer' };
  }
  
  return { icon: '', cls: '' };
}

function renderTaskList(containerId, tasks, completed) {
  const container = $(containerId);
  if (!container) return;
  const cat = containerId.includes('daily') ? 'daily' : containerId.includes('weekly') ? 'weekly' : 'special';
  container.innerHTML = tasks.map(t => {
    const done = completed.includes(t.id);
    const { icon, cls } = getTaskIconAndClass(t, done);
    return `<div class="task-item ${done ? 'completed' : ''}">
      <div class="task-check ${cls}" data-task="${t.id}" data-cat="${cat}">${icon}</div>
      <div class="task-body"><div class="task-name">${t.name}</div><div class="task-desc">${t.desc}</div></div>
      <div class="task-reward">+${t.xp} XP  🪙${t.coins}</div>
    </div>`;
  }).join('');
}

setInterval(() => {
  // Update UI for timer tasks every second
  if (Object.keys(state.tasks.activeTasks).length > 0) {
    $$('.task-check.timer').forEach(el => {
      const taskId = el.dataset.task;
      const t = [...DAILY_TASKS, ...WEEKLY_TASKS, ...SPECIAL_TASKS].find(x => x.id === taskId);
      if (t) {
        const active = state.tasks.activeTasks[taskId];
        const elapsed = Math.floor((Date.now() - active) / 1000);
        const remaining = t.duration - elapsed;
        if (remaining <= 0) {
          el.className = `task-check claim`;
          el.textContent = '🎁';
        } else {
          const m = Math.floor(remaining / 60);
          const s = remaining % 60;
          el.textContent = `${m}:${s.toString().padStart(2,'0')}`;
        }
      }
    });
  }
}, 1000);

function renderRanking() {
  const allUsers = [...MOCK_USERS, {
    name: state.user?.username || 'Bạn', pet: state.pet?.type || 'cat',
    petName: state.pet?.name || 'Pet', level: state.pet?.level || 1,
    xp: state.pet?.xp || 0, streak: state.streak || 0,
    tasks: state.totalTasksDone || 0, happiness: state.pet?.happiness || 80, isMe: true
  }];
  
  const cat = document.querySelector('.cat-btn.active')?.dataset.cat || 'level';
  const sortKey = cat === 'level' ? 'xp' : cat === 'streak' ? 'streak' : 'tasks';
  allUsers.sort((a, b) => b[sortKey] - a[sortKey]);
  
  const isGlobal = document.querySelector('.rank-tab.active')?.dataset.rtab === 'global';
  const users = isGlobal ? allUsers : allUsers.filter(u => u.isMe || state.friends.some(f => f.name === u.name));
  
  // Podium
  const podium = $('podium');
  const medals = ['🥇', '🥈', '🥉'];
  const classes = ['first', 'second', 'third'];
  podium.innerHTML = users.slice(0, 3).map((u, i) => `
    <div class="podium-item ${classes[i]}">
      <div class="podium-rank">${medals[i]}</div>
      <div class="podium-avatar">${PETS[u.pet]?.emoji || '🐱'}</div>
      <div class="podium-name">${u.isMe ? '⭐ ' + u.name : u.name}</div>
      <div class="podium-value">${cat === 'level' ? 'Lv.' + u.level + ' (' + u.xp + 'XP)' : cat === 'streak' ? u.streak + ' ngày' : u.tasks + ' NV'}</div>
    </div>
  `).join('');
  
  // Rest
  const lb = $('leaderboard');
  lb.innerHTML = users.slice(3).map((u, i) => `
    <div class="lb-item ${u.isMe ? 'me' : ''}">
      <div class="lb-rank">${i + 4}</div>
      <div class="lb-avatar">${PETS[u.pet]?.emoji || '🐱'}</div>
      <div class="lb-info">
        <div class="lb-name">${u.isMe ? '⭐ ' + u.name : u.name}</div>
        <div class="lb-detail">${u.petName} • Lv.${u.level}</div>
      </div>
      <div class="lb-value">${cat === 'level' ? 'Lv.' + u.level + ' (' + u.xp + 'XP)' : cat === 'streak' ? u.streak + ' ngày' : u.tasks + ' NV'}</div>
    </div>
  `).join('');
}

function renderFriends() {
  // Requests
  const reqList = $('request-list');
  if (state.friendRequests.length > 0) {
    show('friend-requests');
    reqList.innerHTML = state.friendRequests.map((r, i) => `
      <div class="request-item">
        <div class="request-avatar">${PETS[r.pet]?.emoji || '🐱'}</div>
        <div class="request-info">
          <div class="request-name">${r.name}</div>
          <div class="request-pet">${r.petName} • Lv.${r.level}</div>
        </div>
        <div class="request-actions">
          <button class="btn-accept" data-idx="${i}">✓</button>
          <button class="btn-reject" data-idx="${i}">✗</button>
        </div>
      </div>
    `).join('');
  } else {
    hide('friend-requests');
  }
  
  // Friends list
  $('friend-count').textContent = state.friends.length;
  const fList = $('friends-list');
  fList.innerHTML = state.friends.map(f => `
    <div class="friend-item">
      <div class="friend-avatar">${PETS[f.pet]?.emoji || '🐱'}</div>
      <div class="friend-info">
        <div class="friend-name">${f.name}</div>
        <div class="friend-status">${f.petName} • Streak: ${f.streak} ngày</div>
      </div>
      <div class="friend-level">Lv.${f.level}</div>
    </div>
  `).join('');
  
  // Feed
  $('feed-list').innerHTML = FEED_MESSAGES.map(f => `
    <div class="feed-item">
      <div class="feed-icon">${f.icon}</div>
      <div class="feed-content">
        <div class="feed-text"><strong>${f.user}</strong> ${f.text}</div>
        <div class="feed-time">${f.time}</div>
      </div>
    </div>
  `).join('');
}

function renderChart() {
  const chart = $('usage-chart');
  if (!chart) return;
  const days = [];
  const labels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toDateString();
    const usage = state.timer.history[key] || (i === 0 ? state.timer.todayUsage : Math.floor(Math.random() * 80));
    days.push({ label: labels[d.getDay()], value: usage });
  }
  const max = Math.max(...days.map(d => d.value), 1);
  chart.innerHTML = days.map(d => {
    const h = Math.max(4, (d.value / max) * 120);
    return `<div class="chart-bar-wrap">
      <div class="chart-value">${d.value}p</div>
      <div class="chart-bar" style="height:${h}px"></div>
      <div class="chart-label">${d.label}</div>
    </div>`;
  }).join('');
}

function renderSessions() {
  const list = $('sessions-list');
  if (!list) return;
  if (state.timer.sessions.length === 0) {
    list.innerHTML = '<div class="empty-state">Chưa có phiên nào hôm nay</div>';
    return;
  }
  list.innerHTML = state.timer.sessions.map(s => {
    const start = new Date(s.start);
    const time = `${start.getHours()}:${start.getMinutes().toString().padStart(2,'0')}`;
    return `<div class="session-item"><span>🕐 ${time}</span><span>${s.duration} phút</span></div>`;
  }).join('');
}

function renderStore() {
  const coinsDisplay = $('store-coins');
  if (coinsDisplay) coinsDisplay.textContent = state.pet?.coins || 0;

  const activeTab = document.querySelector('.store-tab.active')?.dataset.stab || 'food';
  const grid = $('store-grid');
  if (!grid) return;

  const items = STORE_ITEMS[activeTab] || [];
  grid.innerHTML = items.map(item => {
    const canAfford = state.pet.coins >= item.cost;
    return `
      <div class="store-item">
        <div class="item-icon">${item.emoji}</div>
        <div class="item-name">${item.name}</div>
        <div class="item-desc">${item.desc}</div>
        <button class="item-buy" data-id="${item.id}" data-cat="${activeTab}" ${!canAfford ? 'disabled' : ''}>
          🪙 ${item.cost} Xu
        </button>
      </div>
    `;
  }).join('');
}

// ===== MAIN APP =====
document.addEventListener('DOMContentLoaded', () => {
  // === AUTHENTICATION ===
  const usersDB = JSON.parse(localStorage.getItem('ddp_users') || '{}');

  $('link-register')?.addEventListener('click', (e) => {
    e.preventDefault();
    $('form-login').classList.remove('active');
    $('form-register').classList.add('active');
    if ($('auth-subtitle')) $('auth-subtitle').textContent = 'Tạo tài khoản mới để bắt đầu!';
  });

  $('link-login')?.addEventListener('click', (e) => {
    e.preventDefault();
    $('form-register').classList.remove('active');
    $('form-login').classList.add('active');
    if ($('auth-subtitle')) $('auth-subtitle').textContent = 'Chào mừng bạn trở lại!';
  });

  $('form-register')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = $('register-username').value.trim();
    const p = $('register-password').value;
    const cp = $('register-confirm').value;

    if (p !== cp) return showToast('Mật khẩu không khớp!', 'error');
    if (usersDB[u]) return showToast('Tên đăng nhập đã tồn tại!', 'error');

    usersDB[u] = p;
    localStorage.setItem('ddp_users', JSON.stringify(usersDB));
    showToast('Tạo tài khoản thành công! Vui lòng đăng nhập.', 'success');
    $('form-register').reset();
    $('form-register').classList.remove('active');
    $('form-login').classList.add('active');
    if ($('auth-subtitle')) $('auth-subtitle').textContent = 'Chào mừng bạn trở lại!';
    $('login-username').value = u;
  });

  $('form-login')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = $('login-username').value.trim();
    const p = $('login-password').value;

    if (usersDB[u] !== p) return showToast('Sai tên đăng nhập hoặc mật khẩu!', 'error');
    
    // Login success
    localStorage.setItem('ddp_currentUser', u);
    currentUser = u;
    state = loadState();
    
    hide('auth-container');
    showToast('Đăng nhập thành công!', 'success');

    if (!state.user || !state.pet) {
      show('onboarding');
      state.user = { username: u, tiktokLimit: 60, breakInterval: 15 };
    } else {
      show('app');
      initApp();
    }
  });

  $('btn-demo-login')?.addEventListener('click', () => {
    const demoUser = 'DemoUser';
    localStorage.setItem('ddp_currentUser', demoUser);
    currentUser = demoUser;
    
    // Create a rich demo state if not exists
    if (!localStorage.getItem('ddp_state_' + demoUser)) {
      const demoState = getDefaultState();
      demoState.user = { username: 'DemoUser', tiktokLimit: 60, breakInterval: 15 };
      demoState.pet = { name: 'Rồng Demo', type: 'dragon', level: 12, xp: 240, coins: 500, energy: 90, happiness: 85, health: 100 };
      demoState.streak = 5;
      demoState.totalTasksDone = 32;
      demoState.achievements = ['a1', 'a3'];
      demoState.gardenItems = ['h1', 'h2', 'h3']; // Add some furniture
      demoState.journal = [
        { date: new Date().toLocaleDateString('vi-VN'), mood: '🤩', note: 'Hôm nay làm Demo thấy app rất mượt!', timestamp: Date.now() }
      ];
      localStorage.setItem('ddp_state_' + demoUser, JSON.stringify(demoState));
    }
    
    state = loadState();
    hide('auth-container');
    show('app');
    initApp();
    showToast('🚀 Đang chạy Chế độ Demo!', 'info');
  });

  // Check initial state
  if (!currentUser) {
    show('auth-container');
    hide('onboarding');
    hide('app');
  } else {
    hide('auth-container');
    if (!state.user || !state.pet) {
      show('onboarding');
      state.user = { username: currentUser, tiktokLimit: 60, breakInterval: 15 };
    } else {
      show('app');
      initApp();
    }
  }

  // === ONBOARDING ===
  let selectedPet = null;
  let selectedLimit = 60;
  let selectedBreak = 15;

  $('btn-next-1')?.addEventListener('click', () => {
    $$('.onboard-step').forEach(s => s.classList.remove('active'));
    document.querySelector('[data-step="2"]').classList.add('active');
  });

  $$('.pet-card').forEach(card => {
    card.addEventListener('click', () => {
      $$('.pet-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedPet = card.dataset.pet;
      $('btn-next-2').disabled = false;
    });
  });

  $('btn-next-2').addEventListener('click', () => {
    if (!selectedPet) return;
    const petName = $('pet-name-input').value.trim() || PETS[selectedPet].name;
    state.pet = {
      type: selectedPet, name: petName, level: 1, xp: 0,
      happiness: 80, health: 100, energy: 100, coins: 0, items: []
    };
    $$('.onboard-step').forEach(s => s.classList.remove('active'));
    document.querySelector('[data-step="3"]').classList.add('active');
  });

  $$('.limit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.limit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedLimit = parseInt(btn.dataset.limit);
    });
  });

  $$('.break-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.break-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedBreak = parseInt(btn.dataset.break);
    });
  });

  $('btn-start').addEventListener('click', () => {
    state.user.tiktokLimit = selectedLimit;
    state.user.breakInterval = selectedBreak;
    state.lastDate = new Date().toDateString();
    state.timer.lastNoUseStart = Date.now();
    saveState();
    hide('onboarding');
    show('app');
    initApp();
    confetti();
    showToast('🎉 Chào mừng bạn đến với MindResst!', 'success');
  });

  // === NAVIGATION ===
  $$('.nav-item').forEach(nav => {
    nav.addEventListener('click', () => {
      const page = nav.dataset.page;
      $$('.nav-item').forEach(n => n.classList.remove('active'));
      nav.classList.add('active');
      $$('.page').forEach(p => p.classList.remove('active'));
      $(`page-${page}`).classList.add('active');
      
      if (page === 'ranking') renderRanking();
      if (page === 'friends') renderFriends();
      if (page === 'timer') { renderChart(); renderSessions(); }
      if (page === 'tasks') renderTasks();
      if (page === 'store') renderStore();
      if (page === 'garden') renderGarden();
    });
  });

  // === STORE TABS & BUYING ===
  $$('.store-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.store-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderStore();
    });
  });

  document.addEventListener('click', e => {
    if (e.target.classList.contains('item-buy')) {
      const id = e.target.dataset.id;
      const cat = e.target.dataset.cat;
      const item = STORE_ITEMS[cat]?.find(i => i.id === id);
      
      if (item && state.pet.coins >= item.cost) {
        state.pet.coins -= item.cost;
        if (item.stats.energy) changePetStat('energy', item.stats.energy);
        if (item.stats.happiness) changePetStat('happiness', item.stats.happiness);
        
        // Add to garden if furniture
        if (cat === 'furniture' && !state.gardenItems.includes(id)) {
          state.gardenItems.push(id);
        }

        saveState();
        renderStore();
        if ($('page-garden').classList.contains('active')) renderGarden();
        showToast(`🛍️ Đã mua ${item.name}!`, 'success');
        confetti();
        
        // Auto complete feed pet task if bought food
        if (cat === 'food' && !state.tasks.dailyCompleted.includes('d3')) {
          const task = DAILY_TASKS.find(t => t.id === 'd3');
          if (task) {
            state.tasks.dailyCompleted.push('d3');
            state.totalTasksDone++;
            addXP(task.xp);
            addCoins(task.coins);
            showToast(`🌟 Nhiệm vụ tự động hoàn thành: ${task.name}!`, 'success');
          }
        }
      }
    }
  });

  // === PET INTERACTION ===
  $('pet-character')?.addEventListener('click', (e) => {
    // Only interact if not fully happy
    if (state.pet.happiness < 100) {
      changePetStat('happiness', 1);
    }
    
    // Visual effect
    const heart = document.createElement('div');
    heart.className = 'heart-pop';
    heart.textContent = '❤️';
    $('pet-character').appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  });

  // === TIMER BUTTONS ===
  function handleTimerToggle() {
    if (breakMode) { showToast('⏸️ Đang nghỉ bắt buộc, vui lòng chờ!', 'warning'); return; }
    if (timerInterval) stopTimer(); else startTimer();
  }
  $('btn-timer-toggle')?.addEventListener('click', handleTimerToggle);
  $('btn-timer-main')?.addEventListener('click', handleTimerToggle);

  // === TASK COMPLETION ===
  document.addEventListener('click', e => {
    const check = e.target.closest('.task-check');
    if (!check || check.classList.contains('done')) return;
    
    const taskId = check.dataset.task;
    const cat = check.dataset.cat;
    const arr = cat === 'daily' ? state.tasks.dailyCompleted : cat === 'weekly' ? state.tasks.weeklyCompleted : state.tasks.specialCompleted;
    const taskList = cat === 'daily' ? DAILY_TASKS : cat === 'weekly' ? WEEKLY_TASKS : SPECIAL_TASKS;
    const task = taskList.find(t => t.id === taskId);
    if (!task || arr.includes(taskId)) return;

    if (check.classList.contains('locked')) {
      showToast('🔒 Nhiệm vụ này sẽ tự động hoàn thành khi đạt điều kiện!', 'info');
      return;
    }

    if (check.classList.contains('play')) {
      state.tasks.activeTasks[taskId] = Date.now();
      saveState();
      renderTasks();
      showToast('▶️ Đã bắt đầu tính giờ!', 'info');
      return;
    }

    if (check.classList.contains('timer')) {
      showToast('⏳ Vui lòng chờ đến khi hết thời gian!', 'warning');
      return;
    }

    // It's normal or 'claim'
    arr.push(taskId);
    if (state.tasks.activeTasks[taskId]) delete state.tasks.activeTasks[taskId];
    state.totalTasksDone++;
    addXP(task.xp);
    addCoins(task.coins);
    saveState();
    renderTasks();
    showToast(`✅ Hoàn thành: ${task.name}! +${task.xp}XP +${task.coins}🪙`, 'success');
    confetti();
  });

  // === TASK TABS ===
  $$('.task-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.task-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const t = tab.dataset.tab;
      hide('task-list-daily'); hide('task-list-weekly'); hide('task-list-special');
      show(`task-list-${t}`);
    });
  });

  // === RANKING TABS ===
  $$('.rank-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.rank-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderRanking();
    });
  });
  $$('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRanking();
    });
  });

  // === FRIENDS ===
  document.addEventListener('click', e => {
    if (e.target.classList.contains('btn-accept')) {
      const idx = parseInt(e.target.dataset.idx);
      const req = state.friendRequests[idx];
      if (req) {
        state.friends.push(req);
        state.friendRequests.splice(idx, 1);
        saveState();
        renderFriends();
        showToast(`🤝 Đã kết bạn với ${req.name}!`, 'success');
      }
    }
    if (e.target.classList.contains('btn-reject')) {
      const idx = parseInt(e.target.dataset.idx);
      state.friendRequests.splice(idx, 1);
      saveState();
      renderFriends();
    }
  });

  $('btn-add-friend')?.addEventListener('click', () => show('add-friend-modal'));
  $('btn-close-add-friend')?.addEventListener('click', () => hide('add-friend-modal'));
  $('btn-send-request')?.addEventListener('click', () => {
    const name = $('add-friend-input').value.trim();
    if (!name) return;
    
    // Simulate finding a friend from MOCK_USERS
    const found = MOCK_USERS.find(u => u.name.toLowerCase() === name.toLowerCase());
    if (found) {
      showToast(`📨 Đã gửi lời mời kết bạn đến ${found.name}!`, 'success');
      // In a real app, this would send a request. For demo, we just toast.
    } else {
      showToast(`❌ Không tìm thấy người dùng "${name}"`, 'error');
    }
    
    $('add-friend-input').value = '';
    hide('add-friend-modal');
  });

  // === SETTINGS ===
  $('btn-settings')?.addEventListener('click', () => {
    $('setting-limit').value = state.user?.tiktokLimit || 60;
    $('setting-limit-val').textContent = (state.user?.tiktokLimit || 60) + ' phút';
    $('setting-break').value = state.user?.breakInterval || 15;
    $('setting-break-val').textContent = (state.user?.breakInterval || 15) + ' phút';
    $('setting-pet-name').value = state.pet?.name || '';
    show('settings-modal');
  });
  $('btn-close-settings')?.addEventListener('click', () => hide('settings-modal'));
  
  $('setting-limit')?.addEventListener('input', e => {
    $('setting-limit-val').textContent = e.target.value + ' phút';
  });
  $('setting-break')?.addEventListener('input', e => {
    $('setting-break-val').textContent = e.target.value + ' phút';
  });
  
  $('btn-save-settings')?.addEventListener('click', () => {
    state.user.tiktokLimit = parseInt($('setting-limit').value);
    state.user.breakInterval = parseInt($('setting-break').value);
    const newName = $('setting-pet-name').value.trim();
    if (newName) state.pet.name = newName;
    saveState();
    updateUI();
    hide('settings-modal');
    showToast('💾 Đã lưu cài đặt!', 'success');
  });

  $('btn-reset')?.addEventListener('click', () => {
    if (confirm('Bạn có chắc muốn xoá tất cả dữ liệu (không thể khôi phục)?')) {
      if (currentUser) localStorage.removeItem('ddp_state_' + currentUser);
      location.reload();
    }
  });

  $('btn-logout')?.addEventListener('click', () => {
    localStorage.removeItem('ddp_currentUser');
    location.reload();
  });

  // === JOURNAL ===
  let selectedMood = '😊';
  $('btn-add-journal')?.addEventListener('click', () => {
    selectedMood = '😊';
    $$('.mood-btn').forEach(b => b.classList.toggle('active', b.dataset.mood === selectedMood));
    $('journal-input').value = '';
    show('journal-modal');
  });
  
  $('btn-close-journal')?.addEventListener('click', () => hide('journal-modal'));
  
  $$('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedMood = btn.dataset.mood;
      $$('.mood-btn').forEach(b => b.classList.toggle('active', b.dataset.mood === selectedMood));
    });
  });
  
  $('btn-save-journal')?.addEventListener('click', () => {
    const note = $('journal-input').value.trim();
    if (!note) {
      showToast('⚠️ Hãy nhập nội dung nhật ký', 'warning');
      return;
    }
    saveJournal(selectedMood, note);
    hide('journal-modal');
  });

  // === GARDEN INTERACTION ===
  $('pet-hero-trigger')?.addEventListener('click', () => {
    handlePetClick();
  });

  // === MODALS ===
  $('btn-close-levelup')?.addEventListener('click', () => hide('levelup-modal'));
  $$('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) hide(m.id); });
  });
});

function initApp() {
  createParticles();
  updateUI();
  renderTasks();
  updateTimerDisplay();
  renderChart();
  renderSessions();
  renderStore();
  evaluateAutoTasks();
  renderAchievements();
  checkAchievements();
  renderJournal();
  renderGarden();
}

function renderGarden() {
  const container = $('garden-scene');
  if (!container) return;

  // Update stats
  if ($('garden-happiness')) $('garden-happiness').textContent = `${state.pet.happiness}%`;
  if ($('garden-energy')) $('garden-energy').textContent = `${state.pet.energy}%`;
  if ($('garden-health')) $('garden-health').textContent = `${state.pet.health}%`;

  // Update pet icon
  const petIcon = $('garden-pet');
  if (petIcon) {
    const pData = PETS[state.pet.type];
    const evolutionIndex = Math.min(state.pet.level ? Math.floor(state.pet.level / 5) : 0, 3);
    petIcon.textContent = pData.evolutions[evolutionIndex];
  }

  // Render furniture
  // Remove existing furniture first
  $$('.garden-furniture').forEach(f => f.remove());

  // Furniture positions mapping
  const positions = {
    'h1': { bottom: '10%', left: '20%' },
    'h2': { bottom: '15%', right: '20%' },
    'h3': { bottom: '25%', left: '10%' },
    'h4': { top: '20%', right: '15%' }
  };

  state.gardenItems.forEach(id => {
    const item = STORE_ITEMS.furniture.find(i => i.id === id);
    if (!item) return;
    
    const fEl = document.createElement('div');
    fEl.className = 'garden-furniture';
    fEl.textContent = item.emoji;
    const pos = positions[id] || { bottom: '10%', left: '10%' };
    Object.assign(fEl.style, pos);
    container.appendChild(fEl);
  });

  // Add random falling leaves for atmosphere
  if ($$('.leaf').length < 5) {
    for(let i=0; i<3; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.textContent = '🍃';
      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(leaf);
    }
  }
}

let speechTimeout;
function handlePetClick() {
  const bubble = $('pet-speech');
  if (!bubble) return;

  const messages = [
    "Bạn đang làm rất tốt! 🌟",
    "Thú cưng cảm thấy rất hạnh phúc! 💖",
    "Hãy tiếp tục duy trì streak nhé! 🔥",
    "Khu vườn này thật đẹp đúng không? 🌿",
    "Hôm nay bạn đã hoàn thành nhiệm vụ chưa? ✅",
    "Đừng quên nghỉ ngơi đầy đủ nhé! 💤",
    "Mỗi phút detox là một món quà cho tôi! 🐾"
  ];

  const msg = messages[Math.floor(Math.random() * messages.length)];
  bubble.textContent = msg;
  bubble.classList.add('active');

  clearTimeout(speechTimeout);
  speechTimeout = setTimeout(() => {
    bubble.classList.remove('active');
  }, 3000);
}

setInterval(evaluateAutoTasks, 60000);
