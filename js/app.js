/* ═══════════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — APP.JS
   মূল অ্যাপ্লিকেশন লজিক (পারমাণবিক)
   ═══════════════════════════════════════════════════════════════ */

class TypingApp {
  constructor() {
    /* ═══ State ═══ */
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

    /* ═══ Storage ═══ */
    this.progress = this.loadProgress();
    this.streak = this.loadStreak();
    this.settings = this.loadSettings();

    /* ═══ Charts ═══ */
    this.chart = null;
    this.detailedChart = null;
    this.weeklyChart = null;
    this.chartRetryCount = 0;

    /* ═══ Game ═══ */
    this.gameActive = false;
    this.gameScore = 0;
    this.gameLives = 3;
    this.gameInterval = null;
    this.gameAnimIntervals = [];
    this.gameFallingWords = [];

    /* ═══ Exam ═══ */
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

    /* ═══ Boot sequence ═══ */
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

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(bootApp, 200));
    } else {
      setTimeout(bootApp, 200);
    }

    /* Force chart render */
    setTimeout(() => {
      this.renderChart();
      if (document.getElementById('page-typing').classList.contains('active')) {
        if (typeof initLiveKeyboard === 'function') initLiveKeyboard();
      }
    }, 800);

    /* Window resize */
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
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const page = document.getElementById('page-' + name);
      if (page) page.classList.add('active');

      document.querySelectorAll('.nav-btn[data-tab]').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === name);
      });

      const nav = document.getElementById('navMenu');
      if (nav && nav.classList.contains('show')) {
        const collapse = bootstrap.Collapse.getInstance(nav);
        if (collapse) collapse.hide();
        else new bootstrap.Collapse(nav).hide();
      }

      this.currentPage = name;

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
              if (typeof initLiveKeyboard === 'function') {
                initLiveKeyboard();
              }
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
     LESSONS RENDERING
     ═══════════════════════════════════════════════════════ */
  renderLessons() {
    const grid = document.getElementById('lessonsGrid');
    if (!grid) return;

    let lessons = LESSONS;
    if (this.searchQuery) {
      lessons = lessons.filter(l =>
        l.title.toLowerCase().includes(this.searchQuery) ||
        l.text.toLowerCase().includes(this.searchQuery)
      );
    }

    const count = document.getElementById('lessonCount');
    if (count) count.textContent = lessons.length;

    if (lessons.length === 0) {
      grid.innerHTML = '<div class="col-12 text-center py-5 opacity-75">কোনো লেসন পাওয়া যায়নি</div>';
      return;
    }

    const grouped = {};
    lessons.forEach(l => {
      const g = l.group || 'other';
      if (!grouped[g]) grouped[g] = [];
      grouped[g].push(l);
    });

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

    grid.querySelectorAll('.lesson-card').forEach(card => {
      card.addEventListener('click', () => {
        this.openLesson(parseInt(card.dataset.id));
      });
    });

    if (window.animations?.staggerIn) {
      animations.staggerIn(grid, '.lesson-card', 15);
    }
  }

  /* ═══════════════════════════════════════════════════════
     OPEN LESSON
     ═══════════════════════════════════════════════════════ */
  openLesson(id) {
    const lesson = LESSONS.find(l => l.id === id);
    if (!lesson) return;

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

    const titleEl = document.getElementById('lessonTitle');
    if (titleEl) titleEl.textContent = `${id}. ${lesson.title}`;

    const input = document.getElementById('typeInput');
    if (input) {
      input.value = '';
      input.disabled = false;
      input.setAttribute('data-expected', lesson.text);
    }

    this.updateStatDisplay('timer', '0:00');
    this.updateStatDisplay('wpm', '0');
    this.updateStatDisplay('accuracy', '100');
    this.updateStatDisplay('errors', '0');

    const progressBar = document.getElementById('lessonProgress');
    if (progressBar) progressBar.style.width = '0%';

    this.renderTextDisplay();
    this.showPage('typing');

    setTimeout(() => {
      if (typeof initLiveKeyboard === 'function') {
        initLiveKeyboard();
      }

      setTimeout(() => {
        if (typeof highlightLessonKeysOnKeyboard === 'function') {
          highlightLessonKeysOnKeyboard(lesson.keys || []);
        }
        this.updateHandIndicator();
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
     TYPING INPUT
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

    if (!this.startTime && typedChars.length > 0) {
      this.startTime = Date.now();
      this.startTimer();
    }

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

    const prevWrong = this.wrongChars;
    const prevCorrect = this.correctChars;

    if (wrong > prevWrong && typedChars.length > 0) {
      if (window.animations?.triggerWrongChar) animations.triggerWrongChar(null);
      if (window.animations?.shakeScreen) animations.shakeScreen(3, 180);
      if (window.liveKeyboard && firstWrongIdx >= 0) {
        window.liveKeyboard.flashWrong(targetChars[firstWrongIdx]);
      }
    } else if (correct > prevCorrect) {
      if (window.animations?.triggerCorrectChar) animations.triggerCorrectChar(null);
    }

    this.correctChars = correct;
    this.wrongChars = wrong;
    this.totalTyped = typedChars.length;

    const wpm = this.calcWPM();
    const acc = typedChars.length ? Math.round((correct / typedChars.length) * 100) : 100;

    this.updateStatDisplay('wpm', wpm);
    this.updateStatDisplay('accuracy', acc);
    this.updateStatDisplay('errors', wrong);

    const progressBar = document.getElementById('lessonProgress');
    if (progressBar) {
      progressBar.style.width = Math.min(100, (typedChars.length / targetChars.length) * 100) + '%';
    }

    if (typedChars.length > 0 && window.liveKeyboard) {
      const lastChar = typedChars[typedChars.length - 1];
      window.liveKeyboard.flashByChar(lastChar);
    }

    this.updateHandIndicator();

    if (window.animations?.updateComboMeter) {
      animations.updateComboMeter(window._comboCount || 0);
    }

    if (typedChars.length >= targetChars.length) {
      this.finishLesson(wpm, acc);
    }
  }

  /* ═══════════════════════════════════════════════════════
     HAND INDICATOR
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
     WPM / TIMER
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

    this.progress[this.currentLesson.id] = {
      wpm,
      accuracy,
      date: new Date().toISOString()
    };
    this.saveProgress();

    if (window.animations?.celebrateLessonComplete) {
      animations.celebrateLessonComplete(wpm, accuracy);
    } else {
      this.showToast(`🎉 সম্পন্ন! ${wpm} WPM, ${accuracy}%`);
    }

    this.loadDashboard();
    this.renderLessons();

    if (typeof clearKeyboardTarget === 'function') clearKeyboardTarget();
  }

  /* ═══════════════════════════════════════════════════════
     NAVIGATION SHORTCUTS
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

  nextTip() {
    const tips = [
      'প্রতিদিন ১৫ মিনিট অনুশীলন করুন।',
      'ধীরে শুরু করুন, গতি নিজে থেকেই আসবে।',
      'আঙুলের সঠিক অবস্থান মনে রাখুন।',
      'ভুল হলে থামবেন না, চালিয়ে যান।',
      'প্রতিদিন একই সময়ে অনুশীলন করুন।',
      'যুক্তাক্ষর আলাদাভাবে অনুশীলন করুন।',
      'আগের লেসন ৯৫%+ নির্ভুলতায় শেষ করুন।',
      'মাঝে মাঝে চোখকে বিশ্রাম দিন।',
      'য়, ড়, ঢ় — এগুলোতে মনোযোগ দিন।',
      'সপ্তাহে একবার গতি পরীক্ষা করুন।'
    ];
    const el = document.getElementById('dailyTip');
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = tips[Math.floor(Math.random() * tips.length)];
      el.style.opacity = '1';
    }, 200);
  }

  /* ═══════════════════════════════════════════════════════
     DASHBOARD
     ═══════════════════════════════════════════════════════ */
  loadDashboard() {
    try {
      const vals = Object.values(this.progress);
      const totalLessons = LESSONS.length;
      const completedCount = vals.length;

      const avgWpm = vals.length
        ? Math.round(vals.reduce((a, b) => a + b.wpm, 0) / vals.length)
        : 0;
      const avgAcc = vals.length
        ? Math.round(vals.reduce((a, b) => a + b.accuracy, 0) / vals.length)
        : 0;

      this.animateStatValue('statWPM', avgWpm);
      const accEl = document.getElementById('statAccuracy');
      if (accEl) accEl.textContent = avgAcc + '%';
      const compEl = document.getElementById('statCompleted');
      if (compEl) compEl.textContent = `${completedCount}/${totalLessons}`;
      const streakEl = document.getElementById('statStreak');
      if (streakEl) streakEl.textContent = this.streak.days;

      this.renderTrends(vals);

      const bar = document.getElementById('completedProgress');
      if (bar) {
        const pct = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
        bar.style.width = pct + '%';
      }

      this.renderBadges(completedCount, avgWpm);
      this.renderTopLessons(vals);
      this.renderRecentLessons(vals);
      this.renderChart();
      setTimeout(() => this.renderWeeklyChart(), 100);
      this.renderDailyTip();

      if (window.animations?.updateStreakFlame) {
        animations.updateStreakFlame(this.streak.days);
      }
    } catch (err) {
      console.error('Dashboard error:', err);
    }
  }

  animateStatValue(id, to) {
    const el = document.getElementById(id);
    if (!el) return;
    const from = parseInt(el.dataset.value || el.textContent) || 0;
    el.dataset.value = to;
    if (window.animations?.animateNumber) {
      animations.animateNumber(el, from, to, 800);
    } else {
      el.textContent = to;
    }
  }

  renderTrends(vals) {
    const wpmTrend = document.getElementById('wpmTrend');
    if (wpmTrend) {
      if (vals.length >= 2) {
        const sorted = [...vals].sort((a, b) => new Date(a.date) - new Date(b.date));
        const last = sorted[sorted.length - 1].wpm;
        const prev = sorted[sorted.length - 2].wpm;
        const diff = last - prev;
        if (diff > 0) {
          wpmTrend.textContent = `▲ ${diff} উন্নতি`;
          wpmTrend.className = 'stat-trend up';
        } else if (diff < 0) {
          wpmTrend.textContent = `▼ ${Math.abs(diff)} কম`;
          wpmTrend.className = 'stat-trend down';
        } else {
          wpmTrend.textContent = '— অপরিবর্তিত';
          wpmTrend.className = 'stat-trend';
        }
      } else {
        wpmTrend.textContent = 'শুরু করুন';
        wpmTrend.className = 'stat-trend';
      }
    }

    const accTrend = document.getElementById('accTrend');
    if (accTrend) {
      if (vals.length >= 2) {
        const sorted = [...vals].sort((a, b) => new Date(a.date) - new Date(b.date));
        const last = sorted[sorted.length - 1].accuracy;
        const prev = sorted[sorted.length - 2].accuracy;
        const diff = last - prev;
        if (diff > 0) {
          accTrend.textContent = `▲ ${diff}% উন্নতি`;
          accTrend.className = 'stat-trend up';
        } else if (diff < 0) {
          accTrend.textContent = `▼ ${Math.abs(diff)}% কম`;
          accTrend.className = 'stat-trend down';
        } else {
          accTrend.textContent = '— অপরিবর্তিত';
          accTrend.className = 'stat-trend';
        }
      } else {
        accTrend.textContent = 'শুরু করুন';
        accTrend.className = 'stat-trend';
      }
    }

    const streakTrend = document.getElementById('streakTrend');
    if (streakTrend) {
      if (this.streak.days >= 7) {
        streakTrend.textContent = '🔥 এক সপ্তাহ!';
        streakTrend.className = 'stat-trend up';
      } else if (this.streak.days >= 3) {
        streakTrend.textContent = '🔥 ভালো চলছে';
        streakTrend.className = 'stat-trend up';
      } else if (this.streak.days >= 1) {
        streakTrend.textContent = '💪 শুরু হয়েছে';
        streakTrend.className = 'stat-trend';
      } else {
        streakTrend.textContent = 'শুরু করুন';
        streakTrend.className = 'stat-trend';
      }
    }
  }

  renderBadges(count, wpm) {
    const area = document.getElementById('badgesArea');
    if (!area) return;

    const badges = [
      { icon: 'bi-1-circle', name: 'প্রথম', earned: count >= 1, tip: '১টি লেসন' },
      { icon: 'bi-5-circle', name: '৫টি', earned: count >= 5, tip: '৫টি লেসন' },
      { icon: 'bi-2-circle', name: '১০টি', earned: count >= 10, tip: '১০টি লেসন' },
      { icon: 'bi-3-circle', name: '২৫টি', earned: count >= 25, tip: '২৫টি লেসন' },
      { icon: 'bi-4-circle', name: '৫০টি', earned: count >= 50, tip: '৫০টি লেসন' },
      { icon: 'bi-trophy', name: '১০০টি', earned: count >= 100, tip: '১০০টি লেসন' },
      { icon: 'bi-award', name: 'সব', earned: count >= LESSONS.length, tip: 'সব লেসন' },
      { icon: 'bi-lightning', name: '২০ WPM', earned: wpm >= 20, tip: '২০ WPM' },
      { icon: 'bi-fire', name: '৪০ WPM', earned: wpm >= 40, tip: '৪০ WPM' },
      { icon: 'bi-star', name: '৬০ WPM', earned: wpm >= 60, tip: '৬০ WPM' },
      { icon: 'bi-rocket', name: '৮০ WPM', earned: wpm >= 80, tip: '৮০ WPM' },
      { icon: 'bi-crown', name: '১০০ WPM', earned: wpm >= 100, tip: '১০০ WPM' }
    ];

    const unlocked = badges.filter(b => b.earned).length;
    const badgeCountEl = document.getElementById('badgeCount');
    if (badgeCountEl) badgeCountEl.textContent = `${unlocked}/${badges.length}`;

    area.innerHTML = badges.map(b => `
      <div class="badge-item ${b.earned ? 'unlocked' : 'locked'}" title="${b.tip}">
        <i class="bi ${b.icon}"></i>
        <small>${b.name}</small>
      </div>
    `).join('');
  }

  renderTopLessons(vals) {
    const container = document.getElementById('topLessons');
    if (!container) return;

    if (!vals.length) {
      container.innerHTML = '<div class="text-center opacity-50 py-4">এখনো কোনো লেসন সম্পন্ন হয়নি</div>';
      return;
    }

    const sorted = Object.entries(this.progress)
      .sort(([, a], [, b]) => b.wpm - a.wpm)
      .slice(0, 5);

    container.innerHTML = sorted.map(([id, p], idx) => {
      const l = LESSONS.find(x => x.id == id);
      return `
        <div class="top-lesson-row">
          <div class="top-lesson-rank">${idx + 1}</div>
          <div class="top-lesson-info">
            <div class="top-lesson-title">${l ? l.title : 'লেসন ' + id}</div>
            <div class="top-lesson-stat">${p.accuracy}% নির্ভুলতা</div>
          </div>
          <div class="top-lesson-score">${p.wpm} <small>WPM</small></div>
        </div>
      `;
    }).join('');
  }

  renderRecentLessons(vals) {
    const container = document.getElementById('recentLessons');
    if (!container) return;

    if (!vals.length) {
      container.innerHTML = '<div class="text-center opacity-50 py-4">এখনো কোনো লেসন সম্পন্ন হয়নি</div>';
      return;
    }

    const recent = Object.entries(this.progress)
      .sort(([, a], [, b]) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    container.innerHTML = recent.map(([id, p]) => {
      const l = LESSONS.find(x => x.id == id);
      return `
        <div class="recent-lesson-row" onclick="app.openLesson(${id})">
          <div class="recent-lesson-icon">✓</div>
          <div class="recent-lesson-info">
            <div class="recent-lesson-title">${l ? l.title : 'লেসন ' + id}</div>
            <div class="recent-lesson-meta">${p.wpm} WPM • ${p.accuracy}% • ${new Date(p.date).toLocaleDateString('bn-BD')}</div>
          </div>
          <i class="bi bi-chevron-right opacity-50"></i>
        </div>
      `;
    }).join('');
  }

  renderDailyTip() {
    const tips = [
      'প্রতিদিন ১৫ মিনিট অনুশীলন করুন — ধারাবাহিকতাই সবচেয়ে গুরুত্বপূর্ণ।',
      'ধীরে শুরু করুন, গতি নিজে থেকেই আসবে। নির্ভুলতাকে অগ্রাধিকার দিন।',
      'আঙুলের সঠিক অবস্থান মনে রাখুন — হোম সারিতে থাকুন।',
      'ভুল হলে থামবেন না, চালিয়ে যান। শেষে ভুলের ধরন বিশ্লেষণ করুন।',
      'প্রতিদিন একই সময়ে অনুশীলন করুন — অভ্যাস তৈরি হবে।',
      'বাংলা যুক্তাক্ষরগুলো আলাদাভাবে অনুশীলন করুন।',
      'নতুন লেসনে যাওয়ার আগে আগেরটি ৯৫%+ নির্ভুলতায় সম্পন্ন করুন।',
      'স্ক্রিন থেকে দূরে তাকিয়ে মাঝে মাঝে চোখকে বিশ্রাম দিন।',
      'য়, ড়, ঢ় — এই তিন শূন্য-বর্ণে বিশেষ মনোযোগ দিন।',
      'সপ্তাহে একবার নিজের গতি পরীক্ষা করুন — উন্নতি দেখুন।'
    ];
    const el = document.getElementById('dailyTip');
    if (el) {
      const idx = new Date().getDate() % tips.length;
      el.textContent = tips[idx];
    }
  }

  /* ═══════════════════════════════════════════════════════
     CHARTS
     ═══════════════════════════════════════════════════════ */
  renderChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;

    if (typeof Chart === 'undefined') {
      if (this.chartRetryCount < 20) {
        this.chartRetryCount++;
        setTimeout(() => this.renderChart(), 300);
      }
      return;
    }

    if (this.chart) {
      try { this.chart.destroy(); } catch (e) {}
      this.chart = null;
    }

    const ids = Object.keys(this.progress).sort((a, b) => a - b);
    const textColor = getComputedStyle(document.body).color;
    const gridColor = 'rgba(148, 163, 184, 0.15)';

    const data = ids.length > 0 ? ids.map(id => this.progress[id].wpm) : [0];
    const labels = ids.length > 0 ? ids.map(id => `L${id}`) : ['শুরু করুন'];

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
              labels: { color: textColor, font: { size: 13, weight: '600' } }
            },
            tooltip: {
              backgroundColor: 'rgba(99, 102, 241, 0.95)',
              titleColor: '#fff',
              bodyColor: '#fff',
              padding: 12,
              displayColors: false
            }
          },
          scales: {
            x: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } },
            y: { beginAtZero: true, ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } }
          }
        }
      });
    } catch (err) {
      console.error('Chart error:', err);
    }
  }

  renderWeeklyChart() {
    const ctx = document.getElementById('weeklyChart');
    if (!ctx || typeof Chart === 'undefined') return;

    if (this.weeklyChart) {
      try { this.weeklyChart.destroy(); } catch (e) {}
      this.weeklyChart = null;
    }

    const days = ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র'];
    const counts = [0, 0, 0, 0, 0, 0, 0];
    const now = Date.now();

    Object.values(this.progress).forEach(p => {
      const daysAgo = Math.floor((now - new Date(p.date).getTime()) / 86400000);
      if (daysAgo >= 0 && daysAgo < 7) {
        const idx = 6 - daysAgo;
        if (idx >= 0 && idx < 7) counts[idx]++;
      }
    });

    const textColor = getComputedStyle(document.body).color;
    const gridColor = 'rgba(148, 163, 184, 0.15)';

    try {
      this.weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: days,
          datasets: [{
            label: 'লেসন',
            data: counts,
            backgroundColor: 'rgba(6, 182, 212, 0.7)',
            borderColor: '#06b6d4',
            borderWidth: 2,
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 800 },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(6, 182, 212, 0.95)',
              displayColors: false
            }
          },
          scales: {
            x: { ticks: { color: textColor, font: { size: 11 } }, grid: { display: false } },
            y: {
              beginAtZero: true,
              ticks: { color: textColor, stepSize: 1, font: { size: 11 } },
              grid: { color: gridColor }
            }
          }
        }
      });
    } catch (err) {
      console.error('Weekly chart error:', err);
    }
  }

  renderStats() {
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

    const ctx = document.getElementById('detailedChart');
    if (!ctx || typeof Chart === 'undefined') {
      if (typeof Chart === 'undefined') {
        setTimeout(() => this.renderStats(), 300);
      }
      return;
    }

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
            x: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } },
            y: { beginAtZero: true, ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } }
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

    const lesson1 = LESSONS[105] || LESSONS[0];
    const lesson2 = LESSONS[106] || LESSONS[1];
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
   INIT
   ═══════════════════════════════════════════════════════════════ */

function bootTypingApp() {
  if (window.app) return;
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
   STARTUP DIAGNOSTICS
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
    '✓ Standalone Keyboard': !!window.standaloneKeyboard,
    '✓ progressChart': !!document.getElementById('progressChart'),
    '✓ weeklyChart': !!document.getElementById('weeklyChart'),
    '✓ detailedChart': !!document.getElementById('detailedChart'),
    '✓ liveKbContainer': !!document.getElementById('liveKbContainer'),
    '✓ badgesArea': !!document.getElementById('badgesArea'),
    '✓ topLessons': !!document.getElementById('topLessons'),
    '✓ recentLessons': !!document.getElementById('recentLessons')
  };

  console.group('%c🔍 Startup Diagnostics', 'color:#f59e0b;font-weight:bold;font-size:14px;');
  Object.entries(checks).forEach(([k, v]) => {
    console.log(v ? `%c${k} OK` : `%c${k} FAILED`, v ? 'color:#10b981;' : 'color:#ef4444;font-weight:bold;');
  });
  console.groupEnd();
}, 1500);
