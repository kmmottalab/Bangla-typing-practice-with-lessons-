/* ═══════════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — DATA.JS (ATOMIC VERSION)
   ১৭০+ আধুনিক লেসন • কীবোর্ড সিরিয়াল • মুখস্থ-উপযোগী
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   BIJOY KEYBOARD LAYOUT — সম্পূর্ণ ইউনিকোড
   ═══════════════════════════════════════════════════════ */
const BIJOY_LAYOUT = {
  row1: [
    { key: '`', normal: '`', shift: '~', bn: '`', shiftBn: '~', desc: 'ব্যাকটিক' },
    { key: '1', normal: '১', shift: '!', bn: '১', shiftBn: '!', desc: 'এক' },
    { key: '2', normal: '২', shift: '@', bn: '২', shiftBn: '@', desc: 'দুই' },
    { key: '3', normal: '৩', shift: '#', bn: '৩', shiftBn: '#', desc: 'তিন' },
    { key: '4', normal: '৪', shift: '$', bn: '৪', shiftBn: '$', desc: 'চার' },
    { key: '5', normal: '৫', shift: '%', bn: '৫', shiftBn: '%', desc: 'পাঁচ' },
    { key: '6', normal: '৬', shift: '^', bn: '৬', shiftBn: '^', desc: 'ছয়' },
    { key: '7', normal: '৭', shift: '&', bn: '৭', shiftBn: '&', desc: 'সাত' },
    { key: '8', normal: '৮', shift: '*', bn: '৮', shiftBn: '*', desc: 'আট' },
    { key: '9', normal: '৯', shift: '(', bn: '৯', shiftBn: '(', desc: 'নয়' },
    { key: '0', normal: '০', shift: ')', bn: '০', shiftBn: ')', desc: 'শূন্য' },
    { key: '-', normal: '-', shift: '_', bn: '-', shiftBn: '_', desc: 'হাইফেন' },
    { key: '=', normal: '=', shift: '+', bn: '=', shiftBn: '+', desc: 'সমান' },
    { key: 'Backspace', normal: '⌫', shift: '⌫', bn: '⌫', shiftBn: '⌫', desc: 'মুছুন', wide: 'backspace' }
  ],
  row2: [
    { key: 'Tab', normal: '⇥', shift: '⇥', bn: '⇥', shiftBn: '⇥', desc: 'ট্যাব', wide: 'wide' },
    { key: 'q', normal: 'দ', shift: 'ধ', bn: 'দ', shiftBn: 'ধ', desc: 'দ / ধ' },
    { key: 'w', normal: 'ূ', shift: 'ঊ', bn: 'ূ', shiftBn: 'ঊ', desc: 'ূ / ঊ' },
    { key: 'e', normal: 'ী', shift: 'ঈ', bn: 'ী', shiftBn: 'ঈ', desc: 'ী / ঈ' },
    { key: 'r', normal: 'র', shift: 'ড়', bn: 'র', shiftBn: 'ড়', desc: 'র / ড়' },
    { key: 't', normal: 'ট', shift: 'ঠ', bn: 'ট', shiftBn: 'ঠ', desc: 'ট / ঠ' },
    { key: 'y', normal: 'এ', shift: 'ঐ', bn: 'এ', shiftBn: 'ঐ', desc: 'এ / ঐ' },
    { key: 'u', normal: 'ু', shift: 'উ', bn: 'ু', shiftBn: 'উ', desc: 'ু / উ' },
    { key: 'i', normal: 'ি', shift: 'ই', bn: 'ি', shiftBn: 'ই', desc: 'ি / ই' },
    { key: 'o', normal: 'ো', shift: 'ঔ', bn: 'ো', shiftBn: 'ঔ', desc: 'ো / ঔ' },
    { key: 'p', normal: 'প', shift: 'ফ', bn: 'প', shiftBn: 'ফ', desc: 'প / ফ' },
    { key: '[', normal: '(', shift: '{', bn: '(', shiftBn: '{', desc: 'বন্ধনী' },
    { key: ']', normal: ')', shift: '}', bn: ')', shiftBn: '}', desc: 'বন্ধনী' },
    { key: '\\', normal: 'ৎ', shift: 'ঃ', bn: 'ৎ', shiftBn: 'ঃ', desc: 'ৎ / ঃ' }
  ],
  row3: [
    { key: 'CapsLock', normal: '⇪', shift: '⇪', bn: '⇪', shiftBn: '⇪', desc: 'ক্যাপস', wide: 'wide' },
    { key: 'a', normal: 'া', shift: 'অ', bn: 'া', shiftBn: 'অ', desc: 'া / অ' },
    { key: 's', normal: 'স', shift: 'শ', bn: 'স', shiftBn: 'শ', desc: 'স / শ' },
    { key: 'd', normal: 'ড', shift: 'ঢ', bn: 'ড', shiftBn: 'ঢ', desc: 'ড / ঢ' },
    { key: 'f', normal: '্', shift: 'ঋ', bn: '্', shiftBn: 'ঋ', desc: 'হসন্ত / ঋ' },
    { key: 'g', normal: 'গ', shift: 'ঘ', bn: 'গ', shiftBn: 'ঘ', desc: 'গ / ঘ' },
    { key: 'h', normal: 'হ', shift: 'ঙ', bn: 'হ', shiftBn: 'ঙ', desc: 'হ / ঙ' },
    { key: 'j', normal: 'জ', shift: 'ঝ', bn: 'জ', shiftBn: 'ঝ', desc: 'জ / ঝ' },
    { key: 'k', normal: 'ক', shift: 'খ', bn: 'ক', shiftBn: 'খ', desc: 'ক / খ' },
    { key: 'l', normal: 'ল', shift: '঳', bn: 'ল', shiftBn: '঳', desc: 'ল / ঳' },
    { key: ';', normal: ';', shift: ':', bn: ';', shiftBn: ':', desc: 'সেমিকোলন' },
    { key: "'", normal: "'", shift: '"', bn: "'", shiftBn: '"', desc: 'কোট' },
    { key: 'Enter', normal: '⏎', shift: '⏎', bn: '⏎', shiftBn: '⏎', desc: 'এন্টার', wide: 'enter' }
  ],
  row4: [
    { key: 'ShiftLeft', normal: '⇧', shift: '⇧', bn: '⇧', shiftBn: '⇧', desc: 'শিফট', wide: 'shift' },
    { key: 'z', normal: 'য', shift: 'য়', bn: 'য', shiftBn: 'য়', desc: 'য / য়' },
    { key: 'x', normal: 'ঁ', shift: '৅', bn: 'ঁ', shiftBn: '৅', desc: 'চন্দ্রবিন্দু' },
    { key: 'c', normal: 'চ', shift: 'ছ', bn: 'চ', shiftBn: 'ছ', desc: 'চ / ছ' },
    { key: 'v', normal: 'ভ', shift: 'ঢ়', bn: 'ভ', shiftBn: 'ঢ়', desc: 'ভ / ঢ়' },
    { key: 'b', normal: 'ব', shift: 'ভ', bn: 'ব', shiftBn: 'ভ', desc: 'ব / ভ' },
    { key: 'n', normal: 'ন', shift: 'ণ', bn: 'ন', shiftBn: 'ণ', desc: 'ন / ণ' },
    { key: 'm', normal: 'ম', shift: 'ং', bn: 'ম', shiftBn: 'ং', desc: 'ম / ং' },
    { key: ',', normal: ',', shift: '<', bn: ',', shiftBn: '<', desc: 'কমা' },
    { key: '.', normal: '.', shift: '>', bn: '.', shiftBn: '>', desc: 'দাঁড়ি' },
    { key: '/', normal: '/', shift: '?', bn: '/', shiftBn: '?', desc: 'স্ল্যাশ' },
    { key: 'ShiftRight', normal: '⇧', shift: '⇧', bn: '⇧', shiftBn: '⇧', desc: 'শিফট', wide: 'shift' }
  ],
  row5: [
    { key: 'ControlLeft', normal: 'Ctrl', shift: 'Ctrl', bn: 'Ctrl', shiftBn: 'Ctrl', desc: 'কন্ট্রোল', wide: 'wide' },
    { key: 'AltLeft', normal: 'Alt', shift: 'Alt', bn: 'Alt', shiftBn: 'Alt', desc: 'অল্ট', wide: 'wide' },
    { key: ' ', normal: ' ', shift: ' ', bn: '␣', shiftBn: '␣', desc: 'স্পেস', wide: 'space' },
    { key: 'AltRight', normal: 'Alt', shift: 'Alt', bn: 'Alt', shiftBn: 'Alt', desc: 'অল্ট', wide: 'wide' },
    { key: 'ControlRight', normal: 'Ctrl', shift: 'Ctrl', bn: 'Ctrl', shiftBn: 'Ctrl', desc: 'কন্ট্রোল', wide: 'wide' }
  ]
};

/* ═══════════════════════════════════════════════════════
   CHAR_TO_KEY MAPPER
   ═══════════════════════════════════════════════════════ */
const CHAR_TO_KEY = {};
Object.keys(BIJOY_LAYOUT).forEach(rowName => {
  BIJOY_LAYOUT[rowName].forEach(keyData => {
    if (keyData.normal && keyData.normal.length >= 1) {
      if (!CHAR_TO_KEY[keyData.normal]) {
        CHAR_TO_KEY[keyData.normal] = {
          key: keyData.key, shift: false,
          bn: keyData.bn, shiftBn: keyData.shiftBn
        };
      }
    }
    if (keyData.shift && keyData.shift !== keyData.normal) {
      if (!CHAR_TO_KEY[keyData.shift]) {
        CHAR_TO_KEY[keyData.shift] = {
          key: keyData.key, shift: true,
          bn: keyData.bn, shiftBn: keyData.shiftBn
        };
      }
    }
  });
});
CHAR_TO_KEY[' '] = { key: ' ', shift: false, bn: '␣', shiftBn: '␣' };
CHAR_TO_KEY['\n'] = { key: 'Enter', shift: false, bn: '⏎', shiftBn: '⏎' };

/* ═══════════════════════════════════════════════════════
   LESSON GROUPS — ১১টি গ্রুপ
   ═══════════════════════════════════════════════════════ */
const LESSON_GROUPS = {
  'home-row':    { name: '🏠 হোম সারি — মূল ভিত্তি', icon: '🏠', color: '#6366f1', desc: 'A S D F G H J K L' },
  'top-row':     { name: '⬆️ উপরের সারি', icon: '⬆️', color: '#8b5cf6', desc: 'Q W E R T Y U I O P' },
  'bottom-row':  { name: '⬇️ নিচের সারি', icon: '⬇️', color: '#06b6d4', desc: 'Z X C V B N M' },
  'kara':        { name: '✍️ কার-চিহ্ন', icon: '✍️', color: '#10b981', desc: 'ি ী ু ূ ৃ ে ৈ ো ৌ' },
  'hoshonto':    { name: '🔗 যুক্তাক্ষর', icon: '🔗', color: '#ef4444', desc: 'হসন্ত (্) দিয়ে যুক্ত' },
  'fold':        { name: '🌿 ফলা (র-ফলা, য-ফলা)', icon: '🌿', color: '#f59e0b', desc: '্র ্য র-ফলা' },
  'special':     { name: '⭐ স্পেশাল বর্ণ', icon: '⭐', color: '#ec4899', desc: 'য় ড় ঢ় ৎ ং ঃ ঁ' },
  'numbers':     { name: '🔢 সংখ্যা ও চিহ্ন', icon: '🔢', color: '#a855f7', desc: '১-০ ও punctuation' },
  'shobdo':      { name: '📚 শব্দভাণ্ডার', icon: '📚', color: '#14b8a6', desc: 'মডার্ন শব্দ' },
  'bakyo':       { name: '📝 বাক্য ও প্রবাদ', icon: '📝', color: '#8b5cf6', desc: 'বাস্তব বাক্য' },
  'challenge':   { name: '🏆 চ্যালেঞ্জ', icon: '🏆', color: '#dc2626', desc: 'উন্নত চ্যালেঞ্জ' }
};

/* ═══════════════════════════════════════════════════════
   ★★★ ১৭০+ লেসন — আধুনিক ও মুখস্থ-উপযোগী ★★★
   ═══════════════════════════════════════════════════════ */
const LESSONS = [

  /* ═══════════════════════════════════════════════
     গ্রুপ ১: হোম সারি (১-২০) — মূল ভিত্তি
     A S D F G H J K L
     ═══════════════════════════════════════════════ */

  { id: 1, title: 'ক — K কী', type: 'home', group: 'home-row',
    keys: ['k'], text: 'ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক',
    level: 'সহজ', tip: 'K বাটনে "ক" আছে। ডান হাতের মধ্যমা আঙুল দিয়ে চাপুন।' },

  { id: 2, title: 'খ — Shift+K', type: 'home', group: 'home-row',
    keys: ['k'], text: 'খ খ খ খ খ খ খ খ খ খ খ খ খ খ খ খ খ খ',
    level: 'সহজ', tip: 'Shift+K চাপলে "খ" আসে।' },

  { id: 3, title: 'ক + খ মিশ্রণ', type: 'home', group: 'home-row',
    keys: ['k'], text: 'কখ খক ককখ খকক কখক খকক কখখ কখক খকক',
    level: 'সহজ', tip: 'K কী-তে ক এবং খ দুটোই আছে।' },

  { id: 4, title: 'ক দিয়ে শব্দ', type: 'home', group: 'home-row',
    keys: ['k'], text: 'কল কবি কমল কথা কর কম কঠিন কালা কাজ',
    level: 'সহজ', tip: 'ক দিয়ে গঠিত সাধারণ শব্দ।' },

  { id: 5, title: 'ল — L কী', type: 'home', group: 'home-row',
    keys: ['l'], text: 'ল ল ল ল ল ল ল ল ল ল ল ল ল ল ল ল ল ল ল',
    level: 'সহজ', tip: 'L বাটন = "ল" — ডান হাতের অনামিকা।' },

  { id: 6, title: 'ল দিয়ে শব্দ', type: 'home', group: 'home-row',
    keys: ['l'], text: 'লবণ লিখা লোক লাভ লাল লোহা লতা লুকানো',
    level: 'সহজ', tip: 'ল দিয়ে শব্দ।' },

  { id: 7, title: 'ক + ল শব্দ', type: 'home', group: 'home-row',
    keys: ['k', 'l'], text: 'কল কলম কলকাতা কোমল লাল কালো কথা কবি',
    level: 'সহজ', tip: 'K এবং L দিয়ে গঠিত শব্দ।' },

  { id: 8, title: 'স — S কী', type: 'home', group: 'home-row',
    keys: ['s'], text: 'স স স স স স স স স স স স স স স স স স স',
    level: 'সহজ', tip: 'S বাটন = "স" — বাম হাতের অনামিকা।' },

  { id: 9, title: 'শ — Shift+S', type: 'home', group: 'home-row',
    keys: ['s'], text: 'শ শ শ শ শ শ শ শ শ শ শ শ শ শ শ শ শ শ',
    level: 'সহজ', tip: 'Shift+S = "শ"।' },

  { id: 10, title: 'স ও শ মিশ্রণ', type: 'home', group: 'home-row',
    keys: ['s'], text: 'সশ শস সশশ শসস শিক্ষা সফল শব্দ সব সুখ',
    level: 'মধ্যম', tip: 'S কী-তে স এবং শ দুটোই।' },

  { id: 11, title: 'ড — D কী', type: 'home', group: 'home-row',
    keys: ['d'], text: 'ড ড ড ড ড ড ড ড ড ড ড ড ড ড ড ড ড ড',
    level: 'সহজ', tip: 'D বাটন = "ড" — বাম হাতের মধ্যমা।' },

  { id: 12, title: 'ঢ — Shift+D', type: 'home', group: 'home-row',
    keys: ['d'], text: 'ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ',
    level: 'সহজ', tip: 'Shift+D = "ঢ"।' },

  { id: 13, title: 'ড দিয়ে শব্দ', type: 'home', group: 'home-row',
    keys: ['d'], text: 'দল দশ দরজা দিল দূর দেশ দাদা দাম দিন দয়া',
    level: 'সহজ', tip: 'দ দিয়ে শব্দ।' },

  { id: 14, title: 'গ — G কী', type: 'home', group: 'home-row',
    keys: ['g'], text: 'গ গ গ গ গ গ গ গ গ গ গ গ গ গ গ গ গ গ গ',
    level: 'সহজ', tip: 'G বাটন = "গ"।' },

  { id: 15, title: 'ঘ — Shift+G', type: 'home', group: 'home-row',
    keys: ['g'], text: 'ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ',
    level: 'সহজ', tip: 'Shift+G = "ঘ"।' },

  { id: 16, title: 'গ + ঘ শব্দ', type: 'home', group: 'home-row',
    keys: ['g'], text: 'গান গরু গোলাপ ঘর ঘড়ি ঘাস মেঘ ঘুম গল্প',
    level: 'সহজ', tip: 'গ এবং ঘ দিয়ে শব্দ।' },

  { id: 17, title: 'হ — H কী', type: 'home', group: 'home-row',
    keys: ['h'], text: 'হ হ হ হ হ হ হ হ হ হ হ হ হ হ হ হ হ হ হ',
    level: 'সহজ', tip: 'H বাটন = "হ" — ডান হাতের তর্জনী।' },

  { id: 18, title: 'ঙ — Shift+H', type: 'home', group: 'home-row',
    keys: ['h'], text: 'ঙ ঙ ঙ ঙ ঙ ঙ ঙ ঙ ঙ ঙ ঙ ঙ ঙ ঙ ঙ ঙ',
    level: 'সহজ', tip: 'Shift+H = "ঙ"।' },

  { id: 19, title: 'জ — J কী', type: 'home', group: 'home-row',
    keys: ['j'], text: 'জ জ জ জ জ জ জ জ জ জ জ জ জ জ জ জ জ জ জ',
    level: 'সহজ', tip: 'J বাটন = "জ" — ডান হাতের তর্জনী।' },

  { id: 20, title: 'ঝ — Shift+J', type: 'home', group: 'home-row',
    keys: ['j'], text: 'ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ',
    level: 'সহজ', tip: 'Shift+J = "ঝ"।' },

  /* ═══════════════════════════════════════════════
     গ্রুপ ২: হোম সারি মিশ্রণ (২১-৩০)
     ═══════════════════════════════════════════════ */

  { id: 21, title: 'হোম সারি — সব কী', type: 'home', group: 'home-row',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    text: 'সকল দল বল গল হল জল কল কলকাতা হাসি দয়া',
    level: 'মধ্যম', tip: 'হোম সারির ৯টি কী একসাথে।' },

  { id: 22, title: 'ক + খ + গ + ঘ', type: 'home', group: 'home-row',
    keys: ['k', 'g'], text: 'কখগঘ খকগঘ কঘখগ গকখঘ কখগঘ খঘগক',
    level: 'মধ্যম', tip: 'ক খ গ ঘ চারটি বর্ণ।' },

  { id: 23, title: 'স + শ + হ', type: 'home', group: 'home-row',
    keys: ['s', 'h'], text: 'সশহ শসহ হসশ সশহ শসহ হসশ সশহ শসহ',
    level: 'মধ্যম', tip: 'S + H কী।' },

  { id: 24, title: 'ড + ঢ + জ + ঝ', type: 'home', group: 'home-row',
    keys: ['d', 'j'], text: 'ডঢজঝ ঢডঝজ ডজঝঢ ঢজডঝ ডঢজঝ জডঢঝ',
    level: 'মধ্যম', tip: 'D + J কী।' },

  { id: 25, title: 'হাসি — শব্দ মুখস্থ', type: 'home', group: 'home-row',
    keys: ['h', 's', 'a'], text: 'হাসি হাসি হাসি খুব হাসি সবাই হাসি মজা',
    level: 'সহজ', tip: 'H + A + S দিয়ে "হাসি"।' },

  { id: 26, title: 'দল — শব্দ মুখস্থ', type: 'home', group: 'home-row',
    keys: ['d', 'l'], text: 'দল দল দল বল দলবল দলগত দলনেতা দল',
    level: 'সহজ', tip: 'D + L দিয়ে "দল"।' },

  { id: 27, title: 'গান — শব্দ মুখস্থ', type: 'home', group: 'home-row',
    keys: ['g', 'a'], text: 'গান গান গান গাইল গানের গানের গান',
    level: 'সহজ', tip: 'G + A দিয়ে "গান"।' },

  { id: 28, title: 'কলম — শব্দ মুখস্থ', type: 'home', group: 'home-row',
    keys: ['k', 'l'], text: 'কলম কলম কলম কলম নীল কলম লাল কলম',
    level: 'সহজ', tip: 'K + L দিয়ে "কলম"।' },

  { id: 29, title: 'হোম সারি শব্দ', type: 'practice', group: 'home-row',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    text: 'কল বল দল ভালো মন্দ সাধনা কামনা দয়া হাসি',
    level: 'মধ্যম', tip: 'হোম সারির সব কী দিয়ে শব্দ।' },

  { id: 30, title: 'হোম সারি চ্যালেঞ্জ', type: 'practice', group: 'home-row',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    text: 'সকল মানুষ হাসি খুশি থাকুক এই দুনিয়ায় ভালোবাসা',
    level: 'মধ্যম', tip: 'হোম সারির সব কী।' },

  /* ═══════════════════════════════════════════════
     গ্রুপ ৩: উপরের সারি (৩১-৫৫)
     Q W E R T Y U I O P
     ═══════════════════════════════════════════════ */

  { id: 31, title: 'দ — Q কী', type: 'top', group: 'top-row',
    keys: ['q'], text: 'দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ',
    level: 'সহজ', tip: 'Q বাটন = "দ" — বাম হাতের কনিষ্ঠা।' },

  { id: 32, title: 'ধ — Shift+Q', type: 'top', group: 'top-row',
    keys: ['q'], text: 'ধ ধ ধ ধ ধ ধ ধ ধ ধ ধ ধ ধ ধ ধ ধ ধ ধ ধ',
    level: 'সহজ', tip: 'Shift+Q = "ধ"।' },

  { id: 33, title: 'দ + ধ শব্দ', type: 'top', group: 'top-row',
    keys: ['q'], text: 'দই দূর দেশ ধন ধরা ধীর দুধ দয়া ধর ধন্য',
    level: 'মধ্যম', tip: 'Q কী-তে দ এবং ধ।' },

  { id: 34, title: 'ূ — W কী', type: 'top', group: 'top-row',
    keys: ['w'], text: 'কূ গূ দূ নূ মূ পূ বূ লূ জূ হূ কূ গূ দূ',
    level: 'সহজ', tip: 'W বাটন = "ূ" (উ-কার)।' },

  { id: 35, title: 'ঊ — Shift+W', type: 'top', group: 'top-row',
    keys: ['w'], text: 'ঊ ঊ ঊ ঊ ঊ ঊ ঊ ঊ ঊ ঊ ঊ ঊ ঊ ঊ ঊ',
    level: 'সহজ', tip: 'Shift+W = "ঊ"।' },

  { id: 36, title: 'ূ-কার শব্দ', type: 'top', group: 'top-row',
    keys: ['w'], text: 'পূর্ণ সূর্য দূর শূন্য পুরুষ দূরত্ব পূর্ণতা',
    level: 'মধ্যম', tip: 'ূ দিয়ে শব্দ।' },

  { id: 37, title: 'ী — E কী', type: 'top', group: 'top-row',
    keys: ['e'], text: 'কী গী দী নী মী পী বী লী জী হী কী গী দী',
    level: 'সহজ', tip: 'E বাটন = "ী" (ঈ-কার)।' },

  { id: 38, title: 'ঈ — Shift+E', type: 'top', group: 'top-row',
    keys: ['e'], text: 'ঈ ঈ ঈ ঈ ঈ ঈ ঈ ঈ ঈ ঈ ঈ ঈ ঈ ঈ ঈ',
    level: 'সহজ', tip: 'Shift+E = "ঈ"।' },

  { id: 39, title: 'ী-কার শব্দ', type: 'top', group: 'top-row',
    keys: ['e'], text: 'নদী সাগর পৃথিবী শিক্ষা জানালা রাতের শীত',
    level: 'মধ্যম', tip: 'ী দিয়ে শব্দ।' },

  { id: 40, title: 'র — R কী', type: 'top', group: 'top-row',
    keys: ['r'], text: 'র র র র র র র র র র র র র র র র র র র র',
    level: 'সহজ', tip: 'R বাটন = "র" — বাম হাতের তর্জনী।' },

  { id: 41, title: 'ড় — Shift+R', type: 'top', group: 'top-row',
    keys: ['r'], text: 'ড় ড় ড় ড় ড় ড় ড় ড় ড় ড় ড় ড় ড়',
    level: 'মধ্যম', tip: 'Shift+R = "ড়"।' },

  { id: 42, title: 'র + ড় শব্দ', type: 'top', group: 'top-row',
    keys: ['r'], text: 'রবি রং রাত রূপ বড় ছোট ঘোড়া পাহাড় রাস্তা',
    level: 'মধ্যম', tip: 'R কী-তে র এবং ড়।' },

  { id: 43, title: 'ট — T কী', type: 'top', group: 'top-row',
    keys: ['t'], text: 'ট ট ট ট ট ট ট ট ট ট ট ট ট ট ট ট ট ট ট',
    level: 'সহজ', tip: 'T বাটন = "ট"।' },

  { id: 44, title: 'ঠ — Shift+T', type: 'top', group: 'top-row',
    keys: ['t'], text: 'ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ',
    level: 'সহজ', tip: 'Shift+T = "ঠ"।' },

  { id: 45, title: 'ট + ঠ শব্দ', type: 'top', group: 'top-row',
    keys: ['t'], text: 'টাকা টুপি টেবিল ঠিকানা ঠোঁট ঠান্ডা ট্রেন',
    level: 'মধ্যম', tip: 'T কী-তে ট এবং ঠ।' },

  { id: 46, title: 'এ — Y কী', type: 'top', group: 'top-row',
    keys: ['y'], text: 'একে দেখে সেজে গেছে মনে মনে দেখা যাবে',
    level: 'সহজ', tip: 'Y বাটন = "এ"।' },

  { id: 47, title: 'ঐ — Shift+Y', type: 'top', group: 'top-row',
    keys: ['y'], text: 'ঐ ঐ ঐ ঐ ঐ ঐ ঐ ঐ ঐ ঐ ঐ ঐ ঐ ঐ ঐ ঐ',
    level: 'মধ্যম', tip: 'Shift+Y = "ঐ"।' },

  { id: 48, title: 'এ দিয়ে শব্দ', type: 'top', group: 'top-row',
    keys: ['y'], text: 'ছেলে মেয়ে কে যে দেখে যেন কেন এত একসাথে',
    level: 'মধ্যম', tip: 'এ দিয়ে শব্দ।' },

  { id: 49, title: 'ু — U কী', type: 'top', group: 'top-row',
    keys: ['u'], text: 'কু গু দুন মুন পুন বুন লুন সুখ দুখ কু গু',
    level: 'সহজ', tip: 'U বাটন = "ু" (উ-কার)।' },

  { id: 50, title: 'উ — Shift+U', type: 'top', group: 'top-row',
    keys: ['u'], text: 'উ উ উ উ উ উ উ উ উ উ উ উ উ উ উ উ উ',
    level: 'সহজ', tip: 'Shift+U = "উ"।' },

  { id: 51, title: 'ু-কার শব্দ', type: 'top', group: 'top-row',
    keys: ['u'], text: 'গরু ছাগল মানুষ শিশু মুরগি সুখ দুখ কুকুর',
    level: 'মধ্যম', tip: 'ু দিয়ে শব্দ।' },

  { id: 52, title: 'ি — I কী', type: 'top', group: 'top-row',
    keys: ['i'], text: 'কি গি দি নি মি পি বি লি জি হি কি গি দি',
    level: 'সহজ', tip: 'I বাটন = "ি" (ই-কার)।' },

  { id: 53, title: 'ই — Shift+I', type: 'top', group: 'top-row',
    keys: ['i'], text: 'ই ই ই ই ই ই ই ই ই ই ই ই ই ই ই ই ই',
    level: 'সহজ', tip: 'Shift+I = "ই"।' },

  { id: 54, title: 'ি-কার শব্দ', type: 'top', group: 'top-row',
    keys: ['i'], text: 'বিড়াল পাখি ছবি সকাল দুপুর বিকাল দিন',
    level: 'মধ্যম', tip: 'ি দিয়ে শব্দ।' },

  { id: 55, title: 'ো — O কী', type: 'top', group: 'top-row',
    keys: ['o'], text: 'কো গো দো নো মো পো বো লো জো হো কো গো দো',
    level: 'সহজ', tip: 'O বাটন = "ো" (ও-কার)।' },

  /* ═══════════════════════════════════════════════
     গ্রুপ ৪: উপরের সারি আরও (৫৬-৭৫)
     ═══════════════════════════════════════════════ */

  { id: 56, title: 'ঔ — Shift+O', type: 'top', group: 'top-row',
    keys: ['o'], text: 'ঔ ঔ ঔ ঔ ঔ ঔ ঔ ঔ ঔ ঔ ঔ ঔ ঔ ঔ ঔ',
    level: 'মধ্যম', tip: 'Shift+O = "ঔ"।' },

  { id: 57, title: 'ো-কার শব্দ', type: 'top', group: 'top-row',
    keys: ['o'], text: 'ছোট লোক বোকা মোটা ঘোড়া বড় মোট সুন্দর',
    level: 'মধ্যম', tip: 'ো দিয়ে শব্দ।' },

  { id: 58, title: 'প — P কী', type: 'top', group: 'top-row',
    keys: ['p'], text: 'প প প প প প প প প প প প প প প প প প প',
    level: 'সহজ', tip: 'P বাটন = "প" — ডান হাতের কনিষ্ঠা।' },

  { id: 59, title: 'ফ — Shift+P', type: 'top', group: 'top-row',
    keys: ['p'], text: 'ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ',
    level: 'সহজ', tip: 'Shift+P = "ফ"।' },

  { id: 60, title: 'প + ফ শব্দ', type: 'top', group: 'top-row',
    keys: ['p'], text: 'পাখি পানি পাতা ফুল ফল ফসল পাহাড় পুতুল',
    level: 'মধ্যম', tip: 'P কী-তে প এবং ফ।' },

  { id: 61, title: 'উপরের সারি মিশ্র', type: 'top', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'দূর পাখি তীর রূপ টাকা টেবিল পানি রঙিন',
    level: 'মধ্যম', tip: 'উপরের সারির সব কী।' },

  { id: 62, title: 'প্রথম ৫ কী', type: 'top', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't'],
    text: 'দূর পূর্ণ টাকা রূপ তিন দূর পূর্ণ টাকা',
    level: 'মধ্যম', tip: 'Q W E R T — প্রথম পাঁচ।' },

  { id: 63, title: 'শেষ ৫ কী', type: 'top', group: 'top-row',
    keys: ['y', 'u', 'i', 'o', 'p'],
    text: 'দুই পুল পুলিশ টুপি পোশাক কিছু পেয়েছি',
    level: 'মধ্যম', tip: 'Y U I O P — শেষ পাঁচ।' },

  { id: 64, title: 'ঋ — Shift+F', type: 'shift', group: 'top-row',
    keys: ['f'], text: 'ঋ ঋ ঋ ঋ ঋ ঋ ঋ ঋ ঋ ঋ ঋ ঋ ঋ ঋ ঋ ঋ',
    level: 'মধ্যম', tip: 'Shift+F = "ঋ"।' },

  { id: 65, title: 'ঋণ শব্দ', type: 'top', group: 'top-row',
    keys: ['f'], text: 'ঋণ ঋতু ঋষি ঋণী ঋতু ঋণ ঋষি ঋণী ঋতু',
    level: 'মধ্যম', tip: 'ঋ দিয়ে শব্দ।' },

  { id: 66, title: 'উপরের সারি ড্রিল', type: 'practice', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'দূর থেকে পাখি ডাকে রাত ভোর শুরু হবে দিন',
    level: 'মধ্যম', tip: 'প্রাকৃতিক বাক্য।' },

  { id: 67, title: 'প্রকৃতি শব্দ', type: 'practice', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'আকাশ সূর্য তারা চাঁদ নদী পাহাড় বৃষ্টি মাটি',
    level: 'মধ্যম', tip: 'প্রকৃতির শব্দ।' },

  { id: 68, title: 'পরিবার শব্দ', type: 'practice', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'বাবা মা ভাই বোন দাদা দাদি নানা নানি আত্মীয়',
    level: 'মধ্যম', tip: 'পরিবারের সদস্য।' },

  { id: 69, title: 'প্রাণী শব্দ', type: 'practice', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'গরু ছাগল ভেড়া ঘোড়া হাতি বাঘ সিংহ পাখি',
    level: 'মধ্যম', tip: 'প্রাণীর নাম।' },

  { id: 70, title: 'ফল শব্দ', type: 'practice', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'আম কাঁঠাল কলা পেঁপে লিচু আনারস কমলা জাম',
    level: 'মধ্যম', tip: 'ফলের নাম।' },

  { id: 71, title: 'রং শব্দ', type: 'practice', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'লাল নীল সবুজ হলুদ কালো সাদা বেগুনি গোলাপি',
    level: 'মধ্যম', tip: 'রঙের নাম।' },

  { id: 72, title: 'দিনের সময়', type: 'practice', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'সকাল দুপুর বিকাল সন্ধ্যা রাত ভোর দিনক্ষণ',
    level: 'মধ্যম', tip: 'দিনের সময়।' },

  { id: 73, title: 'খাদ্য শব্দ', type: 'practice', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'ভাত মাছ মাংস ডাল তরকারি রুটি দুধ মিষ্টি',
    level: 'মধ্যম', tip: 'খাদ্যের নাম।' },

  { id: 74, title: 'যানবাহন শব্দ', type: 'practice', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'গাড়ি বাস ট্রেন বিমান সাইকেল নৌকা জাহাজ',
    level: 'মধ্যম', tip: 'যানবাহনের নাম।' },

  { id: 75, title: 'মিশ্র শব্দ', type: 'practice', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'বাংলা ভাষা সাহিত্য সংস্কৃতি ঐতিহ্য গর্ব',
    level: 'মধ্যম', tip: 'বাংলার ঐতিহ্য।' },

  /* ═══════════════════════════════════════════════
     গ্রুপ ৫: নিচের সারি (৭৬-৯৫)
     Z X C V B N M
     ═══════════════════════════════════════════════ */

  { id: 76, title: 'ন — N কী', type: 'bottom', group: 'bottom-row',
    keys: ['n'], text: 'ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন',
    level: 'সহজ', tip: 'N বাটন = "ন" — ডান হাতের তর্জনী।' },

  { id: 77, title: 'ণ — Shift+N', type: 'bottom', group: 'bottom-row',
    keys: ['n'], text: 'ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ',
    level: 'মধ্যম', tip: 'Shift+N = "ণ" (মূর্ধন্য ণ)।' },

  { id: 78, title: 'ন + ণ মিশ্র', type: 'bottom', group: 'bottom-row',
    keys: ['n'], text: 'নণ ণন নণণ ণনন নণ ণন নণণ ণনন নণ',
    level: 'মধ্যম', tip: 'N কী-তে ন এবং ণ।' },

  { id: 79, title: 'ব — B কী', type: 'bottom', group: 'bottom-row',
    keys: ['b'], text: 'ব ব ব ব ব ব ব ব ব ব ব ব ব ব ব ব ব ব ব',
    level: 'সহজ', tip: 'B বাটন = "ব" — বাম হাতের তর্জনী।' },

  { id: 80, title: 'ভ — Shift+B', type: 'bottom', group: 'bottom-row',
    keys: ['b'], text: 'ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ',
    level: 'মধ্যম', tip: 'Shift+B = "ভ"।' },

  { id: 81, title: 'ব + ভ শব্দ', type: 'bottom', group: 'bottom-row',
    keys: ['b'], text: 'বন বই বাড়ি ভালো ভাই ভাত ভালোবাসা ভাষা',
    level: 'মধ্যম', tip: 'B কী-তে ব এবং ভ।' },

  { id: 82, title: 'ম — M কী', type: 'bottom', group: 'bottom-row',
    keys: ['m'], text: 'ম ম ম ম ম ম ম ম ম ম ম ম ম ম ম ম ম ম ম',
    level: 'সহজ', tip: 'M বাটন = "ম" — ডান হাতের তর্জনী।' },

  { id: 83, title: 'ং — Shift+M', type: 'bottom', group: 'bottom-row',
    keys: ['m'], text: 'রং বাংলা মাংস ঝংকার সংসার অংক মঙ্গল',
    level: 'মধ্যম', tip: 'Shift+M = "ং" (অনুস্বার)।' },

  { id: 84, title: 'ম দিয়ে শব্দ', type: 'bottom', group: 'bottom-row',
    keys: ['m'], text: 'মানুষ মা মন মাটি মাছ মাঠ মেঘ মিষ্টি মেলা',
    level: 'মধ্যম', tip: 'ম দিয়ে শব্দ।' },

  { id: 85, title: 'চ — C কী', type: 'bottom', group: 'bottom-row',
    keys: ['c'], text: 'চ চ চ চ চ চ চ চ চ চ চ চ চ চ চ চ চ চ',
    level: 'সহজ', tip: 'C বাটন = "চ" — বাম হাতের মধ্যমা।' },

  { id: 86, title: 'ছ — Shift+C', type: 'bottom', group: 'bottom-row',
    keys: ['c'], text: 'ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ',
    level: 'মধ্যম', tip: 'Shift+C = "ছ"।' },

  { id: 87, title: 'চ + ছ শব্দ', type: 'bottom', group: 'bottom-row',
    keys: ['c'], text: 'চা চাল চোখ ছবি ছেলে ছাতা চাঁদ ছোট',
    level: 'মধ্যম', tip: 'C কী-তে চ এবং ছ।' },

  { id: 88, title: 'ভ — V কী', type: 'bottom', group: 'bottom-row',
    keys: ['v'], text: 'ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ',
    level: 'মধ্যম', tip: 'V বাটন = "ভ"।' },

  { id: 89, title: 'ঢ় — Shift+V', type: 'bottom', group: 'bottom-row',
    keys: ['v'], text: 'ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ়',
    level: 'কঠিন', tip: 'Shift+V = "ঢ়" (মূর্ধন্য ঢ়)।' },

  { id: 90, title: 'ঢ় দিয়ে শব্দ', type: 'bottom', group: 'bottom-row',
    keys: ['v'], text: 'আষাঢ় মূঢ় গূঢ় বৃঢ় মূঢ়তা আষাঢ়',
    level: 'কঠিন', tip: 'ঢ় দিয়ে শব্দ।' },

  { id: 91, title: 'য — Z কী', type: 'bottom', group: 'bottom-row',
    keys: ['z'], text: 'য য য য য য য য য য য য য য য য য য য',
    level: 'সহজ', tip: 'Z বাটন = "য" — বাম হাতের কনিষ্ঠা।' },

  { id: 92, title: 'য় — Shift+Z', type: 'bottom', group: 'bottom-row',
    keys: ['z'], text: 'য় য় য় য় য় য় য় য় য় য় য় য় য়',
    level: 'কঠিন', tip: 'Shift+Z = "য়" (অন্তস্থ-য়)।' },

  { id: 93, title: 'য় দিয়ে শব্দ', type: 'bottom', group: 'bottom-row',
    keys: ['z'], text: 'ছয় ময় দয়ালু নায়ক খোঁয়া ভয় পাওয়া',
    level: 'কঠিন', tip: 'য় দিয়ে শব্দ।' },

  { id: 94, title: 'ঁ — X কী', type: 'bottom', group: 'bottom-row',
    keys: ['x'], text: 'কাঁ চাঁ বাঁ ফাঁ মাঁ কাঁচা চাঁদ ফাঁকা বাঁশ',
    level: 'মধ্যম', tip: 'X বাটন = "ঁ" (চন্দ্রবিন্দু)।' },

  { id: 95, title: 'ঁ দিয়ে শব্দ', type: 'bottom', group: 'bottom-row',
    keys: ['x'], text: 'কাঁচা চাঁদ ফাঁদ বাঁশি হাঁস পাঁচ মাঁঝি বাঁকা',
    level: 'মধ্যম', tip: 'ঁ দিয়ে শব্দ।' },

  /* ═══════════════════════════════════════════════
     গ্রুপ ৬: কার-চিহ্ন (৯৬-১১৫)
     ═══════════════════════════════════════════════ */

  { id: 96, title: 'া কার — A কী', type: 'kara', group: 'kara',
    keys: ['a'], text: 'কা খা গা ঘা চা ছা জা ঝা টা ঠা ডা ঢা তা থা',
    level: 'মধ্যম', tip: 'A বাটন = "া" (আ-কার)।' },

  { id: 97, title: 'া-কার শব্দ', type: 'kara', group: 'kara',
    keys: ['a'], text: 'আম কাঁঠাল বাবা মা দাদা নানা শালা কালা',
    level: 'মধ্যম', tip: 'া দিয়ে শব্দ।' },

  { id: 98, title: 'ি-কার শব্দ', type: 'kara', group: 'kara',
    keys: ['i'], text: 'বিড়াল ছবি নদী সকাল কিছু দিন কি কি কি',
    level: 'মধ্যম', tip: 'ি দিয়ে শব্দ।' },

  { id: 99, title: 'ী-কার শব্দ', type: 'kara', group: 'kara',
    keys: ['e'], text: 'নদী সাগর পৃথিবী শিক্ষা জানালা রাতের শীত',
    level: 'মধ্যম', tip: 'ী দিয়ে শব্দ।' },

  { id: 100, title: 'ু-কার শব্দ', type: 'kara', group: 'kara',
    keys: ['u'], text: 'গরু ছাগল মানুষ শিশু মুরগি সুখ দুখ কুকুর',
    level: 'মধ্যম', tip: 'ু দিয়ে শব্দ।' },

  { id: 101, title: 'ূ-কার শব্দ', type: 'kara', group: 'kara',
    keys: ['w'], text: 'পূর্ণ সূর্য দূর শূন্য পুরুষ দূরত্ব পূর্ণতা',
    level: 'মধ্যম', tip: 'ূ দিয়ে শব্দ।' },

  { id: 102, title: 'ৃ-কার — Shift+F', type: 'kara', group: 'kara',
    keys: ['f'], text: 'কৃ গৃ দৃ নৃ মৃ তৃ কৃষি মৃগ দৃশ্য কৃতি',
    level: 'কঠিন', tip: 'Shift+F = "ৃ" (ঋ-কার)।' },

  { id: 103, title: 'ৃ-কার শব্দ', type: 'kara', group: 'kara',
    keys: ['f'], text: 'কৃষি কৃষক দৃশ্য মৃগ কৃতি বৃদ্ধি কৃতজ্ঞ',
    level: 'কঠিন', tip: 'ৃ দিয়ে শব্দ।' },

  { id: 104, title: 'ে-কার শব্দ', type: 'kara', group: 'kara',
    keys: ['y'], text: 'ছেলে মেয়ে কে যে দেখে যেন কেন কেমনে',
    level: 'মধ্যম', tip: 'ে দিয়ে শব্দ।' },

  { id: 105, title: 'ৈ-কার — Shift+Y', type: 'kara', group: 'kara',
    keys: ['y'], text: 'কৈ গৈ দৈ নৈ মৈ পৈ বৈ সৈ কৈ গৈ দৈ',
    level: 'কঠিন', tip: 'Shift+Y = "ৈ"।' },

  { id: 106, title: 'ৈ-কার শব্দ', type: 'kara', group: 'kara',
    keys: ['y'], text: 'বৈঠক কৈশোর মৈত্রী দৈত্য বৈশাখ নৈতিক',
    level: 'কঠিন', tip: 'ৈ দিয়ে শব্দ।' },

  { id: 107, title: 'ো-কার শব্দ', type: 'kara', group: 'kara',
    keys: ['o'], text: 'ছোট লোক বোকা মোটা ঘোড়া বড় মোট সুন্দর',
    level: 'মধ্যম', tip: 'ো দিয়ে শব্দ।' },

  { id: 108, title: 'ৌ-কার — Shift+O', type: 'kara', group: 'kara',
    keys: ['o'], text: 'কৌ গৌ দৌ নৌ মৌ পৌ বৌ সৌ কৌ গৌ দৌ',
    level: 'কঠিন', tip: 'Shift+O = "ৌ"।' },

  { id: 109, title: 'ৌ-কার শব্দ', type: 'kara', group: 'kara',
    keys: ['o'], text: 'কৌশল মৌমাছি নৌকা দৌড় গৌরব সৌন্দর্য',
    level: 'কঠিন', tip: 'ৌ দিয়ে শব্দ।' },

  { id: 110, title: 'সব কার একসাথে ১', type: 'kara', group: 'kara',
    keys: ['a', 'i', 'u', 'w', 'y', 'o'],
    text: 'কা কি কী কু কূ কৃ কে কৈ কো কৌ কা কি কু',
    level: 'কঠিন', tip: 'সব কার-চিহ্ন এক বর্ণে।' },

  { id: 111, title: 'সব কার একসাথে ২', type: 'kara', group: 'kara',
    keys: ['a', 'i', 'u', 'w', 'y', 'o'],
    text: 'মা মি মী মু মূ মৃ মে মৈ মো মৌ মা মি মা',
    level: 'কঠিন', tip: 'ম + সব কার।' },

  { id: 112, title: 'সব কার একসাথে ৩', type: 'kara', group: 'kara',
    keys: ['a', 'i', 'u', 'w', 'y', 'o'],
    text: 'না নি নী নু নূ নৃ নে নৈ নো নৌ না নি না',
    level: 'কঠিন', tip: 'ন + সব কার।' },

  { id: 113, title: 'মিশ্র কার শব্দ ১', type: 'kara', group: 'kara',
    keys: ['a', 'i', 'u', 'w', 'y', 'o'],
    text: 'বাংলা দেশ আমার ভালোবাসা শিক্ষা সংস্কৃতি',
    level: 'কঠিন', tip: 'বিভিন্ন কার-চিহ্ন।' },

  { id: 114, title: 'মিশ্র কার শব্দ ২', type: 'kara', group: 'kara',
    keys: ['a', 'i', 'u', 'w', 'y', 'o'],
    text: 'গরিব মানুষ সুখ দুখ ভালো মন্দ সুন্দর কঠিন',
    level: 'কঠিন', tip: 'কার-চিহ্ন মিশ্রিত শব্দ।' },

  { id: 115, title: 'কার-চিহ্ন চ্যালেঞ্জ', type: 'kara', group: 'kara',
    keys: ['a', 'i', 'u', 'w', 'y', 'o'],
    text: 'বাংলাদেশ স্বাধীনতা সংগ্রাম মুক্তিযুদ্ধ গর্বিত',
    level: 'কঠিন', tip: 'কার-চিহ্নে চ্যালেঞ্জ।' },

  /* ═══════════════════════════════════════════════
     গ্রুপ ৭: যুক্তাক্ষর (১১৬-১৪৫)
     ═══════════════════════════════════════════════ */

  { id: 116, title: 'হসন্ত — F কী', type: 'hoshonto', group: 'hoshonto',
    keys: ['f'], text: 'ক্ খ্ গ্ ঘ্ চ্ ছ্ জ্ ঝ্ ট্ ঠ্ ড্ ঢ্ ক্',
    level: 'মধ্যম', tip: 'F বাটন = "্" (হসন্ত)। যুক্তবর্ণের মূল।' },

  { id: 117, title: 'ক্ত যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['k', 'f', 't'], text: 'ভক্ত শক্ত রক্ত ভক্তি মুক্তি যুক্ত রক্ত',
    level: 'কঠিন', tip: 'ক + ্ + ত = ক্ত' },

  { id: 118, title: 'ক্ষ যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['k', 'f', 's'], text: 'শিক্ষা অক্ষর পরীক্ষা রক্ষা লক্ষ্য ক্ষতি',
    level: 'কঠিন', tip: 'ক + ্ + ষ = ক্ষ' },

  { id: 119, title: 'জ্ঞ যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['j', 'f', 'n'], text: 'জ্ঞান বিজ্ঞান অজ্ঞান বিশেষজ্ঞ জ্ঞানী',
    level: 'কঠিন', tip: 'জ + ্ + ঞ = জ্ঞ' },

  { id: 120, title: 'ত্র যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['t', 'f', 'r'], text: 'পত্র মিত্র চিত্র নেত্র পাত্র পুত্র চরিত্র',
    level: 'কঠিন', tip: 'ত + ্ + র = ত্র' },

  { id: 121, title: 'ন্দ যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['n', 'f', 'd'], text: 'আনন্দ বন্ধু চন্দন সুন্দর ছন্দ মন্দ চন্দ',
    level: 'কঠিন', tip: 'ন + ্ + দ = ন্দ' },

  { id: 122, title: 'ন্ত যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['n', 'f', 't'], text: 'শান্তি শক্তি অন্ত ভ্রমণ সঙ্গী বন্ধু সন্তান',
    level: 'কঠিন', tip: 'ন + ্ + ত = ন্ত' },

  { id: 123, title: 'ম্প যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['m', 'f', 'p'], text: 'সম্পদ সম্পূর্ণ কম্পন স্পর্শ সম্প্রদায়',
    level: 'কঠিন', tip: 'ম + ্ + প = ম্প' },

  { id: 124, title: 'স্ক যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['s', 'f', 'k'], text: 'স্কুল স্কোর স্কন্ধ স্কেচ স্ক্যান স্কুল',
    level: 'কঠিন', tip: 'স + ্ + ক = স্ক' },

  { id: 125, title: 'ষ্ট যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['s', 'f', 't'], text: 'কষ্ট নষ্ট স্পষ্ট পুষ্ট বৃষ্টি দৃষ্টি ষ্টেশন',
    level: 'কঠিন', tip: 'স + ্ + ট = ষ্ট' },

  { id: 126, title: 'দ্ধ যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['d', 'f', 'd'], text: 'বৃদ্ধ যুদ্ধ রুদ্ধ শুদ্ধ বুদ্ধি দ্ধ বুদ্ধিমান',
    level: 'কঠিন', tip: 'দ + ্ + ধ = দ্ধ' },

  { id: 127, title: 'ন্ধ যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['n', 'f', 'd'], text: 'বন্ধ বন্ধন বান্ধব রন্ধন সন্ধান বন্ধু সন্ধ্যা',
    level: 'কঠিন', tip: 'ন + ্ + ধ = ন্ধ' },

  { id: 128, title: 'ঞ্চ যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['n', 'f', 'c'], text: 'অঞ্চল পঞ্চ পঞ্চম বঞ্চনা সঞ্চয় অঞ্চল',
    level: 'কঠিন', tip: 'ন + ্ + চ = ঞ্চ' },

  { id: 129, title: 'ঞ্জ যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['n', 'f', 'j'], text: 'মঞ্জু রঞ্জন অঞ্জন কুঞ্জ পঞ্জি মঞ্জরি',
    level: 'কঠিন', tip: 'ন + ্ + জ = ঞ্জ' },

  { id: 130, title: 'ত্ত যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['t', 'f', 't'], text: 'উত্তর পত্তন হত্তয়া চিত্ত উত্তর পত্তন',
    level: 'কঠিন', tip: 'ত + ্ + ত = ত্ত' },

  { id: 131, title: 'ম্ম যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['m', 'f', 'm'], text: 'ব্রহ্ম কম্ম সম্মান সম্মুখ সম্মিলন',
    level: 'কঠিন', tip: 'ম + ্ + ম = ম্ম' },

  { id: 132, title: 'ল্ল যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['l', 'f', 'l'], text: 'উল্লাস ভুল্লি গল্লা উল্লেখ পল্লী',
    level: 'কঠিন', tip: 'ল + ্ + ল = ল্ল' },

  { id: 133, title: 'স্ন যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['s', 'f', 'n'], text: 'স্নান স্নেহ স্নিগ্ধ প্রসন্ন স্নাতক',
    level: 'কঠিন', tip: 'স + ্ + ন = স্ন' },

  { id: 134, title: 'স্থ যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['s', 'f', 'h'], text: 'স্থান স্থিতি অবস্থা প্রতিষ্ঠান সংস্থান',
    level: 'কঠিন', tip: 'স + ্ + থ = স্থ' },

  { id: 135, title: 'ক্ক যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['k', 'f', 'k'], text: 'উক্ক টিক্কা পক্ক চক্কর চক্কা ভক্ক',
    level: 'কঠিন', tip: 'ক + ্ + ক = ক্ক' },

  { id: 136, title: 'চ্চ যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['c', 'f', 'c'], text: 'উচ্চ উচ্চতা উচ্চারিত উচ্চারণ উচ্চমনা',
    level: 'কঠিন', tip: 'চ + ্ + চ = চ্চ' },

  { id: 137, title: 'জ্জ যুক্ত', type: 'hoshonto', group: 'hoshonto',
    keys: ['j', 'f', 'j'], text: 'উজ্জ্বল ভজ্জন পজ্জর লজ্জা সজ্জন',
    level: 'কঠিন', tip: 'জ + ্ + জ = জ্জ' },

  { id: 138, title: 'দ্ধ মিশ্র', type: 'hoshonto', group: 'hoshonto',
    keys: ['d', 'f', 'd'], text: 'বৃদ্ধ যুদ্ধ বুদ্ধি শুদ্ধ রুদ্ধ বুদ্ধিজীবী',
    level: 'কঠিন', tip: 'দ্ধ দিয়ে বিভিন্ন শব্দ।' },

  { id: 139, title: 'ষ্ট মিশ্র', type: 'hoshonto', group: 'hoshonto',
    keys: ['s', 'f', 't'], text: 'কষ্ট নষ্ট বৃষ্টি দৃষ্টি পুষ্ট স্পষ্ট হৃষ্ট',
    level: 'কঠিন', tip: 'ষ্ট দিয়ে বিভিন্ন শব্দ।' },

  { id: 140, title: 'যুক্তাক্ষর চ্যালেঞ্জ ১', type: 'challenge', group: 'hoshonto',
    keys: ['k', 'f', 's', 't', 'j', 'n', 'r'],
    text: 'বিশ্ববিদ্যালয় শিক্ষাপ্রতিষ্ঠান স্বাধীনতাসংগ্রাম',
    level: 'কঠিন', tip: 'বড় যুক্তাক্ষর শব্দ।' },

  { id: 141, title: 'যুক্তাক্ষর চ্যালেঞ্জ ২', type: 'challenge', group: 'hoshonto',
    keys: ['k', 'f', 's', 't', 'j', 'n', 'r'],
    text: 'বাংলাদেশের স্বাধীনতা সংগ্রামের ইতিহাস গর্বিত',
    level: 'কঠিন', tip: 'বাক্যে যুক্তাক্ষর।' },

  { id: 142, title: 'যুক্তাক্ষর চ্যালেঞ্জ ৩', type: 'challenge', group: 'hoshonto',
    keys: ['k', 'f', 's', 't', 'j', 'n', 'r'],
    text: 'কৃষি উন্নয়ন শিল্প বিপ্লব সংস্কৃতি ঐতিহ্য',
    level: 'কঠিন', tip: 'মিশ্র যুক্তাক্ষর।' },

  { id: 143, title: 'যুক্তাক্ষর চ্যালেঞ্জ ৪', type: 'challenge', group: 'hoshonto',
    keys: ['k', 'f', 's', 't', 'j', 'n', 'r'],
    text: 'শিক্ষার্থী শিক্ষক শিক্ষাপ্রতিষ্ঠান শিক্ষাব্যবস্থা',
    level: 'কঠিন', tip: 'শিক্ষা বিষয়ক।' },

  { id: 144, title: 'যুক্তাক্ষর চ্যালেঞ্জ ৫', type: 'challenge', group: 'hoshonto',
    keys: ['k', 'f', 's', 't', 'j', 'n', 'r'],
    text: 'ব্যবসায়ী প্রতিষ্ঠান উন্নয়ন পরিকল্পনা বাস্তবায়ন',
    level: 'কঠিন', tip: 'অফিসের শব্দ।' },

  { id: 145, title: 'যুক্তাক্ষর চ্যালেঞ্জ ৬', type: 'challenge', group: 'hoshonto',
    keys: ['k', 'f', 's', 't', 'j', 'n', 'r'],
    text: 'কম্পিউটার প্রোগ্রামিং প্রযুক্তি ইন্টারনেট বিজ্ঞান',
    level: 'কঠিন', tip: 'প্রযুক্তি শব্দ।' },

  /* ═══════════════════════════════════════════════
     গ্রুপ ৮: ফলা (১৪৬-১৬০)
     ═══════════════════════════════════════════════ */

  { id: 146, title: 'র-ফলা (্র) — R + ্', type: 'fold', group: 'fold',
    keys: ['r', 'f'], text: 'ক্ৰ খ্ৰ গ্ৰ ঘ্ৰ চ্ৰ ছ্ৰ জ্ৰ ঝ্ৰ ট্ৰ ঠ্ৰ',
    level: 'কঠিন', tip: 'F (হসন্ত) + R (র) = "্র" (র-ফলা)।' },

  { id: 147, title: 'র-ফলা শব্দ', type: 'fold', group: 'fold',
    keys: ['r', 'f'], text: 'দ্রুত প্রিয় গ্রাম ব্রত ক্রম প্রেম গ্রন্থ',
    level: 'কঠিন', tip: 'র-ফলা দিয়ে শব্দ।' },

  { id: 148, title: 'য-ফলা (্য) — Z + ্', type: 'fold', group: 'fold',
    keys: ['z', 'f'], text: 'ক্য খ্য গ্য ঘ্য চ্য ছ্য জ্য ঝ্য ট্য ঠ্য',
    level: 'কঠিন', tip: 'F (হসন্ত) + Z (য) = "্য" (য-ফলা)।' },

  { id: 149, title: 'য-ফলা শব্দ', type: 'fold', group: 'fold',
    keys: ['z', 'f'], text: 'ব্যক্তি ব্যাপার সত্য শস্য অযুত ব্যাখ্যা',
    level: 'কঠিন', tip: 'য-ফলা দিয়ে শব্দ।' },

  { id: 150, title: 'ব-ফলা (্ব)', type: 'fold', group: 'fold',
    keys: ['b', 'f'], text: 'ক্ব খ্ব গ্ব ঘ্ব চ্ব ছ্ব জ্ব ঝ্ব ট্ব ঠ্ব',
    level: 'কঠিন', tip: 'F + B = "্ব" (ব-ফলা)।' },

  { id: 151, title: 'ম-ফলা (্ম)', type: 'fold', group: 'fold',
    keys: ['m', 'f'], text: 'ক্ম খ্ম গ্ম ঘ্ম চ্ম ছ্ম জ্ম ঝ্ম ট্ম ঠ্ম',
    level: 'কঠিন', tip: 'F + M = "্ম" (ম-ফলা)।' },

  { id: 152, title: 'ল-ফলা (্ল)', type: 'fold', group: 'fold',
    keys: ['l', 'f'], text: 'ক্ল খ্ল গ্ল ঘ্ল চ্ল ছ্ল জ্ল ঝ্ল ট্ল ঠ্ল',
    level: 'কঠিন', tip: 'F + L = "্ল" (ল-ফলা)।' },

  { id: 153, title: 'ন-ফলা (্ন)', type: 'fold', group: 'fold',
    keys: ['n', 'f'], text: 'ক্ন খ্ন গ্ন ঘ্ন চ্ন ছ্ন জ্ন ঝ্ন ট্ন ঠ্ন',
    level: 'কঠিন', tip: 'F + N = "্ন" (ন-ফলা)।' },

  { id: 154, title: 'র-ফলা বিস্তারিত', type: 'fold', group: 'fold',
    keys: ['r', 'f'], text: 'প্রীতি শ্রদ্ধা ত্রুটি ব্রত ক্রিয়া প্রেমিক',
    level: 'কঠিন', tip: 'র-ফলা দিয়ে আরও শব্দ।' },

  { id: 155, title: 'য-ফলা বিস্তারিত', type: 'fold', group: 'fold',
    keys: ['z', 'f'], text: 'সভ্য সৌন্দর্য ব্যাখ্যা সত্য ব্যক্তিত্ব',
    level: 'কঠিন', tip: 'য-ফলা দিয়ে আরও শব্দ।' },

  { id: 156, title: 'ফলা মিশ্র ১', type: 'fold', group: 'fold',
    keys: ['r', 'z', 'f'], text: 'বিশ্বাস ভ্রমণ শ্রদ্ধা স্বপ্ন ব্যক্তিত্ব',
    level: 'কঠিন', tip: 'একাধিক ফলা একসাথে।' },

  { id: 157, title: 'ফলা মিশ্র ২', type: 'fold', group: 'fold',
    keys: ['r', 'z', 'f'], text: 'প্রশ্ন ক্রিয়া ব্রত স্মৃতি স্বাধীন স্নেহ',
    level: 'কঠিন', tip: 'মিশ্র ফলা।' },

  { id: 158, title: 'ফলা মিশ্র ৩', type: 'fold', group: 'fold',
    keys: ['r', 'z', 'f'], text: 'ক্লাস ক্রম প্রেম গ্রুপ ব্র্যান্ড স্ট্রিট',
    level: 'কঠিন', tip: 'ইংরেজি শব্দ বাংলায়।' },

  { id: 159, title: 'ফলা চ্যালেঞ্জ ১', type: 'challenge', group: 'fold',
    keys: ['r', 'z', 'f'], text: 'বিশ্ববিদ্যালয় প্রযুক্তি প্রতিষ্ঠান ব্র্যান্ড',
    level: 'কঠিন', tip: 'ফলা চ্যালেঞ্জ।' },

  { id: 160, title: 'ফলা চ্যালেঞ্জ ২', type: 'challenge', group: 'fold',
    keys: ['r', 'z', 'f'], text: 'প্রশিক্ষণ স্নাতকোত্তর গ্র্যাজুয়েশন বিদ্যুৎ',
    level: 'কঠিন', tip: 'উন্নত ফলা শব্দ।' },

  /* ═══════════════════════════════════════════════
     গ্রুপ ৯: স্পেশাল বর্ণ (১৬১-১৭০)
     ═══════════════════════════════════════════════ */

  { id: 161, title: 'ং অনুস্বার', type: 'special', group: 'special',
    keys: ['m'], text: 'রং বাংলা মাংস ঝংকার সংসার অংক মঙ্গল',
    level: 'মধ্যম', tip: 'Shift+M = "ং" (অনুস্বার)।' },

  { id: 162, title: 'ঃ বিসর্গ', type: 'special', group: 'special',
    keys: ['\\'], text: 'দুঃখ রাতঃ পুনঃ প্রতঃ অন্তঃ দুঃসময়',
    level: 'কঠিন', tip: 'Shift+\\ = "ঃ" (বিসর্গ)।' },

  { id: 163, title: 'ৎ খণ্ড-ত', type: 'special', group: 'special',
    keys: ['\\'], text: 'হঠাৎ আকস্মাৎ সদ্যঃ বৎসর ৎস হঠাৎ',
    level: 'কঠিন', tip: '\\ বাটন = "ৎ" (খণ্ড-ত)।' },

  { id: 164, title: 'ং ঃ ৎ একসাথে', type: 'special', group: 'special',
    keys: ['m', '\\'], text: 'হঠাৎ রং দুঃখ আকস্মাৎ সংসার অন্তঃ বৎসর',
    level: 'কঠিন', tip: 'তিনটি স্পেশাল বর্ণ।' },

  { id: 165, title: 'য় ড় ঢ় একসাথে', type: 'special', group: 'special',
    keys: ['z', 'r', 'v'], text: 'বড় ছোট পাহাড় গরু ঘোড়া বাঁশি মাঠ',
    level: 'কঠিন', tip: 'তিন শূন্য-বর্ণ।' },

  { id: 166, title: 'সব স্পেশাল বর্ণ ১', type: 'challenge', group: 'special',
    keys: ['z', 'r', 'v', 'm', '\\', 'x'],
    text: 'বড় মাঠ রং কাঁচা হঠাৎ দুঃখ পাহাড় বাঁশি',
    level: 'কঠিন', tip: 'সব স্পেশাল।' },

  { id: 167, title: 'সব স্পেশাল বর্ণ ২', type: 'challenge', group: 'special',
    keys: ['z', 'r', 'v', 'm', '\\', 'x'],
    text: 'অনুস্বার বিসর্গ চন্দ্রবিন্দু য় ড় ঢ় ৎ সব',
    level: 'কঠিন', tip: 'সব স্পেশাল বর্ণ।' },

  { id: 168, title: 'স্পেশাল চ্যালেঞ্জ ১', type: 'challenge', group: 'special',
    keys: ['z', 'r', 'v', 'm', '\\', 'x'],
    text: 'আষাঢ় মাসে হঠাৎ বৃষ্টি হয়ে গেল রাস্তা ভিজে',
    level: 'কঠিন', tip: 'বাক্যে স্পেশাল।' },

  { id: 169, title: 'স্পেশাল চ্যালেঞ্জ ২', type: 'challenge', group: 'special',
    keys: ['z', 'r', 'v', 'm', '\\', 'x'],
    text: 'দুঃখ কষ্ট সব ভুলে যাও নতুন করে শুরু করো',
    level: 'কঠিন', tip: 'জীবনের বাক্য।' },

  { id: 170, title: 'চূড়ান্ত পরীক্ষা', type: 'challenge', group: 'challenge',
    keys: ['a', 'b', 'k', 'l', 'm', 'n', 'r', 's', 't', 'z', 'v'],
    text: 'বাংলা টাইপিং শিখতে নিয়মিত অনুশীলন প্রয়োজন। প্রতিদিন অন্তত ত্রিশ মিনিট অনুশীলন করুন।',
    level: 'কঠিন', tip: 'সর্বশেষ পরীক্ষা।' }
];

/* ═══════════════════════════════════════════════════════
   GAME WORDS
   ═══════════════════════════════════════════════════════ */
const GAME_WORDS = [
  'আম', 'কলা', 'বই', 'নদী', 'আকাশ', 'বাংলা', 'শিক্ষা', 'পাখি',
  'ফুল', 'গাড়ি', 'টাকা', 'ঘর', 'পানি', 'মানুষ', 'সূর্য', 'মাটি',
  'বৃষ্টি', 'চাঁদ', 'তারা', 'গাছ', 'বন্ধু', 'মা', 'বাবা', 'ভাই',
  'বোন', 'স্কুল', 'বাজার', 'রাস্তা', 'নৌকা', 'পাহাড়', 'সাগর',
  'দেশ', 'শহর', 'গ্রাম', 'মাছ', 'মুরগি', 'গরু', 'ছাগল', 'হাতি',
  'খাতা', 'কলম', 'বই', 'ঘড়ি', 'ছবি', 'গান', 'খেলা', 'হাসি',
  'সুখ', 'দুখ', 'ভালো', 'মন্দ', 'সকাল', 'দুপুর', 'রাত', 'দিন',
  'মাটি', 'পানি', 'আগুন', 'বাতাস', 'গরম', 'ঠান্ডা', 'মিষ্টি'
];

/* ═══════════════════════════════════════════════════════
   HELPER FUNCTIONS
   ═══════════════════════════════════════════════════════ */
function getKeyForChar(char) {
  return CHAR_TO_KEY[char] || null;
}

function getCharForKey(key, shift = false) {
  if (!key) return '';
  const keyLower = key.toLowerCase();
  for (const rowName of Object.keys(BIJOY_LAYOUT)) {
    for (const k of BIJOY_LAYOUT[rowName]) {
      if (k.key.toLowerCase() === keyLower) {
        return shift ? k.shiftBn : k.bn;
      }
    }
  }
  return shift ? key.toUpperCase() : key;
}

function getKeyboardRows() {
  return [BIJOY_LAYOUT.row2, BIJOY_LAYOUT.row3, BIJOY_LAYOUT.row4];
}

function getLessonsByGroup(groupId) {
  return LESSONS.filter(l => l.group === groupId);
}

function getLessonKeys(lesson) {
  if (!lesson || !lesson.keys) return [];
  return lesson.keys;
}

/* ═══════════════════════════════════════════════════════
   CONSOLE
   ═══════════════════════════════════════════════════════ */
console.log('%c📚 Data.js loaded (ATOMIC)', 'color:#8b5cf6;font-weight:bold;font-size:14px;');
console.log(`%c   → ${LESSONS.length} লেসন, ${Object.keys(LESSON_GROUPS).length} গ্রুপ, ${GAME_WORDS.length} গেম শব্দ`, 'color:#94a3b8;font-size:11px;');
