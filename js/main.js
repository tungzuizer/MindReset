// ===== MAIN APP =====
document.addEventListener('DOMContentLoaded', () => {
  // Check if onboarded
  if (state.user) {
    hide('onboarding');
    show('app');
    initApp();
  }

  // === ONBOARDING ===
  let selectedPet = null;
  let selectedLimit = 60;
  let selectedBreak = 15;

  $('username-input').addEventListener('input', e => {
    $('btn-next-1').disabled = e.target.value.trim().length < 2;
  });

  $('btn-next-1').addEventListener('click', () => {
    const name = $('username-input').value.trim();
    if (name.length < 2) return;
    state.user = { username: name, tiktokLimit: 60, breakInterval: 15 };
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
    });
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
    
    if (task && !arr.includes(taskId)) {
      arr.push(taskId);
      state.totalTasksDone++;
      addXP(task.xp);
      addCoins(task.coins);
      saveState();
      renderTasks();
      showToast(`✅ Hoàn thành: ${task.name}! +${task.xp}XP +${task.coins}🪙`, 'success');
      confetti();
    }
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
    if (name) {
      showToast(`📨 Đã gửi lời mời kết bạn đến ${name}!`, 'info');
      $('add-friend-input').value = '';
      hide('add-friend-modal');
    }
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
    if (confirm('Bạn có chắc muốn xoá tất cả dữ liệu?')) {
      localStorage.removeItem('ddp_state');
      location.reload();
    }
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
}
