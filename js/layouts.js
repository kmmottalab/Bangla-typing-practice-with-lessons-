/* ═══════════════════════════════════════════════════════════════
   বাংলা টাইপিং একাডেমি — LAYOUTS.JS (ATOMIC)
   ৬টি সম্পূর্ণ কীবোর্ড লেআউট
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════
   ১. জাতীয় কীবোর্ড (National/Bangladesh Standard)
   সরকারি স্ট্যান্ডার্ড — BCC অনুযায়ী
   ═══════════════════════════════════════════════════════ */
const JATIYA_LAYOUT = {
  name: 'জাতীয় কীবোর্ড',
  id: 'jatiya',
  flag: '🇧🇩',
  desc: 'বাংলাদেশ সরকারি স্ট্যান্ডার্ড',
  rows: {
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
      { key: 'q', normal: 'ঙ', shift: 'ঞ', bn: 'ঙ', shiftBn: 'ঞ', desc: 'ঙ / ঞ' },
      { key: 'w', normal: 'য', shift: 'য়', bn: 'য', shiftBn: 'য়', desc: 'য / য়' },
      { key: 'e', normal: 'ড', shift: 'ঢ', bn: 'ড', shiftBn: 'ঢ', desc: 'ড / ঢ' },
      { key: 'r', normal: 'প', shift: 'ফ', bn: 'প', shiftBn: 'ফ', desc: 'প / ফ' },
      { key: 't', normal: 'ট', shift: 'ঠ', bn: 'ট', shiftBn: 'ঠ', desc: 'ট / ঠ' },
      { key: 'y', normal: 'চ', shift: 'ছ', bn: 'চ', shiftBn: 'ছ', desc: 'চ / ছ' },
      { key: 'u', normal: 'জ', shift: 'ঝ', bn: 'জ', shiftBn: 'ঝ', desc: 'জ / ঝ' },
      { key: 'i', normal: 'হ', shift: 'ঞ', bn: 'হ', shiftBn: 'ঞ', desc: 'হ / ঞ' },
      { key: 'o', normal: 'গ', shift: 'ঘ', bn: 'গ', shiftBn: 'ঘ', desc: 'গ / ঘ' },
      { key: 'p', normal: 'ড়', shift: 'ঢ়', bn: 'ড়', shiftBn: 'ঢ়', desc: 'ড় / ঢ়' },
      { key: '[', normal: '[', shift: '{', bn: '[', shiftBn: '{', desc: 'বন্ধনী' },
      { key: ']', normal: ']', shift: '}', bn: ']', shiftBn: '}', desc: 'বন্ধনী' },
      { key: '\\', normal: '\\', shift: '|', bn: '\\', shiftBn: '|', desc: 'ব্যাকস্ল্যাশ' }
    ],
    row3: [
      { key: 'CapsLock', normal: '⇪', shift: '⇪', bn: '⇪', shiftBn: '⇪', desc: 'ক্যাপস', wide: 'wide' },
      { key: 'a', normal: 'ৃ', shift: 'ঋ', bn: 'ৃ', shiftBn: 'ঋ', desc: 'ৃ / ঋ' },
      { key: 's', normal: 'ু', shift: 'উ', bn: 'ু', shiftBn: 'উ', desc: 'ু / উ' },
      { key: 'd', normal: 'ি', shift: 'ই', bn: 'ি', shiftBn: 'ই', desc: 'ি / ই' },
      { key: 'f', normal: 'া', shift: 'অ', bn: 'া', shiftBn: 'অ', desc: 'া / অ' },
      { key: 'g', normal: '্', shift: '।', bn: '্', shiftBn: '।', desc: 'হসন্ত / দাঁড়ি' },
      { key: 'h', normal: 'ব', shift: 'ভ', bn: 'ব', shiftBn: 'ভ', desc: 'ব / ভ' },
      { key: 'j', normal: 'ক', shift: 'খ', bn: 'ক', shiftBn: 'খ', desc: 'ক / খ' },
      { key: 'k', normal: 'ত', shift: 'থ', bn: 'ত', shiftBn: 'থ', desc: 'ত / থ' },
      { key: 'l', normal: 'দ', shift: 'ধ', bn: 'দ', shiftBn: 'ধ', desc: 'দ / ধ' },
      { key: ';', normal: ';', shift: ':', bn: ';', shiftBn: ':', desc: 'সেমিকোলন' },
      { key: "'", normal: "'", shift: '"', bn: "'", shiftBn: '"', desc: 'কোট' },
      { key: 'Enter', normal: '⏎', shift: '⏎', bn: '⏎', shiftBn: '⏎', desc: 'এন্টার', wide: 'enter' }
    ],
    row4: [
      { key: 'ShiftLeft', normal: '⇧', shift: '⇧', bn: '⇧', shiftBn: '⇧', desc: 'শিফট', wide: 'shift' },
      { key: 'z', normal: '্র', shift: 'র‍্য', bn: '্র', shiftBn: 'র‍্য', desc: 'র-ফলা' },
      { key: 'x', normal: '্য', shift: '‍্য', bn: '্য', shiftBn: '‍্য', desc: 'য-ফলা' },
      { key: 'c', normal: 'র', shift: 'ল', bn: 'র', shiftBn: 'ল', desc: 'র / ল' },
      { key: 'v', normal: 'ন', shift: 'ণ', bn: 'ন', shiftBn: 'ণ', desc: 'ন / ণ' },
      { key: 'b', normal: 'স', shift: 'শ', bn: 'স', shiftBn: 'শ', desc: 'স / শ' },
      { key: 'n', normal: 'ম', shift: 'ষ', bn: 'ম', shiftBn: 'ষ', desc: 'ম / ষ' },
      { key: 'm', normal: 'ৎ', shift: 'ঃ', bn: 'ৎ', shiftBn: 'ঃ', desc: 'ৎ / ঃ' },
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
  }
};

/* ═══════════════════════════════════════════════════════
   ২. বিজয় কীবোর্ড (Bijoy Classic)
   ═══════════════════════════════════════════════════════ */
const BIJOY_LAYOUT_KBD = {
  name: 'বিজয় কীবোর্ড',
  id: 'bijoy',
  flag: '🎯',
  desc: 'ক্লাসিক বিজয় লেআউট',
  rows: {
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
  }
};

/* ═══════════════════════════════════════════════════════
   ৩. অভ্র কীবোর্ড (Avro)
   ═══════════════════════════════════════════════════════ */
const AVRO_LAYOUT_KBD = {
  name: 'অভ্র কীবোর্ড',
  id: 'avro',
  flag: '🅰️',
  desc: 'লোকপ্রিয় অভ্র লেআউট',
  rows: {
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
      { key: 'q', normal: 'ঙ', shift: 'ঞ', bn: 'ঙ', shiftBn: 'ঞ', desc: 'ঙ / ঞ' },
      { key: 'w', normal: 'য', shift: 'য়', bn: 'য', shiftBn: 'য়', desc: 'য / য়' },
      { key: 'e', normal: 'ড', shift: 'ঢ', bn: 'ড', shiftBn: 'ঢ', desc: 'ড / ঢ' },
      { key: 'r', normal: 'প', shift: 'ফ', bn: 'প', shiftBn: 'ফ', desc: 'প / ফ' },
      { key: 't', normal: 'ট', shift: 'ঠ', bn: 'ট', shiftBn: 'ঠ', desc: 'ট / ঠ' },
      { key: 'y', normal: 'চ', shift: 'ছ', bn: 'চ', shiftBn: 'ছ', desc: 'চ / ছ' },
      { key: 'u', normal: 'জ', shift: 'ঝ', bn: 'জ', shiftBn: 'ঝ', desc: 'জ / ঝ' },
      { key: 'i', normal: 'হ', shift: 'ঞ', bn: 'হ', shiftBn: 'ঞ', desc: 'হ / ঞ' },
      { key: 'o', normal: 'গ', shift: 'ঘ', bn: 'গ', shiftBn: 'ঘ', desc: 'গ / ঘ' },
      { key: 'p', normal: 'ড়', shift: 'ঢ়', bn: 'ড়', shiftBn: 'ঢ়', desc: 'ড় / ঢ়' },
      { key: '[', normal: '[', shift: '{', bn: '[', shiftBn: '{', desc: 'বন্ধনী' },
      { key: ']', normal: ']', shift: '}', bn: ']', shiftBn: '}', desc: 'বন্ধনী' },
      { key: '\\', normal: '\\', shift: '|', bn: '\\', shiftBn: '|', desc: 'ব্যাকস্ল্যাশ' }
    ],
    row3: [
      { key: 'CapsLock', normal: '⇪', shift: '⇪', bn: '⇪', shiftBn: '⇪', desc: 'ক্যাপস', wide: 'wide' },
      { key: 'a', normal: 'ৃ', shift: 'ঋ', bn: 'ৃ', shiftBn: 'ঋ', desc: 'ৃ / ঋ' },
      { key: 's', normal: 'ু', shift: 'উ', bn: 'ু', shiftBn: 'উ', desc: 'ু / উ' },
      { key: 'd', normal: 'ি', shift: 'ই', bn: 'ি', shiftBn: 'ই', desc: 'ি / ই' },
      { key: 'f', normal: 'া', shift: 'অ', bn: 'া', shiftBn: 'অ', desc: 'া / অ' },
      { key: 'g', normal: '্', shift: '।', bn: '্', shiftBn: '।', desc: 'হসন্ত' },
      { key: 'h', normal: 'ব', shift: 'ভ', bn: 'ব', shiftBn: 'ভ', desc: 'ব / ভ' },
      { key: 'j', normal: 'ক', shift: 'খ', bn: 'ক', shiftBn: 'খ', desc: 'ক / খ' },
      { key: 'k', normal: 'ত', shift: 'থ', bn: 'ত', shiftBn: 'থ', desc: 'ত / থ' },
      { key: 'l', normal: 'দ', shift: 'ধ', bn: 'দ', shiftBn: 'ধ', desc: 'দ / ধ' },
      { key: ';', normal: ';', shift: ':', bn: ';', shiftBn: ':', desc: 'সেমিকোলন' },
      { key: "'", normal: "'", shift: '"', bn: "'", shiftBn: '"', desc: 'কোট' },
      { key: 'Enter', normal: '⏎', shift: '⏎', bn: '⏎', shiftBn: '⏎', desc: 'এন্টার', wide: 'enter' }
    ],
    row4: [
      { key: 'ShiftLeft', normal: '⇧', shift: '⇧', bn: '⇧', shiftBn: '⇧', desc: 'শিফট', wide: 'shift' },
      { key: 'z', normal: '্র', shift: 'র‍্য', bn: '্র', shiftBn: 'র‍্য', desc: 'র-ফলা' },
      { key: 'x', normal: '্য', shift: '‍্য', bn: '্য', shiftBn: '‍্য', desc: 'য-ফলা' },
      { key: 'c', normal: 'র', shift: 'ল', bn: 'র', shiftBn: 'ল', desc: 'র / ল' },
      { key: 'v', normal: 'ন', shift: 'ণ', bn: 'ন', shiftBn: 'ণ', desc: 'ন / ণ' },
      { key: 'b', normal: 'স', shift: 'শ', bn: 'স', shiftBn: 'শ', desc: 'স / শ' },
      { key: 'n', normal: 'ম', shift: 'ষ', bn: 'ম', shiftBn: 'ষ', desc: 'ম / ষ' },
      { key: 'm', normal: 'ৎ', shift: 'ঃ', bn: 'ৎ', shiftBn: 'ঃ', desc: 'ৎ / ঃ' },
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
  }
};

/* ═══════════════════════════════════════════════════════
   ৪. ইনস্ক্রিপ্ট (Inscript)
   ═══════════════════════════════════════════════════════ */
const INSCRIPT_LAYOUT_KBD = {
  name: 'ইনস্ক্রিপ্ট',
  id: 'inscript',
  flag: '📜',
  desc: 'ভারত সরকারি স্ট্যান্ডার্ড',
  rows: {
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
      { key: 'q', normal: 'ৌ', shift: 'ঔ', bn: 'ৌ', shiftBn: 'ঔ', desc: 'ৌ / ঔ' },
      { key: 'w', normal: 'ৈ', shift: 'ঐ', bn: 'ৈ', shiftBn: 'ঐ', desc: 'ৈ / ঐ' },
      { key: 'e', normal: 'া', shift: 'অ', bn: 'া', shiftBn: 'অ', desc: 'া / অ' },
      { key: 'r', normal: 'ী', shift: 'ঈ', bn: 'ী', shiftBn: 'ঈ', desc: 'ী / ঈ' },
      { key: 't', normal: 'ূ', shift: 'ঊ', bn: 'ূ', shiftBn: 'ঊ', desc: 'ূ / ঊ' },
      { key: 'y', normal: 'ব', shift: 'ভ', bn: 'ব', shiftBn: 'ভ', desc: 'ব / ভ' },
      { key: 'u', normal: 'হ', shift: 'ঙ', bn: 'হ', shiftBn: 'ঙ', desc: 'হ / ঙ' },
      { key: 'i', normal: 'গ', shift: 'ঘ', bn: 'গ', shiftBn: 'ঘ', desc: 'গ / ঘ' },
      { key: 'o', normal: 'দ', shift: 'ধ', bn: 'দ', shiftBn: 'ধ', desc: 'দ / ধ' },
      { key: 'p', normal: 'জ', shift: 'ঝ', bn: 'জ', shiftBn: 'ঝ', desc: 'জ / ঝ' },
      { key: '[', normal: 'ড়', shift: 'ঢ়', bn: 'ড়', shiftBn: 'ঢ়', desc: 'ড় / ঢ়' },
      { key: ']', normal: ']', shift: '}', bn: ']', shiftBn: '}', desc: 'বন্ধনী' },
      { key: '\\', normal: '\\', shift: '|', bn: '\\', shiftBn: '|', desc: 'ব্যাকস্ল্যাশ' }
    ],
    row3: [
      { key: 'CapsLock', normal: '⇪', shift: '⇪', bn: '⇪', shiftBn: '⇪', desc: 'ক্যাপস', wide: 'wide' },
      { key: 'a', normal: 'ো', shift: 'ও', bn: 'ো', shiftBn: 'ও', desc: 'ো / ও' },
      { key: 's', normal: 'ে', shift: 'এ', bn: 'ে', shiftBn: 'এ', desc: 'ে / এ' },
      { key: 'd', normal: '্', shift: 'ঋ', bn: '্', shiftBn: 'ঋ', desc: 'হসন্ত' },
      { key: 'f', normal: 'ি', shift: 'ই', bn: 'ি', shiftBn: 'ই', desc: 'ি / ই' },
      { key: 'g', normal: 'ু', shift: 'উ', bn: 'ু', shiftBn: 'উ', desc: 'ু / উ' },
      { key: 'h', normal: 'প', shift: 'ফ', bn: 'প', shiftBn: 'ফ', desc: 'প / ফ' },
      { key: 'j', normal: 'র', shift: 'ল', bn: 'র', shiftBn: 'ল', desc: 'র / ল' },
      { key: 'k', normal: 'ক', shift: 'খ', bn: 'ক', shiftBn: 'খ', desc: 'ক / খ' },
      { key: 'l', normal: 'ত', shift: 'থ', bn: 'ত', shiftBn: 'থ', desc: 'ত / থ' },
      { key: ';', normal: 'চ', shift: 'ছ', bn: 'চ', shiftBn: 'ছ', desc: 'চ / ছ' },
      { key: "'", normal: "'", shift: '"', bn: "'", shiftBn: '"', desc: 'কোট' },
      { key: 'Enter', normal: '⏎', shift: '⏎', bn: '⏎', shiftBn: '⏎', desc: 'এন্টার', wide: 'enter' }
    ],
    row4: [
      { key: 'ShiftLeft', normal: '⇧', shift: '⇧', bn: '⇧', shiftBn: '⇧', desc: 'শিফট', wide: 'shift' },
      { key: 'z', normal: 'ঁ', shift: '৅', bn: 'ঁ', shiftBn: '৅', desc: 'চন্দ্রবিন্দু' },
      { key: 'x', normal: 'ং', shift: 'ঽ', bn: 'ং', shiftBn: 'ঽ', desc: 'অনুস্বার' },
      { key: 'c', normal: 'ম', shift: 'ণ', bn: 'ম', shiftBn: 'ণ', desc: 'ম / ণ' },
      { key: 'v', normal: 'ন', shift: 'ণ', bn: 'ন', shiftBn: 'ণ', desc: 'ন / ণ' },
      { key: 'b', normal: 'ব', shift: 'ভ', bn: 'ব', shiftBn: 'ভ', desc: 'ব / ভ' },
      { key: 'n', normal: 'ল', shift: 'শ', bn: 'ল', shiftBn: 'শ', desc: 'ল / শ' },
      { key: 'm', normal: 'স', shift: 'ষ', bn: 'স', shiftBn: 'ষ', desc: 'স / ষ' },
      { key: ',', normal: ',', shift: '<', bn: ',', shiftBn: '<', desc: 'কমা' },
      { key: '.', normal: '.', shift: '>', bn: '.', shiftBn: '>', desc: 'দাঁড়ি' },
      { key: '/', normal: 'য', shift: 'য়', bn: 'য', shiftBn: 'য়', desc: 'য / য়' },
      { key: 'ShiftRight', normal: '⇧', shift: '⇧', bn: '⇧', shiftBn: '⇧', desc: 'শিফট', wide: 'shift' }
    ],
    row5: [
      { key: 'ControlLeft', normal: 'Ctrl', shift: 'Ctrl', bn: 'Ctrl', shiftBn: 'Ctrl', desc: 'কন্ট্রোল', wide: 'wide' },
      { key: 'AltLeft', normal: 'Alt', shift: 'Alt', bn: 'Alt', shiftBn: 'Alt', desc: 'অল্ট', wide: 'wide' },
      { key: ' ', normal: ' ', shift: ' ', bn: '␣', shiftBn: '␣', desc: 'স্পেস', wide: 'space' },
      { key: 'AltRight', normal: 'Alt', shift: 'Alt', bn: 'Alt', shiftBn: 'Alt', desc: 'অল্ট', wide: 'wide' },
      { key: 'ControlRight', normal: 'Ctrl', shift: 'Ctrl', bn: 'Ctrl', shiftBn: 'Ctrl', desc: 'কন্ট্রোল', wide: 'wide' }
    ]
  }
};

/* ═══════════════════════════════════════════════════════
   ৫. রিদ্মিক (Ridmik)
   ═══════════════════════════════════════════════════════ */
const RIDMIK_LAYOUT_KBD = {
  name: 'রিদ্মিক কীবোর্ড',
  id: 'ridmik',
  flag: '⚡',
  desc: 'মোবাইল ফ্রেন্ডলি',
  rows: {
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
      { key: 'q', normal: 'ঙ', shift: 'ঞ', bn: 'ঙ', shiftBn: 'ঞ', desc: 'ঙ / ঞ' },
      { key: 'w', normal: 'য', shift: 'য়', bn: 'য', shiftBn: 'য়', desc: 'য / য়' },
      { key: 'e', normal: 'ড', shift: 'ঢ', bn: 'ড', shiftBn: 'ঢ', desc: 'ড / ঢ' },
      { key: 'r', normal: 'প', shift: 'ফ', bn: 'প', shiftBn: 'ফ', desc: 'প / ফ' },
      { key: 't', normal: 'ট', shift: 'ঠ', bn: 'ট', shiftBn: 'ঠ', desc: 'ট / ঠ' },
      { key: 'y', normal: 'চ', shift: 'ছ', bn: 'চ', shiftBn: 'ছ', desc: 'চ / ছ' },
      { key: 'u', normal: 'জ', shift: 'ঝ', bn: 'জ', shiftBn: 'ঝ', desc: 'জ / ঝ' },
      { key: 'i', normal: 'হ', shift: 'ঞ', bn: 'হ', shiftBn: 'ঞ', desc: 'হ / ঞ' },
      { key: 'o', normal: 'গ', shift: 'ঘ', bn: 'গ', shiftBn: 'ঘ', desc: 'গ / ঘ' },
      { key: 'p', normal: 'ড়', shift: 'ঢ়', bn: 'ড়', shiftBn: 'ঢ়', desc: 'ড় / ঢ়' },
      { key: '[', normal: '[', shift: '{', bn: '[', shiftBn: '{', desc: 'বন্ধনী' },
      { key: ']', normal: ']', shift: '}', bn: ']', shiftBn: '}', desc: 'বন্ধনী' },
      { key: '\\', normal: '\\', shift: '|', bn: '\\', shiftBn: '|', desc: 'ব্যাকস্ল্যাশ' }
    ],
    row3: [
      { key: 'CapsLock', normal: '⇪', shift: '⇪', bn: '⇪', shiftBn: '⇪', desc: 'ক্যাপস', wide: 'wide' },
      { key: 'a', normal: 'ৃ', shift: 'ঋ', bn: 'ৃ', shiftBn: 'ঋ', desc: 'ৃ / ঋ' },
      { key: 's', normal: 'ু', shift: 'উ', bn: 'ু', shiftBn: 'উ', desc: 'ু / উ' },
      { key: 'd', normal: 'ি', shift: 'ই', bn: 'ি', shiftBn: 'ই', desc: 'ি / ই' },
      { key: 'f', normal: 'া', shift: 'অ', bn: 'া', shiftBn: 'অ', desc: 'া / অ' },
      { key: 'g', normal: '্', shift: '।', bn: '্', shiftBn: '।', desc: 'হসন্ত' },
      { key: 'h', normal: 'ব', shift: 'ভ', bn: 'ব', shiftBn: 'ভ', desc: 'ব / ভ' },
      { key: 'j', normal: 'ক', shift: 'খ', bn: 'ক', shiftBn: 'খ', desc: 'ক / খ' },
      { key: 'k', normal: 'ত', shift: 'থ', bn: 'ত', shiftBn: 'থ', desc: 'ত / থ' },
      { key: 'l', normal: 'দ', shift: 'ধ', bn: 'দ', shiftBn: 'ধ', desc: 'দ / ধ' },
      { key: ';', normal: ';', shift: ':', bn: ';', shiftBn: ':', desc: 'সেমিকোলন' },
      { key: "'", normal: "'", shift: '"', bn: "'", shiftBn: '"', desc: 'কোট' },
      { key: 'Enter', normal: '⏎', shift: '⏎', bn: '⏎', shiftBn: '⏎', desc: 'এন্টার', wide: 'enter' }
    ],
    row4: [
      { key: 'ShiftLeft', normal: '⇧', shift: '⇧', bn: '⇧', shiftBn: '⇧', desc: 'শিফট', wide: 'shift' },
      { key: 'z', normal: '্র', shift: 'র‍্য', bn: '্র', shiftBn: 'র‍্য', desc: 'র-ফলা' },
      { key: 'x', normal: '্য', shift: '‍্য', bn: '্য', shiftBn: '‍্য', desc: 'য-ফলা' },
      { key: 'c', normal: 'র', shift: 'ল', bn: 'র', shiftBn: 'ল', desc: 'র / ল' },
      { key: 'v', normal: 'ন', shift: 'ণ', bn: 'ন', shiftBn: 'ণ', desc: 'ন / ণ' },
      { key: 'b', normal: 'স', shift: 'শ', bn: 'স', shiftBn: 'শ', desc: 'স / শ' },
      { key: 'n', normal: 'ম', shift: 'ষ', bn: 'ম', shiftBn: 'ষ', desc: 'ম / ষ' },
      { key: 'm', normal: 'ৎ', shift: 'ঃ', bn: 'ৎ', shiftBn: 'ঃ', desc: 'ৎ / ঃ' },
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
  }
};

/* ═══════════════════════════════════════════════════════
   ৬. প্রভাত (Probhat)
   ═══════════════════════════════════════════════════════ */
const PROBHAT_LAYOUT_KBD = {
  name: 'প্রভাত কীবোর্ড',
  id: 'probhat',
  flag: '🎨',
  desc: 'সহজ ও সুনির্দিষ্ট',
  rows: {
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
      { key: 'q', normal: 'ৌ', shift: 'ঔ', bn: 'ৌ', shiftBn: 'ঔ', desc: 'ৌ / ঔ' },
      { key: 'w', normal: 'ৈ', shift: 'ঐ', bn: 'ৈ', shiftBn: 'ঐ', desc: 'ৈ / ঐ' },
      { key: 'e', normal: 'া', shift: 'অ', bn: 'া', shiftBn: 'অ', desc: 'া / অ' },
      { key: 'r', normal: 'ী', shift: 'ঈ', bn: 'ী', shiftBn: 'ঈ', desc: 'ী / ঈ' },
      { key: 't', normal: 'ূ', shift: 'ঊ', bn: 'ূ', shiftBn: 'ঊ', desc: 'ূ / ঊ' },
      { key: 'y', normal: 'ব', shift: 'ভ', bn: 'ব', shiftBn: 'ভ', desc: 'ব / ভ' },
      { key: 'u', normal: 'হ', shift: 'ঙ', bn: 'হ', shiftBn: 'ঙ', desc: 'হ / ঙ' },
      { key: 'i', normal: 'গ', shift: 'ঘ', bn: 'গ', shiftBn: 'ঘ', desc: 'গ / ঘ' },
      { key: 'o', normal: 'দ', shift: 'ধ', bn: 'দ', shiftBn: 'ধ', desc: 'দ / ধ' },
      { key: 'p', normal: 'জ', shift: 'ঝ', bn: 'জ', shiftBn: 'ঝ', desc: 'জ / ঝ' },
      { key: '[', normal: 'ড়', shift: 'ঢ়', bn: 'ড়', shiftBn: 'ঢ়', desc: 'ড় / ঢ়' },
      { key: ']', normal: ']', shift: '}', bn: ']', shiftBn: '}', desc: 'বন্ধনী' },
      { key: '\\', normal: '\\', shift: '|', bn: '\\', shiftBn: '|', desc: 'ব্যাকস্ল্যাশ' }
    ],
    row3: [
      { key: 'CapsLock', normal: '⇪', shift: '⇪', bn: '⇪', shiftBn: '⇪', desc: 'ক্যাপস', wide: 'wide' },
      { key: 'a', normal: 'ো', shift: 'ও', bn: 'ো', shiftBn: 'ও', desc: 'ো / ও' },
      { key: 's', normal: 'ে', shift: 'এ', bn: 'ে', shiftBn: 'এ', desc: 'ে / এ' },
      { key: 'd', normal: '্', shift: 'ঋ', bn: '্', shiftBn: 'ঋ', desc: 'হসন্ত' },
      { key: 'f', normal: 'ি', shift: 'ই', bn: 'ি', shiftBn: 'ই', desc: 'ি / ই' },
      { key: 'g', normal: 'ু', shift: 'উ', bn: 'ু', shiftBn: 'উ', desc: 'ু / উ' },
      { key: 'h', normal: 'প', shift: 'ফ', bn: 'প', shiftBn: 'ফ', desc: 'প / ফ' },
      { key: 'j', normal: 'র', shift: 'ল', bn: 'র', shiftBn: 'ল', desc: 'র / ল' },
      { key: 'k', normal: 'ক', shift: 'খ', bn: 'ক', shiftBn: 'খ', desc: 'ক / খ' },
      { key: 'l', normal: 'ত', shift: 'থ', bn: 'ত', shiftBn: 'থ', desc: 'ত / থ' },
      { key: ';', normal: 'চ', shift: 'ছ', bn: 'চ', shiftBn: 'ছ', desc: 'চ / ছ' },
      { key: "'", normal: "'", shift: '"', bn: "'", shiftBn: '"', desc: 'কোট' },
      { key: 'Enter', normal: '⏎', shift: '⏎', bn: '⏎', shiftBn: '⏎', desc: 'এন্টার', wide: 'enter' }
    ],
    row4: [
      { key: 'ShiftLeft', normal: '⇧', shift: '⇧', bn: '⇧', shiftBn: '⇧', desc: 'শিফট', wide: 'shift' },
      { key: 'z', normal: 'ঁ', shift: '৅', bn: 'ঁ', shiftBn: '৅', desc: 'চন্দ্রবিন্দু' },
      { key: 'x', normal: 'ং', shift: 'ঽ', bn: 'ং', shiftBn: 'ঽ', desc: 'অনুস্বার' },
      { key: 'c', normal: 'ম', shift: 'ণ', bn: 'ম', shiftBn: 'ণ', desc: 'ম / ণ' },
      { key: 'v', normal: 'ন', shift: 'ণ', bn: 'ন', shiftBn: 'ণ', desc: 'ন / ণ' },
      { key: 'b', normal: 'ব', shift: 'ভ', bn: 'ব', shiftBn: 'ভ', desc: 'ব / ভ' },
      { key: 'n', normal: 'ল', shift: 'শ', bn: 'ল', shiftBn: 'শ', desc: 'ল / শ' },
      { key: 'm', normal: 'স', shift: 'ষ', bn: 'স', shiftBn: 'ষ', desc: 'স / ষ' },
      { key: ',', normal: ',', shift: '<', bn: ',', shiftBn: '<', desc: 'কমা' },
      { key: '.', normal: '.', shift: '>', bn: '.', shiftBn: '>', desc: 'দাঁড়ি' },
      { key: '/', normal: 'য', shift: 'য়', bn: 'য', shiftBn: 'য়', desc: 'য / য়' },
      { key: 'ShiftRight', normal: '⇧', shift: '⇧', bn: '⇧', shiftBn: '⇧', desc: 'শিফট', wide: 'shift' }
    ],
    row5: [
      { key: 'ControlLeft', normal: 'Ctrl', shift: 'Ctrl', bn: 'Ctrl', shiftBn: 'Ctrl', desc: 'কন্ট্রোল', wide: 'wide' },
      { key: 'AltLeft', normal: 'Alt', shift: 'Alt', bn: 'Alt', shiftBn: 'Alt', desc: 'অল্ট', wide: 'wide' },
      { key: ' ', normal: ' ', shift: ' ', bn: '␣', shiftBn: '␣', desc: 'স্পেস', wide: 'space' },
      { key: 'AltRight', normal: 'Alt', shift: 'Alt', bn: 'Alt', shiftBn: 'Alt', desc: 'অল্ট', wide: 'wide' },
      { key: 'ControlRight', normal: 'Ctrl', shift: 'Ctrl', bn: 'Ctrl', shiftBn: 'Ctrl', desc: 'কন্ট্রোল', wide: 'wide' }
    ]
  }
};

/* ═══════════════════════════════════════════════════════
   MASTER LAYOUTS OBJECT
   ═══════════════════════════════════════════════════════ */
const KEYBOARD_LAYOUTS = {
  jatiya: JATIYA_LAYOUT,
  bijoy: BIJOY_LAYOUT_KBD,
  avro: AVRO_LAYOUT_KBD,
  inscript: INSCRIPT_LAYOUT_KBD,
  ridmik: RIDMIK_LAYOUT_KBD,
  probhat: PROBHAT_LAYOUT_KBD
};

/* ═══════════════════════════════════════════════════════
   ACTIVE LAYOUT — ডিফল্ট
   ═══════════════════════════════════════════════════════ */
let CURRENT_LAYOUT_ID = 'jatiya';

function getActiveLayout() {
  return KEYBOARD_LAYOUTS[CURRENT_LAYOUT_ID] || KEYBOARD_LAYOUTS.jatiya;
}

function setActiveLayout(id) {
  if (KEYBOARD_LAYOUTS[id]) {
    CURRENT_LAYOUT_ID = id;
    console.log('%c⌨️ Layout changed: ' + KEYBOARD_LAYOUTS[id].name, 'color:#8b5cf6;');
    return true;
  }
  return false;
}

/* ═══════════════════════════════════════════════════════
   CHAR_TO_KEY MAPPER — সব লেআউটের জন্য
   ═══════════════════════════════════════════════════════ */
function buildCharToKeyMap(layoutId) {
  const layout = KEYBOARD_LAYOUTS[layoutId];
  if (!layout) return {};

  const map = {};
  Object.keys(layout.rows).forEach(rowName => {
    layout.rows[rowName].forEach(keyData => {
      if (keyData.normal && keyData.normal.length >= 1) {
        if (!map[keyData.normal]) {
          map[keyData.normal] = {
            key: keyData.key,
            shift: false,
            bn: keyData.bn,
            shiftBn: keyData.shiftBn,
            layout: layoutId
          };
        }
      }
      if (keyData.shift && keyData.shift !== keyData.normal) {
        if (!map[keyData.shift]) {
          map[keyData.shift] = {
            key: keyData.key,
            shift: true,
            bn: keyData.bn,
            shiftBn: keyData.shiftBn,
            layout: layoutId
          };
        }
      }
    });
  });

  map[' '] = { key: ' ', shift: false, bn: '␣', shiftBn: '␣', layout: layoutId };
  map['\n'] = { key: 'Enter', shift: false, bn: '⏎', shiftBn: '⏎', layout: layoutId };

  return map;
}

/* ═══════════════════════════════════════════════════════
   ALL CHAR_MAPS (একসাথে সব লেআউট)
   ═══════════════════════════════════════════════════════ */
const ALL_CHAR_MAPS = {};
Object.keys(KEYBOARD_LAYOUTS).forEach(id => {
  ALL_CHAR_MAPS[id] = buildCharToKeyMap(id);
});

/* ═══════════════════════════════════════════════════════
   HELPER FUNCTIONS
   ═══════════════════════════════════════════════════════ */
function getKeyForChar(char, layoutId) {
  const id = layoutId || CURRENT_LAYOUT_ID;
  return ALL_CHAR_MAPS[id]?.[char] || null;
}

function getCharForKey(key, shift, layoutId) {
  const id = layoutId || CURRENT_LAYOUT_ID;
  const layout = KEYBOARD_LAYOUTS[id];
  if (!layout || !key) return '';

  const keyLower = key.toLowerCase();
  for (const rowName of Object.keys(layout.rows)) {
    for (const k of layout.rows[rowName]) {
      if (k.key.toLowerCase() === keyLower) {
        return shift ? k.shiftBn : k.bn;
      }
    }
  }
  return shift ? key.toUpperCase() : key;
}

function getLayoutRows(layoutId) {
  const id = layoutId || CURRENT_LAYOUT_ID;
  const layout = KEYBOARD_LAYOUTS[id];
  if (!layout) return [];
  return [
    layout.rows.row1,
    layout.rows.row2,
    layout.rows.row3,
    layout.rows.row4,
    layout.rows.row5
  ];
}

function getAllLayoutIds() {
  return Object.keys(KEYBOARD_LAYOUTS);
}

function getLayoutInfo(id) {
  const layout = KEYBOARD_LAYOUTS[id];
  if (!layout) return null;
  return {
    id: layout.id,
    name: layout.name,
    flag: layout.flag,
    desc: layout.desc
  };
}

/* ═══════════════════════════════════════════════════════
   CONSOLE
   ═══════════════════════════════════════════════════════ */
console.log('%c⌨️ Layouts.js loaded (ATOMIC)', 'color:#06b6d4;font-weight:bold;font-size:14px;');
console.log('%c   → ' + Object.keys(KEYBOARD_LAYOUTS).length + ' layouts: ' + Object.keys(KEYBOARD_LAYOUTS).join(', '), 'color:#94a3b8;font-size:11px;');
