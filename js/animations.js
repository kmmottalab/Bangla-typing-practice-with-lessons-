/* ═══════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — ANIMATIONS.JS
   পার্টিকেল + কনফেটি + সাউন্ড + এনিমেটেড কাউন্টার
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   SOUND ENGINE — Web Audio API দিয়ে সব সাউন্ড
   ═══════════════════════════════════════════════════════════ */

class SoundEngine {
  constructor() {
    this.enabled = true;
    this.ctx = null;
    this.masterGain = null;
    this.initContext();
  }

  initContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.15;
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Audio not available:', e);
    }
  }

  ensureContext() {
    if (!this.ctx) this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /* ─────── টোন জেনারেটর ─────── */
  tone(freq, duration = 0.08, type = 'sine', volume = 0.5) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  /* ─────── কী প্রেস — হালকা ক্লিক ─────── */
  keyPress() {
    this.tone(1200, 0.04, 'sine', 0.3);
  }

  /* ─────── সঠিক চর ─────── */
  correct() {
    this.tone(880, 0.06, 'sine', 0.4);
  }

  /* ─────── ভুল চর ─────── */
  wrong() {
    this.tone(220, 0.15, 'square', 0.5);
    setTimeout(() => this.tone(180, 0.12, 'square', 0.4), 60);
  }

  /* ─────── লেসন সম্পন্ন ─────── */
  success() {
    const notes = [523, 659, 784, 1047]; // C E G C
    notes.forEach((freq, i) => {
      setTimeout(() => this.tone(freq, 0.2, 'sine', 0.5), i * 100);
    });
  }

  /* ─────── লেভেল আপ ─────── */
  levelUp() {
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((freq, i) => {
      setTimeout(() => this.tone(freq, 0.18, 'triangle', 0.4), i * 80);
    });
  }

  /* ─────── গেম হিট ─────── */
  hit() {
    this.tone(1500, 0.08, 'square', 0.3);
    setTimeout(() => this.tone(1800, 0.05, 'sine', 0.25), 40);
  }

  /* ─────── গেম মিস ─────── */
  miss() {
    this.tone(150, 0.25, 'sawtooth', 0.4);
  }

  /* ─────── টিক (পরীক্ষার জন্য) ─────── */
  tick() {
    this.tone(1000, 0.05, 'sine', 0.2);
  }

  /* ─────── কনফেটি পপ ─────── */
  pop() {
    this.tone(600, 0.06, 'sine', 0.3);
  }
}

const sound = new SoundEngine();


/* ═══════════════════════════════════════════════════════════
   PARTICLE SYSTEM — কী চাপলে ছোট তারা
   ═══════════════════════════════════════════════════════════ */

class ParticleSystem {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.rafId = null;
    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'particleCanvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
    `;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  /* ─────── বুর্স্ট — একটি পয়েন্ট থেকে ছড়ানো ─────── */
  burst(x, y, options = {}) {
    const count = options.count || 12;
    const colors = options.colors || ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    const speed = options.speed || 4;
    const size = options.size || 4;
    const life = options.life || 800;
    const gravity = options.gravity !== undefined ? options.gravity : 0.15;
    const shape = options.shape || 'circle';

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const velocity = speed * (0.5 + Math.random() * 0.8);

      this.particles.push({
        x, y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: size * (0.5 + Math.random() * 0.8),
        color: colors[Math.floor(Math.random() * colors.length)],
        life: life * (0.7 + Math.random() * 0.6),
        maxLife: life,
        gravity,
        shape,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        opacity: 1
      });
    }
  }

  /* ─────── কনফেটি রেইন — উপরে থেকে পড়া ─────── */
  confetti(duration = 2000) {
    const endTime = Date.now() + duration;
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#ef4444'];

    const spawn = () => {
      if (Date.now() > endTime) return;
      const x = Math.random() * window.innerWidth;
      this.particles.push({
        x, y: -20,
        vx: (Math.random() - 0.5) * 3,
        vy: 2 + Math.random() * 3,
        size: 6 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 3000,
        maxLife: 3000,
        gravity: 0.08,
        shape: Math.random() > 0.5 ? 'square' : 'circle',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1
      });
      setTimeout(spawn, 40);
    };
    spawn();
  }

  /* ─────── এক্সপ্লোশন ─────── */
  explode(x, y) {
    this.burst(x, y, {
      count: 30,
      speed: 8,
      size: 6,
      life: 1200,
      colors: ['#f59e0b', '#ef4444', '#ec4899', '#ffffff']
    });
  }

  /* ─────── লুপ ─────── */
  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.life -= 16; // ~60fps
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.99;
      p.rotation += p.rotationSpeed;
      p.opacity = Math.min(1, p.life / (p.maxLife * 0.3));

      this.ctx.save();
      this.ctx.globalAlpha = p.opacity;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'square') {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else if (p.shape === 'star') {
        this.drawStar(0, 0, 5, p.size, p.size / 2);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    this.rafId = requestAnimationFrame(() => this.loop());
  }

  drawStar(cx, cy, spikes, outerR, innerR) {
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - outerR);
    for (let i = 0; i < spikes; i++) {
      let x = cx + Math.cos(rot) * outerR;
      let y = cy + Math.sin(rot) * outerR;
      this.ctx.lineTo(x, y);
      rot += step;
      x = cx + Math.cos(rot) * innerR;
      y = cy + Math.sin(rot) * innerR;
      this.ctx.lineTo(x, y);
      rot += step;
    }
    this.ctx.lineTo(cx, cy - outerR);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

const particles = new ParticleSystem();


/* ═══════════════════════════════════════════════════════════
   ELEMENT ANIMATIONS — DOM এফেক্ট
   ═══════════════════════════════════════════════════════════ */

/* ─────── সংখ্যা লাফ দিয়ে পরিবর্তন ─────── */
function animateNumber(element, from, to, duration = 600) {
  if (!element) return;
  const startTime = performance.now();
  const diff = to - from;

  const tick = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(from + diff * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ─────── স্ক্রিন শেক ─────── */
function shakeScreen(intensity = 5, duration = 300) {
  const body = document.body;
  const start = Date.now();
  const original = body.style.transform;

  const animate = () => {
    const elapsed = Date.now() - start;
    if (elapsed > duration) {
      body.style.transform = original;
      return;
    }
    const remaining = 1 - elapsed / duration;
    const x = (Math.random() - 0.5) * intensity * 2 * remaining;
    const y = (Math.random() - 0.5) * intensity * 2 * remaining;
    body.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animate);
  };
  animate();
}

/* ─────── ফ্ল্যাশ (রঙ ঝলক) ─────── */
function flashScreen(color = '#ef4444', duration = 200) {
  const flash = document.createElement('div');
  flash.style.cssText = `
    position: fixed;
    inset: 0;
    background: ${color};
    opacity: 0.3;
    pointer-events: none;
    z-index: 9999;
    animation: screenFlash ${duration}ms ease-out;
  `;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), duration);
}

/* ─────── POP-IN এফেক্ট ─────── */
function popIn(element, scale = 1.2, duration = 300) {
  if (!element) return;
  element.style.transition = `transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
  element.style.transform = `scale(${scale})`;
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, duration / 2);
}

/* ─────── FLOATING TEXT — মাউসের কাছে ভেসে ওঠা ─────── */
function floatText(text, x, y, color = '#f59e0b', size = 24) {
  const el = document.createElement('div');
  el.textContent = text;
  el.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    color: ${color};
    font-size: ${size}px;
    font-weight: 900;
    pointer-events: none;
    z-index: 9999;
    text-shadow: 0 0 12px ${color}, 0 2px 8px rgba(0,0,0,0.5);
    animation: floatUp 1.2s ease-out forwards;
    font-family: 'Hind Siliguri', sans-serif;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

/* ─────── RIPPLE — বাটনে ক্লিক ─────── */
function rippleEffect(element, event) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const x = (event?.clientX || rect.left + rect.width / 2) - rect.left;
  const y = (event?.clientY || rect.top + rect.height / 2) - rect.top;
  const size = Math.max(rect.width, rect.height) * 2;

  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    left: ${x - size / 2}px;
    top: ${y - size / 2}px;
    width: ${size}px;
    height: ${size}px;
    background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
  `;
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

/* ─────── ENTRY ANIMATION — লেসন কার্ড ঢোকা ─────── */
function staggerIn(container, selector, delay = 50) {
  if (!container) return;
  const items = container.querySelectorAll(selector);
  items.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * delay);
  });
}


/* ═══════════════════════════════════════════════════════════
   SPECIAL EFFECTS — বিশেষ এফেক্ট
   ═══════════════════════════════════════════════════════════ */

/* ─────── কম্বো এফেক্ট — সঠিক টাইপিংয়ের স্ট্রিক ─────── */
let comboCount = 0;
let comboTimer = null;

function triggerCorrectChar(element) {
  comboCount++;
  clearTimeout(comboTimer);

  // হালকা সাউন্ড
  if (comboCount % 5 === 0) {
    sound.hit();
  } else {
    sound.correct();
  }

  // পার্টিকেল (প্রতি ৫ চরে একবার)
  if (comboCount % 5 === 0 && element) {
    const rect = element.getBoundingClientRect();
    particles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, {
      count: 8,
      speed: 3,
      size: 3,
      life: 600,
      colors: ['#10b981', '#f59e0b', '#a855f7']
    });
  }

  // 25+ কম্বো — স্ক্রিনে "COMBO x25!" দেখাও
  if (comboCount >= 25 && comboCount % 25 === 0 && element) {
    const rect = element.getBoundingClientRect();
    floatText(`COMBO x${comboCount}!`, rect.left + rect.width / 2, rect.top - 20, '#f59e0b', 22);
    if (comboCount >= 50) sound.levelUp();
  }

  comboTimer = setTimeout(() => { comboCount = 0; }, 2000);
}

function triggerWrongChar(element) {
  comboCount = 0;
  sound.wrong();

  if (element) {
    const rect = element.getBoundingClientRect();
    // ভুল হলে ছোট লাল পার্টিকেল
    particles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, {
      count: 4,
      speed: 2,
      size: 3,
      life: 400,
      colors: ['#ef4444']
    });
  }
}

function resetCombo() {
  comboCount = 0;
  clearTimeout(comboTimer);
}

/* ─────── লেসন সম্পন্ন উদযাপন ─────── */
function celebrateLessonComplete(wpm, accuracy) {
  sound.success();

  // সেন্টার থেকে কনফেটি
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  particles.burst(centerX, centerY, {
    count: 40,
    speed: 10,
    size: 8,
    life: 1500,
    colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#06b6d4']
  });

  setTimeout(() => {
    particles.confetti(2500);
  }, 200);

  // স্ক্রিন ফ্ল্যাশ (সবুজ)
  flashScreen('#10b981', 250);

  // সেন্টারে বড় টেক্সট
  setTimeout(() => {
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
      color: #fff;
      padding: 30px 50px;
      border-radius: 24px;
      font-size: 1.5rem;
      font-weight: 800;
      text-align: center;
      z-index: 10000;
      box-shadow: 0 20px 60px rgba(99, 102, 241, 0.6);
      animation: completePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      font-family: 'Hind Siliguri', sans-serif;
    `;
    el.innerHTML = `
      <div style="font-size: 3rem; margin-bottom: 10px;">🎉</div>
      <div>লেসন সম্পন্ন!</div>
      <div style="font-size: 1rem; opacity: 0.9; margin-top: 8px;">
        ${wpm} WPM • ${accuracy}% নির্ভুলতা
      </div>
    `;
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 0.5s';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 500);
    }, 2000);
  }, 100);
}

/* ─────── লেভেল আপ ─────── */
function celebrateLevelUp(level) {
  sound.levelUp();
  particles.confetti(3000);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  particles.burst(centerX, centerY, {
    count: 50,
    speed: 12,
    size: 10,
    life: 1800,
    colors: ['#f59e0b', '#fbbf24', '#ef4444']
  });

  setTimeout(() => {
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed;
      left: 50%;
      top: 30%;
      transform: translate(-50%, -50%) scale(0);
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: #fff;
      padding: 20px 40px;
      border-radius: 20px;
      font-size: 1.5rem;
      font-weight: 800;
      z-index: 10000;
      box-shadow: 0 20px 60px rgba(245, 158, 11, 0.7);
      animation: completePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      font-family: 'Hind Siliguri', sans-serif;
    `;
    el.innerHTML = `⭐ LEVEL ${level} ⭐`;
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 0.5s';
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 500);
    }, 1800);
  }, 400);
}


/* ═══════════════════════════════════════════════════════════
   COMBO METER — স্ক্রিনে কম্বো দেখানোর জন্য
   ═══════════════════════════════════════════════════════════ */

function updateComboMeter(count) {
  let meter = document.getElementById('comboMeter');
  if (!meter) {
    meter = document.createElement('div');
    meter.id = 'comboMeter';
    meter.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: #fff;
      padding: 10px 20px;
      border-radius: 16px;
      font-weight: 800;
      font-size: 1.2rem;
      z-index: 9997;
      box-shadow: 0 4px 20px rgba(245, 158, 11, 0.6);
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.3s ease;
      pointer-events: none;
      font-family: 'Hind Siliguri', sans-serif;
    `;
    document.body.appendChild(meter);
  }

  if (count >= 5) {
    meter.textContent = `🔥 x${count}`;
    meter.style.opacity = '1';
    meter.style.transform = 'scale(1)';
    // Pulse animation
    meter.style.animation = 'none';
    void meter.offsetWidth;
    meter.style.animation = 'comboPulse 0.3s ease';
  } else {
    meter.style.opacity = '0';
    meter.style.transform = 'scale(0.5)';
  }
}


/* ═══════════════════════════════════════════════════════════
   STREAK FLAME — স্ট্রিক ফায়ার এফেক্ট
   ═══════════════════════════════════════════════════════════ */

function updateStreakFlame(days) {
  const el = document.getElementById('statStreak');
  if (!el) return;

  const parent = el.closest('.stat-card');
  if (!parent) return;

  // Remove existing flame
  let flame = parent.querySelector('.streak-flame');
  if (flame) flame.remove();

  if (days > 0) {
    flame = document.createElement('div');
    flame.className = 'streak-flame';
    flame.style.cssText = `
      position: absolute;
      top: -8px;
      right: -8px;
      font-size: 1.5rem;
      animation: flameFlicker 0.6s ease-in-out infinite;
      filter: drop-shadow(0 0 8px #f59e0b);
      z-index: 5;
    `;
    flame.textContent = '🔥';
    parent.style.position = 'relative';
    parent.appendChild(flame);
  }
}


/* ═══════════════════════════════════════════════════════════
   TYPING CURSOR BLINK — কাস্টম কার্সর
   ═══════════════════════════════════════════════════════════ */

function createTypingCursor() {
  // CSS-এ blink animation আছে, দরকার নেই
  // এই ফাংশন future use-এর জন্য
}


/* ═══════════════════════════════════════════════════════════
   INJECT CSS ANIMATIONS — dynamic keyframes
   ═══════════════════════════════════════════════════════════ */

function injectAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes screenFlash {
      from { opacity: 0.3; }
      to { opacity: 0; }
    }
    @keyframes floatUp {
      0% { opacity: 1; transform: translate(-50%, 0) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -80px) scale(1.5); }
    }
    @keyframes ripple {
      to { transform: scale(1); opacity: 0; }
    }
    @keyframes completePop {
      0% { transform: translate(-50%, -50%) scale(0) rotate(-10deg); }
      60% { transform: translate(-50%, -50%) scale(1.15) rotate(3deg); }
      100% { transform: translate(-50%, -50%) scale(1) rotate(0); }
    }
    @keyframes comboPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }
    @keyframes flameFlicker {
      0%, 100% { transform: scale(1) rotate(-5deg); opacity: 1; }
      50% { transform: scale(1.15) rotate(5deg); opacity: 0.85; }
    }
    #particleCanvas {
      display: block;
    }
  `;
  document.head.appendChild(style);
}

injectAnimationStyles();


/* ═══════════════════════════════════════════════════════════
   GLOBAL EXPORT — app.js থেকে ব্যবহারের জন্য
   ═══════════════════════════════════════════════════════════ */

window.animations = {
  sound,
  particles,
  animateNumber,
  shakeScreen,
  flashScreen,
  popIn,
  floatText,
  rippleEffect,
  staggerIn,
  triggerCorrectChar,
  triggerWrongChar,
  resetCombo,
  updateComboMeter,
  celebrateLessonComplete,
  celebrateLevelUp,
  updateStreakFlame
};


/* ═══════════════════════════════════════════════════════════
   BUTTON RIPPLE — সব বাটনে রিপল এফেক্ট
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('click', (e) => {
  const target = e.target.closest('.btn-ultra, .btn-filter, .nav-btn, .lesson-card');
  if (target) {
    rippleEffect(target, e);
  }
});


/* ═══════════════════════════════════════════════════════════
   UNLOCK AUDIO CONTEXT — প্রথম ক্লিকে অডিও সক্রিয়
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('click', () => {
  sound.ensureContext();
}, { once: true });

document.addEventListener('keydown', () => {
  sound.ensureContext();
}, { once: true });


/* ═══════════════════════════════════════════════════════════
   KEYBOARD CLICK SOUND — কীবোর্ডে চাপলে সাউন্ড
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('keydown', (e) => {
  const target = e.target;
  if (target.id === 'typeInput' || target.id === 'gameInput' || target.id === 'kbTestInput') {
    if (e.key.length === 1) {
      sound.keyPress();
    } else if (e.key === 'Backspace' || e.key === 'Enter') {
      sound.keyPress();
    }
  }
}, true);


/* ═══════════════════════════════════════════════════════════
   CONSOLE INFO
   ═══════════════════════════════════════════════════════════ */

console.log('%c🎬 Animations Loaded', 'color: #ec4899; font-size: 16px; font-weight: bold;');
console.log('%c✨ window.animations থেকে সব এফেক্ট ব্যবহার করতে পারবেন', 'color: #8b5cf6; font-size: 12px;');
