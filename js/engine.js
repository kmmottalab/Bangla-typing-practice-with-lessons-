/* ═══════════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — ENGINE.JS (ATOMIC v2.2)
   Complete Fix: Unicode Normalization + য় ড় ঢ় + Last Char + Result
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   1. GRAPHEME ENGINE (with Unicode Normalization)
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
      }
    } catch (e) {
      console.warn('Segmenter error:', e);
    }
  }

  /* ═══════════════════════════════════════════════════════
     ★★★ Unicode Normalization — য় ড় ঢ় fix ★★★
     বিজয়/অভ্র: য + ় = 2 codepoint
     জাতীয়: য় = 1 codepoint (U+09DF)
     Normalize করে সব একই রূপে নিয়ে আসি
     ═══════════════════════════════════════════════════════ */
  normalize(text) {
    if (!text) return '';
    try {
      /* NFC = Precomposed (এক codepoint) */
      return text.normalize('NFC');
    } catch (e) {
      return text;
    }
  }

  /* ═══════════════════════════════════════════════════════
     ★★★ MANUAL Normalization — য় ড় ঢ় combine ★★★
     যদি browser এর normalize() কাজ না করে,
     manually য + ় → য় একসাথে করি
     ═══════════════════════════════════════════════════════ */
  manualNormalize(text) {
    if (!text) return '';

    /* য + ় (nukta) = য় */
    text = text.replace(/\u09AF\u09BC/g, '\u09DF');
    /* ড + ় = ড় */
    text = text.replace(/\u09A1\u09BC/g, '\u09DC');
    /* ঢ + ় = ঢ় */
    text = text.replace(/\u09A2\u09BC/g, '\u09DD');

    return text;
  }

  /* ═══════════════════════════════════════════════════════
     ★★★ FULL Normalize — সব পদ্ধতি একসাথে ★★★
     ═══════════════════════════════════════════════════════ */
  fullNormalize(text) {
    if (!text) return '';
    let normalized = this.normalize(text);
    normalized = this.manualNormalize(normalized);
    return normalized;
  }

  /* ═══════ MAIN SPLIT ═══════ */
  split(text) {
    if (!text) return [];

    /* Normalize first */
    const normalized = this.fullNormalize(text);

    if (this.segmenter) {
      try {
        return Array.from(this.segmenter.segment(normalized), s => s.segment);
      } catch (e) {}
    }

    return this.customSplit(normalized);
  }

  /* ═══════ CUSTOM SPLITTER ═══════ */
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
     ★★★ Last grapheme incomplete check ★★★
     ═══════════════════════════════════════════════════════ */
  isLastGraphemeIncomplete(text) {
    if (!text || text.length === 0) return false;
    const lastChar = text[text.length - 1];
    const code = lastChar.charCodeAt(0);

    const isDangling =
      code === 0x09CD ||
      code === 0x09BC ||
      (code >= 0x09BE && code <= 0x09CC) ||
      code === 0x09D7 ||
      (code >= 0x09E2 && code <= 0x09E3) ||
      code === 0x09FE ||
      code === 0x200C ||
      code === 0x200D;

    return isDangling;
  }

  /* ═══════════════════════════════════════════════════════
     ★★★ TRUE Complete Check (with normalization) ★★★
     ═══════════════════════════════════════════════════════ */
  isTrulyComplete(target, typed) {
    if (!target) return false;

    const targetG = this.split(target);
    const typedG = this.split(typed);

    if (typedG.length < targetG.length) return false;
    if (this.isLastGraphemeIncomplete(typed)) return false;

    for (let i = 0; i < targetG.length; i++) {
      if (typedG[i] !== targetG[i]) return false;
    }

    return true;
  }

  /* ═══════ Count ═══════ */
  count(text) {
    return this.split(text).length;
  }

  /* ═══════════════════════════════════════════════════════
     ★★★ COMPARE — Normalization সহ (য় ড় ঢ় fix) ★★★
     ═══════════════════════════════════════════════════════ */
  compare(target, typed) {
    /* ═══ Normalize উভয় পক্ষ ═══ */
    const targetNorm = this.fullNormalize(target);
    const typedNorm = this.fullNormalize(typed);

    const targetG = this.split(targetNorm);
    const typedG = this.split(typedNorm);

    const result = {
      target: targetG,
      typed: typedG,
      total: targetG.length,
      typedCount: typedG.length,
      correct: 0,
      wrong: 0,
      wrongIndices: [],
      firstWrong: -1,
      lastIncomplete: this.isLastGraphemeIncomplete(typedNorm),
      isComplete: false,
      perChar: []
    };

    const maxLen = Math.max(targetG.length, typedG.length);
    for (let i = 0; i < maxLen; i++) {
      const t = targetG[i] || '';
      const p = typedG[i] || '';
      let status = 'empty';

      if (i < typedG.length) {
        /* ═══ Normalized comparison ═══ */
        const tNorm = this.fullNormalize(t);
        const pNorm = this.fullNormalize(p);

        if (tNorm === pNorm) {
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

  /* ═══════ Debug ═══════ */
  debugInfo(text) {
    if (!text) return { text: '', graphemes: [], length: 0 };
    return {
      text: text,
      normalized: this.fullNormalize(text),
      graphemes: this.split(text),
      length: this.count(text),
      lastIncomplete: this.isLastGraphemeIncomplete(text)
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

  getAccuracy() {
    if (this.totalChars === 0) return 100;
    return Math.round((this.correctChars / this.totalChars) * 100);
  }

  getReport() {
    return {
      wpm: this.getWPM(),
      accuracy: this.getAccuracy(),
      correct: this.correctChars,
      wrong: this.wrongChars,
      total: this.totalChars,
      elapsedSeconds: Math.round(this.getElapsedSeconds())
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
        <h1 style="font-size: 1.8rem; font-weight: 800; color: #6366f1;">
          টাইপিং সার্টিফিকেট
        </h1>
        <p style="opacity: 0.8;">বাংলা টাইপিং একাডেমি</p>
        <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin: 20px 0;">
          <p style="font-size: 0.9rem; opacity: 0.7;">এটি প্রদান করা হলো</p>
          <p style="font-size: 1.4rem; font-weight: 700;">${lessonTitle}</p>
        </div>
        <div style="display: flex; justify-content: space-around; margin: 24px 0; flex-wrap: wrap;">
          <div><div style="font-size: 2rem; font-weight: 800; color: #f59e0b;">${wpm}</div><div style="font-size: 0.75rem; opacity: 0.7;">WPM</div></div>
          <div><div style="font-size: 2rem; font-weight: 800; color: #10b981;">${accuracy}%</div><div style="font-size: 0.75rem; opacity: 0.7;">নির্ভুলতা</div></div>
          <div><div style="font-size: 2rem; font-weight: 800; color: #8b5cf6;">${lessonId}</div><div style="font-size: 0.75rem; opacity: 0.7;">লেসন #</div></div>
        </div>
        <div style="border-top: 2px solid rgba(255,255,255,0.1); padding-top: 16px;">
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <div><strong>তারিখ:</strong> ${dateStr}</div>
            <div><strong style="color: #f59e0b;">MOTTALAB MIA</strong></div>
          </div>
        </div>
      </div>
    `;
  }

  static download(lessonId, wpm, accuracy, date) {
    const html = this.generate(lessonId, wpm, accuracy, date);
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Certificate</title>
      <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700;800&display=swap" rel="stylesheet">
      <style>body{font-family:'Hind Siliguri',sans-serif;background:#f8fafc;padding:40px;max-width:700px;margin:auto;}</style>
      </head><body>${html}</body></html>`;
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
   9. CONSOLE + TEST
   ═══════════════════════════════════════════════════════ */
console.log('%c⚙️ Engine.js loaded (ATOMIC v2.2)', 'color:#f59e0b;font-size:15px;font-weight:bold;');
console.log('%c🔧 য় ড় ঢ় Normalization + Result Display Fix', 'color:#10b981;font-size:11px;');

console.log('%c📊 Unicode Normalization Test:', 'color:#10b981;font-weight:bold;');
console.log('   য় (single) →', graphemeEngine.fullNormalize('য়'));
console.log('   য+় (combined) →', graphemeEngine.fullNormalize('য়'));

/* Test compare — should be correct now */
setTimeout(() => {
  const testCases = [
    { target: 'য়', typed: 'য়', desc: 'য় single' },
    { target: 'য়', typed: 'য়', desc: 'য় combined' },
    { target: 'ড়', typed: 'ড়', desc: 'ড় single' },
    { target: 'ঢ়', typed: 'ঢ়', desc: 'ঢ় single' }
  ];

  console.group('%c🧪 য় ড় ঢ় Compare Test', 'color:#8b5cf6;font-weight:bold;');
  testCases.forEach(tc => {
    const result = graphemeEngine.compare(tc.target, tc.typed);
    const pass = result.correct > 0 && result.wrong === 0;
    console.log(
      pass ? `%c✓ ${tc.desc}: correct=${result.correct}, wrong=${result.wrong}` : `%c✗ ${tc.desc}: correct=${result.correct}, wrong=${result.wrong}`,
      pass ? 'color:#10b981;' : 'color:#ef4444;'
    );
  });
  console.groupEnd();
}, 500);
