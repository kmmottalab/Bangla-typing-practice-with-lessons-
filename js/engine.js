/* ═══════════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — ENGINE.JS (ATOMIC v2.1)
   Grapheme Engine — যুক্তবর্ণ/কার-ফলা ১০০% নিখুঁত + শেষ char fix
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   1. GRAPHEME ENGINE
   ═══════════════════════════════════════════════════════ */
class GraphemeEngine {
  constructor() {
    this.segmenter = null;
    this.initSegmenter();
  }

  initSegmenter() {
    try {
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        this.segmenter = new Intl.Segmenter('bn', { granularity: 'grapheme' });
        console.log('%c✓ Intl.Segmenter available', 'color:#10b981;');
      } else {
        console.log('%c⚠ Intl.Segmenter not available — using custom splitter', 'color:#f59e0b;');
      }
    } catch (e) {
      console.warn('Segmenter error:', e);
    }
  }

  /* ═══════ MAIN SPLIT — Grapheme cluster ═══════ */
  split(text) {
    if (!text) return [];

    if (this.segmenter) {
      try {
        return Array.from(this.segmenter.segment(text), s => s.segment);
      } catch (e) {
        console.warn('Segmenter failed, using fallback');
      }
    }

    return this.customSplit(text);
  }

  /* ═══════ CUSTOM SPLITTER (Fallback) ═══════ */
  customSplit(text) {
    if (!text) return [];
    const graphemes = [];
    let i = 0;

    while (i < text.length) {
      const code = text.charCodeAt(i);
      let cluster = text[i];
      i++;

      while (i < text.length) {
        const nextCode = text.charCodeAt(i);

        const isCombining =
          (nextCode >= 0x09BC && nextCode <= 0x09CD) ||
          nextCode === 0x09D7 ||
          (nextCode >= 0x09E2 && nextCode <= 0x09E3) ||
          nextCode === 0x09FE ||
          nextCode === 0x200C || nextCode === 0x200D;

        if (isCombining) {
          cluster += text[i];
          i++;

          if (nextCode === 0x09CD && i < text.length) {
            const afterHoshonto = text.charCodeAt(i);
            if ((afterHoshonto >= 0x0995 && afterHoshonto <= 0x09B9) ||
                (afterHoshonto >= 0x09DC && afterHoshonto <= 0x09DF) ||
                afterHoshonto === 0x09CE || afterHoshonto === 0x09F0 ||
                afterHoshonto === 0x09F1) {
              cluster += text[i];
              i++;
            }
          }
        } else {
          break;
        }
      }

      graphemes.push(cluster);
    }

    return graphemes;
  }

  /* ═══════════════════════════════════════════════════════
     ★★★ পারমাণবিক FIX: Last grapheme incomplete? ★★★
     শেষ character যদি combining mark হয় যা next char ছাড়া
     complete হয় না — তাহলে true রিটার্ন করে।
     ═══════════════════════════════════════════════════════ */
  isLastGraphemeIncomplete(text) {
    if (!text || text.length === 0) return false;
    const lastChar = text[text.length - 1];
    const code = lastChar.charCodeAt(0);

    /* Bengali combining marks that need next char */
    const isDangling =
      code === 0x09CD ||                            /* ্ হসন্ত — next ব্যঞ্জনবর্ণ দরকার */
      code === 0x09BC ||                            /* ় nukta — base দরকার */
      (code >= 0x09BE && code <= 0x09CC) ||        /* া ি ী ু ূ ৃ ৄ ে ৈ ো ৌ */
      code === 0x09D7 ||                            /* ৗ */
      (code >= 0x09E2 && code <= 0x09E3) ||        /* ৢ ৣ */
      code === 0x09FE ||                            /* ৾ */
      code === 0x200C ||                            /* ZWNJ */
      code === 0x200D;                              /* ZWJ */

    return isDangling;
  }

  /* ═══════════════════════════════════════════════════════
     ★★★ পারমাণবিক FIX: Is typing truly complete? ★★★
     সব শর্ত পূরণ হলে তবেই true:
     - target length মিলে গেছে
     - সব গ্রাফিম সঠিক (wrong === 0)
     - শেষ গ্রাফিম incomplete না
     ═══════════════════════════════════════════════════════ */
  isTrulyComplete(target, typed) {
    if (!target) return false;

    const targetG = this.split(target);
    const typedG = this.split(typed);

    if (typedG.length < targetG.length) return false;
    if (this.isLastGraphemeIncomplete(typed)) return false;

    /* Full verification */
    for (let i = 0; i < targetG.length; i++) {
      if (typedG[i] !== targetG[i]) return false;
    }

    return true;
  }

  /* ═══════ Count ═══════ */
  count(text) {
    return this.split(text).length;
  }

  /* ═══════ Compare ═══════ */
  compare(target, typed) {
    const targetG = this.split(target);
    const typedG = this.split(typed);

    const result = {
      target: targetG,
      typed: typedG,
      total: targetG.length,
      typedCount: typedG.length,
      correct: 0,
      wrong: 0,
      wrongIndices: [],
      firstWrong: -1,
      lastIncomplete: this.isLastGraphemeIncomplete(typed),
      isComplete: false,
      perChar: []
    };

    const maxLen = Math.max(targetG.length, typedG.length);
    for (let i = 0; i < maxLen; i++) {
      const t = targetG[i] || '';
      const p = typedG[i] || '';
      let status = 'empty';

      if (i < typedG.length) {
        if (t === p) {
          status = 'correct';
          result.correct++;
        } else {
          status = 'wrong';
          result.wrong++;
          result.wrongIndices.push(i);
          if (result.firstWrong === -1) result.firstWrong = i;
        }
      } else if (i < targetG.length) {
        status = 'pending';
      }

      result.perChar.push({
        index: i,
        target: t,
        typed: p,
        status: status
      });
    }

    /* Complete check */
    result.isComplete =
      typedG.length >= targetG.length &&
      result.wrong === 0 &&
      !result.lastIncomplete;

    return result;
  }

  /* ═══════ Get next char ═══════ */
  getNextChar(target, typed) {
    const targetG = this.split(target);
    const typedG = this.split(typed);
    if (typedG.length >= targetG.length) return null;
    return targetG[typedG.length];
  }

  /* ═══════ Normalize ═══════ */
  normalize(text) {
    if (!text) return '';
    try {
      return text.normalize('NFC');
    } catch (e) {
      return text;
    }
  }

  /* ═══════ Debug info ═══════ */
  debugInfo(text) {
    if (!text) return { text: '', graphemes: [], length: 0 };
    return {
      text: text,
      graphemes: this.split(text),
      length: this.count(text),
      lastIncomplete: this.isLastGraphemeIncomplete(text),
      lastChar: text[text.length - 1],
      lastCode: text.charCodeAt(text.length - 1).toString(16)
    };
  }
}

const graphemeEngine = new GraphemeEngine();


/* ═══════════════════════════════════════════════════════
   2. TYPING METRICS
   ═══════════════════════════════════════════════════════ */
class TypingMetrics {
  constructor() {
    this.startTime = null;
    this.endTime = null;
    this.correctChars = 0;
    this.wrongChars = 0;
    this.totalChars = 0;
    this.backspaces = 0;
    this.keystrokes = 0;
    this.pauseTime = 0;
    this.lastKeystrokeTime = null;
  }

  start() {
    this.startTime = Date.now();
    this.endTime = null;
    this.correctChars = 0;
    this.wrongChars = 0;
    this.totalChars = 0;
    this.backspaces = 0;
    this.keystrokes = 0;
    this.pauseTime = 0;
    this.lastKeystrokeTime = this.startTime;
  }

  stop() {
    this.endTime = Date.now();
  }

  update(correct, wrong, total) {
    this.correctChars = correct;
    this.wrongChars = wrong;
    this.totalChars = total;
  }

  recordKeystroke(isBackspace = false) {
    const now = Date.now();
    if (this.lastKeystrokeTime) {
      const gap = now - this.lastKeystrokeTime;
      if (gap > 3000) this.pauseTime += gap;
    }
    this.lastKeystrokeTime = now;
    this.keystrokes++;
    if (isBackspace) this.backspaces++;
  }

  getElapsedSeconds() {
    if (!this.startTime) return 0;
    const end = this.endTime || Date.now();
    return Math.max(0, (end - this.startTime - this.pauseTime) / 1000);
  }

  getElapsedMinutes() {
    return this.getElapsedSeconds() / 60;
  }

  getWPM() {
    const minutes = this.getElapsedMinutes();
    if (minutes < 0.001) return 0;
    return Math.round((this.correctChars / 5) / minutes);
  }

  getGrossWPM() {
    const minutes = this.getElapsedMinutes();
    if (minutes < 0.001) return 0;
    return Math.round((this.totalChars / 5) / minutes);
  }

  getAccuracy() {
    if (this.totalChars === 0) return 100;
    return Math.round((this.correctChars / this.totalChars) * 100);
  }

  getCPM() {
    const minutes = this.getElapsedMinutes();
    if (minutes < 0.001) return 0;
    return Math.round(this.totalChars / minutes);
  }

  getConsistentWPM() {
    if (this.keystrokes === 0) return 0;
    const elapsed = this.getElapsedSeconds();
    if (elapsed < 0.001) return 0;
    const avgKeystrokeTime = elapsed / this.keystrokes;
    if (avgKeystrokeTime < 0.001) return 0;
    return Math.round((1 / avgKeystrokeTime) * 12);
  }

  getReport() {
    return {
      wpm: this.getWPM(),
      grossWpm: this.getGrossWPM(),
      cpm: this.getCPM(),
      accuracy: this.getAccuracy(),
      correct: this.correctChars,
      wrong: this.wrongChars,
      total: this.totalChars,
      keystrokes: this.keystrokes,
      backspaces: this.backspaces,
      elapsedSeconds: Math.round(this.getElapsedSeconds()),
      consistentWpm: this.getConsistentWPM()
    };
  }

  reset() {
    this.startTime = null;
    this.endTime = null;
    this.correctChars = 0;
    this.wrongChars = 0;
    this.totalChars = 0;
    this.backspaces = 0;
    this.keystrokes = 0;
    this.pauseTime = 0;
    this.lastKeystrokeTime = null;
  }
}


/* ═══════════════════════════════════════════════════════
   3. TYPING SESSION
   ═══════════════════════════════════════════════════════ */
class TypingSession {
  constructor(lesson) {
    this.lesson = lesson;
    this.targetText = lesson.text;
    this.targetGraphemes = graphemeEngine.split(this.targetText);
    this.typedText = '';
    this.typedGraphemes = [];
    this.comparison = null;
    this.metrics = new TypingMetrics();
    this.started = false;
    this.finished = false;
    this.wrongCharsList = [];
  }

  start() {
    if (!this.started) {
      this.started = true;
      this.metrics.start();
    }
  }

  updateTyped(newText) {
    this.typedText = newText;
    this.typedGraphemes = graphemeEngine.split(newText);
    this.comparison = graphemeEngine.compare(this.targetText, newText);

    const c = this.comparison;
    this.metrics.update(c.correct, c.wrong, c.typedCount);

    c.wrongIndices.forEach(idx => {
      const ch = c.target[idx];
      if (ch && !this.wrongCharsList.includes(ch)) {
        this.wrongCharsList.push(ch);
      }
    });
  }

  getNextChar() {
    if (this.typedGraphemes.length >= this.targetGraphemes.length) return null;
    return this.targetGraphemes[this.typedGraphemes.length];
  }

  isComplete() {
    return graphemeEngine.isTrulyComplete(this.targetText, this.typedText);
  }

  finish() {
    if (!this.finished) {
      this.finished = true;
      this.metrics.stop();
    }
    return this.metrics.getReport();
  }

  getReport() {
    return this.metrics.getReport();
  }
}


/* ═══════════════════════════════════════════════════════
   4. AI SUGGESTION ENGINE
   ═══════════════════════════════════════════════════════ */
class AISuggestionEngine {
  constructor() {
    this.errorHistory = {};
    this.wpmHistory = [];
    this.maxHistory = 100;
  }

  recordError(char) {
    if (!char) return;
    this.errorHistory[char] = (this.errorHistory[char] || 0) + 1;
  }

  recordWPM(wpm, accuracy) {
    this.wpmHistory.push({ wpm, accuracy, time: Date.now() });
    if (this.wpmHistory.length > this.maxHistory) {
      this.wpmHistory.shift();
    }
  }

  getWeakestChars(limit = 5) {
    const sorted = Object.entries(this.errorHistory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
    return sorted.map(([char, count]) => ({ char, count }));
  }

  getPracticeSuggestions() {
    const weak = this.getWeakestChars(3);
    if (weak.length === 0) return null;

    const weakChars = weak.map(w => w.char);
    const suggestions = [];

    const wordsWithWeak = GAME_WORDS.filter(word => {
      const wordG = graphemeEngine.split(word);
      return wordG.some(g => weakChars.includes(g));
    });

    if (wordsWithWeak.length > 0) {
      suggestions.push({
        type: 'words',
        title: 'আপনার দুর্বল অক্ষরের শব্দ',
        chars: weakChars,
        items: wordsWithWeak.slice(0, 10)
      });
    }

    const challengeText = weakChars.map(c =>
      `${c} ${c} ${c} ${c} ${c}`
    ).join('  ');

    suggestions.push({
      type: 'challenge',
      title: 'দুর্বল অক্ষর চ্যালেঞ্জ',
      chars: weakChars,
      text: challengeText
    });

    return suggestions;
  }

  getInsights() {
    const insights = [];

    if (this.wpmHistory.length === 0) return insights;

    const recent = this.wpmHistory.slice(-10);
    const avgWpm = Math.round(recent.reduce((a, b) => a + b.wpm, 0) / recent.length);
    insights.push({
      type: 'info',
      text: `সাম্প্রতিক ${recent.length}টি লেসনে আপনার গড় WPM: ${avgWpm}`
    });

    if (recent.length >= 5) {
      const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
      const secondHalf = recent.slice(Math.floor(recent.length / 2));
      const avg1 = firstHalf.reduce((a, b) => a + b.wpm, 0) / firstHalf.length;
      const avg2 = secondHalf.reduce((a, b) => a + b.wpm, 0) / secondHalf.length;

      if (avg2 > avg1 * 1.1) {
        insights.push({
          type: 'success',
          text: `📈 আপনার গতি বাড়ছে! সাম্প্রতিক গড় ${Math.round(avg2)} WPM`
        });
      } else if (avg2 < avg1 * 0.9) {
        insights.push({
          type: 'warning',
          text: `📉 গতি একটু কমছে — বেশি অনুশীলন করুন`
        });
      }
    }

    const weak = this.getWeakestChars(1);
    if (weak.length > 0) {
      insights.push({
        type: 'tip',
        text: `💡 "${weak[0].char}" অক্ষরে বেশি ভুল হচ্ছে — এটি প্র্যাকটিস করুন`
      });
    }

    return insights;
  }

  reset() {
    this.errorHistory = {};
    this.wpmHistory = [];
  }
}

const aiEngine = new AISuggestionEngine();


/* ═══════════════════════════════════════════════════════
   5. STATS TRACKER
   ═══════════════════════════════════════════════════════ */
class StatsTracker {
  constructor() {
    this.sessions = [];
  }

  addSession(lessonId, report) {
    this.sessions.push({
      lessonId,
      wpm: report.wpm,
      accuracy: report.accuracy,
      correct: report.correct,
      wrong: report.wrong,
      date: new Date().toISOString(),
      timestamp: Date.now()
    });

    if (this.sessions.length > 500) this.sessions.shift();
  }

  getTodayStats() {
    const today = new Date().toDateString();
    const todaySessions = this.sessions.filter(s =>
      new Date(s.date).toDateString() === today
    );

    return {
      count: todaySessions.length,
      avgWpm: todaySessions.length
        ? Math.round(todaySessions.reduce((a, b) => a + b.wpm, 0) / todaySessions.length)
        : 0,
      avgAccuracy: todaySessions.length
        ? Math.round(todaySessions.reduce((a, b) => a + b.accuracy, 0) / todaySessions.length)
        : 0,
      totalChars: todaySessions.reduce((a, b) => a + b.correct + b.wrong, 0)
    };
  }

  getWeeklyActivity() {
    const days = ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র'];
    const counts = [0, 0, 0, 0, 0, 0, 0];
    const now = Date.now();

    this.sessions.forEach(s => {
      const daysAgo = Math.floor((now - s.timestamp) / 86400000);
      if (daysAgo >= 0 && daysAgo < 7) {
        const idx = 6 - daysAgo;
        if (idx >= 0 && idx < 7) counts[idx]++;
      }
    });

    return { labels: days, data: counts };
  }

  getHourlyHeatmap() {
    const hours = new Array(24).fill(0);
    this.sessions.forEach(s => {
      const hour = new Date(s.date).getHours();
      hours[hour]++;
    });
    return hours;
  }

  getStreakDays() {
    if (this.sessions.length === 0) return 0;

    const uniqueDays = [...new Set(
      this.sessions.map(s => new Date(s.date).toDateString())
    )].sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (uniqueDays[0] !== today && uniqueDays[0] !== yesterday) return 0;

    let currentDate = new Date(uniqueDays[0]);
    for (let i = 0; i < uniqueDays.length; i++) {
      if (uniqueDays[i] === currentDate.toDateString()) {
        streak++;
        currentDate = new Date(currentDate.getTime() - 86400000);
      } else {
        break;
      }
    }

    return streak;
  }

  getBestSession() {
    if (this.sessions.length === 0) return null;
    return this.sessions.reduce((best, s) => s.wpm > best.wpm ? s : best);
  }

  clear() {
    this.sessions = [];
  }
}

const statsTracker = new StatsTracker();


/* ═══════════════════════════════════════════════════════
   6. CERTIFICATE GENERATOR
   ═══════════════════════════════════════════════════════ */
class CertificateGenerator {
  static generate(lessonId, wpm, accuracy, date) {
    const lesson = getLessonById(lessonId);
    const lessonTitle = lesson ? lesson.title : `লেসন ${lessonId}`;
    const dateStr = new Date(date).toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return `
      <div style="
        text-align: center;
        padding: 40px;
        background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1));
        border-radius: 16px;
        border: 3px double #6366f1;
      ">
        <div style="font-size: 3rem; margin-bottom: 10px;">🏆</div>
        <h1 style="font-size: 1.8rem; font-weight: 800; color: #6366f1; margin-bottom: 8px;">
          টাইপিং সার্টিফিকেট
        </h1>
        <p style="opacity: 0.8; margin-bottom: 24px;">বাংলা টাইপিং একাডেমি</p>

        <div style="
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
        ">
          <p style="font-size: 0.9rem; opacity: 0.7; margin-bottom: 6px;">এটি প্রদান করা হলো</p>
          <p style="font-size: 1.4rem; font-weight: 700; margin: 8px 0;">${lessonTitle}</p>
          <p style="font-size: 0.85rem; opacity: 0.7;">লেসন সম্পন্ন করার জন্য</p>
        </div>

        <div style="display: flex; justify-content: space-around; margin: 24px 0; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="font-size: 2rem; font-weight: 800; color: #f59e0b;">${wpm}</div>
            <div style="font-size: 0.75rem; opacity: 0.7;">WPM</div>
          </div>
          <div>
            <div style="font-size: 2rem; font-weight: 800; color: #10b981;">${accuracy}%</div>
            <div style="font-size: 0.75rem; opacity: 0.7;">নির্ভুলতা</div>
          </div>
          <div>
            <div style="font-size: 2rem; font-weight: 800; color: #8b5cf6;">${lessonId}</div>
            <div style="font-size: 0.75rem; opacity: 0.7;">লেসন #</div>
          </div>
        </div>

        <div style="
          border-top: 2px solid rgba(255,255,255,0.1);
          padding-top: 16px;
          margin-top: 20px;
        ">
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 0.85rem;">
            <div><strong>তারিখ:</strong> ${dateStr}</div>
            <div><strong style="color: #f59e0b;">MOTTALAB MIA</strong></div>
          </div>
        </div>

        <p style="font-size: 0.7rem; opacity: 0.5; margin-top: 20px;">
          এই সার্টিফিকেটটি স্বয়ংক্রিয়ভাবে তৈরি। প্রত্যয়ন: বাংলা টাইপিং একাডেমি
        </p>
      </div>
    `;
  }

  static download(lessonId, wpm, accuracy, date) {
    const html = this.generate(lessonId, wpm, accuracy, date);
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Certificate</title>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Hind Siliguri', sans-serif;
            background: #f8fafc;
            padding: 40px;
            max-width: 700px;
            margin: auto;
          }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>${html}</body>
      </html>
    `;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `certificate-lesson-${lessonId}.html`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
}


/* ═══════════════════════════════════════════════════════
   7. TYPING UTILITIES
   ═══════════════════════════════════════════════════════ */
const TypingUtils = {
  formatTime(seconds) {
    const mm = Math.floor(seconds / 60);
    const ss = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${mm}:${ss}`;
  },

  getRating(wpm, accuracy) {
    if (wpm >= 80 && accuracy >= 98) return { grade: 'S+', color: '#f59e0b', label: 'অসাধারণ' };
    if (wpm >= 60 && accuracy >= 95) return { grade: 'S', color: '#10b981', label: 'দুর্দান্ত' };
    if (wpm >= 45 && accuracy >= 90) return { grade: 'A', color: '#06b6d4', label: 'খুব ভালো' };
    if (wpm >= 30 && accuracy >= 85) return { grade: 'B', color: '#8b5cf6', label: 'ভালো' };
    if (wpm >= 20 && accuracy >= 75) return { grade: 'C', color: '#6366f1', label: 'মধ্যম' };
    if (wpm >= 10) return { grade: 'D', color: '#f59e0b', label: 'উন্নতি দরকার' };
    return { grade: 'E', color: '#ef4444', label: 'শুরু করুন' };
  },

  getMotivation(wpm, accuracy) {
    const rating = this.getRating(wpm, accuracy);
    const messages = {
      'S+': '🔥 আপনি একজন পেশাদার টাইপিস্ট!',
      'S': '⭐ দুর্দান্ত গতি! চালিয়ে যান!',
      'A': '👏 খুব ভালো! আরও একটু চেষ্টা করুন',
      'B': '💪 ভালো করছেন! প্র্যাকটিস চালিয়ে যান',
      'C': '🎯 মধ্যম গতি — আরও অনুশীলন করুন',
      'D': '📚 আরও প্র্যাকটিস দরকার',
      'E': '🌱 শুরু করুন — প্রতিটি যাত্রা ছোট পদক্ষেপে'
    };
    return messages[rating.grade] || 'চালিয়ে যান!';
  },

  compare(target, typed) {
    return graphemeEngine.compare(target, typed);
  },

  nextChar(target, typed) {
    return graphemeEngine.getNextChar(target, typed);
  },

  isComplete(target, typed) {
    return graphemeEngine.isTrulyComplete(target, typed);
  }
};


/* ═══════════════════════════════════════════════════════
   8. GLOBAL EXPORTS
   ═══════════════════════════════════════════════════════ */
window.graphemeEngine = graphemeEngine;
window.TypingMetrics = TypingMetrics;
window.TypingSession = TypingSession;
window.AISuggestionEngine = AISuggestionEngine;
window.aiEngine = aiEngine;
window.StatsTracker = StatsTracker;
window.statsTracker = statsTracker;
window.CertificateGenerator = CertificateGenerator;
window.TypingUtils = TypingUtils;

window.engine = {
  grapheme: graphemeEngine,
  metrics: TypingMetrics,
  session: TypingSession,
  ai: aiEngine,
  stats: statsTracker,
  certificate: CertificateGenerator,
  utils: TypingUtils
};


/* ═══════════════════════════════════════════════════════
   9. CONSOLE
   ═══════════════════════════════════════════════════════ */
console.log('%c⚙️ Engine.js loaded (ATOMIC v2.1)', 'color:#f59e0b;font-size:15px;font-weight:bold;');
console.log('%c🧠 Grapheme Engine • Last Char Fix • AI Suggestions', 'color:#8b5cf6;font-size:11px;');

console.log('%c📊 Grapheme Engine Test:', 'color:#10b981;font-weight:bold;');
console.log('   "ক্ষ" →', graphemeEngine.split('ক্ষ'));
console.log('   "ত্রি" →', graphemeEngine.split('ত্রি'));
console.log('   "বাংলা" →', graphemeEngine.split('বাংলা'));
console.log('   "শিক্ষ" incomplete? →', graphemeEngine.isLastGraphemeIncomplete('শিক্ষ'));
console.log('   "শিক্ষা" incomplete? →', graphemeEngine.isLastGraphemeIncomplete('শিক্ষা'));
console.log('   "শিক্" incomplete? →', graphemeEngine.isLastGraphemeIncomplete('শিক্'));
