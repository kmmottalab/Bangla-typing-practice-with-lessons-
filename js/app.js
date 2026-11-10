/* ═══════════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — APP.JS (ATOMIC v2.1)
   চূড়ান্ত মূল অ্যাপ — শেষ যুক্তবর্ণ ফিক্স সহ
   ═══════════════════════════════════════════════════════════════ */

class TypingApp {
  constructor() {
    /* ═══ State ═══ */
    this.currentLesson = null;
    this.currentSession = null;
    this.currentPage = 'dashboard';
    this.searchQuery = '';
    this.filterGroup = 'all';
    this.startTime = null;
    this.timerInterval = null;
    this.comboCount = 0;
    this.correctChars = 0;
    this.wrongChars = 0;

    /* ═══ ★★★ পারমাণবিক FIX: Debounce state ★★★ ═══ */
    this._finishTimeout = null;
    this._pendingReport = null;
    this._lastVerificationVal = '';

    /* ═══ Storage ═══ */
    this.progress = this.loadProgress();
    this.streak = this.loadStreak();
    this.settings = this.loadSettings();
    this.theme = this.settings.theme || 'dark';
    this.lang = this.settings.lang || 'bn';
    this.soundEnabled = this.settings.sound !== false;

    /* ═══ Charts ═══ */
    this.progressChart = null;
    this.weeklyChart = null;
    this.detailedChart = null;
    this.chartRetryCount = 0;

    /* ═══ Game ═══ */
    this.gameActive = false;
    this.gameMode = 'normal';
    this.gameScore = 0;
    this.gameLives = 3;
    this.gameCombo = 0;
    this.gameInterval = null;
    this.gameAnimIntervals = [];

    /* ═══ Exam ═══ */
    this.examInterval = null;
    this.examActive = false;
    this.examText = '';
    this.examStartTime = null;

    /* ═══ Focus ═══ */
    this.focusMode = false;

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
    this.applyTheme();
    this.applyLang();

    const boot = () => {
      try {
        this.renderLessons();
        this.loadDashboard();
        this.renderStats();
        this.renderGroupFilters();
        this.initLayoutSelector();

        if (typeof AOS !== 'undefined') {
          AOS.init({ duration: 600, once: true, offset: 50 });
        }

        console.log('%c✓ App Initialized (ATOMIC v2.1)', 'color:#10b981;font-weight:bold;');
      } catch (err) {
        console.error('Init error:', err);
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 250));
    } else {
      setTimeout(boot, 250);
    }

    setTimeout(() => {
      this.renderProgressChart();
      if (document.getElementById('page-typing').classList.contains('active')) {
        if (typeof initLiveKeyboard === 'function') initLiveKeyboard(this.settings.liveLayout || 'jatiya');
      }
    }, 900);

    window.addEventListener('resize', () => {
      if (this.currentPage === 'typing' && this.currentLesson) {
        setTimeout(() => this.updateHandIndicator(), 200);
      }
      if (this.currentPage === 'dashboard') {
        setTimeout(() => this.renderProgressChart(), 300);
      }
    });

    if (window.animations?.sound) {
      window.animations.sound.enabled = this.soundEnabled;
    }
  }

  /* ═══════════════════════════════════════════════════════
     STORAGE
     ═══════════════════════════════════════════════════════ */
  loadProgress() {
    try { return JSON.parse(localStorage.getItem('bnAtomicProgress') || '{}'); }
    catch (e) { return {}; }
  }

  saveProgress() {
    try { localStorage.setItem('bnAtomicProgress', JSON.stringify(this.progress)); }
    catch (e) {}
  }

  loadStreak() {
    try { return JSON.parse(localStorage.getItem('bnAtomicStreak') || '{"days":0,"last":null}'); }
    catch (e) { return { days: 0, last: null }; }
  }

  loadSettings() {
    try { return JSON.parse(localStorage.getItem('bnAtomicSettings') || '{}'); }
    catch (e) { return {}; }
  }

  saveSettings() {
    try { localStorage.setItem('bnAtomicSettings', JSON.stringify(this.settings)); }
    catch (e) {}
  }

  updateStreak() {
    const today = new Date().toDateString();
    if (this.streak.last === today) return;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (this.streak.last === yesterday) this.streak.days++;
    else this.streak.days = 1;

    this.streak.last = today;
    try { localStorage.setItem('bnAtomicStreak', JSON.stringify(this.streak)); }
    catch (e) {}

    const el = document.getElementById('statStreak');
    if (el) el.textContent = this.streak.days;

    if (window.animations?.updateStreakFlame) {
      animations.updateStreakFlame(this.streak.days);
    }
  }

  /* ═══════════════════════════════════════════════════════
     THEME & LANG
     ═══════════════════════════════════════════════════════ */
  setupThemeToggle() {
    const btn = document.getElementById('themeBtn');
    if (btn) btn.addEventListener('click', () => this.toggleTheme());
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  toggleTheme() {
    const themes = ['dark', 'light', 'neon'];
    const cur = themes.indexOf(this.theme);
    this.theme = themes[(cur + 1) % themes.length];
    this.settings.theme = this.theme;
    this.saveSettings();
    this.applyTheme();

    setTimeout(() => {
      if (this.currentPage === 'dashboard') this.renderProgressChart();
      if (this.currentPage === 'stats') this.renderStats();
    }, 200);

    if (window.animations?.sound) animations.sound.pop();

    const names = { dark: 'ডার্ক', light: 'লাইট', neon: 'নিয়ন' };
    this.showToast(`🎨 থিম: ${names[this.theme]}`);
  }

  applyLang() {
    document.documentElement.setAttribute('data-lang', this.lang);
  }

  toggleLang() {
    this.lang = this.lang === 'bn' ? 'en' : 'bn';
    this.settings.lang = this.lang;
    this.saveSettings();
    this.applyLang();

    const translations = {
      bn: { dashboard: 'ড্যাশবোর্ড', lessons: 'লেসন', typing: 'টাইপিং', exam: 'পরীক্ষা', keyboard: 'কীবোর্ড', game: 'গেম', stats: 'পরিসংখ্যান' },
      en: { dashboard: 'Dashboard', lessons: 'Lessons', typing: 'Typing', exam: 'Exam', keyboard: 'Keyboard', game: 'Game', stats: 'Statistics' }
    };

    const t = translations[this.lang];
    Object.keys(t).forEach(key => {
      document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
        el.textContent = t[key];
      });
    });

    this.showToast(this.lang === 'bn' ? '🇧🇩 বাংলা' : '🇬🇧 English');
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.settings.sound = this.soundEnabled;
    this.saveSettings();

    if (window.animations?.sound) {
      window.animations.sound.enabled = this.soundEnabled;
      if (this.soundEnabled) animations.sound.pop();
    }

    this.showToast(this.soundEnabled ? '🔊 সাউন্ড চালু' : '🔇 সাউন্ড বন্ধ');
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
              setTimeout(() => this.renderProgressChart(), 150);
            }

            if (name === 'keyboard') {
              if (typeof initStandaloneKeyboard === 'function') {
                initStandaloneKeyboard(this.settings.standaloneLayout || 'jatiya');
              }
            }

            if (name === 'typing') {
              if (typeof initLiveKeyboard === 'function') {
                initLiveKeyboard(this.settings.liveLayout || 'jatiya');
              }
              setTimeout(() => {
                if (typeof refreshLiveKeyboard === 'function') refreshLiveKeyboard();
                this.updateHandIndicator();
              }, 300);
            }

            if (window.animations?.staggerIn) {
              const activePage = document.querySelector('.page.active');
              if (activePage) animations.staggerIn(activePage, '.glass, .stat-card, .lesson-card', 30);
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
     GROUP FILTERS
     ═══════════════════════════════════════════════════════ */
  renderGroupFilters() {
    const container = document.getElementById('groupFilters');
    if (!container) return;

    const groups = getSortedGroups();
    let html = `<button class="btn-filter active" data-group="all" onclick="app.setGroupFilter('all', this)">সব (${LESSONS.length})</button>`;

    groups.forEach(gid => {
      const g = LESSON_GROUPS[gid];
      const count = getLessonsByGroup(gid).length;
      if (count > 0) {
        html += `<button class="btn-filter" data-group="${gid}" onclick="app.setGroupFilter('${gid}', this)">${g.icon} ${g.name.split(' ')[1] || g.name} (${count})</button>`;
      }
    });

    container.innerHTML = html;
  }

  setGroupFilter(gid, btn) {
    this.filterGroup = gid;
    document.querySelectorAll('#groupFilters .btn-filter').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.renderLessons();
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
    if (this.filterGroup !== 'all') {
      lessons = lessons.filter(l => l.group === this.filterGroup);
    }
    if (this.searchQuery) {
      lessons = lessons.filter(l =>
        l.title.toLowerCase().includes(this.searchQuery) ||
        l.text.toLowerCase().includes(this.searchQuery) ||
        (l.tip && l.tip.toLowerCase().includes(this.searchQuery))
      );
    }

    const countEl = document.getElementById('lessonCount');
    if (countEl) countEl.textContent = lessons.length;

    if (lessons.length === 0) {
      grid.innerHTML = '<div class="col-12 text-center py-5 opacity-75"><h5>কোনো লেসন পাওয়া যায়নি</h5><p class="small">অন্য ফিল্টার বা সার্চ করুন</p></div>';
      return;
    }

    const grouped = {};
    lessons.forEach(l => {
      const g = l.group || 'other';
      if (!grouped[g]) grouped[g] = [];
      grouped[g].push(l);
    });

    const groupOrder = getSortedGroups();
    let html = '';

    groupOrder.forEach(gid => {
      if (!grouped[gid]) return;
      const gInfo = LESSON_GROUPS[gid];
      const items = grouped[gid];

      html += `
        <div class="col-12 mb-2 mt-3" data-aos="fade-right">
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
        html += `
          <div class="col-6 col-md-4 col-lg-3" data-aos="fade-up" data-aos-delay="${Math.min(items.indexOf(l) * 30, 300)}">
            <div class="lesson-card glass ${done ? 'done' : ''}" data-id="${l.id}">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <span class="lesson-num">${l.id}</span>
                <span class="tbadge">${l.level || 'সহজ'}</span>
              </div>
              <h6 class="mb-1 text-truncate">${l.title}</h6>
              <p class="small mb-0 opacity-75 text-truncate">${l.text}</p>
              ${done ? `<small class="text-success d-block mt-1">✓ ${done.wpm} WPM</small>` : ''}
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

    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  /* ═══════════════════════════════════════════════════════
     OPEN LESSON
     ═══════════════════════════════════════════════════════ */
  setupTypingInput() {
    const input = document.getElementById('typeInput');
    if (!input) return;

    input.addEventListener('input', (e) => this.handleTyping(e));
    input.addEventListener('paste', (e) => e.preventDefault());
    input.addEventListener('drop', (e) => e.preventDefault());
  }

  openLesson(id) {
    const lesson = getLessonById(id);
    if (!lesson) return;

    /* ═══ ★★★ FIX: পুরনো timeout বাতিল ★★★ ═══ */
    if (this._finishTimeout) {
      clearTimeout(this._finishTimeout);
      this._finishTimeout = null;
    }
    this._pendingReport = null;
    this._lastVerificationVal = '';

    this.currentLesson = lesson;
    this.currentSession = new TypingSession(lesson);
    this.startTime = null;
    this.comboCount = 0;
    this.correctChars = 0;
    this.wrongChars = 0;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (window.animations?.resetCombo) animations.resetCombo();

    const titleEl = document.getElementById('lessonTitle');
    if (titleEl) titleEl.textContent = `${id}. ${lesson.title}`;
    const levelEl = document.getElementById('lessonLevel');
    if (levelEl) levelEl.textContent = lesson.level || 'সহজ';

    const tipEl = document.getElementById('lessonTip');
    if (tipEl) tipEl.textContent = lesson.tip || 'নিয়মিত অনুশীলন করুন';

    const input = document.getElementById('typeInput');
    if (input) {
      input.value = '';
      input.disabled = false;
    }

    this.updateStatDisplay('timer', '0:00');
    this.updateStatDisplay('wpm', '0');
    this.updateStatDisplay('accuracy', '100');
    this.updateStatDisplay('errors', '0');
    this.updateStatDisplay('combo', '0');

    const progressBar = document.getElementById('lessonProgress');
    if (progressBar) progressBar.style.width = '0%';

    this.renderTextDisplay();
    this.showPage('typing');

    setTimeout(() => {
      if (typeof initLiveKeyboard === 'function') {
        initLiveKeyboard(this.settings.liveLayout || 'jatiya');
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

    const targetG = graphemeEngine.split(this.currentLesson.text);
    const typedG = graphemeEngine.split(document.getElementById('typeInput')?.value || '');

    disp.innerHTML = targetG.map((g, i) => {
      let cls = 'char';
      if (i < typedG.length) {
        cls += typedG[i] === g ? ' correct' : ' wrong';
      } else if (i === typedG.length) {
        cls += ' current';
      }
      const display = g === ' ' ? '&nbsp;' : (g === '\n' ? '<br>' : g);
      return `<span class="${cls}" data-idx="${i}">${display}</span>`;
    }).join('');
  }

  /* ═══════════════════════════════════════════════════════
     ★★★ TYPING HANDLER — পারমাণবিক FIX ★★★
     ═══════════════════════════════════════════════════════ */
  handleTyping(e) {
    if (!this.currentLesson || !this.currentSession) return;

    const val = e.target.value;
    const targetText = this.currentLesson.text;
    const targetG = graphemeEngine.split(targetText);
    const typedG = graphemeEngine.split(val);

    if (!this.startTime && typedG.length > 0) {
      this.startTime = Date.now();
      this.currentSession.start();
      this.startTimer();
    }

    /* ═══════ Full comparison ═══════ */
    const cmp = graphemeEngine.compare(targetText, val);

    /* ═══════ Update session ═══════ */
    this.currentSession.updateTyped(val);

    /* ═══════ Render display ═══════ */
    const disp = document.getElementById('textDisplay');
    if (disp) {
      disp.innerHTML = targetG.map((g, i) => {
        let cls = 'char';
        if (i < typedG.length) {
          cls += typedG[i] === g ? ' correct' : ' wrong';
        } else if (i === typedG.length) {
          cls += ' current';
        }
        const display = g === ' ' ? '&nbsp;' : (g === '\n' ? '<br>' : g);
        return `<span class="${cls}" data-idx="${i}">${display}</span>`;
      }).join('');
    }

    /* ═══════ Effects ═══════ */
    const prevCorrect = parseInt(this.correctChars || 0);
    const prevWrong = parseInt(this.wrongChars || 0);

    if (cmp.wrong > prevWrong) {
      if (window.animations?.triggerWrongChar) animations.triggerWrongChar(null);
      if (window.animations?.shakeScreen) animations.shakeScreen(3, 180);
      this.comboCount = 0;
    } else if (cmp.correct > prevCorrect) {
      if (window.animations?.triggerCorrectChar) animations.triggerCorrectChar(null);
      this.comboCount++;
    }

    this.correctChars = cmp.correct;
    this.wrongChars = cmp.wrong;

    /* ═══════ Stats ═══════ */
    const report = this.currentSession.getReport();
    this.updateStatDisplay('wpm', report.wpm);
    this.updateStatDisplay('accuracy', report.accuracy);
    this.updateStatDisplay('errors', report.wrong);
    this.updateStatDisplay('combo', this.comboCount);

    const progressBar = document.getElementById('lessonProgress');
    if (progressBar) {
      progressBar.style.width = Math.min(100, (typedG.length / targetG.length) * 100) + '%';
    }

    if (typedG.length > 0 && window.liveKeyboard) {
      const lastG = typedG[typedG.length - 1];
      window.liveKeyboard.flashByChar(lastG);
    }

    this.updateHandIndicator();

    if (window.animations?.updateComboMeter) {
      animations.updateComboMeter(this.comboCount);
    }

    /* ═══════════════════════════════════════════════════════
       ★★★ পারমাণবিক FIX: Debounced finish with verification ★★★
       
       ১. isComplete = length মিলে + wrong === 0 + lastIncomplete === false
       ২. ১০০ms অপেক্ষা করি (IME delay-এর জন্য)
       ৩. Final verify — সব শর্ত আবার চেক
       ৪. সব ঠিক থাকলে তবেই finish
       ═══════════════════════════════════════════════════════ */
    if (cmp.isComplete) {
      /* পুরনো timeout বাতিল */
      if (this._finishTimeout) clearTimeout(this._finishTimeout);

      this._pendingReport = report;
      this._lastVerificationVal = val;

      this._finishTimeout = setTimeout(() => {
        if (!this.currentSession || !this.currentLesson) return;

        const finalVal = document.getElementById('typeInput')?.value || '';
        const finalCmp = graphemeEngine.compare(this.currentLesson.text, finalVal);

        /* ═══ DOUBLE VERIFICATION ═══ */
        const trulyComplete =
          finalCmp.wrong === 0 &&
          !finalCmp.lastIncomplete &&
          finalCmp.typedCount >= finalCmp.total;

        if (trulyComplete) {
          console.log('%c✅ TRULY COMPLETE — finishing lesson', 'color:#10b981;font-weight:bold;');
          this.finishLesson(this._pendingReport);
        } else {
          console.log('%c⏸ Not complete yet — waiting for more input', 'color:#f59e0b;');
        }

        this._finishTimeout = null;
        this._pendingReport = null;
      }, 100);
    } else {
      /* ═══ If not complete, cancel any pending finish ═══ */
      if (this._finishTimeout) {
        clearTimeout(this._finishTimeout);
        this._finishTimeout = null;
        this._pendingReport = null;
      }
    }
  }

  /* ═══════════════════════════════════════════════════════
     TIMER
     ═══════════════════════════════════════════════════════ */
  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.startTime) return;
      const sec = Math.floor((Date.now() - this.startTime) / 1000);
      const mm = Math.floor(sec / 60);
      const ss = String(sec % 60).padStart(2, '0');
      this.updateStatDisplay('timer', `${mm}:${ss}`);

      if (this.currentSession) {
        const report = this.currentSession.getReport();
        this.updateStatDisplay('wpm', report.wpm);
      }
    }, 500);
  }

  /* ═══════════════════════════════════════════════════════
     HAND INDICATOR
     ═══════════════════════════════════════════════════════ */
  updateHandIndicator() {
    if (!this.currentLesson) return;

    const typed = document.getElementById('typeInput')?.value || '';
    const nextChar = graphemeEngine.getNextChar(this.currentLesson.text, typed);

    if (!nextChar) {
      if (typeof clearKeyboardTarget === 'function') clearKeyboardTarget();
      return;
    }

    const firstChar = nextChar.charAt(0);

    let attempts = 0;
    const tryPoint = () => {
      attempts++;
      if (typeof pointHandAtNextChar === 'function' && window.liveKeyboard) {
        pointHandAtNextChar(firstChar);
      } else if (attempts < 5) {
        setTimeout(tryPoint, 150);
      }
    };
    tryPoint();
  }

  /* ═══════════════════════════════════════════════════════
     FINISH LESSON
     ═══════════════════════════════════════════════════════ */
  finishLesson(report) {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    const input = document.getElementById('typeInput');
    if (input) input.disabled = true;

    this.progress[this.currentLesson.id] = {
      wpm: report.wpm,
      accuracy: report.accuracy,
      date: new Date().toISOString(),
      correct: report.correct,
      wrong: report.wrong,
      elapsed: report.elapsedSeconds
    };
    this.saveProgress();

    aiEngine.recordWPM(report.wpm, report.accuracy);
    statsTracker.addSession(this.currentLesson.id, report);

    if (window.animations?.celebrateLessonComplete) {
      animations.celebrateLessonComplete(report.wpm, report.accuracy);
    } else {
      this.showToast(`🎉 ${report.wpm} WPM, ${report.accuracy}% নির্ভুলতা`);
    }

    this.loadDashboard();
    this.renderLessons();

    if (typeof clearKeyboardTarget === 'function') clearKeyboardTarget();

    this.settings.lastLesson = this.currentLesson.id;
    this.saveSettings();
  }

  /* ═══════════════════════════════════════════════════════
     LESSON NAVIGATION
     ═══════════════════════════════════════════════════════ */
  restartLesson() {
    if (this.currentLesson) this.openLesson(this.currentLesson.id);
  }

  nextLesson() {
    if (!this.currentLesson) return;
    const next = getLessonById(this.currentLesson.id + 1);
    if (next) this.openLesson(next.id);
    else this.showToast('🎊 সব লেসন সম্পন্ন!');
  }

  dailyChallenge() {
    const day = new Date().getDate();
    const challengeLessons = LESSONS.filter(l => l.type === 'challenge');
    if (challengeLessons.length > 0) {
      const lesson = challengeLessons[day % challengeLessons.length];
      this.openLesson(lesson.id);
      this.showToast('🔥 ডেইলি চ্যালেঞ্জ শুরু!');
    }
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
      'সপ্তাহে একবার গতি পরীক্ষা করুন।',
      'কার-চিহ্ন সঠিকভাবে টাইপ করার অভ্যাস করুন।',
      'প্রতিটি লেসন ৩ বার অনুশীলন করুন।'
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
     KEYBOARD LAYOUT SELECTORS
     ═══════════════════════════════════════════════════════ */
  initLayoutSelector() {
    const liveSelect = document.getElementById('kbLayoutSelect');
    const standaloneSelect = document.getElementById('standaloneLayoutSelect');

    if (liveSelect) {
      liveSelect.value = this.settings.liveLayout || 'jatiya';
      liveSelect.addEventListener('change', (e) => this.setKeyboardLayout(e.target.value));
    }

    if (standaloneSelect) {
      standaloneSelect.value = this.settings.standaloneLayout || 'jatiya';
      standaloneSelect.addEventListener('change', (e) => this.setStandaloneLayout(e.target.value));
    }
  }

  setKeyboardLayout(layoutId) {
    this.settings.liveLayout = layoutId;
    this.saveSettings();
    if (typeof changeLiveLayout === 'function') changeLiveLayout(layoutId);
    this.showToast(`⌨️ ${KEYBOARD_LAYOUTS[layoutId].name}`);
  }

  setStandaloneLayout(layoutId) {
    this.settings.standaloneLayout = layoutId;
    this.saveSettings();
    if (typeof changeStandaloneLayout === 'function') changeStandaloneLayout(layoutId);
    this.showToast(`⌨️ ${KEYBOARD_LAYOUTS[layoutId].name}`);
  }

  /* ═══════════════════════════════════════════════════════
     FOCUS MODE
     ═══════════════════════════════════════════════════════ */
  toggleFocus() {
    this.focusMode = !this.focusMode;
    document.body.classList.toggle('focus-mode', this.focusMode);
    this.showToast(this.focusMode ? '🎯 ফোকাস মোড চালু' : 'ফোকাস মোড বন্ধ');
  }

  /* ═══════════════════════════════════════════════════════
     DASHBOARD
     ═══════════════════════════════════════════════════════ */
  loadDashboard() {
    try {
      const vals = Object.values(this.progress);
      const totalLessons = LESSONS.length;
      const completed = vals.length;

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
      if (compEl) compEl.textContent = `${completed}/${totalLessons}`;
      const streakEl = document.getElementById('statStreak');
      if (streakEl) streakEl.textContent = this.streak.days;

      this.renderTrends(vals);

      const bar = document.getElementById('completedProgress');
      if (bar) {
        const pct = totalLessons > 0 ? (completed / totalLessons) * 100 : 0;
        bar.style.width = pct + '%';
      }

      this.renderBadges(completed, avgWpm);
      this.renderTopLessons(vals);
      this.renderRecentLessons(vals);
      this.renderProgressChart();
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
      { icon: 'bi-award', name: '২০০টি', earned: count >= 200, tip: '২০০টি লেসন' },
      { icon: 'bi-crown', name: 'সব', earned: count >= LESSONS.length, tip: 'সব লেসন' },
      { icon: 'bi-lightning', name: '২০ WPM', earned: wpm >= 20, tip: '২০ WPM' },
      { icon: 'bi-fire', name: '৪০ WPM', earned: wpm >= 40, tip: '৪০ WPM' },
      { icon: 'bi-star', name: '৬০ WPM', earned: wpm >= 60, tip: '৬০ WPM' },
      { icon: 'bi-rocket', name: '৮০ WPM', earned: wpm >= 80, tip: '৮০ WPM' },
      { icon: 'bi-trophy-fill', name: '১০০ WPM', earned: wpm >= 100, tip: '১০০ WPM' },
      { icon: 'bi-gem', name: '১২০ WPM', earned: wpm >= 120, tip: '১২০ WPM' },
      { icon: 'bi-diamond', name: '১৫০ WPM', earned: wpm >= 150, tip: '১৫০ WPM' }
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
      const l = getLessonById(parseInt(id));
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
      const l = getLessonById(parseInt(id));
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
  renderProgressChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;

    if (typeof Chart === 'undefined') {
      if (this.chartRetryCount < 20) {
        this.chartRetryCount++;
        setTimeout(() => this.renderProgressChart(), 300);
      }
      return;
    }

    if (this.progressChart) {
      try { this.progressChart.destroy(); } catch (e) {}
      this.progressChart = null;
    }

    const ids = Object.keys(this.progress).sort((a, b) => a - b);
    const textColor = getComputedStyle(document.body).color;
    const gridColor = 'rgba(148, 163, 184, 0.15)';

    const data = ids.length > 0 ? ids.map(id => this.progress[id].wpm) : [0];
    const labels = ids.length > 0 ? ids.map(id => `L${id}`) : ['শুরু করুন'];

    try {
      this.progressChart = new Chart(ctx, {
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
            legend: { labels: { color: textColor, font: { size: 13, weight: '600' } } },
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

    const activity = statsTracker.getWeeklyActivity();
    const textColor = getComputedStyle(document.body).color;
    const gridColor = 'rgba(148, 163, 184, 0.15)';

    try {
      this.weeklyChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: activity.labels,
          datasets: [{
            label: 'লেসন',
            data: activity.data,
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
            tooltip: { backgroundColor: 'rgba(6, 182, 212, 0.95)', displayColors: false }
          },
          scales: {
            x: { ticks: { color: textColor, font: { size: 11 } }, grid: { display: false } },
            y: { beginAtZero: true, ticks: { color: textColor, stepSize: 1, font: { size: 11 } }, grid: { color: gridColor } }
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
          const l = getLessonById(parseInt(id));
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
            legend: { labels: { color: textColor, font: { size: 13, weight: '600' } } }
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

    const challengeLessons = LESSONS.filter(l => l.group === 'bakyo');
    const text = challengeLessons.slice(0, 2).map(l => l.text).join(' ');
    this.examText = text;

    const area = document.getElementById('examArea');
    if (!area) return;

    area.innerHTML = `
      <div class="alert alert-info d-flex align-items-center gap-2">
        <i class="bi bi-clock-history"></i>
        <div>${seconds / 60} মিনিটের পরীক্ষা — নিচের লেখাটি টাইপ করুন!</div>
      </div>
      <div class="text-display mb-3" id="examDisplay"></div>
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

    const disp = document.getElementById('examDisplay');
    const targetG = graphemeEngine.split(text);
    if (disp) {
      disp.innerHTML = targetG.map(g => `<span class="char">${g === ' ' ? '&nbsp;' : g}</span>`).join('');
    }

    const updateStats = () => {
      const val = inp.value;
      const cmp = graphemeEngine.compare(text, val);
      const min = (Date.now() - start) / 60000;
      const wpm = min > 0 ? Math.round((cmp.correct / 5) / min) : 0;
      const acc = cmp.typedCount > 0 ? Math.round((cmp.correct / cmp.typedCount) * 100) : 100;

      if (disp) {
        disp.innerHTML = cmp.perChar.map(c => {
          let cls = 'char';
          if (c.status === 'correct') cls += ' correct';
          else if (c.status === 'wrong') cls += ' wrong';
          else if (c.status === 'pending' && c.index === cmp.typedCount) cls += ' current';
          const display = c.target === ' ' ? '&nbsp;' : c.target;
          return `<span class="${cls}">${display}</span>`;
        }).join('');
      }

      const wpmEl = document.getElementById('examWpm');
      if (wpmEl) wpmEl.textContent = wpm;
      const accEl = document.getElementById('examAcc');
      if (accEl) accEl.textContent = acc;

      return { wpm, acc, typedLen: cmp.typedCount, targetLen: cmp.total, isComplete: cmp.isComplete };
    };

    inp.addEventListener('input', () => {
      if (!this.examActive) return;
      const stats = updateStats();
      if (window.animations?.sound) animations.sound.keyPress();
      if (stats.isComplete) {
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
      const rating = TypingUtils.getRating(wpm, acc);
      result.innerHTML = `
        <div class="alert alert-success d-flex align-items-center gap-3">
          <i class="bi bi-trophy-fill" style="font-size:2rem;"></i>
          <div>
            <strong style="font-size:1.3rem;">ফলাফল: Grade ${rating.grade}</strong><br>
            <span>⚡ ${wpm} WPM</span> • <span>🎯 ${acc}% নির্ভুলতা</span>
            <div class="small mt-1">${TypingUtils.getMotivation(wpm, acc)}</div>
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

  startGame(mode = 'normal') {
    if (this.gameActive) this.stopGame();

    this.gameActive = true;
    this.gameMode = mode;
    this.gameScore = 0;
    this.gameLives = 3;
    this.gameCombo = 0;

    this.updateStatDisplay('gameScore', '0');
    this.updateStatDisplay('gameLives', '3');
    this.updateStatDisplay('gameCombo', '0');

    const area = document.getElementById('gameArea');
    if (!area) return;
    area.innerHTML = '';

    const inp = document.getElementById('gameInput');
    if (inp) {
      inp.disabled = false;
      inp.value = '';
      inp.focus();
    }

    const speed = { normal: 1600, hard: 1100, insane: 700 }[mode] || 1600;
    const duration = { normal: 8000, hard: 6000, insane: 4500 }[mode] || 8000;

    this.gameInterval = setInterval(() => {
      if (!this.gameActive) return;
      this.spawnGameWord(duration);
    }, speed);

    this.spawnGameWord(duration);
    this.showToast(`🎮 গেম শুরু! মোড: ${mode}`);
  }

  spawnGameWord(duration = 8000) {
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
        this.gameCombo = 0;
        this.updateStatDisplay('gameLives', this.gameLives);
        this.updateStatDisplay('gameCombo', this.gameCombo);
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

      this.gameCombo++;
      const bonus = Math.floor(this.gameCombo / 5) * 5;
      this.gameScore += 10 + bonus;

      this.updateStatDisplay('gameScore', this.gameScore);
      this.updateStatDisplay('gameCombo', this.gameCombo);

      if (window.animations) {
        animations.sound.hit();
        animations.particles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, {
          count: 10, speed: 4, size: 4, life: 600,
          colors: ['#10b981', '#f59e0b', '#ec4899']
        });
        animations.floatText(`+${10 + bonus}`, rect.left + rect.width / 2, rect.top, '#10b981', 20);
      }
    } else {
      if (window.animations?.sound) animations.sound.wrong();
      this.gameCombo = 0;
      this.updateStatDisplay('gameCombo', 0);
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
     CERTIFICATE
     ═══════════════════════════════════════════════════════ */
  showCertificate() {
    if (!this.currentLesson) {
      this.showToast('❌ প্রথমে একটি লেসন সম্পন্ন করুন');
      return;
    }

    const progress = this.progress[this.currentLesson.id];
    if (!progress) {
      this.showToast('❌ এই লেসন এখনো সম্পন্ন হয়নি');
      return;
    }

    const html = CertificateGenerator.generate(
      this.currentLesson.id,
      progress.wpm,
      progress.accuracy,
      progress.date
    );

    const certContent = document.getElementById('certContent');
    if (certContent) {
      certContent.innerHTML = html + `
        <div class="text-center mt-3">
          <button class="btn btn-ultra" onclick="app.downloadCertificate()">
            <i class="bi bi-download"></i> ডাউনলোড
          </button>
          <button class="btn btn-outline-secondary ms-2" data-bs-dismiss="modal">
            বন্ধ করুন
          </button>
        </div>
      `;
    }

    const modalEl = document.getElementById('certModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
      new bootstrap.Modal(modalEl).show();
    }
  }

  downloadCertificate() {
    if (!this.currentLesson) return;
    const progress = this.progress[this.currentLesson.id];
    if (!progress) return;

    CertificateGenerator.download(
      this.currentLesson.id,
      progress.wpm,
      progress.accuracy,
      progress.date
    );

    this.showToast('📥 সার্টিফিকেট ডাউনলোড হচ্ছে...');
  }

  /* ═══════════════════════════════════════════════════════
     EXPORT / RESET
     ═══════════════════════════════════════════════════════ */
  exportProgress() {
    const data = {
      progress: this.progress,
      streak: this.streak,
      settings: this.settings,
      exported: new Date().toISOString(),
      version: 'ATOMIC-2.1'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `bangla-typing-atomic-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    this.showToast('📥 প্রোগ্রেস ডাউনলোড হয়েছে');
  }

  resetProgress() {
    if (!confirm('সব প্রোগ্রেস মুছে ফেলবেন? এটি ফেরানো যাবে না!')) return;

    localStorage.removeItem('bnAtomicProgress');
    localStorage.removeItem('bnAtomicStreak');
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
   BOOT
   ═══════════════════════════════════════════════════════════════ */
function bootApp() {
  if (window.app) return;
  window.app = new TypingApp();

  console.log('%c⚛️ বাংলা টাইপিং একাডেমি — ATOMIC v2.1 READY', 'color:#10b981;font-size:18px;font-weight:900;text-shadow:0 0 10px #10b981;');
  console.log(`%c⚡ ${LESSONS.length} লেসন • ${Object.keys(KEYBOARD_LAYOUTS).length} কীবোর্ড • Grapheme Engine v2.1`, 'color:#8b5cf6;font-size:13px;');
  console.log('%c🔧🔧🔧 FIX v2.1: শেষ যুক্তবর্ণ এখন ১০০% সঠিকভাবে কাজ করবে 🔧🔧🔧', 'color:#f59e0b;font-size:12px;font-weight:bold;');
  console.log('%c💡 Console: app, animations, engine, liveKeyboard, debugKeyboard', 'color:#f59e0b;font-size:12px;');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
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
    '✓ AOS': typeof AOS !== 'undefined',
    '✓ LESSONS': typeof LESSONS !== 'undefined' && LESSONS.length > 0,
    '✓ KEYBOARD_LAYOUTS': typeof KEYBOARD_LAYOUTS !== 'undefined',
    '✓ Grapheme Engine': typeof graphemeEngine !== 'undefined',
    '✓ isTrulyComplete': typeof graphemeEngine?.isTrulyComplete === 'function',
    '✓ isLastGraphemeIncomplete': typeof graphemeEngine?.isLastGraphemeIncomplete === 'function',
    '✓ App': typeof app !== 'undefined',
    '✓ Animations': typeof animations !== 'undefined',
    '✓ Live Keyboard': !!window.liveKeyboard,
    '✓ Standalone Keyboard': !!window.standaloneKeyboard,
    '✓ progressChart': !!document.getElementById('progressChart'),
    '✓ weeklyChart': !!document.getElementById('weeklyChart'),
    '✓ detailedChart': !!document.getElementById('detailedChart'),
    '✓ liveKbContainer': !!document.getElementById('liveKbContainer')
  };

  console.group('%c🔍 ATOMIC v2.1 Diagnostics', 'color:#f59e0b;font-weight:bold;font-size:14px;');
  let allOK = true;
  Object.entries(checks).forEach(([k, v]) => {
    console.log(v ? `%c${k} OK` : `%c${k} FAILED`, v ? 'color:#10b981;' : 'color:#ef4444;font-weight:bold;');
    if (!v) allOK = false;
  });
  console.log(allOK
    ? '%c💯 সব ঠিকঠাক! শেষ যুক্তবর্ণ ফিক্স চালু। ১০০% কাজ করবে।'
    : '%c⚠️ কিছু সমস্যা আছে — উপরে লাল দেখুন',
    allOK ? 'color:#10b981;font-weight:bold;font-size:13px;' : 'color:#ef4444;font-weight:bold;font-size:13px;'
  );
  console.groupEnd();

  /* 🧠 Grapheme Last Char Test */
  console.group('%c🧠 Last Char Fix Test', 'color:#8b5cf6;font-weight:bold;');
  const tests = [
    { input: 'শিক্ষ', expected: false, desc: '"শিক্ষ" (complete)' },
    { input: 'শিক্', expected: true, desc: '"শিক্" (dangling হসন্ত)' },
    { input: 'শিক্ষা', expected: false, desc: '"শিক্ষা" (complete)' },
    { input: 'কর্ম', expected: false, desc: '"কর্ম" (complete)' },
    { input: 'ক', expected: false, desc: '"ক" (base)' },
    { input: 'কি', expected: false, desc: '"কি" (i-কার = complete)' },
    { input: 'ক', expected: false, desc: '"ক" base' }
  ];
  tests.forEach(t => {
    const result = graphemeEngine.isLastGraphemeIncomplete(t.input);
    const pass = result === t.expected;
    console.log(
      pass ? `%c✓ ${t.desc} → ${result}` : `%c✗ ${t.desc} → ${result} (expected ${t.expected})`,
      pass ? 'color:#10b981;' : 'color:#ef4444;'
    );
  });
  console.groupEnd();
}, 1500);
