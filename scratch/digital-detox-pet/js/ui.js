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
  petChar.style.animationName = mood > 70 ? 'petBounce' : mood > 40 ? 'pulse' : 'shake';
  
  updateTimerDisplay();
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
      return `<div class="task-item ${done ? 'completed' : ''}">
        <div class="task-check ${done ? 'done' : ''}" data-task="${t.id}" data-cat="daily">${done ? '✓' : ''}</div>
        <div class="task-body"><div class="task-name">${t.name}</div><div class="task-desc">${t.desc}</div></div>
        <div class="task-reward">+${t.xp} XP</div>
      </div>`;
    }).join('');
  }
}

function renderTaskList(containerId, tasks, completed) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = tasks.map(t => {
    const done = completed.includes(t.id);
    return `<div class="task-item ${done ? 'completed' : ''}">
      <div class="task-check ${done ? 'done' : ''}" data-task="${t.id}" data-cat="${containerId.includes('daily') ? 'daily' : containerId.includes('weekly') ? 'weekly' : 'special'}">${done ? '✓' : ''}</div>
      <div class="task-body"><div class="task-name">${t.name}</div><div class="task-desc">${t.desc}</div></div>
      <div class="task-reward">+${t.xp} XP  🪙${t.coins}</div>
    </div>`;
  }).join('');
}

function renderRanking() {
  const allUsers = [...MOCK_USERS, {
    name: state.user?.username || 'Bạn', pet: state.pet?.type || 'cat',
    petName: state.pet?.name || 'Pet', level: state.pet?.level || 1,
    xp: state.pet?.xp || 0, streak: state.streak || 0,
    tasks: state.totalTasksDone || 0, happiness: state.pet?.happiness || 80, isMe: true
  }];
  
  const cat = document.querySelector('.cat-btn.active')?.dataset.cat || 'level';
  const sortKey = cat === 'level' ? 'level' : cat === 'streak' ? 'streak' : 'tasks';
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
      <div class="podium-value">${sortKey === 'level' ? 'Lv.' + u.level : sortKey === 'streak' ? u.streak + ' ngày' : u.tasks + ' NV'}</div>
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
      <div class="lb-value">${sortKey === 'level' ? 'Lv.' + u.level : sortKey === 'streak' ? u.streak + 'd' : u.tasks}</div>
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
