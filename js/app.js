/* ═══════════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — APP.JS (PARMANU v3)
   সম্পূর্ণ নতুন — লাইভ কীবোর্ড + হ্যান্ড + গ্রাফ সব ফিক্সড
   ═══════════════════════════════════════════════════════════════ */

class TypingApp {
  constructor() {
    /* ───── State ───── */
    this.currentLesson = null;
    this.currentIndex = 0;
    this.startTime = null;
    this.timerInterval = null;
    this.correctChars = 0;
    this.wrongChars = 0;
    this.totalTyped = 0;
    this.currentPage = 'dashboard';
    this.searchQuery = '';
    this.lastWrongChar = null;

    /* ───── Storage ───── */
    this.progress = this.loadProgress();
    this.streak = this.loadStreak();
    this.settings = this.loadSettings();

    /* ───── Charts ───── */
    this.chart = null;
    this.detailedChart = null;
    this.chartRetryCount = 0;

    /* ───── Game ───── */
    this.gameActive = false;
    this.gameScore = 0;
    this.gameLives = 3;
    this.gameInterval = null;
    this.gameAnimIntervals = [];
    this.gameFallingWords = [];

    /* ───── Exam ───── */
    this.examInterval = null;
    this.examActive = false;
    this.examText = '';
    this.examStartTime = null;

    this.init();
  }

  /* ═══════════════════════════════════════════════════════
     INIT
     ═══════════════════════════════════════════════════════ */
  init() {
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupTypingInput();
    this.setupGameInput();
    this.setupSearch();
    this.updateStreak();

    /* ═══ পারমাণবিক init sequence — সব ফিক্স ═══ */
    const bootApp = () => {
      try {
        this.renderLessons();
        this.loadDashboard();
        this.renderStats();
        console.log('%c✓ App Initialized', 'color:#10b981;font-weight:bold;');
      } catch (err) {
        console.error('Init error:', err);
      }
    };

    /* DOM settle হওয়ার পর কল */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(bootApp, 200));
    } else {
      setTimeout(bootApp, 200);
    }

    /* Chart + Keyboard force init */
    setTimeout(() => {
      this.renderChart();

      /* ═══ LIVE KEYBOARD — টাইপিং পেজে থাকলে reinit ═══ */
      if (document.getElementById('page-typing').classList.contains('active')) {
        if (typeof initLiveKeyboard === 'function') initLiveKeyboard();
      }

      /* ═══ STANDALONE KEYBOARD ═══ */
      if (document.getElementById('page-keyboard').classList.contains('active')) {
        if (typeof initStandaloneKeyboard === 'function') initStandaloneKeyboard();
      }
    }, 800);

    /* Window resize — keyboard reposition */
    window.addEventListener('resize', () => {
      if (this.currentPage === 'typing' && this.currentLesson) {
        setTimeout(() => this.updateHandIndicator(), 200);
      }
      if (this.currentPage === 'dashboard') {
        setTimeout(() => this.renderChart(), 300);
      }
    });
  }

  /* ═══════════════════════════════════════════════════════
     NAVIGATION
     ═══════════════════════════════════════════════════════ */
  setupNavigation() {
    document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => this.showPage(btn.dataset.tab));
    });
  }

  showPage(name) {
    try {
      /* Hide all, show target */
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const page = document.getElementById('page-' + name);
      if (page) page.classList.add('active');

      /* Nav active */
      document.querySelectorAll('.nav-btn[data-tab]').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === name);
      });

      /* Mobile nav close */
      const nav = document.getElementById('navMenu');
      if (nav && nav.classList.contains('show')) {
        const collapse = bootstrap.Collapse.getInstance(nav);
        if (collapse) collapse.hide();
        else new bootstrap.Collapse(nav).hide();
      }

      this.currentPage = name;

      /* ═══ PAGE-SPECIFIC REFRESH (RAF + setTimeout for DOM) ═══ */
      requestAnimationFrame(() => {
        setTimeout(() => {
          try {
            if (name === 'lessons') this.renderLessons();
            if (name === 'stats') this.renderStats();

            if (name === 'dashboard') {
              this.loadDashboard();
              setTimeout(() => this.renderChart(), 150);
            }

            if (name === 'keyboard') {
              if (typeof initStandaloneKeyboard === 'function') {
                initStandaloneKeyboard();
              }
            }

            if (name === 'typing') {
              /* ═══ LIVE KEYBOARD PARMANU REFRESH ═══ */
              if (typeof initLiveKeyboard === 'function') {
                initLiveKeyboard();
              }
              /* Hand position re-calc after visible */
              setTimeout(() => {
                if (typeof refreshLiveKeyboard === 'function') {
                  refreshLiveKeyboard();
                }
                this.updateHandIndicator();
              }, 250);
            }
          } catch (err) {
            console.error('Page refresh error:', err);
          }
        }, 80);
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('showPage error:', err);
    }
  }

  /* ═══════════════════════════════════════════════════════
     THEME
     ═══════════════════════════════════════════════════════ */
  setupThemeToggle() {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;

    /* Restore saved theme */
    if (this.settings.theme) {
      document.documentElement.setAttribute('data-theme', this.settings.theme);
    }

    btn.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    this.settings.theme = next;
    this.saveSettings();

    /* Refresh charts */
    setTimeout(() => {
      if (this.currentPage === 'dashboard') this.renderChart();
      if (this.currentPage === 'stats') this.renderStats();
    }, 200);

    if (window.animations?.sound) animations.sound.pop();
  }

  /* ═══════════════════════════════════════════════════════
     STORAGE
     ═══════════════════════════════════════════════════════ */
  loadProgress() {
    try { return JSON.parse(localStorage.getItem('bnTypingProgress') || '{}'); }
    catch (e) { return {}; }
  }

  saveProgress() {
    try { localStorage.setItem('bnTypingProgress', JSON.stringify(this.progress)); }
    catch (e) {}
  }

  loadStreak() {
    try { return JSON.parse(localStorage.getItem('bnTypingStreak') || '{"days":0,"last":null}'); }
    catch (e) { return { days: 0, last: null }; }
  }

  loadSettings() {
    try { return JSON.parse(localStorage.getItem('bnTypingSettings') || '{"theme":"dark"}'); }
    catch (e) { return { theme: 'dark' }; }
  }

  saveSettings() {
    try { localStorage.setItem('bnTypingSettings', JSON.stringify(this.settings)); }
    catch (e) {}
  }

  updateStreak() {
    const today = new Date().toDateString();
    if (this.streak.last === today) return;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (this.streak.last === yesterday) this.streak.days++;
    else this.streak.days = 1;

    this.streak.last = today;
    try { localStorage.setItem('bnTypingStreak', JSON.stringify(this.streak)); }
    catch (e) {}

    const el = document.getElementById('statStreak');
    if (el) el.textContent = this.streak.days;

    if (window.animations?.updateStreakFlame) {
      animations.updateStreakFlame(this.streak.days);
    }
  }

  /* ═══════════════════════════════════════════════════════
     SEARCH
     ═══════════════════════════════════════════════════════ */
  setupSearch() {
    const search = document.getElementById('lessonSearch');
    if (!search) return;
    search.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderLessons();
    });
  }

  /* ═══════════════════════════════════════════════════════
     LESSONS RENDERING — গ্রুপ অনুযায়ী
     ═══════════════════════════════════════════════════════ */
  renderLessons() {
    const grid = document.getElementById('lessonsGrid');
    if (!grid) return;

    /* Filter */
    let lessons = LESSONS;
    if (this.searchQuery) {
      lessons = lessons.filter(l =>
        l.title.toLowerCase().includes(this.searchQuery) ||
        l.text.toLowerCase().includes(this.searchQuery)
      );
    }

    /* Count badge */
    const count = document.getElementById('lessonCount');
    if (count) count.textContent = lessons.length;

    if (lessons.length === 0) {
      grid.innerHTML = '<div class="col-12 text-center py-5 opacity-75">কোনো লেসন পাওয়া যায়নি</div>';
      return;
    }

    /* Group by group */
    const grouped = {};
    lessons.forEach(l => {
      const g = l.group || 'other';
      if (!grouped[g]) grouped[g] = [];
      grouped[g].push(l);
    });

    /* Render groups in order */
    const groupOrder = ['bottom-row', 'top-row', 'special', 'shift', 'swaroborno', 'numbers', 'juktakkhor', 'bakyo', 'other'];
    let html = '';

    groupOrder.forEach(gid => {
      if (!grouped[gid]) return;
      const gInfo = LESSON_GROUPS[gid] || { name: gid, icon: '📚', color: '#6366f1', desc: '' };
      const items = grouped[gid];

      html += `
        <div class="col-12 mb-2 mt-3">
          <div class="group-header glass p-3" style="border-left: 5px solid ${gInfo.color};">
            <div class="d-flex align-items-center gap-2 flex-wrap">
              <span style="font-size:1.5rem;">${gInfo.icon}</span>
              <h5 class="mb-0">${gInfo.name}</h5>
              <span class="badge" style="background:${gInfo.color};">${items.length} লেসন</span>
              <small class="opacity-75 ms-auto d-none d-md-inline">${gInfo.desc}</small>
            </div>
          </div>
        </div>
      `;

      items.forEach(l => {
        const done = this.progress[l.id];
        const typeClass = 't-' + (l.group || 'practice');
        html += `
          <div class="col-6 col-md-4 col-lg-3">
            <div class="lesson-card glass ${done ? 'done' : ''}" data-id="${l.id}">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <span class="lesson-num">${l.id}</span>
                <span class="tbadge ${typeClass}">${l.level || 'সহজ'}</span>
              </div>
              <h6 class="mb-1">${l.title}</h6>
              <p class="small mb-0 opacity-75 text-truncate">${l.text}</p>
            </div>
          </div>
        `;
      });
    });

    grid.innerHTML = html;

    /* Attach click handlers */
    grid.querySelectorAll('.lesson-card').forEach(card => {
      card.addEventListener('click', () => {
        this.openLesson(parseInt(card.dataset.id));
      });
    });

    /* Entry animation */
    if (window.animations?.staggerIn) {
      animations.staggerIn(grid, '.lesson-card', 15);
    }
  }

  /* ═══════════════════════════════════════════════════════
     OPEN LESSON — পারমাণবিক
     ═══════════════════════════════════════════════════════ */
  openLesson(id) {
    const lesson = LESSONS.find(l => l.id === id);
    if (!lesson) return;

    /* Reset state */
    this.currentLesson = lesson;
    this.currentIndex = 0;
    this.startTime = null;
    this.correctChars = 0;
    this.wrongChars = 0;
    this.totalTyped = 0;
    this.lastWrongChar = null;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (window.animations?.resetCombo) animations.resetCombo();

    /* Title */
    const titleEl = document.getElementById('lessonTitle');
    if (titleEl) titleEl.textContent = `${id}. ${lesson.title}`;

    /* Input reset */
    const input = document.getElementById('typeInput');
    if (input) {
      input.value = '';
      input.disabled = false;
      input.setAttribute('data-expected', lesson.text);
    }

    /* Stats reset */
    this.updateStatDisplay('timer', '0:00');
    this.updateStatDisplay('wpm', '0');
    this.updateStatDisplay('accuracy', '100');
    this.updateStatDisplay('errors', '0');

    /* Progress bar reset */
    const progressBar = document.getElementById('lessonProgress');
    if (progressBar) progressBar.style.width = '0%';

    /* Render text */
    this.renderTextDisplay();

    /* Switch page */
    this.showPage('typing');

    /* ═══ LIVE KEYBOARD + HAND PARMANU SETUP ═══ */
    setTimeout(() => {
      /* 1. Reinit keyboard (guarantee container visible) */
      if (typeof initLiveKeyboard === 'function') {
        initLiveKeyboard();
      }

      /* 2. Highlight lesson keys */
      setTimeout(() => {
        if (typeof highlightLessonKeysOnKeyboard === 'function') {
          highlightLessonKeysOnKeyboard(lesson.keys || []);
        }

        /* 3. Point hand at first char */
        this.updateHandIndicator();

        /* 4. Focus input */
        input?.focus();
      }, 200);
    }, 350);
  }

  updateStatDisplay(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  /* ═══════════════════════════════════════════════════════
     TEXT DISPLAY
     ═══════════════════════════════════════════════════════ */
  renderTextDisplay() {
    const disp = document.getElementById('textDisplay');
    if (!disp || !this.currentLesson) return;

    const target = this.currentLesson.text;
    const typed = document.getElementById('typeInput')?.value || '';
    const targetChars = Array.from(target);
    const typedChars = Array.from(typed);

    disp.innerHTML = targetChars.map((ch, i) => {
      let cls = 'char';
      if (i < typedChars.length) {
        cls += typedChars[i] === ch ? ' correct' : ' wrong';
      } else if (i === typedChars.length) {
        cls += ' current';
      }
      const display = ch === ' ' ? '&nbsp;' : (ch === '\n' ? '<br>' : ch);
      return `<span class="${cls}" data-idx="${i}">${display}</span>`;
    }).join('');
  }

  /* ═══════════════════════════════════════════════════════
     TYPING INPUT — Unicode सঠিকভাবে
     ═══════════════════════════════════════════════════════ */
  setupTypingInput() {
    const input = document.getElementById('typeInput');
    if (!input) return;

    input.addEventListener('input', (e) => this.handleTyping(e));
    input.addEventListener('paste', (e) => e.preventDefault());
    input.addEventListener('drop', (e) => e.preventDefault());
  }

  handleTyping(e) {
    if (!this.currentLesson) return;

    const target = this.currentLesson.text;
    const val = e.target.value;
    const targetChars = Array.from(target);
    const typedChars = Array.from(val);

    /* Start timer on first char */
    if (!this.startTime && typedChars.length > 0) {
      this.startTime = Date.now();
      this.startTimer();
    }

    /* Count correct/wrong */
    let correct = 0;
    let wrong = 0;
    let firstWrongIdx = -1;

    const disp = document.getElementById('textDisplay');
    if (disp) {
      disp.innerHTML = targetChars.map((ch, i) => {
        let cls = 'char';
        if (i < typedChars.length) {
          if (typedChars[i] === ch) {
            cls += ' correct';
            correct++;
          } else {
            cls += ' wrong';
            wrong++;
            if (firstWrongIdx === -1) firstWrongIdx = i;
          }
        } else if (i === typedChars.length) {
          cls += ' current';
        }
        const display = ch === ' ' ? '&nbsp;' : (ch === '\n' ? '<br>' : ch);
        return `<span class="${cls}" data-idx="${i}">${display}</span>`;
      }).join('');
    }

    /* Sound + effects */
    const prevWrong = this.wrongChars;
    const prevCorrect = this.correctChars;

    if (wrong > prevWrong && typedChars.length > 0) {
      /* Wrong char */
      if (window.animations?.triggerWrongChar) animations.triggerWrongChar(null);
      if (window.animations?.shakeScreen) animations.shakeScreen(3, 180);

      /* Flash wrong key on keyboard */
      if (window.liveKeyboard && firstWrongIdx >= 0) {
        window.liveKeyboard.flashWrong(targetChars[firstWrongIdx]);
      }
    } else if (correct > prevCorrect) {
      /* Correct char */
      if (window.animations?.triggerCorrectChar) animations.triggerCorrectChar(null);
    }

    this.correctChars = correct;
    this.wrongChars = wrong;
    this.totalTyped = typedChars.length;

    /* WPM + Accuracy */
    const wpm = this.calcWPM();
    const acc = typedChars.length ? Math.round((correct / typedChars.length) * 100) : 100;

    this.updateStatDisplay('wpm', wpm);
    this.updateStatDisplay('accuracy', acc);
    this.updateStatDisplay('errors', wrong);

    /* Progress bar */
    const progressBar = document.getElementById('lessonProgress');
    if (progressBar) {
      progressBar.style.width = Math.min(100, (typedChars.length / targetChars.length) * 100) + '%';
    }

    /* Flash pressed key on live keyboard */
    if (typedChars.length > 0 && window.liveKeyboard) {
      const lastChar = typedChars[typedChars.length - 1];
      window.liveKeyboard.flashByChar(lastChar);
    }

    /* Update hand to next char */
    this.updateHandIndicator();

    /* Combo meter */
    if (window.animations?.updateComboMeter) {
      animations.updateComboMeter(window._comboCount || 0);
    }

    /* Complete? */
    if (typedChars.length >= targetChars.length) {
      this.finishLesson(wpm, acc);
    }
  }

  /* ═══════════════════════════════════════════════════════
     HAND INDICATOR UPDATE
     ═══════════════════════════════════════════════════════ */
  updateHandIndicator() {
    if (!this.currentLesson) return;

    const target = this.currentLesson.text;
    const typed = document.getElementById('typeInput')?.value || '';
    const targetChars = Array.from(target);
    const typedLen = Array.from(typed).length;

    if (typedLen >= targetChars.length) {
      if (typeof clearKeyboardTarget === 'function') clearKeyboardTarget();
      return;
    }

    const nextChar = targetChars[typedLen];
    if (!nextChar) return;

    /* ═══ PARMANU: retry if keyboard not ready ═══ */
    let attempts = 0;
    const tryPoint = () => {
      attempts++;
      if (typeof pointHandAtNextChar === 'function' && window.liveKeyboard) {
        pointHandAtNextChar(nextChar);
      } else if (attempts < 5) {
        setTimeout(tryPoint, 150);
      }
    };
    tryPoint();
  }

  /* ═══════════════════════════════════════════════════════
     WPM CALC
     ═══════════════════════════════════════════════════════ */
  calcWPM() {
    if (!this.startTime) return 0;
    const minutes = (Date.now() - this.startTime) / 60000;
    if (minutes < 0.001) return 0;
    return Math.round((this.correctChars / 5) / minutes);
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.startTime) return;
      const sec = Math.floor((Date.now() - this.startTime) / 1000);
      const mm = Math.floor(sec / 60);
      const ss = String(sec % 60).padStart(2, '0');
      this.updateStatDisplay('timer', `${mm}:${ss}`);

      /* Live WPM */
      const wpm = this.calcWPM();
      this.updateStatDisplay('wpm', wpm);
    }, 500);
  }

  /* ═══════════════════════════════════════════════════════
     FINISH LESSON
     ═══════════════════════════════════════════════════════ */
  finishLesson(wpm, accuracy) {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    const input = document.getElementById('typeInput');
    if (input) input.disabled = true;

    /* Save */
    this.progress[this.currentLesson.id] = {
      wpm,
      accuracy,
      date: new Date().toISOString()
    };
    this.saveProgress();

    /* Celebrate */
    if (window.animations?.celebrateLessonComplete) {
      animations.celebrateLessonComplete(wpm, accuracy);
    } else {
      this.showToast(`🎉 সম্পন্ন! ${wpm} WPM, ${accuracy}%`);
    }

    /* Refresh */
    this.loadDashboard();
    this.renderLessons();

    /* Clear keyboard target */
    if (typeof clearKeyboardTarget === 'function') clearKeyboardTarget();
  }

  /* ═══════════════════════════════════════════════════════
     RESTART / NEXT / BACK
     ═══════════════════════════════════════════════════════ */
  restartLesson() {
    if (this.currentLesson) this.openLesson(this.currentLesson.id);
  }

  nextLesson() {
    if (!this.currentLesson) return;
    const next = LESSONS.find(l => l.id === this.currentLesson.id + 1);
    if (next) this.openLesson(next.id);
    else this.showToast('🎊 সব লেসন সম্পন্ন!');
  }

  dailyChallenge() {
    const day = new Date().getDate();
    const idx = Math.min(LESSONS.length - 1, 30 + (day % 30));
    this.openLesson(LESSONS[idx].id);
    this.showToast('🔥 ডেইলি চ্যালেঞ্জ!');
  }

  /* ═══════════════════════════════════════════════════════
     DASHBOARD
     ═══════════════════════════════════════════════════════ */
  loadDashboard() {
    const vals = Object.values(this.progress);
    const avgWpm = vals.length ? Math.round(vals.reduce((a, b) => a + b.wpm, 0) / vals.length) : 0;
    const avgAcc = vals.length ? Math.round(vals.reduce((a, b) => a + b.accuracy, 0) / vals.length) : 0;

    this.updateStatDisplay('statWPM', avgWpm);
    this.updateStatDisplay('statAccuracy', avgAcc + '%');
    this.updateStatDisplay('statCompleted', `${vals.length}/${LESSONS.length}`);
    this.updateStatDisplay('statStreak', this.streak.days);

    this.renderBadges(vals.length, avgWpm);
    this.renderChart();

    if (window.animations?.updateStreakFlame) {
      animations.updateStreakFlame(this.streak.days);
    }
  }

  renderBadges(count, wpm) {
    const area = document.getElementById('badgesArea');
    if (!area) return;

    const badges = [
      { icon: 'bi-1-circle', name: 'প্রথম', earned: count >= 1 },
      { icon: 'bi-5-circle', name: '৫টি', earned: count >= 5 },
      { icon: 'bi-2-circle', name: '১০টি', earned: count >= 10 },
      { icon: 'bi-3-circle', name: '২৫টি', earned: count >= 25 },
      { icon: 'bi-trophy', name: '৫০টি', earned: count >= 50 },
      { icon: 'bi-award', name: '১০০টি', earned: count >= 100 },
      { icon: 'bi-lightning', name: '২০ WPM', earned: wpm >= 20 },
      { icon: 'bi-fire', name: '৪০ WPM', earned: wpm >= 40 },
      { icon: 'bi-star', name: '৬০ WPM', earned: wpm >= 60 }
    ];

    area.innerHTML = badges.map(b => `
      <div class="badge-item" style="opacity:${b.earned ? 1 : 0.3};">
        <i class="bi ${b.icon}"></i>
        <small>${b.name}</small>
      </div>
    `).join('');
  }

  /* ═══════════════════════════════════════════════════════
     CHART — পারমাণবিক (retry + dimensions fix)
     ═══════════════════════════════════════════════════════ */
  renderChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) {
      console.warn('⚠️ progressChart canvas not found');
      return;
    }

    /* Chart.js লোড হয়েছে কিনা */
    if (typeof Chart === 'undefined') {
      if (this.chartRetryCount < 20) {
        this.chartRetryCount++;
        setTimeout(() => this.renderChart(), 300);
      }
      return;
    }

    /* ═══ Canvas dimensions fix ═══ */
    const parent = ctx.parentElement;
    if (parent) {
      /* Force parent height for Chart.js */
      const parentStyle = getComputedStyle(parent);
      if (parentStyle.height === '0px' || parentStyle.height === 'auto') {
        parent.style.minHeight = '280px';
      }
    }

    /* Explicit height */
    ctx.style.width = '100%';
    ctx.style.maxHeight = '320px';
    ctx.style.height = '280px';

    /* Destroy old */
    if (this.chart) {
      try { this.chart.destroy(); } catch (e) {}
      this.chart = null;
    }

    /* Data */
    const ids = Object.keys(this.progress).sort((a, b) => a - b);
    const textColor = getComputedStyle(document.body).color;
    const gridColor = 'rgba(148, 163, 184, 0.15)';

    const data = ids.length > 0
      ? ids.map(id => this.progress[id].wpm)
      : [0];
    const labels = ids.length > 0
      ? ids.map(id => `L${id}`)
      : ['শুরু করুন'];

    try {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'WPM',
            data: data,
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.25)',
            tension: 0.35,
            fill: true,
            pointBackgroundColor: '#6366f1',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: ids.length > 0 ? 5 : 0,
            pointHoverRadius: 8,
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 700, easing: 'easeOutQuart' },
          plugins: {
            legend: {
              labels: {
                color: textColor,
                font: { size: 13, weight: '600' }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(99, 102, 241, 0.95)',
              titleColor: '#fff',
              bodyColor: '#fff',
              padding: 12,
              borderColor: '#8b5cf6',
              borderWidth: 1,
              displayColors: false
            }
          },
          scales: {
            x: {
              ticks: { color: textColor, font: { size: 11 } },
              grid: { color: gridColor }
            },
            y: {
              beginAtZero: true,
              ticks: { color: textColor, font: { size: 11 } },
              grid: { color: gridColor }
            }
          }
        }
      });
      console.log('%c📊 Chart rendered', 'color:#10b981;', `(${ids.length} data)`);
    } catch (err) {
      console.error('Chart error:', err);
    }
  }

  /* ═══════════════════════════════════════════════════════
     STATS PAGE
     ═══════════════════════════════════════════════════════ */
  renderStats() {
    /* Table */
    const table = document.getElementById('historyTable');
    if (table) {
      const rows = Object.entries(this.progress)
        .sort(([a], [b]) => b - a)
        .map(([id, p]) => {
          const l = LESSONS.find(x => x.id == id);
          return `<tr>
            <td>${l ? l.title : id}</td>
            <td><strong>${p.wpm}</strong></td>
            <td>${p.accuracy}%</td>
            <td>${new Date(p.date).toLocaleDateString('bn-BD')}</td>
          </tr>`;
        }).join('');
      table.innerHTML = rows || '<tr><td colspan="4" class="text-center opacity-50 py-4">কোনো তথ্য নেই</td></tr>';
    }

    /* Chart */
    const ctx = document.getElementById('detailedChart');
    if (!ctx || typeof Chart === 'undefined') {
      if (typeof Chart === 'undefined') {
        setTimeout(() => this.renderStats(), 300);
      }
      return;
    }

    /* Dimensions */
    ctx.style.width = '100%';
    ctx.style.maxHeight = '340px';
    ctx.style.height = '300px';

    if (this.detailedChart) {
      try { this.detailedChart.destroy(); } catch (e) {}
      this.detailedChart = null;
    }

    const ids = Object.keys(this.progress);
    const textColor = getComputedStyle(document.body).color;
    const gridColor = 'rgba(148, 163, 184, 0.15)';

    try {
      this.detailedChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ids.length ? ids.map(id => `L${id}`) : ['শুরু করুন'],
          datasets: [
            {
              label: 'WPM',
              data: ids.length ? ids.map(id => this.progress[id].wpm) : [0],
              backgroundColor: 'rgba(99, 102, 241, 0.8)',
              borderColor: '#6366f1',
              borderWidth: 2,
              borderRadius: 6
            },
            {
              label: 'Accuracy %',
              data: ids.length ? ids.map(id => this.progress[id].accuracy) : [0],
              backgroundColor: 'rgba(16, 185, 129, 0.8)',
              borderColor: '#10b981',
              borderWidth: 2,
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 700 },
          plugins: {
            legend: {
              labels: { color: textColor, font: { size: 13, weight: '600' } }
            }
          },
          scales: {
            x: {
              ticks: { color: textColor, font: { size: 11 } },
              grid: { color: gridColor }
            },
            y: {
              beginAtZero: true,
              ticks: { color: textColor, font: { size: 11 } },
              grid: { color: gridColor }
            }
          }
        }
      });
    } catch (err) {
      console.error('Detailed chart error:', err);
    }
  }

  /* ═══════════════════════════════════════════════════════
     EXAM MODE
     ═══════════════════════════════════════════════════════ */
  startExam(seconds) {
    if (this.examInterval) clearInterval(this.examInterval);
    this.examActive = false;

    const lesson1 = LESSONS[106] || LESSONS[0];
    const lesson2 = LESSONS[107] || LESSONS[1];
    const text = lesson1.text + ' ' + lesson2.text;
    this.examText = text;

    const area = document.getElementById('examArea');
    if (!area) return;

    area.innerHTML = `
      <div class="alert alert-info d-flex align-items-center gap-2">
        <i class="bi bi-clock-history"></i>
        <div>${seconds / 60} মিনিটের পরীক্ষা — নিচের লেখাটি টাইপ করুন!</div>
      </div>
      <div class="text-display mb-3" id="examDisplay">${[...text].map(ch => `<span class="char">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('')}</div>
      <textarea id="examInput" class="form-control type-input mb-3" rows="4" placeholder="এখানে টাইপ শুরু করুন..."></textarea>
      <div class="d-flex flex-wrap gap-3 align-items-center">
        <span class="chip c3"><i class="bi bi-clock"></i> <span id="examTimer">${seconds}</span>s</span>
        <span class="chip"><i class="bi bi-lightning-fill"></i> <span id="examWpm">0</span> WPM</span>
        <span class="chip c2"><i class="bi bi-check-circle-fill"></i> <span id="examAcc">100</span>%</span>
      </div>
      <div id="examResult" class="mt-3"></div>
    `;

    const inp = document.getElementById('examInput');
    inp.focus();

    let t = seconds;
    const start = Date.now();
    this.examActive = true;
    this.examStartTime = start;

    const updateStats = () => {
      const val = inp.value;
      const targetChars = Array.from(text);
      const typedChars = Array.from(val);
      let correct = 0;
      for (let i = 0; i < typedChars.length; i++) {
        if (typedChars[i] === targetChars[i]) correct++;
      }
      const min = (Date.now() - start) / 60000;
      const wpm = min > 0 ? Math.round((correct / 5) / min) : 0;
      const acc = typedChars.length > 0 ? Math.round((correct / typedChars.length) * 100) : 100;

      const disp = document.getElementById('examDisplay');
      if (disp) {
        disp.innerHTML = targetChars.map((ch, i) => {
          let cls = 'char';
          if (i < typedChars.length) cls += typedChars[i] === ch ? ' correct' : ' wrong';
          else if (i === typedChars.length) cls += ' current';
          return `<span class="${cls}">${ch === ' ' ? '&nbsp;' : ch}</span>`;
        }).join('');
      }

      const wpmEl = document.getElementById('examWpm');
      if (wpmEl) wpmEl.textContent = wpm;
      const accEl = document.getElementById('examAcc');
      if (accEl) accEl.textContent = acc;

      return { correct, wpm, acc, typedLen: typedChars.length, targetLen: targetChars.length };
    };

    inp.addEventListener('input', () => {
      if (!this.examActive) return;
      const stats = updateStats();
      if (window.animations?.sound) animations.sound.keyPress();
      if (stats.typedLen >= stats.targetLen) {
        this.finishExam(stats.wpm, stats.acc, inp);
      }
    });

    this.examInterval = setInterval(() => {
      if (!this.examActive) return;
      t--;
      const timerEl = document.getElementById('examTimer');
      if (timerEl) timerEl.textContent = t;
      updateStats();

      if (t <= 5 && t > 0 && window.animations?.sound) animations.sound.tick();
      if (t <= 0) {
        const stats = updateStats();
        this.finishExam(stats.wpm, stats.acc, inp);
      }
    }, 1000);
  }

  finishExam(wpm, acc, inp) {
    if (!this.examActive) return;
    this.examActive = false;
    if (this.examInterval) clearInterval(this.examInterval);
    if (inp) inp.disabled = true;

    const result = document.getElementById('examResult');
    if (result) {
      result.innerHTML = `
        <div class="alert alert-success d-flex align-items-center gap-3">
          <i class="bi bi-trophy-fill" style="font-size:2rem;"></i>
          <div>
            <strong style="font-size:1.3rem;">ফলাফল</strong><br>
            <span>⚡ ${wpm} WPM</span> • <span>🎯 ${acc}% নির্ভুলতা</span>
          </div>
        </div>
      `;
    }
    if (window.animations?.celebrateLessonComplete) {
      animations.celebrateLessonComplete(wpm, acc);
    }
  }

  /* ═══════════════════════════════════════════════════════
     GAME MODE
     ═══════════════════════════════════════════════════════ */
  setupGameInput() {
    const inp = document.getElementById('gameInput');
    if (!inp) return;
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.submitGameWord(inp.value.trim());
        inp.value = '';
      }
    });
  }

  startGame() {
    if (this.gameActive) this.stopGame();

    this.gameActive = true;
    this.gameScore = 0;
    this.gameLives = 3;
    this.gameFallingWords = [];

    this.updateStatDisplay('gameScore', '0');
    this.updateStatDisplay('gameLives', '3');

    const area = document.getElementById('gameArea');
    if (!area) return;
    area.innerHTML = '';

    const inp = document.getElementById('gameInput');
    if (inp) {
      inp.disabled = false;
      inp.value = '';
      inp.focus();
    }

    /* Spawn loop */
    this.gameInterval = setInterval(() => {
      if (!this.gameActive) return;
      this.spawnGameWord();
    }, 1600);

    this.spawnGameWord();
    this.showToast('🎮 গেম শুরু! শব্দ টাইপ করে Enter চাপুন');
  }

  spawnGameWord() {
    const area = document.getElementById('gameArea');
    if (!area) return;

    const word = GAME_WORDS[Math.floor(Math.random() * GAME_WORDS.length)];
    const el = document.createElement('div');
    el.className = 'falling-word';
    el.textContent = word;
    el.dataset.word = word;

    const maxX = Math.max(10, area.clientWidth - 120);
    el.style.left = Math.random() * maxX + 'px';
    el.style.top = '-40px';

    area.appendChild(el);

    const start = Date.now();
    const duration = 8000;

    const animInt = setInterval(() => {
      if (!this.gameActive || !el.isConnected) {
        clearInterval(animInt);
        return;
      }
      const pct = (Date.now() - start) / duration;
      if (pct >= 1) {
        clearInterval(animInt);
        el.remove();
        this.gameLives--;
        this.updateStatDisplay('gameLives', this.gameLives);
        if (window.animations?.sound) animations.sound.miss();
        if (this.gameLives <= 0) this.stopGame();
      } else {
        el.style.top = pct * (area.clientHeight + 40) + 'px';
      }
    }, 50);

    this.gameAnimIntervals.push(animInt);
  }

  submitGameWord(word) {
    if (!this.gameActive || !word) return;

    const area = document.getElementById('gameArea');
    if (!area) return;

    const matches = [...area.querySelectorAll('.falling-word')].filter(w => w.textContent === word);

    if (matches.length > 0) {
      const target = matches[0];
      const rect = target.getBoundingClientRect();
      target.classList.add('hit');
      setTimeout(() => target.remove(), 300);

      this.gameScore += 10;
      this.updateStatDisplay('gameScore', this.gameScore);

      if (window.animations) {
        animations.sound.hit();
        animations.particles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, {
          count: 10, speed: 4, size: 4, life: 600,
          colors: ['#10b981', '#f59e0b', '#ec4899']
        });
        animations.floatText('+10', rect.left + rect.width / 2, rect.top, '#10b981', 20);
      }
    } else {
      if (window.animations?.sound) animations.sound.wrong();
    }
  }

  stopGame() {
    this.gameActive = false;
    if (this.gameInterval) clearInterval(this.gameInterval);
    this.gameInterval = null;
    this.gameAnimIntervals.forEach(i => clearInterval(i));
    this.gameAnimIntervals = [];

    const inp = document.getElementById('gameInput');
    if (inp) inp.disabled = true;

    this.showToast(`🎮 গেম শেষ! স্কোর: ${this.gameScore}`);
    if (window.animations?.celebrateLessonComplete) {
      animations.celebrateLessonComplete(this.gameScore, 100);
    }
  }

  /* ═══════════════════════════════════════════════════════
     EXPORT / RESET
     ═══════════════════════════════════════════════════════ */
  exportProgress() {
    const data = {
      progress: this.progress,
      streak: this.streak,
      settings: this.settings,
      exported: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `bangla-typing-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    this.showToast('📥 প্রোগ্রেস ডাউনলোড হয়েছে');
  }

  resetProgress() {
    if (!confirm('সব প্রোগ্রেস মুছে ফেলবেন? এটি ফেরানো যাবে না!')) return;

    localStorage.removeItem('bnTypingProgress');
    localStorage.removeItem('bnTypingStreak');
    this.progress = {};
    this.streak = { days: 0, last: null };

    this.loadDashboard();
    this.renderLessons();
    this.renderStats();

    this.showToast('🗑️ প্রোগ্রেস রিসেট হয়েছে');
  }

  /* ═══════════════════════════════════════════════════════
     TOAST
     ═══════════════════════════════════════════════════════ */
  showToast(msg) {
    const el = document.getElementById('toastMsg');
    if (!el) return;
    el.textContent = msg;
    const toastEl = document.getElementById('toast');
    if (toastEl && typeof bootstrap !== 'undefined') {
      bootstrap.Toast.getOrCreateInstance(toastEl).show();
    }
  }
}


/* ═══════════════════════════════════════════════════════════════
   INIT ON DOM READY
   ═══════════════════════════════════════════════════════════════ */

function bootTypingApp() {
  if (window.app) return; /* prevent double init */

  window.app = new TypingApp();

  console.log('%c🚀 বাংলা টাইপিং একাডেমি — READY', 'color:#10b981;font-size:18px;font-weight:900;text-shadow:0 0 10px #10b981;');
  console.log('%c⚡ বিজয় কীবোর্ড • Unicode • ১১৫ লেসন', 'color:#8b5cf6;font-size:13px;');
  console.log('%c💡 কনসোল টেস্ট: app, animations, liveKeyboard, debugKeyboard', 'color:#f59e0b;font-size:12px;');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootTypingApp);
} else {
  bootTypingApp();
}


/* ═══════════════════════════════════════════════════════════════
   GLOBAL ERROR HANDLER
   ═══════════════════════════════════════════════════════════════ */

window.addEventListener('error', (e) => {
  console.error('⚠️ Global Error:', e.message, 'at', e.filename + ':' + e.lineno);
});


/* ═══════════════════════════════════════════════════════════════
   STARTUP DIAGNOSTICS — কোন কিছু লোড হয়েছে কিনা
   ═══════════════════════════════════════════════════════════════ */

setTimeout(() => {
  const checks = {
    '✓ Bootstrap': typeof bootstrap !== 'undefined',
    '✓ Chart.js': typeof Chart !== 'undefined',
    '✓ LESSONS': typeof LESSONS !== 'undefined' && LESSONS.length > 0,
    '✓ BIJOY_LAYOUT': typeof BIJOY_LAYOUT !== 'undefined',
    '✓ App': typeof app !== 'undefined',
    '✓ Animations': typeof animations !== 'undefined',
    '✓ Live Keyboard': !!window.liveKeyboard,
    '✓ progressChart': !!document.getElementById('progressChart'),
    '✓ liveKbContainer': !!document.getElementById('liveKbContainer')
  };

  console.group('%c🔍 Startup Diagnostics', 'color:#f59e0b;font-weight:bold;font-size:14px;');
  Object.entries(checks).forEach(([k, v]) => {
    console.log(v ? `%c${k} OK` : `%c${k} FAILED`, v ? 'color:#10b981;' : 'color:#ef4444;font-weight:bold;');
  });
  console.groupEnd();
}, 1500);
