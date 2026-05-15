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
  const evoIndex = Math.min(Math.floor(state.pet.level / 10), 3);
  return p.evolutions[evoIndex];
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
  $('levelup-pet').textContent = getPetEmoji();
  $('levelup-text').textContent = `${state.pet.name} đã lên Level ${state.pet.level}!`;
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
