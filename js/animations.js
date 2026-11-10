/* ═══════════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — ANIMATIONS.JS (ATOMIC ULTIMATE)
   পার্টিকেল + কনফেটি + সাউন্ড + এনিমেশন
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   1. SOUND ENGINE — Web Audio API
   ═══════════════════════════════════════════════════════ */
class SoundEngine {
  constructor() {
    this.enabled = true;
    this.ctx = null;
    this.masterGain = null;
    this.volume = 0.15;
    this.initContext();
  }

  initContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;
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

  /* ═══════ Basic Tone ═══════ */
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

  /* ═══════ Advance Tone (frequency sweep) ═══════ */
  sweep(freqStart, freqEnd, duration = 0.15, type = 'sine', volume = 0.4) {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  /* ═══════ Predefined Sounds ═══════ */
  keyPress() { this.tone(1200, 0.04, 'sine', 0.3); }
  correct() { this.tone(880, 0.06, 'sine', 0.4); }

  wrong() {
    this.tone(220, 0.15, 'square', 0.5);
    setTimeout(() => this.tone(180, 0.12, 'square', 0.4), 60);
  }

  success() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => this.tone(freq, 0.2, 'sine', 0.5), i * 100);
    });
  }

  levelUp() {
    const notes = [523, 659, 784, 1047, 1319];
    notes.forEach((freq, i) => {
      setTimeout(() => this.tone(freq, 0.18, 'triangle', 0.4), i * 80);
    });
  }

  hit() {
    this.tone(1500, 0.08, 'square', 0.3);
    setTimeout(() => this.tone(1800, 0.05, 'sine', 0.25), 40);
  }

  miss() { this.tone(150, 0.25, 'sawtooth', 0.4); }
  tick() { this.tone(1000, 0.05, 'sine', 0.2); }
  pop() { this.tone(600, 0.06, 'sine', 0.3); }

  click() { this.tone(400, 0.03, 'sine', 0.2); }

  /* ═══════ Advanced Sounds ═══════ */
  combo(streak) {
    const baseFreq = 400 + streak * 40;
    this.tone(baseFreq, 0.05, 'sine', 0.3);
  }

  achievement() {
    const notes = [784, 988, 1175, 1568];
    notes.forEach((freq, i) => {
      setTimeout(() => this.tone(freq, 0.15, 'triangle', 0.4), i * 100);
    });
  }

  typingStart() {
    this.sweep(300, 600, 0.2, 'sine', 0.3);
  }

  typingEnd() {
    this.sweep(600, 300, 0.2, 'sine', 0.3);
  }

  /* ═══════ Controls ═══════ */
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  setVolume(v) {
    this.volume = Math.max(0, Math.min(1, v));
    if (this.masterGain) this.masterGain.gain.value = this.volume;
  }
}

const sound = new SoundEngine();


/* ═══════════════════════════════════════════════════════
   2. PARTICLE SYSTEM — Canvas
   ═══════════════════════════════════════════════════════ */
class ParticleSystem {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.rafId = null;
    this.maxParticles = 500;
    this.init();
  }

  init() {
    if (document.getElementById('particleCanvas')) return;
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
    if (!this.canvas) return;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  }

  /* ═══════ Burst — নির্দিষ্ট পয়েন্ট থেকে ═══════ */
  burst(x, y, options = {}) {
    const count = options.count || 12;
    const colors = options.colors || ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    const speed = options.speed || 4;
    const size = options.size || 4;
    const life = options.life || 800;
    const gravity = options.gravity !== undefined ? options.gravity : 0.15;
    const shape = options.shape || 'circle';

    if (this.particles.length > this.maxParticles) {
      this.particles = this.particles.slice(-this.maxParticles);
    }

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

  /* ═══════ Confetti — উপরে থেকে পড়া ═══════ */
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

  /* ═══════ Explosion — বড় বিস্ফোরণ ═══════ */
  explode(x, y) {
    this.burst(x, y, {
      count: 30,
      speed: 8,
      size: 6,
      life: 1200,
      colors: ['#f59e0b', '#ef4444', '#ec4899', '#ffffff']
    });
  }

  /* ═══════ Star Burst — তারা বিস্ফোরণ ═══════ */
  starBurst(x, y) {
    this.burst(x, y, {
      count: 20,
      speed: 6,
      size: 8,
      life: 1000,
      shape: 'star',
      colors: ['#fbbf24', '#f59e0b', '#ef4444']
    });
  }

  /* ═══════ Firework — আতশবাজি ═══════ */
  firework(x, y) {
    const color = ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#06b6d4'][Math.floor(Math.random() * 5)];
    this.burst(x, y, {
      count: 40,
      speed: 10,
      size: 5,
      life: 1500,
      gravity: 0.2,
      colors: [color, '#ffffff']
    });
  }

  /* ═══════ Trail — পিছু পিছু ═══════ */
  trail(x, y, color = '#6366f1') {
    this.particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 3 + Math.random() * 3,
      color,
      life: 500,
      maxLife: 500,
      gravity: 0.05,
      shape: 'circle',
      rotation: 0,
      rotationSpeed: 0,
      opacity: 1
    });
  }

  /* ═══════ Loop ═══════ */
  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.life -= 16;
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
      } else if (p.shape === 'triangle') {
        this.ctx.beginPath();
        this.ctx.moveTo(0, -p.size / 2);
        this.ctx.lineTo(p.size / 2, p.size / 2);
        this.ctx.lineTo(-p.size / 2, p.size / 2);
        this.ctx.closePath();
        this.ctx.fill();
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

  clear() {
    this.particles = [];
  }
}

const particles = new ParticleSystem();


/* ═══════════════════════════════════════════════════════
   3. UTILITY ANIMATIONS
   ═══════════════════════════════════════════════════════ */

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

function popIn(element, scale = 1.2, duration = 300) {
  if (!element) return;
  element.style.transition = `transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
  element.style.transform = `scale(${scale})`;
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, duration / 2);
}

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
    transform: translate(-50%, 0);
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

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
    z-index: 1;
  `;
  if (getComputedStyle(element).position === 'static') {
    element.style.position = 'relative';
  }
  element.style.overflow = 'hidden';
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

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

function slideIn(element, direction = 'left') {
  if (!element) return;
  const startX = direction === 'left' ? -50 : 50;
  element.style.opacity = '0';
  element.style.transform = `translateX(${startX}px)`;
  setTimeout(() => {
    element.style.transition = 'all 0.4s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateX(0)';
  }, 10);
}

function bounceIn(element) {
  if (!element) return;
  element.style.transform = 'scale(0)';
  setTimeout(() => {
    element.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    element.style.transform = 'scale(1)';
  }, 10);
}


/* ═══════════════════════════════════════════════════════
   4. COMBO SYSTEM
   ═══════════════════════════════════════════════════════ */

let comboCount = 0;
let comboTimer = null;
window._comboCount = 0;

function triggerCorrectChar(element) {
  comboCount++;
  window._comboCount = comboCount;
  clearTimeout(comboTimer);

  if (comboCount % 5 === 0) {
    sound.combo(comboCount);
  } else {
    sound.correct();
  }

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

  if (comboCount >= 25 && comboCount % 25 === 0) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    floatText(`COMBO x${comboCount}!`, centerX, centerY - 100, '#f59e0b', 32);
    if (comboCount >= 50) sound.levelUp();
    particles.starBurst(centerX, centerY);
  }

  if (comboCount === 100) {
    sound.achievement();
    particles.confetti(3000);
    floatText('🔥 CENTURY! 🔥', window.innerWidth / 2, window.innerHeight / 2, '#ef4444', 40);
  }

  updateComboMeter(comboCount);

  comboTimer = setTimeout(() => {
    comboCount = 0;
    window._comboCount = 0;
    updateComboMeter(0);
  }, 2000);
}

function triggerWrongChar(element) {
  comboCount = 0;
  window._comboCount = 0;
  updateComboMeter(0);
  sound.wrong();

  if (element) {
    const rect = element.getBoundingClientRect();
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
  window._comboCount = 0;
  clearTimeout(comboTimer);
  updateComboMeter(0);
}

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
    meter.style.animation = 'none';
    void meter.offsetWidth;
    meter.style.animation = 'comboPulse 0.3s ease';
  } else {
    meter.style.opacity = '0';
    meter.style.transform = 'scale(0.5)';
  }
}

/* ═══════ Combo update UI directly ═══════ */
function updateComboUI(count) {
  const el = document.getElementById('combo');
  if (el) el.textContent = count;
}


/* ═══════════════════════════════════════════════════════
   5. CELEBRATIONS
   ═══════════════════════════════════════════════════════ */

function celebrateLessonComplete(wpm, accuracy) {
  sound.success();

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  particles.burst(centerX, centerY, {
    count: 40,
    speed: 10,
    size: 8,
    life: 1500,
    colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#06b6d4']
  });

  setTimeout(() => particles.confetti(2500), 200);
  flashScreen('#10b981', 250);

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

function celebrateAchievement(title, description) {
  sound.achievement();

  const el = document.createElement('div');
  el.style.cssText = `
    position: fixed;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%) scale(0);
    background: linear-gradient(135deg, #10b981, #059669);
    color: #fff;
    padding: 24px 40px;
    border-radius: 20px;
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
    z-index: 10000;
    box-shadow: 0 20px 60px rgba(16, 185, 129, 0.7);
    animation: completePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    font-family: 'Hind Siliguri', sans-serif;
    min-width: 280px;
  `;
  el.innerHTML = `
    <div style="font-size: 2.5rem; margin-bottom: 8px;">🏆</div>
    <div>${title}</div>
    <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 6px;">${description || ''}</div>
  `;
  document.body.appendChild(el);

  particles.firework(window.innerWidth / 2, window.innerHeight / 2);

  setTimeout(() => {
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 500);
  }, 2500);
}

function showComboBreak() {
  const el = document.createElement('div');
  el.textContent = '💔 COMBO BREAK';
  el.style.cssText = `
    position: fixed;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%) scale(0);
    color: #ef4444;
    font-size: 1.5rem;
    font-weight: 800;
    z-index: 10000;
    text-shadow: 0 0 20px rgba(239, 68, 68, 0.8), 0 4px 12px rgba(0,0,0,0.5);
    animation: completePop 0.5s ease forwards;
    font-family: 'Hind Siliguri', sans-serif;
    pointer-events: none;
  `;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity 0.4s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 400);
  }, 800);
}


/* ═══════════════════════════════════════════════════════
   6. STREAK FLAME
   ═══════════════════════════════════════════════════════ */

function updateStreakFlame(days) {
  const el = document.getElementById('statStreak');
  if (!el) return;
  const parent = el.closest('.stat-card');
  if (!parent) return;

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


/* ═══════════════════════════════════════════════════════
   7. INJECT STYLES
   ═══════════════════════════════════════════════════════ */

function injectAnimationStyles() {
  if (document.getElementById('animationStyles')) return;
  const style = document.createElement('style');
  style.id = 'animationStyles';
  style.textContent = `
    @keyframes screenFlash { from { opacity: 0.3; } to { opacity: 0; } }
    @keyframes floatUp {
      0% { opacity: 1; transform: translate(-50%, 0) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -80px) scale(1.5); }
    }
    @keyframes ripple { to { transform: scale(1); opacity: 0; } }
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
    #particleCanvas { display: block; }
  `;
  document.head.appendChild(style);
}

injectAnimationStyles();


/* ═══════════════════════════════════════════════════════
   8. GLOBAL EXPORT
   ═══════════════════════════════════════════════════════ */

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
  slideIn,
  bounceIn,
  triggerCorrectChar,
  triggerWrongChar,
  resetCombo,
  updateComboMeter,
  updateComboUI,
  celebrateLessonComplete,
  celebrateLevelUp,
  celebrateAchievement,
  showComboBreak,
  updateStreakFlame
};


/* ═══════════════════════════════════════════════════════
   9. BUTTON RIPPLE — সব বাটনে
   ═══════════════════════════════════════════════════════ */

document.addEventListener('click', (e) => {
  const target = e.target.closest('.btn-ultra, .btn-filter, .nav-btn, .lesson-card, .quick-action');
  if (target) {
    rippleEffect(target, e);
  }
});


/* ═══════════════════════════════════════════════════════
   10. AUDIO CONTEXT UNLOCK
   ═══════════════════════════════════════════════════════ */

document.addEventListener('click', () => sound.ensureContext(), { once: true });
document.addEventListener('keydown', () => sound.ensureContext(), { once: true });


/* ═══════════════════════════════════════════════════════
   11. KEYBOARD CLICK SOUND
   ═══════════════════════════════════════════════════════ */

document.addEventListener('keydown', (e) => {
  const target = e.target;
  if (['typeInput', 'gameInput', 'kbTestInput', 'examInput'].includes(target.id)) {
    if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter') {
      sound.keyPress();
    }
  }
}, true);


/* ═══════════════════════════════════════════════════════
   12. KEYBOARD SHORTCUTS
   ═══════════════════════════════════════════════════════ */

document.addEventListener('keydown', (e) => {
  /* Ctrl+Enter → পরবর্তী লেসন */
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    if (window.app && typeof app.nextLesson === 'function') app.nextLesson();
  }
  /* Escape → ফোকাস মোড off */
  if (e.key === 'Escape') {
    document.body.classList.remove('focus-mode');
  }
});


/* ═══════════════════════════════════════════════════════
   13. CONSOLE
   ═══════════════════════════════════════════════════════ */

console.log('%c🎬 Animations.js loaded (ATOMIC)', 'color:#ec4899;font-size:15px;font-weight:bold;');
console.log('%c✨ animations.sound, animations.particles, animations.celebrateLessonComplete', 'color:#8b5cf6;font-size:11px;');
