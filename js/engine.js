/* ═══════════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — ENGINE.JS (ATOMIC ULTIMATE)
   Grapheme-aware টাইপিং ইঞ্জিন — যুক্তাক্ষর/কার-ফলা ১০০% নিখুঁত
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   1. GRAPHEME ENGINE
   যুক্তবর্ণ, কার-চিহ্ন, চন্দ্রবিন্দু — সব একসাথে ধরে
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
        console.log('%c✓ Intl.Segmenter available — using native grapheme splitting', 'color:#10b981;');
      } else {
        console.log('%c⚠ Intl.Segmenter not available — using custom splitter', 'color:#f59e0b;');
      }
    } catch (e) {
      console.warn('Segmenter error:', e);
    }
  }

  /* ═══════ Main Split Function ═══════ */
  split(text) {
    if (!text) return [];

    /* Primary — Intl.Segmenter */
    if (this.segmenter) {
      try {
        return Array.from(this.segmenter.segment(text), s => s.segment);
      } catch (e) {
        console.warn('Segmenter failed, using fallback');
      }
    }

    /* Fallback — Custom Splitter */
    return this.customSplit(text);
  }

  /* ═══════ Custom Splitter (Fallback) ═══════ */
  customSplit(text) {
    if (!text) return [];
    const graphemes = [];
    let i = 0;

    while (i < text.length) {
      const code = text.charCodeAt(i);
      let cluster = text[i];
      i++;

      /* Bengali combining marks */
      while (i < text.length) {
        const nextCode = text.charCodeAt(i);

        const isCombining =
          (nextCode >= 0x09BC && nextCode <= 0x09CD) ||  /* ় ঽ া ি ী ু ূ ৃ ৄ ে ৈ ো ৌ ্ */
          nextCode === 0x09D7 ||                          /* ৗ */
          (nextCode >= 0x09E2 && nextCode <= 0x09E3) ||  /* ৢ ৣ */
          nextCode === 0x09FE ||                          /* ৾ */
          nextCode === 0x200C || nextCode === 0x200D;    /* ZWNJ ZWJ */

        if (isCombining) {
          cluster += text[i];
          i++;

          /* হসন্ত (্) হলে পরবর্তী ব্যঞ্জনবর্ণও যুক্ত */
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

  /* ═══════ Count Graphemes ═══════ */
  count(text) {
    return this.split(text).length;
  }

  /* ═══════ Compare Two Strings ═══════ */
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
      result.perChar.push({ index: i, target: t, typed: p, status });
    }

    return result;
  }

  /* ═══════ Get Next Character ═══════ */
  getNextChar(target, typed) {
    const targetG = this.split(target);
    const typedG = this.split(typed);
    if (typedG.length >= targetG.length) return null;
    return targetG[typedG.length];
  }

  /* ═══════ Is Complete? ═══════ */
  isComplete(target, typed) {
    return this.split(typed).length >= this.split(target).length;
  }

  /* ═══════ Unicode Normalize ═══════ */
  normalize(text) {
    if (!text) return '';
    try {
      return text.normalize('NFC');
    } catch (e) {
      return text;
    }
  }
}

const graphemeEngine = new GraphemeEngine();


/* ═══════════════════════════════════════════════════════
   2. TYPING METRICS ENGINE — WPM, Accuracy, Statistics
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

  /* ═══════ Start ═══════ */
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

  /* ═══════ Stop ═══════ */
  stop() {
    this.endTime = Date.now();
  }

  /* ═══════ Update Stats ═══════ */
  update(correct, wrong, total) {
    this.correctChars = correct;
    this.wrongChars = wrong;
    this.totalChars = total;
  }

  /* ═══════ Record Keystroke ═══════ */
  recordKeystroke(isBackspace = false) {
    const now = Date.now();
    if (this.lastKeystrokeTime) {
      const gap = now - this.lastKeystrokeTime;
      if (gap > 3000) this.pauseTime += gap; /* pause > 3s */
    }
    this.lastKeystrokeTime = now;
    this.keystrokes++;
    if (isBackspace) this.backspaces++;
  }

  /* ═══════ Elapsed Time (seconds) ═══════ */
  getElapsedSeconds() {
    if (!this.startTime) return 0;
    const end = this.endTime || Date.now();
    return Math.max(0, (end - this.startTime - this.pauseTime) / 1000);
  }

  /* ═══════ Elapsed Time (minutes) ═══════ */
  getElapsedMinutes() {
    return this.getElapsedSeconds() / 60;
  }

  /* ═══════ WPM — Standard (5 chars = 1 word) ═══════ */
  getWPM() {
    const minutes = this.getElapsedMinutes();
    if (minutes < 0.001) return 0;
    return Math.round((this.correctChars / 5) / minutes);
  }

  /* ═══════ Gross WPM — Total chars ═══════ */
  getGrossWPM() {
    const minutes = this.getElapsedMinutes();
    if (minutes < 0.001) return 0;
    return Math.round((this.totalChars / 5) / minutes);
  }

  /* ═══════ Accuracy ═══════ */
  getAccuracy() {
    if (this.totalChars === 0) return 100;
    return Math.round((this.correctChars / this.totalChars) * 100);
  }

  /* ═══════ CPM — Characters per minute ═══════ */
  getCPM() {
    const minutes = this.getElapsedMinutes();
    if (minutes < 0.001) return 0;
    return Math.round(this.totalChars / minutes);
  }

  /* ═══════ Consistent WPM (ignoring pauses) ═══════ */
  getConsistentWPM() {
    if (this.keystrokes === 0) return 0;
    const elapsed = this.getElapsedSeconds();
    if (elapsed < 0.001) return 0;
    const avgKeystrokeTime = elapsed / this.keystrokes;
    if (avgKeystrokeTime < 0.001) return 0;
    return Math.round((1 / avgKeystrokeTime) * 12);
  }

  /* ═══════ Full Report ═══════ */
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

  /* ═══════ Reset ═══════ */
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
   3. TYPING SESSION — একটি লেসনের সম্পূর্ণ সেশন
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

  /* ═══════ Start ═══════ */
  start() {
    if (!this.started) {
      this.started = true;
      this.metrics.start();
    }
  }

  /* ═══════ Update typed text ═══════ */
  updateTyped(newText) {
    this.typedText = newText;
    this.typedGraphemes = graphemeEngine.split(newText);
    this.comparison = graphemeEngine.compare(this.targetText, newText);

    const c = this.comparison;
    this.metrics.update(c.correct, c.wrong, c.typedCount);

    /* Track wrong chars */
    c.wrongIndices.forEach(idx => {
      const ch = c.target[idx];
      if (ch && !this.wrongCharsList.includes(ch)) {
        this.wrongCharsList.push(ch);
      }
    });
  }

  /* ═══════ Get next char to type ═══════ */
  getNextChar() {
    if (this.typedGraphemes.length >= this.targetGraphemes.length) return null;
    return this.targetGraphemes[this.typedGraphemes.length];
  }

  /* ═══════ Is complete? ═══════ */
  isComplete() {
    return this.typedGraphemes.length >= this.targetGraphemes.length;
  }

  /* ═══════ Finish ═══════ */
  finish() {
    if (!this.finished) {
      this.finished = true;
      this.metrics.stop();
    }
    return this.metrics.getReport();
  }

  /* ═══════ Get current report ═══════ */
  getReport() {
    return this.metrics.getReport();
  }
}


/* ═══════════════════════════════════════════════════════
   4. AI SUGGESTION ENGINE — দুর্বল অক্ষর ডিটেকশন
   ═══════════════════════════════════════════════════════ */
class AISuggestionEngine {
  constructor() {
    this.errorHistory = {};  /* { char: count } */
    this.wpmHistory = [];
    this.maxHistory = 100;
  }

  /* ═══════ Record error ═══════ */
  recordError(char) {
    if (!char) return;
    this.errorHistory[char] = (this.errorHistory[char] || 0) + 1;
  }

  /* ═══════ Record WPM ═══════ */
  recordWPM(wpm, accuracy) {
    this.wpmHistory.push({ wpm, accuracy, time: Date.now() });
    if (this.wpmHistory.length > this.maxHistory) {
      this.wpmHistory.shift();
    }
  }

  /* ═══════ Get weakest chars ═══════ */
  getWeakestChars(limit = 5) {
    const sorted = Object.entries(this.errorHistory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
    return sorted.map(([char, count]) => ({ char, count }));
  }

  /* ═══════ Get practice suggestions ═══════ */
  getPracticeSuggestions() {
    const weak = this.getWeakestChars(3);
    if (weak.length === 0) return null;

    const weakChars = weak.map(w => w.char);
    const suggestions = [];

    /* শব্দ তৈরি — দুর্বল অক্ষর দিয়ে */
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

    /* চ্যালেঞ্জ তৈরি */
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

  /* ═══════ Get insights ═══════ */
  getInsights() {
    const insights = [];

    if (this.wpmHistory.length === 0) {
      return insights;
    }

    /* Average WPM trend */
    const recent = this.wpmHistory.slice(-10);
    const avgWpm = Math.round(recent.reduce((a, b) => a + b.wpm, 0) / recent.length);
    insights.push({
      type: 'info',
      text: `সাম্প্রতিক ${recent.length}টি লেসনে আপনার গড় WPM: ${avgWpm}`
    });

    /* Trend detection */
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

    /* Weakness */
    const weak = this.getWeakestChars(1);
    if (weak.length > 0) {
      insights.push({
        type: 'tip',
        text: `💡 "${weak[0].char}" অক্ষরে বেশি ভুল হচ্ছে — এটি প্র্যাকটিস করুন`
      });
    }

    return insights;
  }

  /* ═══════ Reset ═══════ */
  reset() {
    this.errorHistory = {};
    this.wpmHistory = [];
  }
}

const aiEngine = new AISuggestionEngine();


/* ═══════════════════════════════════════════════════════
   5. STATISTICS TRACKER — দীর্ঘমেয়াদী বিশ্লেষণ
   ═══════════════════════════════════════════════════════ */
class StatsTracker {
  constructor() {
    this.sessions = [];
  }

  /* ═══════ Add session ═══════ */
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

  /* ═══════ Get today's stats ═══════ */
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

  /* ═══════ Get weekly activity (7 days) ═══════ */
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

  /* ═══════ Get hourly heatmap ═══════ */
  getHourlyHeatmap() {
    const hours = new Array(24).fill(0);
    this.sessions.forEach(s => {
      const hour = new Date(s.date).getHours();
      hours[hour]++;
    });
    return hours;
  }

  /* ═══════ Get streak days ═══════ */
  getStreakDays() {
    if (this.sessions.length === 0) return 0;

    const uniqueDays = [...new Set(
      this.sessions.map(s => new Date(s.date).toDateString())
    )].sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    /* Check if today or yesterday has activity */
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

  /* ═══════ Get best session ═══════ */
  getBestSession() {
    if (this.sessions.length === 0) return null;
    return this.sessions.reduce((best, s) => s.wpm > best.wpm ? s : best);
  }

  /* ═══════ Clear ═══════ */
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
        border: 3px double var(--primary);
      ">
        <div style="font-size: 3rem; margin-bottom: 10px;">🏆</div>
        <h1 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 8px;">
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
            <div>
              <strong>তারিখ:</strong> ${dateStr}
            </div>
            <div>
              <strong style="color: #f59e0b;">MOTTALAB MIA</strong>
            </div>
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
          :root { --primary: #6366f1; }
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
  /* ═══════ Format time ═══════ */
  formatTime(seconds) {
    const mm = Math.floor(seconds / 60);
    const ss = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${mm}:${ss}`;
  },

  /* ═══════ Calculate performance rating ═══════ */
  getRating(wpm, accuracy) {
    if (wpm >= 80 && accuracy >= 98) return { grade: 'S+', color: '#f59e0b', label: 'অসাধারণ' };
    if (wpm >= 60 && accuracy >= 95) return { grade: 'S', color: '#10b981', label: 'দুর্দান্ত' };
    if (wpm >= 45 && accuracy >= 90) return { grade: 'A', color: '#06b6d4', label: 'খুব ভালো' };
    if (wpm >= 30 && accuracy >= 85) return { grade: 'B', color: '#8b5cf6', label: 'ভালো' };
    if (wpm >= 20 && accuracy >= 75) return { grade: 'C', color: '#6366f1', label: 'মধ্যম' };
    if (wpm >= 10) return { grade: 'D', color: '#f59e0b', label: 'উন্নতি দরকার' };
    return { grade: 'E', color: '#ef4444', label: 'শুরু করুন' };
  },

  /* ═══════ Get motivational message ═══════ */
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

  /* ═══════ Deep compare ═══════ */
  compare(target, typed) {
    return graphemeEngine.compare(target, typed);
  },

  /* ═══════ Get next char ═══════ */
  nextChar(target, typed) {
    return graphemeEngine.getNextChar(target, typed);
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
console.log('%c⚙️ Engine.js loaded (ATOMIC)', 'color:#f59e0b;font-size:15px;font-weight:bold;');
console.log('%c🧠 Grapheme Engine • AI Suggestions • Statistics • Certificates', 'color:#8b5cf6;font-size:11px;');

/* Test Grapheme */
console.log('%c📊 Grapheme test:', 'color:#10b981;font-weight:bold;');
console.log('   "ক্ষ" →', graphemeEngine.split('ক্ষ'));  /* Should be ["ক্ষ"] */
console.log('   "ত্রি" →', graphemeEngine.split('ত্রি'));  /* Should be ["ত্রি"] */
console.log('   "বাংলা" →', graphemeEngine.split('বাংলা'));  /* Should be ["বা", "ং", "লা"] */
