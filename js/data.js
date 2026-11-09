/* ═══════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — DATA.JS
   বিজয় কীবোর্ড Unicode ম্যাপিং + লেসন ডেটাবেস
   ═══════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   BIJOY KEYBOARD — সম্পূর্ণ Unicode Mapping
   
   প্রতিটি কী: { normal: 'সাধারণ অক্ষর', shift: 'শিফট অক্ষর' }
   ═══════════════════════════════════════════════════════════ */

const BIJOY_LAYOUT = {
  // ═══ Row 1: সংখ্যা সারি (Number Row) ═══
  row1: [
    { key: '`',  normal: '`',   shift: '~',   bn: '`',    shiftBn: '~',   desc: 'ব্যাকটিক' },
    { key: '1',  normal: '১',   shift: '!',   bn: '১',    shiftBn: '!',   desc: 'এক' },
    { key: '2',  normal: '২',   shift: '@',   bn: '২',    shiftBn: '@',   desc: 'দুই' },
    { key: '3',  normal: '৩',   shift: '#',   bn: '৩',    shiftBn: '#',   desc: 'তিন' },
    { key: '4',  normal: '৪',   shift: '$',   bn: '৪',    shiftBn: '$',   desc: 'চার' },
    { key: '5',  normal: '৫',   shift: '%',   bn: '৫',    shiftBn: '%',   desc: 'পাঁচ' },
    { key: '6',  normal: '৬',   shift: '^',   bn: '৬',    shiftBn: '^',   desc: 'ছয়' },
    { key: '7',  normal: '৭',   shift: '&',   bn: '৭',    shiftBn: '&',   desc: 'সাত' },
    { key: '8',  normal: '৮',   shift: '*',   bn: '৮',    shiftBn: '*',   desc: 'আট' },
    { key: '9',  normal: '৯',   shift: '(',   bn: '৯',    shiftBn: '(',   desc: 'নয়' },
    { key: '0',  normal: '০',   shift: ')',   bn: '০',    shiftBn: ')',   desc: 'শূন্য' },
    { key: '-',  normal: '-',   shift: '_',   bn: '-',    shiftBn: '_',   desc: 'হাইফেন' },
    { key: '=',  normal: '=',   shift: '+',   bn: '=',    shiftBn: '+',   desc: 'সমান' },
    { key: 'Backspace', normal: '⌫', shift: '⌫', bn: '⌫', shiftBn: '⌫', desc: 'মুছুন', wide: 'backspace' }
  ],

  // ═══ Row 2: উপরের সারি (Top Row - Q to ]) ═══
  row2: [
    { key: 'Tab', normal: '⇥',  shift: '⇥',  bn: '⇥',  shiftBn: '⇥',  desc: 'ট্যাব', wide: 'wide' },
    { key: 'q', normal: 'দ',  shift: 'ধ',  bn: 'দ',  shiftBn: 'ধ',  desc: 'দ / ধ' },
    { key: 'w', normal: 'ূ',  shift: 'ঊ',  bn: 'ূ',  shiftBn: 'ঊ',  desc: 'ূ / ঊ' },
    { key: 'e', normal: 'ী',  shift: 'ঈ',  bn: 'ী',  shiftBn: 'ঈ',  desc: 'ী / ঈ' },
    { key: 'r', normal: 'র',  shift: 'ড়',  bn: 'র',  shiftBn: 'ড়',  desc: 'র / ড়' },
    { key: 't', normal: 'ট',  shift: 'ঠ',  bn: 'ট',  shiftBn: 'ঠ',  desc: 'ট / ঠ' },
    { key: 'y', normal: 'এ',  shift: 'ঐ',  bn: 'এ',  shiftBn: 'ঐ',  desc: 'এ / ঐ' },
    { key: 'u', normal: 'ু',  shift: 'উ',  bn: 'ু',  shiftBn: 'উ',  desc: 'ু / উ' },
    { key: 'i', normal: 'ি',  shift: 'ই',  bn: 'ি',  shiftBn: 'ই',  desc: 'ি / ই' },
    { key: 'o', normal: 'ো',  shift: 'ঔ',  bn: 'ো',  shiftBn: 'ঔ',  desc: 'ো / ঔ' },
    { key: 'p', normal: 'প',  shift: 'ফ',  bn: 'প',  shiftBn: 'ফ',  desc: 'প / ফ' },
    { key: '[', normal: '(',  shift: '{',  bn: '(',  shiftBn: '{',  desc: 'বন্ধনী' },
    { key: ']', normal: ')',  shift: '}',  bn: ')',  shiftBn: '}',  desc: 'বন্ধনী' },
    { key: '\\', normal: 'ৎ', shift: 'ঃ',  bn: 'ৎ',  shiftBn: 'ঃ',  desc: 'ৎ / ঃ' }
  ],

  // ═══ Row 3: হোম সারি (Home Row - A to ') ═══
  row3: [
    { key: 'CapsLock', normal: '⇪', shift: '⇪', bn: '⇪', shiftBn: '⇪', desc: 'ক্যাপস', wide: 'wide' },
    { key: 'a', normal: 'া',  shift: 'অ',  bn: 'া',  shiftBn: 'অ',  desc: 'া / অ' },
    { key: 's', normal: 'স',  shift: 'ষ',  bn: 'স',  shiftBn: 'ষ',  desc: 'স / ষ' },
    { key: 'd', normal: 'ড',  shift: 'ঢ',  bn: 'ড',  shiftBn: 'ঢ',  desc: 'ড / ঢ' },
    { key: 'f', normal: '্',  shift: 'ঋ',  bn: '্',  shiftBn: 'ঋ',  desc: 'হসন্ত / ঋ' },
    { key: 'g', normal: 'গ',  shift: 'ঘ',  bn: 'গ',  shiftBn: 'ঘ',  desc: 'গ / ঘ' },
    { key: 'h', normal: 'হ',  shift: 'ঙ',  bn: 'হ',  shiftBn: 'ঙ',  desc: 'হ / ঙ' },
    { key: 'j', normal: 'জ',  shift: 'ঝ',  bn: 'জ',  shiftBn: 'ঝ',  desc: 'জ / ঝ' },
    { key: 'k', normal: 'ক',  shift: 'খ',  bn: 'ক',  shiftBn: 'খ',  desc: 'ক / খ' },
    { key: 'l', normal: 'ল',  shift: '঳',  bn: 'ল',  shiftBn: '঳',  desc: 'ল / ঳' },
    { key: ';', normal: ';',  shift: ':',  bn: ';',  shiftBn: ':',  desc: 'সেমিকোলন' },
    { key: "'", normal: "'",  shift: '"',  bn: "'",  shiftBn: '"',  desc: 'কোট' },
    { key: 'Enter', normal: '⏎', shift: '⏎', bn: '⏎', shiftBn: '⏎', desc: 'এন্টার', wide: 'enter' }
  ],

  // ═══ Row 4: নিচের সারি (Bottom Row - Z to /) ═══
  row4: [
    { key: 'ShiftLeft', normal: '⇧', shift: '⇧', bn: '⇧', shiftBn: '⇧', desc: 'শিফট', wide: 'shift' },
    { key: 'z', normal: 'য',  shift: 'য়',  bn: 'য',  shiftBn: 'য়',  desc: 'য / য়' },
    { key: 'x', normal: 'ঁ',  shift: '৅',  bn: 'ঁ',  shiftBn: '৅',  desc: 'চন্দ্রবিন্দু' },
    { key: 'c', normal: 'চ',  shift: 'ছ',  bn: 'চ',  shiftBn: 'ছ',  desc: 'চ / ছ' },
    { key: 'v', normal: 'ভ',  shift: 'ঢ়',  bn: 'ভ',  shiftBn: 'ঢ়',  desc: 'ভ / ঢ়' },
    { key: 'b', normal: 'ব',  shift: 'ভ',  bn: 'ব',  shiftBn: 'ভ',  desc: 'ব / ভ' },
    { key: 'n', normal: 'ন',  shift: 'ণ',  bn: 'ন',  shiftBn: 'ণ',  desc: 'ন / ণ' },
    { key: 'm', normal: 'ম',  shift: 'ং',  bn: 'ম',  shiftBn: 'ং',  desc: 'ম / ং' },
    { key: ',', normal: ',',  shift: '<',  bn: ',',  shiftBn: '<',  desc: 'কমা' },
    { key: '.', normal: '.',  shift: '>',  bn: '.',  shiftBn: '>',  desc: 'দাঁড়ি' },
    { key: '/', normal: '/',  shift: '?',  bn: '/',  shiftBn: '?',  desc: 'স্ল্যাশ' },
    { key: 'ShiftRight', normal: '⇧', shift: '⇧', bn: '⇧', shiftBn: '⇧', desc: 'শিফট', wide: 'shift' }
  ],

  // ═══ Row 5: স্পেস বার ═══
  row5: [
    { key: 'ControlLeft', normal: 'Ctrl', shift: 'Ctrl', bn: 'Ctrl', shiftBn: 'Ctrl', desc: 'কন্ট্রোল', wide: 'wide' },
    { key: 'AltLeft', normal: 'Alt', shift: 'Alt', bn: 'Alt', shiftBn: 'Alt', desc: 'অল্ট', wide: 'wide' },
    { key: ' ', normal: ' ', shift: ' ', bn: '␣', shiftBn: '␣', desc: 'স্পেস', wide: 'space' },
    { key: 'AltRight', normal: 'Alt', shift: 'Alt', bn: 'Alt', shiftBn: 'Alt', desc: 'অল্ট', wide: 'wide' },
    { key: 'ControlRight', normal: 'Ctrl', shift: 'Ctrl', bn: 'Ctrl', shiftBn: 'Ctrl', desc: 'কন্ট্রোল', wide: 'wide' }
  ]
};

/* ═══════════════════════════════════════════════════════════
   KEYBOARD ROWS FLAT — লেসনের জন্য ক্রম
   ═══════════════════════════════════════════════════════════ */

const BIJOY_ALL_KEYS = [
  ...BIJOY_LAYOUT.row2,
  ...BIJOY_LAYOUT.row3,
  ...BIJOY_LAYOUT.row4
].filter(k => k.key && k.key.length === 1 && /[a-zA-Z]/.test(k.key));

/* ═══════════════════════════════════════════════════════════
   CHARACTER → KEY MAPPER
   একটি বাংলা অক্ষর থেকে কোন কী + shift চাপতে হবে তা জানায়
   ═══════════════════════════════════════════════════════════ */

const CHAR_TO_KEY = {};

// Build mapping from layout
Object.keys(BIJOY_LAYOUT).forEach(rowName => {
  BIJOY_LAYOUT[rowName].forEach(keyData => {
    // Normal char
    if (keyData.normal && keyData.normal.length >= 1) {
      if (!CHAR_TO_KEY[keyData.normal]) {
        CHAR_TO_KEY[keyData.normal] = {
          key: keyData.key,
          shift: false,
          bn: keyData.bn,
          shiftBn: keyData.shiftBn
        };
      }
    }
    // Shift char (যদি normal এর সমান না হয়)
    if (keyData.shift && keyData.shift !== keyData.normal) {
      if (!CHAR_TO_KEY[keyData.shift]) {
        CHAR_TO_KEY[keyData.shift] = {
          key: keyData.key,
          shift: true,
          bn: keyData.bn,
          shiftBn: keyData.shiftBn
        };
      }
    }
  });
});

// Space special
CHAR_TO_KEY[' '] = { key: ' ', shift: false, bn: '␣', shiftBn: '␣' };
CHAR_TO_KEY['\n'] = { key: 'Enter', shift: false, bn: '⏎', shiftBn: '⏎' };

/* ═══════════════════════════════════════════════════════════
   LESSON STRUCTURE
   
   প্রতিটি লেসন: { id, title, type, group, keys[], text, level, tip }
   - type: 'row' | 'shift' | 'special' | 'practice'
   - keys: এই লেসনে যে কী-গুলো ব্যবহৃত (হাইলাইটের জন্য)
   ═══════════════════════════════════════════════════════════ */

const LESSONS = [

  /* ═══════════════════════════════════════════════════
     PART 1: BOTTOM ROW INTRO (1-15)
     সবার আগে নিচের সারি শিখুন (সবচেয়ে সহজ)
     ═══════════════════════════════════════════════════ */

  { id: 1, title: 'ক (k)', type: 'row', group: 'bottom-row',
    keys: ['k'],
    text: 'ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক ক',
    level: 'সহজ', tip: 'বিজয় কীবোর্ডে K বাটনে "ক" আছে।' },

  { id: 2, title: 'ল (l)', type: 'row', group: 'bottom-row',
    keys: ['l'],
    text: 'ল ল ল ল ল ল ল ল ল ল ল ল ল ল ল ল ল ল ল ল',
    level: 'সহজ', tip: 'L বাটনে "ল" আছে।' },

  { id: 3, title: 'ক + ল', type: 'row', group: 'bottom-row',
    keys: ['k', 'l'],
    text: 'কল বল লক কর লল কল বল লক কর লল কল বল',
    level: 'সহজ', tip: 'K এবং L বাটন একসাথে।' },

  { id: 4, title: 'স (s)', type: 'row', group: 'bottom-row',
    keys: ['s'],
    text: 'স স স স স স স স স স স স স স স স স স স স',
    level: 'সহজ', tip: 'S বাটনে "স" আছে।' },

  { id: 5, title: 'স + ক + ল', type: 'row', group: 'bottom-row',
    keys: ['s', 'k', 'l'],
    text: 'সল কল সব কস লস বসল কলসল সবসল',
    level: 'সহজ', tip: 'তিন কী একসাথে।' },

  { id: 6, title: 'ড (d)', type: 'row', group: 'bottom-row',
    keys: ['d'],
    text: 'ড ড ড ড ড ড ড ড ড ড ড ড ড ড ড ড ড ড ড ড',
    level: 'সহজ', tip: 'D বাটনে "ড" আছে।' },

  { id: 7, title: 'ড + ক + স', type: 'row', group: 'bottom-row',
    keys: ['d', 'k', 's'],
    text: 'দক দল দস কদ লদ সদ দকদল দসকদ',
    level: 'সহজ', tip: 'D, K, S বাটন।' },

  { id: 8, title: 'া (a)', type: 'row', group: 'bottom-row',
    keys: ['a'],
    text: 'কা লা সা দা না বা মা তো যো কা লা সা',
    level: 'সহজ', tip: 'A বাটনে "া" (আ-কার) আছে।' },

  { id: 9, title: 'গ (g)', type: 'row', group: 'bottom-row',
    keys: ['g'],
    text: 'গ গ গ গ গ গ গ গ গ গ গ গ গ গ গ গ গ গ',
    level: 'সহজ', tip: 'G বাটনে "গ" আছে।' },

  { id: 10, title: 'হ (h)', type: 'row', group: 'bottom-row',
    keys: ['h'],
    text: 'হ হ হ হ হ হ হ হ হ হ হ হ হ হ হ হ হ হ',
    level: 'সহজ', tip: 'H বাটনে "হ" আছে।' },

  { id: 11, title: 'জ (j)', type: 'row', group: 'bottom-row',
    keys: ['j'],
    text: 'জ জ জ জ জ জ জ জ জ জ জ জ জ জ জ জ জ জ',
    level: 'সহজ', tip: 'J বাটনে "জ" আছে।' },

  { id: 12, title: '্ হসন্ত (f)', type: 'row', group: 'bottom-row',
    keys: ['f'],
    text: 'ক্ ল্ স্ দ্ গ্ হ্ জ্ ক্ল স্ল গ্ল',
    level: 'সহজ', tip: 'F বাটনে "্" (হসন্ত) আছে।' },

  { id: 13, title: 'সকল হোম কী', type: 'row', group: 'bottom-row',
    keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    text: 'সকল দল বল হস গজ লজ কদ সব দশ বল লাভ',
    level: 'মধ্যম', tip: 'হোম সারির সব বাটন।' },

  { id: 14, title: 'ন (n)', type: 'row', group: 'bottom-row',
    keys: ['n'],
    text: 'ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন ন',
    level: 'সহজ', tip: 'N বাটনে "ন" আছে।' },

  { id: 15, title: 'ব (b)', type: 'row', group: 'bottom-row',
    keys: ['b'],
    text: 'ব ব ব ব ব ব ব ব ব ব ব ব ব ব ব ব ব ব ব',
    level: 'সহজ', tip: 'B বাটনে "ব" আছে।' },

  /* ═══════════════════════════════════════════════════
     PART 2: MORE BOTTOM ROW (16-30)
     ═══════════════════════════════════════════════════ */

  { id: 16, title: 'ম (m)', type: 'row', group: 'bottom-row',
    keys: ['m'],
    text: 'ম ম ম ম ম ম ম ম ম ম ম ম ম ম ম ম ম ম ম',
    level: 'সহজ', tip: 'M বাটনে "ম" আছে।' },

  { id: 17, title: 'চ (c)', type: 'row', group: 'bottom-row',
    keys: ['c'],
    text: 'চ চ চ চ চ চ চ চ চ চ চ চ চ চ চ চ চ চ',
    level: 'সহজ', tip: 'C বাটনে "চ" আছে।' },

  { id: 18, title: 'ভ (v)', type: 'row', group: 'bottom-row',
    keys: ['v'],
    text: 'ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ ভ',
    level: 'সহজ', tip: 'V বাটনে "ভ" আছে।' },

  { id: 19, title: 'য (z)', type: 'row', group: 'bottom-row',
    keys: ['z'],
    text: 'য য য য য য য য য য য য য য য য য য য',
    level: 'সহজ', tip: 'Z বাটনে "য" আছে।' },

  { id: 20, title: 'ঁ চন্দ্রবিন্দু (x)', type: 'row', group: 'bottom-row',
    keys: ['x'],
    text: 'কাঁ চাঁ বাঁ ফাঁ মাঁ কাঁচা চাঁদ ফাঁকা',
    level: 'মধ্যম', tip: 'X বাটনে "ঁ" (চন্দ্রবিন্দু) আছে।' },

  { id: 21, title: 'ব + ম + ন + চ', type: 'row', group: 'bottom-row',
    keys: ['b', 'm', 'n', 'c'],
    text: 'বনমন চমক বচন মগন নবন চরন মজন',
    level: 'মধ্যম', tip: 'নিচের সারির চার কী।' },

  { id: 22, title: 'নিচের সারি পূর্ণ', type: 'row', group: 'bottom-row',
    keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    text: 'যবন মগন বনজ লখন চমক বচন নবীন',
    level: 'মধ্যম', tip: 'সব নিচের সারি।' },

  { id: 23, title: 'নিচের সারি + হোম', type: 'row', group: 'bottom-row',
    keys: ['z', 'c', 'b', 'n', 'm', 'a', 's', 'k', 'l'],
    text: 'বাংলা বাংলা চলন বলন সকল মানুষ জানা',
    level: 'মধ্যম', tip: 'নিচ + হোম সারি।' },

  { id: 24, title: 'নিচের সারি ড্রিল', type: 'row', group: 'bottom-row',
    keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    text: 'বন বন বন চল চল চল জান জান জান মন মন',
    level: 'মধ্যম', tip: 'দ্রুত টাইপ ড্রিল।' },

  { id: 25, title: 'জ + চ + ব', type: 'row', group: 'bottom-row',
    keys: ['j', 'c', 'b'],
    text: 'জব চব বিজ বচন জবাব চবি বজবজ',
    level: 'মধ্যম', tip: 'তিন অক্ষর সংযোগ।' },

  { id: 26, title: 'ক + ন + ম', type: 'row', group: 'bottom-row',
    keys: ['k', 'n', 'm'],
    text: 'কন কম নক নম মন মক কনম মনক',
    level: 'মধ্যম', tip: 'তিন কী ড্রিল।' },

  { id: 27, title: 'গ + হ + জ', type: 'row', group: 'bottom-row',
    keys: ['g', 'h', 'j'],
    text: 'গহ গজ হগ হজ জগ জহ গহজ হগজ',
    level: 'মধ্যম', tip: 'মাঝের তিন কী।' },

  { id: 28, title: 'সকল নিচের সারি', type: 'row', group: 'bottom-row',
    keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    text: 'মানুষ বাঙালি জানা চলা বলা খাওয়া শোনা',
    level: 'মধ্যম', tip: 'নিচের সারি ব্যবহার করে শব্দ।' },

  { id: 29, title: 'সহজ শব্দ ১', type: 'practice', group: 'bottom-row',
    keys: ['k', 'l', 's', 'd', 'a', 'g', 'h', 'j', 'f'],
    text: 'কল বল দল ভালো মন্দ সাধনা কামনা',
    level: 'মধ্যম', tip: 'হোম সারির শব্দ।' },

  { id: 30, title: 'সহজ শব্দ ২', type: 'practice', group: 'bottom-row',
    keys: ['k', 'n', 'm', 'b', 'c', 'v', 'z'],
    text: 'মানুষ বনমান চমক জানা বচন সবাই খবর',
    level: 'মধ্যম', tip: 'নিচের সারির শব্দ।' },

  /* ═══════════════════════════════════════════════════
     PART 3: TOP ROW (31-50)
     ═══════════════════════════════════════════════════ */

  { id: 31, title: 'দ (q)', type: 'row', group: 'top-row',
    keys: ['q'],
    text: 'দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ দ',
    level: 'সহজ', tip: 'Q বাটনে "দ" আছে।' },

  { id: 32, title: 'ূ (w)', type: 'row', group: 'top-row',
    keys: ['w'],
    text: 'কূ গূ দূ নূ মূ পূ বূ লূ জূ হূ কূ গূ',
    level: 'সহজ', tip: 'W বাটনে "ূ" (উ-কার) আছে।' },

  { id: 33, title: 'ী (e)', type: 'row', group: 'top-row',
    keys: ['e'],
    text: 'কী গী দী নী মী পী বী লী জী হী কী গী',
    level: 'সহজ', tip: 'E বাটনে "ী" (ঈ-কার) আছে।' },

  { id: 34, title: 'র (r)', type: 'row', group: 'top-row',
    keys: ['r'],
    text: 'র র র র র র র র র র র র র র র র র র র',
    level: 'সহজ', tip: 'R বাটনে "র" আছে।' },

  { id: 35, title: 'ট (t)', type: 'row', group: 'top-row',
    keys: ['t'],
    text: 'ট ট ট ট ট ট ট ট ট ট ট ট ট ট ট ট ট ট ট',
    level: 'সহজ', tip: 'T বাটনে "ট" আছে।' },

  { id: 36, title: 'এ (y)', type: 'row', group: 'top-row',
    keys: ['y'],
    text: 'একে দেখে সেজে গেছে মনে মনে দেখা যাবে',
    level: 'মধ্যম', tip: 'Y বাটনে "এ" আছে।' },

  { id: 37, title: 'ু (u)', type: 'row', group: 'top-row',
    keys: ['u'],
    text: 'কু গু দুন মুন পুন বুন লুন সুখ দুখ',
    level: 'সহজ', tip: 'U বাটনে "ু" (উ-কার) আছে।' },

  { id: 38, title: 'ি (i)', type: 'row', group: 'top-row',
    keys: ['i'],
    text: 'কি গি দি নি মি পি বি লি জি হি কি গি',
    level: 'সহজ', tip: 'I বাটনে "ি" (ই-কার) আছে।' },

  { id: 39, title: 'ো (o)', type: 'row', group: 'top-row',
    keys: ['o'],
    text: 'কো গো দো নো মো পো বো লো জো হো কো গো',
    level: 'সহজ', tip: 'O বাটনে "ো" (ও-কার) আছে।' },

  { id: 40, title: 'প (p)', type: 'row', group: 'top-row',
    keys: ['p'],
    text: 'প প প প প প প প প প প প প প প প প প প',
    level: 'সহজ', tip: 'P বাটনে "প" আছে।' },

  { id: 41, title: 'উপরের সারি ড্রিল ১', type: 'row', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't'],
    text: 'দূত রূপ দূর পূরা তিন রুট দ্রুত পূরণ',
    level: 'মধ্যম', tip: 'প্রথম ৫ কী।' },

  { id: 42, title: 'উপরের সারি ড্রিল ২', type: 'row', group: 'top-row',
    keys: ['y', 'u', 'i', 'o', 'p'],
    text: 'দুই পুল পুলিশ টুপি পোশাক কিছু পেয়েছি',
    level: 'মধ্যম', tip: 'শেষ ৫ কী।' },

  { id: 43, title: 'উপরের সারি পূর্ণ', type: 'row', group: 'top-row',
    keys: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    text: 'দ্রুত পড়ে লেখা তোরে দেখি তারপর পৌঁছাবো',
    level: 'মধ্যম', tip: 'সব উপরের সারি।' },

  { id: 44, title: 'র + ট + প', type: 'row', group: 'top-row',
    keys: ['r', 't', 'p'],
    text: 'রট পট টর পর রুপ পুট রুটি পত্র পুত্র',
    level: 'মধ্যম', tip: 'তিন কী ড্রিল।' },

  { id: 45, title: 'ি-কার শব্দ', type: 'practice', group: 'top-row',
    keys: ['i'],
    text: 'বিড়াল পাখি ছবি সকাল দুপুর বিকাল',
    level: 'মধ্যম', tip: 'ি-কার যুক্ত শব্দ।' },

  { id: 46, title: 'ী-কার শব্দ', type: 'practice', group: 'top-row',
    keys: ['e'],
    text: 'নদী সাগর পৃথিবী শিক্ষা জানালা রাতের',
    level: 'মধ্যম', tip: 'ী-কার যুক্ত শব্দ।' },

  { id: 47, title: 'ু-কার শব্দ', type: 'practice', group: 'top-row',
    keys: ['u'],
    text: 'গরু ছাগল মানুষ শিশু মুরগি সুখ দুখ',
    level: 'মধ্যম', tip: 'ু-কার যুক্ত শব্দ।' },

  { id: 48, title: 'ূ-কার শব্দ', type: 'practice', group: 'top-row',
    keys: ['w'],
    text: 'পূর্ণ সূর্য দূর দেশ দূরত্ব পুরুষ শূন্য',
    level: 'মধ্যম', tip: 'ূ-কার যুক্ত শব্দ।' },

  { id: 49, title: 'ো-কার শব্দ', type: 'practice', group: 'top-row',
    keys: ['o'],
    text: 'ছোট বড় লোক ঘোড়া বোকা মোটা সুন্দর',
    level: 'মধ্যম', tip: 'ো-কার যুক্ত শব্দ।' },

  { id: 50, title: 'উপরের + নিচের সারি', type: 'practice', group: 'top-row',
    keys: ['q', 'r', 't', 'p', 'z', 'n', 'm', 'b'],
    text: 'পড়া লেখা জানা বলা মানুষ বাংলা আমাদের',
    level: 'কঠিন', tip: 'দুই সারি একসাথে।' },

  /* ═══════════════════════════════════════════════════
     PART 4: SPECIAL CHARACTERS (51-70)
     য় ড় ঢ় ৎ ং ঃ ঁ — সব সঠিকভাবে
     ═══════════════════════════════════════════════════ */

  { id: 51, title: 'য় (Shift+Z)', type: 'shift', group: 'special',
    keys: ['z'],
    text: 'য় য় য় য় য় য় য় য় য় য় য় য় য়',
    level: 'কঠিন', tip: 'Shift+Z চাপলে "য়" আসে (অন্তস্থ-য়)।' },

  { id: 52, title: 'ড় (Shift+R)', type: 'shift', group: 'special',
    keys: ['r'],
    text: 'ড় ড় ড় ড় ড় ড় ড় ড় ড় ড় ড় ড় ড়',
    level: 'কঠিন', tip: 'Shift+R চাপলে "ড়" আসে (ড-এ শূন্য)।' },

  { id: 53, title: 'ঢ় (Shift+V)', type: 'shift', group: 'special',
    keys: ['v'],
    text: 'ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ় ঢ়',
    level: 'কঠিন', tip: 'Shift+V চাপলে "ঢ়" আসে (ঢ-এ শূন্য)।' },

  { id: 54, title: 'ং (Shift+M)', type: 'shift', group: 'special',
    keys: ['m'],
    text: 'রং বাংলা মাংস ঝংকার সংসার অংক',
    level: 'কঠিন', tip: 'Shift+M চাপলে "ং" (অনুস্বার) আসে।' },

  { id: 55, title: 'ঃ (Shift+\\)', type: 'shift', group: 'special',
    keys: ['\\'],
    text: 'দুঃখ রাতঃ পুনঃ প্রতঃ অন্তঃ দুঃসময়',
    level: 'কঠিন', tip: 'Shift+\\ চাপলে "ঃ" (বিসর্গ) আসে।' },

  { id: 56, title: 'ৎ (স্ল্যাশ)', type: 'shift', group: 'special',
    keys: ['\\'],
    text: 'হঠাৎ আকস্মাৎ সদ্যঃ বৎসর ৎস',
    level: 'কঠিন', tip: '\\ বাটনে "ৎ" (খণ্ড-ত) আছে।' },

  { id: 57, title: 'ঁ (x)', type: 'row', group: 'special',
    keys: ['x'],
    text: 'কাঁচা চাঁদ ফাঁদ বাঁশ মাঁঝি হাঁস',
    level: 'মধ্যম', tip: 'X বাটনে "ঁ" (চন্দ্রবিন্দু) আছে।' },

  { id: 58, title: 'য় ড় ঢ় একসাথে', type: 'shift', group: 'special',
    keys: ['z', 'r', 'v'],
    text: 'বড় ছোট পাহাড় গরু ঘোড়া বাঁশি মাঠ',
    level: 'কঠিন', tip: 'তিন শূন্য-বর্ণ একসাথে।' },

  { id: 59, title: 'ৎ ং ঃ একসাথে', type: 'shift', group: 'special',
    keys: ['\\', 'm'],
    text: 'হঠাৎ রং দুঃখ আকস্মাৎ সংসার অন্তঃ',
    level: 'কঠিন', tip: 'ৎ + ং + ঃ।' },

  { id: 60, title: 'সকল শূন্য-বর্ণ', type: 'shift', group: 'special',
    keys: ['z', 'r', 'v', 'm', '\\', 'x'],
    text: 'বড় মাঠ রং কাঁচা হঠাৎ দুঃখ পাহাড়',
    level: 'কঠিন', tip: 'সব স্পেশাল বর্ণ।' },

  { id: 61, title: 'শ (Shift+S)', type: 'shift', group: 'shift',
    keys: ['s'],
    text: 'শ শ শ শ শ শ শ শ শ শ শ শ শ শ শ শ শ',
    level: 'মধ্যম', tip: 'Shift+S চাপলে "শ" আসে।' },

  { id: 62, title: 'ষ (Shift+S)', type: 'shift', group: 'shift',
    keys: ['s'],
    text: 'ষ ষ ষ ষ ষ ষ ষ ষ ষ ষ ষ ষ ষ ষ ষ ষ',
    level: 'মধ্যম', tip: 'Shift+S দিয়ে "শ/ষ" টগল হয়।' },

  { id: 63, title: 'ণ (Shift+N)', type: 'shift', group: 'shift',
    keys: ['n'],
    text: 'ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ ণ',
    level: 'মধ্যম', tip: 'Shift+N চাপলে "ণ" আসে।' },

  { id: 64, title: 'খ (Shift+K)', type: 'shift', group: 'shift',
    keys: ['k'],
    text: 'খ খ খ খ খ খ খ খ খ খ খ খ খ খ খ খ খ',
    level: 'মধ্যম', tip: 'Shift+K চাপলে "খ" আসে।' },

  { id: 65, title: 'ঘ (Shift+G)', type: 'shift', group: 'shift',
    keys: ['g'],
    text: 'ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ ঘ',
    level: 'মধ্যম', tip: 'Shift+G চাপলে "ঘ" আসে।' },

  { id: 66, title: 'ছ (Shift+C)', type: 'shift', group: 'shift',
    keys: ['c'],
    text: 'ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ ছ',
    level: 'মধ্যম', tip: 'Shift+C চাপলে "ছ" আসে।' },

  { id: 67, title: 'ঝ (Shift+J)', type: 'shift', group: 'shift',
    keys: ['j'],
    text: 'ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ ঝ',
    level: 'মধ্যম', tip: 'Shift+J চাপলে "ঝ" আসে।' },

  { id: 68, title: 'ঠ (Shift+T)', type: 'shift', group: 'shift',
    keys: ['t'],
    text: 'ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ ঠ',
    level: 'মধ্যম', tip: 'Shift+T চাপলে "ঠ" আসে।' },

  { id: 69, title: 'ঢ (Shift+D)', type: 'shift', group: 'shift',
    keys: ['d'],
    text: 'ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ ঢ',
    level: 'মধ্যম', tip: 'Shift+D চাপলে "ঢ" আসে।' },

  { id: 70, title: 'ফ (Shift+P)', type: 'shift', group: 'shift',
    keys: ['p'],
    text: 'ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ ফ',
    level: 'মধ্যম', tip: 'Shift+P চাপলে "ফ" আসে।' },

  /* ═══════════════════════════════════════════════════
     PART 5: SWARABARNA — স্বরবর্ণ (71-80)
     ═══════════════════════════════════════════════════ */

  { id: 71, title: 'অ আ ই ঈ', type: 'shift', group: 'swaroborno',
    keys: ['a', 'i'],
    text: 'অ আ ই ঈ অ আ ই ঈ অআইঈ অআইঈ',
    level: 'মধ্যম', tip: 'Shift+A = অ, Shift+I = ই।' },

  { id: 72, title: 'উ ঊ ঋ এ', type: 'shift', group: 'swaroborno',
    keys: ['u', 'w', 'f', 'y'],
    text: 'উ ঊ ঋ এ উ ঊ ঋ এ উঊঋএ উঊঋএ',
    level: 'মধ্যম', tip: 'Shift+U/W/F/Y।' },

  { id: 73, title: 'ঐ ও ঔ', type: 'shift', group: 'swaroborno',
    keys: ['y', 'o'],
    text: 'ঐ ও ঔ ঐ ও ঔ ঐওঔ ঐওঔ ঐওঔ',
    level: 'মধ্যম', tip: 'Shift+Y = ঐ, Shift+O = ঔ।' },

  { id: 74, title: 'সব স্বরবর্ণ', type: 'shift', group: 'swaroborno',
    keys: ['a', 'i', 'u', 'w', 'f', 'y', 'o'],
    text: 'অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ',
    level: 'মধ্যম', tip: 'সব ১১টি স্বরবর্ণ।' },

  { id: 75, title: 'আ-কার শব্দ', type: 'practice', group: 'swaroborno',
    keys: ['a'],
    text: 'আম কাঁঠাল বাবা মা দাদা নানা শালা',
    level: 'মধ্যম', tip: 'আ-কার যুক্ত শব্দ।' },

  { id: 76, title: 'ই-কার শব্দ', type: 'practice', group: 'swaroborno',
    keys: ['i'],
    text: 'বিড়াল ছবি নদী সকাল কিছু দিন',
    level: 'মধ্যম', tip: 'ই-কার যুক্ত শব্দ।' },

  { id: 77, title: 'উ-কার শব্দ', type: 'practice', group: 'swaroborno',
    keys: ['u'],
    text: 'গরু বুলবুল সুখ দুখ কুকুর মুখ',
    level: 'মধ্যম', tip: 'উ-কার যুক্ত শব্দ।' },

  { id: 78, title: 'এ-কার শব্দ', type: 'practice', group: 'swaroborno',
    keys: ['y'],
    text: 'ছেলে মেয়ে কে যে দেখে যেন কেন',
    level: 'মধ্যম', tip: 'এ-কার যুক্ত শব্দ।' },

  { id: 79, title: 'ও-কার শব্দ', type: 'practice', group: 'swaroborno',
    keys: ['o'],
    text: 'ছোট লোক বোকা মোটা ঘোড়া বড়',
    level: 'মধ্যম', tip: 'ও-কার যুক্ত শব্দ।' },

  { id: 80, title: 'সব কার-চিহ্ন', type: 'practice', group: 'swaroborno',
    keys: ['a', 'i', 'u', 'w', 'y', 'o'],
    text: 'কা কি কী কু কূ কে কৈ কো কৌ',
    level: 'মধ্যম', tip: 'সব কার-চিহ্ন।' },

  /* ═══════════════════════════════════════════════════
     PART 6: NUMBERS & PUNCTUATION (81-90)
     ═══════════════════════════════════════════════════ */

  { id: 81, title: 'সংখ্যা ১-৫', type: 'row', group: 'numbers',
    keys: ['1', '2', '3', '4', '5'],
    text: '১ ২ ৩ ৪ ৫ ১ ২ ৩ ৪ ৫ ১২৩৪৫ ১২৩৪৫',
    level: 'সহজ', tip: 'সংখ্যা সারি ১-৫।' },

  { id: 82, title: 'সংখ্যা ৬-০', type: 'row', group: 'numbers',
    keys: ['6', '7', '8', '9', '0'],
    text: '৬ ৭ ৮ ৯ ০ ৬ ৭ ৮ ৯ ০ ৬৭৮৯০ ৬৭৮৯০',
    level: 'সহজ', tip: 'সংখ্যা সারি ৬-০।' },

  { id: 83, title: 'সব সংখ্যা', type: 'row', group: 'numbers',
    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    text: '০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯ ০১২৩৪৫৬৭৮৯',
    level: 'মধ্যম', tip: 'সব সংখ্যা।' },

  { id: 84, title: 'বাক্য চিহ্ন ১', type: 'row', group: 'numbers',
    keys: [',', '.', ';', '/'],
    text: 'কমা, দাঁড়ি। সেমি; স্ল্যাশ/ প্রশ্ন?',
    level: 'মধ্যম', tip: 'সাধারণ চিহ্ন।' },

  { id: 85, title: 'বাক্য চিহ্ন ২', type: 'shift', group: 'numbers',
    keys: [',', '.', ';', '/'],
    text: 'কমা, দাঁড়ি। সেমি; স্ল্যাশ/ প্রশ্ন? বিস্ময়!',
    level: 'মধ্যম', tip: 'শিফট চিহ্ন।' },

  { id: 86, title: 'বন্ধনী ()', type: 'row', group: 'numbers',
    keys: ['[', ']'],
    text: '(এক) (দুই) (তিন) (চার) (পাঁচ)',
    level: 'মধ্যম', tip: 'বন্ধনী।' },

  { id: 87, title: 'সংখ্যা বাক্যে', type: 'practice', group: 'numbers',
    keys: ['1', '2', '3', '4', '5'],
    text: 'আমার বয়স ২৫ বছর। আজ ১৫ তারিখ। ঘড়ি ১০ টা।',
    level: 'মধ্যম', tip: 'সংখ্যা বাক্যে।' },

  { id: 88, title: 'হাইফেন ও সমান', type: 'row', group: 'numbers',
    keys: ['-', '='],
    text: 'ক-খ গ-ঘ সমান = চিহ্ন = আরও - আরও',
    level: 'মধ্যম', tip: 'হাইফেন ও সমান।' },

  { id: 89, title: 'টাকা-পয়সা', type: 'practice', group: 'numbers',
    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    text: '১০০ টাকা ৫০০ টাকা ১০০০ টাকা ২৫ পয়সা',
    level: 'মধ্যম', tip: 'সংখ্যা বাস্তবে।' },

  { id: 90, title: 'তারিখ-সময়', type: 'practice', group: 'numbers',
    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    text: '১ জানুয়ারি ২০২৫ সকাল ১০টা রাত ৯টা ৩০ মিনিট',
    level: 'মধ্যম', tip: 'তারিখ-সময়।' },

  /* ═══════════════════════════════════════════════════
     PART 7: JUKTAKKHOR — যুক্তাক্ষর (91-105)
     ═══════════════════════════════════════════════════ */

  { id: 91, title: 'ক্ত যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['k', 'f', 't'],
    text: 'ভক্ত শক্ত রক্ত ভক্তি মুক্তি যুক্ত',
    level: 'কঠিন', tip: 'ক + ্ + ত = ক্ত' },

  { id: 92, title: 'ক্ষ যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['k', 's', 'f'],
    text: 'শিক্ষা অক্ষর পরীক্ষা রক্ষা লক্ষ্য',
    level: 'কঠিন', tip: 'ক + ্ + ষ = ক্ষ' },

  { id: 93, title: 'জ্ঞ যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['j', 'n', 'f'],
    text: 'জ্ঞান বিজ্ঞান অজ্ঞান বিশেষজ্ঞ',
    level: 'কঠিন', tip: 'জ + ্ + ঞ = জ্ঞ' },

  { id: 94, title: 'ত্র যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['t', 'f', 'r'],
    text: 'পত্র মিত্র চিত্র নেত্র পাত্র পুত্র',
    level: 'কঠিন', tip: 'ত + ্ + র = ত্র' },

  { id: 95, title: 'ন্দ যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['n', 'f', 'd'],
    text: 'আনন্দ বন্ধু চন্দন সুন্দর ছন্দ',
    level: 'কঠিন', tip: 'ন + ্ + দ = ন্দ' },

  { id: 96, title: 'ন্ত যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['n', 'f', 't'],
    text: 'শান্তি শক্তি অন্ত ভ্রমণ সঙ্গী বন্ধু',
    level: 'কঠিন', tip: 'ন + ্ + ত = ন্ত' },

  { id: 97, title: 'ম্প যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['m', 'f', 'p'],
    text: 'সম্পদ সম্পূর্ণ কম্পন স্পর্শ',
    level: 'কঠিন', tip: 'ম + ্ + প = ম্প' },

  { id: 98, title: 'স্ক যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['s', 'f', 'k'],
    text: 'স্কুল স্কোর স্কন্ধ স্কেচ স্ক্যান',
    level: 'কঠিন', tip: 'স + ্ + ক = স্ক' },

  { id: 99, title: 'ষ্ট যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['s', 'f', 't'],
    text: 'কষ্ট নষ্ট স্পষ্ট পুষ্ট বৃষ্টি দৃষ্টি',
    level: 'কঠিন', tip: 'স + ্ + ট = ষ্ট' },

  { id: 100, title: 'দ্ধ যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['d', 'f', 'd'],
    text: 'বৃদ্ধ যুদ্ধ রুদ্ধ শুদ্ধ বুদ্ধি',
    level: 'কঠিন', tip: 'দ + ্ + ধ = দ্ধ' },

  { id: 101, title: 'ন্ধ যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['n', 'f', 'd'],
    text: 'বন্ধ বন্ধন বান্ধব রন্ধন সন্ধান',
    level: 'কঠিন', tip: 'ন + ্ + ধ = ন্ধ' },

  { id: 102, title: 'ঞ্চ যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['n', 'f', 'c'],
    text: 'অঞ্চল পঞ্চ পঞ্চম বঞ্চনা সঞ্চয়',
    level: 'কঠিন', tip: 'ন + ্ + চ = ঞ্চ' },

  { id: 103, title: 'ঞ্জ যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['n', 'f', 'j'],
    text: 'মঞ্জু রঞ্জন অঞ্জন কুঞ্জ পঞ্জি',
    level: 'কঠিন', tip: 'ন + ্ + জ = ঞ্জ' },

  { id: 104, title: 'ত্ত যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['t', 'f', 't'],
    text: 'উত্তর পত্তন হত্তয়া চিত্ত',
    level: 'কঠিন', tip: 'ত + ্ + ত = ত্ত' },

  { id: 105, title: 'মিশ্র যুক্তাক্ষর', type: 'practice', group: 'juktakkhor',
    keys: ['k', 's', 't', 'j', 'n', 't', 'r'],
    text: 'বিশ্ববিদ্যালয় শিক্ষাপ্রতিষ্ঠান স্বাধীনতাসংগ্রাম',
    level: 'কঠিন', tip: 'একাধিক যুক্তাক্ষর।' },

  /* ═══════════════════════════════════════════════════
     PART 8: BAKYO — বাক্য (106-115)
     ═══════════════════════════════════════════════════ */

  { id: 106, title: 'সহজ বাক্য ১', type: 'practice', group: 'bakyo',
    keys: ['a', 'i', 'k', 'l', 's'],
    text: 'আমি ভাত খাই। তুমি স্কুলে যাও। সে বই পড়ে।',
    level: 'মধ্যম', tip: 'সহজ বাক্য।' },

  { id: 107, title: 'সহজ বাক্য ২', type: 'practice', group: 'bakyo',
    keys: ['b', 'n', 'm', 'l'],
    text: 'বাংলাদেশ আমার প্রিয় দেশ। এদেশের মানুষ ভালো।',
    level: 'মধ্যম', tip: 'দেশপ্রেম বাক্য।' },

  { id: 108, title: 'সহজ বাক্য ৩', type: 'practice', group: 'bakyo',
    keys: ['a', 'r', 't', 's', 'j'],
    text: 'আজ আকাশ পরিষ্কার। সূর্য উজ্জ্বল আলো দিচ্ছে।',
    level: 'মধ্যম', tip: 'প্রকৃতি বাক্য।' },

  { id: 109, title: 'সহজ বাক্য ৪', type: 'practice', group: 'bakyo',
    keys: ['b', 'r', 's', 't', 'r'],
    text: 'বৃষ্টি হচ্ছে। রাস্তা ভিজে গেছে। মানুষ ছাতা নেয়।',
    level: 'মধ্যম', tip: 'বৃষ্টির বাক্য।' },

  { id: 110, title: 'সহজ বাক্য ৫', type: 'practice', group: 'bakyo',
    keys: ['a', 'p', 'r', 'b', 'r'],
    text: 'আমার একটি ছোট পরিবার আছে। আমরা সবাই সুখী।',
    level: 'মধ্যম', tip: 'পরিবার বাক্য।' },

  { id: 111, title: 'প্রবাদ ১', type: 'practice', group: 'bakyo',
    keys: ['a', 'g', 'd', 'sh'],
    text: 'আগে দর্শনধারী পরে গুণবিচারী।',
    level: 'কঠিন', tip: 'বাংলা প্রবাদ।' },

  { id: 112, title: 'প্রবাদ ২', type: 'practice', group: 'bakyo',
    keys: ['a', 'l', 'b', 't', 'n'],
    text: 'অতি লোভে তাঁতি নষ্ট। অতি ভক্তি চোরের লক্ষণ।',
    level: 'কঠিন', tip: 'বাংলা প্রবাদ।' },

  { id: 113, title: 'প্রবাদ ৩', type: 'practice', group: 'bakyo',
    keys: ['j', 'r', 'b', 'ch'],
    text: 'যত রবি জ্বলে তত ছায়া বাড়ে।',
    level: 'কঠিন', tip: 'বাংলা প্রবাদ।' },

  { id: 114, title: 'কবিতা', type: 'practice', group: 'bakyo',
    keys: ['a', 'm', 'r', 's', 'n'],
    text: 'আমার সোনার বাংলা আমি তোমায় ভালোবাসি।',
    level: 'কঠিন', tip: 'জাতীয় সঙ্গীত।' },

  { id: 115, title: 'চূড়ান্ত পরীক্ষা', type: 'practice', group: 'bakyo',
    keys: ['a', 'b', 'k', 'l', 'm', 'n', 'r', 's', 't'],
    text: 'বাংলা টাইপিং শিখতে নিয়মিত অনুশীলন প্রয়োজন। প্রতিদিন অনুশীলন করুন।',
    level: 'কঠিন', tip: 'সর্বশেষ পরীক্ষা।' }
];

/* ═══════════════════════════════════════════════════════════
   GAME WORDS — গেমের জন্য শব্দ তালিকা
   ═══════════════════════════════════════════════════════════ */

const GAME_WORDS = [
  'আম', 'কলা', 'বই', 'নদী', 'আকাশ', 'বাংলা', 'শিক্ষা', 'পাখি',
  'ফুল', 'গাড়ি', 'টাকা', 'ঘর', 'পানি', 'মানুষ', 'সূর্য', 'মাটি',
  'বৃষ্টি', 'চাঁদ', 'তারা', 'গাছ', 'বন্ধু', 'মা', 'বাবা', 'ভাই',
  'বোন', 'স্কুল', 'বাজার', 'রাস্তা', 'নৌকা', 'পাহাড়', 'সাগর',
  'দেশ', 'শহর', 'গ্রাম', 'মাছ', 'মুরগি', 'গরু', 'ছাগল', 'হাতি'
];

/* ═══════════════════════════════════════════════════════════
   LESSON GROUPS — লেসন গ্রুপিং (organization)
   ═══════════════════════════════════════════════════════════ */

const LESSON_GROUPS = {
  'bottom-row': { name: 'নিচের সারি', icon: '⌨️', color: '#6366f1', desc: 'Z X C V B N M' },
  'top-row':    { name: 'উপরের সারি', icon: '⬆️', color: '#8b5cf6', desc: 'Q W E R T Y U I O P' },
  'special':    { name: 'স্পেশাল বর্ণ', icon: '⭐', color: '#ec4899', desc: 'য় ড় ঢ় ৎ ং ঃ ঁ' },
  'shift':      { name: 'Shift চিহ্ন', icon: '⇧', color: '#f59e0b', desc: 'Shift + কী' },
  'swaroborno': { name: 'স্বরবর্ণ', icon: '🅰️', color: '#10b981', desc: 'অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ' },
  'numbers':    { name: 'সংখ্যা ও চিহ্ন', icon: '🔢', color: '#06b6d4', desc: '১-০ , . ; / ( )' },
  'juktakkhor': { name: 'যুক্তাক্ষর', icon: '🔗', color: '#ef4444', desc: 'ক্ত ক্ষ জ্ঞ ত্র ন্দ...' },
  'bakyo':      { name: 'বাক্য ও প্রবাদ', icon: '📝', color: '#a855f7', desc: 'সহজ বাক্য, প্রবাদ' }
};

/* ═══════════════════════════════════════════════════════════
   HELPER FUNCTIONS — Unicode চেক ও কী খোঁজা
   ═══════════════════════════════════════════════════════════ */

/**
 * একটি বাংলা অক্ষরের জন্য কোন কী + shift চাপতে হবে তা জানায়
 * @param {string} char - বাংলা অক্ষর
 * @returns {object|null} - { key, shift, bn }
 */
function getKeyForChar(char) {
  return CHAR_TO_KEY[char] || null;
}

/**
 * একটি কী + shift থেকে বাংলা অক্ষর বের করে
 * @param {string} key - কী (lowercase)
 * @param {boolean} shift - shift চাপা আছে কি
 * @returns {string} - বাংলা অক্ষর
 */
function getCharForKey(key, shift = false) {
  const keyLower = key.toLowerCase();
  for (const rowName of Object.keys(BIJOY_LAYOUT)) {
    for (const k of BIJOY_LAYOUT[rowName]) {
      if (k.key.toLowerCase() === keyLower) {
        return shift ? k.shiftBn : k.bn;
      }
    }
  }
  // Shift key special: if not found, return normal
  return shift ? key.toUpperCase() : key;
}

/**
 * কীবোর্ডের সব কী-গুলো ফ্ল্যাট করে দেয় (row2, row3, row4)
 */
function getKeyboardRows() {
  return [BIJOY_LAYOUT.row2, BIJOY_LAYOUT.row3, BIJOY_LAYOUT.row4];
}

/**
 * গ্রুপ অনুযায়ী লেসন ফিল্টার
 */
function getLessonsByGroup(groupId) {
  return LESSONS.filter(l => l.group === groupId);
}

/**
 * একটি লেসনের সব কী hайলাইট করার জন্য
 */
function getLessonKeys(lesson) {
  if (!lesson || !lesson.keys) return [];
  return lesson.keys;
}

/* ═══════════════════════════════════════════════════════════
   DEBUG — কনসোলে চেক করার জন্য (উন্নয়নে কাজে লাগে)
   ═══════════════════════════════════════════════════════════ */

// কনসোলে চেক করুন: getKeyForChar('য়'), getKeyForChar('ড়'), getKeyForChar('ঢ়')
// প্রত্যেকটি সঠিক কী + shift রিটার্ন করবে।
