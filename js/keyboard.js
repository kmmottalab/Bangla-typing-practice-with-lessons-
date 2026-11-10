/* ═══════════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — KEYBOARD.JS (ATOMIC ULTIMATE)
   মাল্টি-লেআউট কীবোর্ড + Grapheme-aware + হ্যান্ড
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   BijoyKeyboard Class — মাল্টি-লেআউট সাপোর্ট
   ═══════════════════════════════════════════════════════ */
class BijoyKeyboard {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.options = {
      showHand: options.showHand !== false,
      interactive: options.interactive !== false,
      showLabels: options.showLabels !== false,
      onKeyClick: options.onKeyClick || null,
      layoutId: options.layoutId || 'jatiya'
    };

    this.handElement = null;
    this.currentTargetKey = null;
    this.shiftPressed = false;
    this.currentLayoutId = this.options.layoutId;
    this.rendered = false;

    if (!this.container) {
      console.warn(`⚠️ Keyboard container #${containerId} not found`);
      return;
    }

    this.render();
    if (this.options.showHand) this.createHand();
    this.rendered = true;
  }

  /* ═══════════ RENDER ═══════════ */
  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    const layout = KEYBOARD_LAYOUTS[this.currentLayoutId];
    if (!layout) return;

    const rows = [
      layout.rows.row1,
      layout.rows.row2,
      layout.rows.row3,
      layout.rows.row4,
      layout.rows.row5
    ];

    rows.forEach((row, idx) => {
      const rowEl = document.createElement('div');
      rowEl.className = 'kb-row';
      rowEl.dataset.rowIdx = idx;

      row.forEach(keyData => {
        const keyEl = this.createKeyElement(keyData);
        rowEl.appendChild(keyEl);
      });

      this.container.appendChild(rowEl);
    });
  }

  /* ═══════════ CREATE KEY ═══════════ */
  createKeyElement(keyData) {
    const el = document.createElement('div');
    el.className = 'kb-key';
    el.dataset.key = keyData.key;
    el.dataset.normal = keyData.normal;
    el.dataset.shift = keyData.shift;
    el.dataset.bn = keyData.bn;
    el.dataset.shiftBn = keyData.shiftBn;
    el.dataset.desc = keyData.desc || '';

    if (keyData.wide) el.classList.add(keyData.wide);

    /* English label */
    if (this.options.showLabels) {
      const enLabel = document.createElement('span');
      enLabel.className = 'lbl-en';
      let enText = keyData.key;
      if (keyData.key === 'ShiftLeft' || keyData.key === 'ShiftRight') enText = 'Shift';
      else if (keyData.key === 'ControlLeft' || keyData.key === 'ControlRight') enText = 'Ctrl';
      else if (keyData.key === 'AltLeft' || keyData.key === 'AltRight') enText = 'Alt';
      else if (keyData.key === 'Backspace') enText = '⌫';
      else if (keyData.key === 'Enter') enText = '⏎';
      else if (keyData.key === 'CapsLock') enText = 'Caps';
      else if (keyData.key === 'Tab') enText = 'Tab';
      else if (keyData.key === ' ') enText = 'Space';
      else if (keyData.key === '\\') enText = '\\';
      enLabel.textContent = enText;
      el.appendChild(enLabel);
    }

    /* Bengali label */
    const bnLabel = document.createElement('span');
    bnLabel.className = 'lbl-bn';
    bnLabel.textContent = this.shiftPressed ? keyData.shiftBn : keyData.bn;
    el.appendChild(bnLabel);

    /* Click handlers */
    if (this.options.interactive) {
      const handler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.handleKeyClick(keyData);
      };
      el.addEventListener('click', handler);
      el.addEventListener('touchstart', handler, { passive: false });
    }

    return el;
  }

  /* ═══════════ KEY CLICK ═══════════ */
  handleKeyClick(keyData) {
    this.flashKey(keyData.key);

    let char = this.shiftPressed ? keyData.shiftBn : keyData.bn;

    if (keyData.key === 'ShiftLeft' || keyData.key === 'ShiftRight') {
      this.setShift(!this.shiftPressed);
      return;
    }

    if (keyData.key === 'Backspace') char = 'BACKSPACE';
    else if (keyData.key === 'Enter') char = '\n';
    else if (keyData.key === ' ') char = ' ';

    if (this.options.onKeyClick) {
      this.options.onKeyClick(char, keyData.key, this.shiftPressed);
    }

    if (this.shiftPressed && keyData.key !== 'ShiftLeft' && keyData.key !== 'ShiftRight') {
      this.setShift(false);
    }
  }

  /* ═══════════ SHIFT ═══════════ */
  setShift(on) {
    this.shiftPressed = on;
    if (!this.container) return;
    this.container.querySelectorAll('.kb-key').forEach(el => {
      const bn = on ? el.dataset.shiftBn : el.dataset.bn;
      const bnLabel = el.querySelector('.lbl-bn');
      if (bnLabel && bn) bnLabel.textContent = bn;
      if (el.dataset.key === 'ShiftLeft' || el.dataset.key === 'ShiftRight') {
        el.classList.toggle('shift-active', on);
      }
    });
  }

  /* ═══════════ CREATE HAND ═══════════ */
  createHand() {
    if (!this.options.showHand || !this.container) return;
    const old = this.container.querySelector('.hand-indicator');
    if (old) old.remove();

    const hand = document.createElement('div');
    hand.className = 'hand-indicator';
    hand.textContent = '👆';
    hand.style.cssText = 'position:absolute;opacity:0;pointer-events:none;z-index:100;transition:left .3s cubic-bezier(0.34,1.56,0.64,1),top .3s cubic-bezier(0.34,1.56,0.64,1),opacity .2s;';
    this.container.appendChild(hand);
    this.handElement = hand;
  }

  /* ═══════════ POINT HAND ═══════════ */
  pointHandAtKey(char, shift = false) {
    if (!this.handElement) this.createHand();
    if (!this.handElement) return;

    const keyEl = this.findKeyElement(char, shift);
    if (!keyEl) {
      this.handElement.style.opacity = '0';
      return;
    }

    if (this.currentTargetKey && this.currentTargetKey !== keyEl) {
      this.currentTargetKey.classList.remove('target');
    }
    keyEl.classList.add('target');
    this.currentTargetKey = keyEl;

    if (getComputedStyle(this.container).position === 'static') {
      this.container.style.position = 'relative';
    }

    const containerRect = this.container.getBoundingClientRect();
    const keyRect = keyEl.getBoundingClientRect();

    if (containerRect.width === 0) {
      setTimeout(() => this.pointHandAtKey(char, shift), 150);
      return;
    }

    const x = keyRect.left - containerRect.left + keyRect.width / 2;
    const y = keyRect.top - containerRect.top;

    this.handElement.style.left = `${x}px`;
    this.handElement.style.top = `${y}px`;
    this.handElement.style.opacity = '1';
  }

  /* ═══════════ FIND KEY ELEMENT ═══════════ */
  findKeyElement(char, shift = false) {
    if (!char || !this.container) return null;

    /* যুক্তাক্ষরের ক্ষেত্রে প্রথম বর্ণ থেকে কী খোঁজ */
    const searchChar = char.charAt(0);

    const keys = this.container.querySelectorAll('.kb-key');
    for (const el of keys) {
      const bn = el.dataset.bn;
      const shiftBn = el.dataset.shiftBn;
      const normal = el.dataset.normal;
      const shiftChar = el.dataset.shift;
      if (bn === searchChar || shiftBn === searchChar ||
          normal === searchChar || shiftChar === searchChar) {
        return el;
      }
    }

    /* Latin fallback */
    if (searchChar.length === 1) {
      const lower = searchChar.toLowerCase();
      for (const el of keys) {
        if (el.dataset.key.toLowerCase() === lower) return el;
      }
    }

    return null;
  }

  /* ═══════════ FLASH ═══════════ */
  flashKey(keyName) {
    if (!this.container) return;
    const el = this.container.querySelector(`.kb-key[data-key="${keyName}"]`);
    if (!el) return;
    el.classList.add('pressed');
    if (this.handElement && this.handElement.style.opacity !== '0') {
      this.handElement.classList.add('pressing');
      setTimeout(() => this.handElement?.classList.remove('pressing'), 200);
    }
    setTimeout(() => el.classList.remove('pressed'), 180);
  }

  flashByChar(char, shift = false) {
    const el = this.findKeyElement(char, shift);
    if (!el) return;
    el.classList.add('pressed');
    setTimeout(() => el.classList.remove('pressed'), 180);
  }

  flashWrong(char, shift = false) {
    const el = this.findKeyElement(char, shift);
    if (!el) return;
    el.classList.add('wrong-flash');
    setTimeout(() => el.classList.remove('wrong-flash'), 350);
  }

  clearTarget() {
    if (this.currentTargetKey) {
      this.currentTargetKey.classList.remove('target');
      this.currentTargetKey = null;
    }
    if (this.handElement) this.handElement.style.opacity = '0';
  }

  highlightLessonKeys(keys) {
    if (!this.container) return;
    this.container.querySelectorAll('.kb-key').forEach(el => el.classList.remove('lesson-key'));
    if (!keys || keys.length === 0) return;
    keys.forEach(k => {
      const el = this.container.querySelector(`.kb-key[data-key="${k}"]`);
      if (el) el.classList.add('lesson-key');
    });
  }

  /* ═══════════ CHANGE LAYOUT ═══════════ */
  changeLayout(layoutId) {
    if (!KEYBOARD_LAYOUTS[layoutId]) {
      console.warn('⚠️ Layout not found:', layoutId);
      return false;
    }

    this.currentLayoutId = layoutId;
    this.shiftPressed = false;
    this.currentTargetKey = null;
    this.render();
    if (this.options.showHand) this.createHand();

    console.log('%c⌨️ Layout changed: ' + KEYBOARD_LAYOUTS[layoutId].name, 'color:#8b5cf6;');
    return true;
  }

  refresh() {
    if (this.container) {
      this.container.style.position = 'relative';
      if (this.handElement && this.currentTargetKey) {
        const char = this.currentTargetKey.dataset.bn;
        this.pointHandAtKey(char);
      }
    }
  }

  destroy() {
    if (this.handElement) this.handElement.remove();
    if (this.container) this.container.innerHTML = '';
    this.handElement = null;
    this.currentTargetKey = null;
    this.rendered = false;
  }
}

/* ═══════════════════════════════════════════════════════
   GLOBAL INSTANCES
   ═══════════════════════════════════════════════════════ */
window.liveKeyboard = null;
window.standaloneKeyboard = null;
window.physicalShiftPressed = false;
window.currentLiveLayoutId = 'jatiya';
window.currentStandaloneLayoutId = 'jatiya';

/* ═══════════════════════════════════════════════════════
   INIT LIVE KEYBOARD
   ═══════════════════════════════════════════════════════ */
function initLiveKeyboard(layoutId) {
  const container = document.getElementById('liveKbContainer');
  if (!container) {
    console.warn('⚠️ liveKbContainer not found');
    return;
  }

  const layout = layoutId || window.currentLiveLayoutId || 'jatiya';
  window.currentLiveLayoutId = layout;

  if (window.liveKeyboard) window.liveKeyboard.destroy();

  window.liveKeyboard = new BijoyKeyboard('liveKbContainer', {
    showHand: true,
    interactive: true,
    showLabels: true,
    layoutId: layout,
    onKeyClick: (char, keyName, shift) => {
      const input = document.getElementById('typeInput');
      if (!input || input.disabled) return;

      if (char === 'BACKSPACE') {
        /* Grapheme-aware backspace */
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? input.value.length;
        if (start === end && start > 0) {
          const before = input.value.slice(0, start);
          const segments = window.app?.splitGraphemes
            ? window.app.splitGraphemes(before)
            : [...before];
          if (segments.length > 0) {
            segments.pop();
            const newBefore = segments.join('');
            input.value = newBefore + input.value.slice(end);
            const newPos = newBefore.length;
            input.setSelectionRange(newPos, newPos);
          }
        } else {
          input.value = input.value.slice(0, start) + input.value.slice(end);
          input.setSelectionRange(start, start);
        }
      } else {
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? input.value.length;
        input.value = input.value.slice(0, start) + char + input.value.slice(end);
        input.setSelectionRange(start + char.length, start + char.length);
      }

      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    }
  });

  console.log('%c⌨️ Live keyboard ready: ' + KEYBOARD_LAYOUTS[layout].name, 'color: #10b981;');
}

/* ═══════════════════════════════════════════════════════
   INIT STANDALONE KEYBOARD
   ═══════════════════════════════════════════════════════ */
function initStandaloneKeyboard(layoutId) {
  const container = document.getElementById('virtualKeyboard');
  if (!container) return;

  const layout = layoutId || window.currentStandaloneLayoutId || 'jatiya';
  window.currentStandaloneLayoutId = layout;

  if (window.standaloneKeyboard) window.standaloneKeyboard.destroy();

  window.standaloneKeyboard = new BijoyKeyboard('virtualKeyboard', {
    showHand: false,
    interactive: true,
    showLabels: true,
    layoutId: layout,
    onKeyClick: (char, keyName, shift) => {
      const input = document.getElementById('kbTestInput');
      if (!input) return;
      if (char === 'BACKSPACE') {
        input.value = input.value.slice(0, -1);
      } else {
        input.value += char;
      }
      input.focus();
    }
  });

  console.log('%c⌨️ Standalone keyboard ready: ' + KEYBOARD_LAYOUTS[layout].name, 'color: #10b981;');
}

/* ═══════════════════════════════════════════════════════
   CHANGE LAYOUTS
   ═══════════════════════════════════════════════════════ */
function changeLiveLayout(layoutId) {
  if (!KEYBOARD_LAYOUTS[layoutId]) return;
  window.currentLiveLayoutId = layoutId;
  setActiveLayout(layoutId);

  if (!window.liveKeyboard) {
    initLiveKeyboard(layoutId);
  } else {
    window.liveKeyboard.changeLayout(layoutId);
  }

  /* Re-apply lesson highlight */
  if (window.app?.currentLesson?.keys) {
    setTimeout(() => {
      highlightLessonKeysOnKeyboard(window.app.currentLesson.keys);
      if (window.app?.updateHandIndicator) window.app.updateHandIndicator();
    }, 200);
  }
}

function changeStandaloneLayout(layoutId) {
  if (!KEYBOARD_LAYOUTS[layoutId]) return;
  window.currentStandaloneLayoutId = layoutId;

  if (!window.standaloneKeyboard) {
    initStandaloneKeyboard(layoutId);
  } else {
    window.standaloneKeyboard.changeLayout(layoutId);
  }
}

/* ═══════════════════════════════════════════════════════
   PHYSICAL KEYBOARD LISTENER
   ═══════════════════════════════════════════════════════ */
function setupGlobalKeyboardListener() {
  document.addEventListener('keydown', (e) => {
    const target = e.target;
    const isOurInput = ['typeInput', 'kbTestInput', 'gameInput', 'examInput'].includes(target.id);
    if (!isOurInput && target.tagName !== 'BODY') return;

    if (e.key === 'Shift') {
      window.physicalShiftPressed = true;
      window.liveKeyboard?.setShift(true);
      window.standaloneKeyboard?.setShift(true);
      return;
    }

    /* Support for Bengali physical keyboards — match by key */
    const keyName = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    window.liveKeyboard?.flashKey(keyName);
    window.standaloneKeyboard?.flashKey(keyName);
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
      window.physicalShiftPressed = false;
      window.liveKeyboard?.setShift(false);
      window.standaloneKeyboard?.setShift(false);
    }
  });
}

/* ═══════════════════════════════════════════════════════
   GLOBAL HELPERS
   ═══════════════════════════════════════════════════════ */
function pointHandAtNextChar(char) {
  if (!window.liveKeyboard || !char) return;
  const keyInfo = getKeyForChar(char, window.currentLiveLayoutId);
  if (!keyInfo) {
    window.liveKeyboard.clearTarget();
    return;
  }
  window.liveKeyboard.pointHandAtKey(char, keyInfo.shift);
}

function clearKeyboardTarget() {
  window.liveKeyboard?.clearTarget();
}

function highlightLessonKeysOnKeyboard(keys) {
  window.liveKeyboard?.highlightLessonKeys(keys);
}

function refreshLiveKeyboard() {
  if (!window.liveKeyboard) {
    initLiveKeyboard(window.currentLiveLayoutId);
  } else {
    window.liveKeyboard.refresh();
  }
}

function refreshStandaloneKeyboard() {
  if (!window.standaloneKeyboard) {
    initStandaloneKeyboard(window.currentStandaloneLayoutId);
  }
}

/* ═══════════════════════════════════════════════════════
   AUTO INIT
   ═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initLiveKeyboard(window.currentLiveLayoutId);
    initStandaloneKeyboard(window.currentStandaloneLayoutId);
    setupGlobalKeyboardListener();
  }, 400);
});

/* ═══════════════════════════════════════════════════════
   DEBUG
   ═══════════════════════════════════════════════════════ */
window.debugKeyboard = {
  test: () => {
    console.log('Live:', window.liveKeyboard);
    console.log('Standalone:', window.standaloneKeyboard);
    console.log('Current live layout:', window.currentLiveLayoutId);
  },
  testHand: (char) => pointHandAtNextChar(char),
  reinit: () => {
    initLiveKeyboard(window.currentLiveLayoutId);
    initStandaloneKeyboard(window.currentStandaloneLayoutId);
  },
  changeLayout: (id) => changeLiveLayout(id),
  refresh: () => refreshLiveKeyboard()
};

console.log('%c⌨️ Keyboard.js loaded (ATOMIC)', 'color:#10b981;font-weight:bold;font-size:14px;');
