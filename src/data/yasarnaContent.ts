export interface ArabicLetter {
  letter: string;
  name: string;
  transliteration: string;
  forms: {
    isolated: string;
    beginning: string;
    middle: string;
    end: string;
  };
  examples: Array<{
    arabic: string;
    transliteration: string;
    meaning: string;
  }>;
}

export interface Vowel {
  name: string;
  symbol: string;
  description: string;
  examples: Array<{
    arabic: string;
    transliteration: string;
  }>;
}

export interface JoiningExample {
  id: string;
  letters: string[];
  word: string;
  transliteration: string;
  breakdown: string;
}

export interface ReadingLesson {
  id: string;
  level: 'syllable' | 'word' | 'ayah';
  title: string;
  examples: Array<{
    arabic: string;
    transliteration: string;
    meaning?: string;
  }>;
}

export interface QuizQuestion {
  id: string;
  type: 'transliteration' | 'matching' | 'vowel' | 'reading';
  question: string;
  arabic?: string;
  options: string[];
  correctAnswer: string;
}

export interface TajwidRule {
  id: string;
  title: string;
  description: string;
  examples: Array<{
    arabic: string;
    transliteration: string;
    highlight: string;
    explanation: string;
  }>;
}

export const arabicAlphabet: ArabicLetter[] = [
  {
    letter: "ا",
    name: "Alif",
    transliteration: "a",
    forms: { isolated: "ا", beginning: "ا", middle: "ـا", end: "ـا" },
    examples: [
      { arabic: "أَب", transliteration: "ab", meaning: "father" },
      { arabic: "إِسْلَام", transliteration: "islam", meaning: "Islam" }
    ]
  },
  {
    letter: "ب",
    name: "Ba",
    transliteration: "b",
    forms: { isolated: "ب", beginning: "بـ", middle: "ـبـ", end: "ـب" },
    examples: [
      { arabic: "بَاب", transliteration: "bab", meaning: "door" },
      { arabic: "كِتَاب", transliteration: "kitab", meaning: "book" }
    ]
  },
  {
    letter: "ت",
    name: "Ta",
    transliteration: "t",
    forms: { isolated: "ت", beginning: "تـ", middle: "ـتـ", end: "ـت" },
    examples: [
      { arabic: "تِين", transliteration: "teen", meaning: "fig" },
      { arabic: "بَيْت", transliteration: "bayt", meaning: "house" }
    ]
  },
  {
    letter: "ث",
    name: "Tha",
    transliteration: "th",
    forms: { isolated: "ث", beginning: "ثـ", middle: "ـثـ", end: "ـث" },
    examples: [
      { arabic: "ثَلَاثَة", transliteration: "thalatha", meaning: "three" },
      { arabic: "حَدِيث", transliteration: "hadith", meaning: "hadith" }
    ]
  },
  {
    letter: "ج",
    name: "Jeem",
    transliteration: "j",
    forms: { isolated: "ج", beginning: "جـ", middle: "ـجـ", end: "ـج" },
    examples: [
      { arabic: "جَنَّة", transliteration: "jannah", meaning: "paradise" },
      { arabic: "مَسْجِد", transliteration: "masjid", meaning: "mosque" }
    ]
  },
  {
    letter: "ح",
    name: "Ha",
    transliteration: "h",
    forms: { isolated: "ح", beginning: "حـ", middle: "ـحـ", end: "ـح" },
    examples: [
      { arabic: "حَمْد", transliteration: "hamd", meaning: "praise" },
      { arabic: "صَبَاح", transliteration: "sabah", meaning: "morning" }
    ]
  },
  {
    letter: "خ",
    name: "Kha",
    transliteration: "kh",
    forms: { isolated: "خ", beginning: "خـ", middle: "ـخـ", end: "ـخ" },
    examples: [
      { arabic: "خَيْر", transliteration: "khayr", meaning: "goodness" },
      { arabic: "شَيْخ", transliteration: "shaykh", meaning: "sheikh" }
    ]
  },
  {
    letter: "د",
    name: "Dal",
    transliteration: "d",
    forms: { isolated: "د", beginning: "د", middle: "ـد", end: "ـد" },
    examples: [
      { arabic: "دِين", transliteration: "deen", meaning: "religion" },
      { arabic: "حَمْد", transliteration: "hamd", meaning: "praise" }
    ]
  },
  {
    letter: "ذ",
    name: "Thal",
    transliteration: "dh",
    forms: { isolated: "ذ", beginning: "ذ", middle: "ـذ", end: "ـذ" },
    examples: [
      { arabic: "ذِكْر", transliteration: "dhikr", meaning: "remembrance" },
      { arabic: "أُذُن", transliteration: "udhun", meaning: "ear" }
    ]
  },
  {
    letter: "ر",
    name: "Ra",
    transliteration: "r",
    forms: { isolated: "ر", beginning: "ر", middle: "ـر", end: "ـر" },
    examples: [
      { arabic: "رَبّ", transliteration: "rabb", meaning: "Lord" },
      { arabic: "نُور", transliteration: "noor", meaning: "light" }
    ]
  },
  {
    letter: "ز",
    name: "Zay",
    transliteration: "z",
    forms: { isolated: "ز", beginning: "ز", middle: "ـز", end: "ـز" },
    examples: [
      { arabic: "زَيْت", transliteration: "zayt", meaning: "oil" },
      { arabic: "فَوْز", transliteration: "fawz", meaning: "success" }
    ]
  },
  {
    letter: "س",
    name: "Seen",
    transliteration: "s",
    forms: { isolated: "س", beginning: "سـ", middle: "ـسـ", end: "ـس" },
    examples: [
      { arabic: "سَلَام", transliteration: "salam", meaning: "peace" },
      { arabic: "نَاس", transliteration: "nas", meaning: "people" }
    ]
  },
  {
    letter: "ش",
    name: "Sheen",
    transliteration: "sh",
    forms: { isolated: "ش", beginning: "شـ", middle: "ـشـ", end: "ـش" },
    examples: [
      { arabic: "شَمْس", transliteration: "shams", meaning: "sun" },
      { arabic: "عَرْش", transliteration: "arsh", meaning: "throne" }
    ]
  },
  {
    letter: "ص",
    name: "Sad",
    transliteration: "s",
    forms: { isolated: "ص", beginning: "صـ", middle: "ـصـ", end: "ـص" },
    examples: [
      { arabic: "صَلَاة", transliteration: "salah", meaning: "prayer" },
      { arabic: "قِصَص", transliteration: "qisas", meaning: "stories" }
    ]
  },
  {
    letter: "ض",
    name: "Dad",
    transliteration: "d",
    forms: { isolated: "ض", beginning: "ضـ", middle: "ـضـ", end: "ـض" },
    examples: [
      { arabic: "ضَوْء", transliteration: "daw", meaning: "light" },
      { arabic: "رَمَضَان", transliteration: "ramadan", meaning: "Ramadan" }
    ]
  },
  {
    letter: "ط",
    name: "Ta",
    transliteration: "t",
    forms: { isolated: "ط", beginning: "طـ", middle: "ـطـ", end: "ـط" },
    examples: [
      { arabic: "طَيِّب", transliteration: "tayyib", meaning: "good" },
      { arabic: "خَطّ", transliteration: "khatt", meaning: "line" }
    ]
  },
  {
    letter: "ظ",
    name: "Dha",
    transliteration: "dh",
    forms: { isolated: "ظ", beginning: "ظـ", middle: "ـظـ", end: "ـظ" },
    examples: [
      { arabic: "ظَلَام", transliteration: "dhalam", meaning: "darkness" },
      { arabic: "حَفِظ", transliteration: "hafidh", meaning: "memorizer" }
    ]
  },
  {
    letter: "ع",
    name: "Ayn",
    transliteration: "'",
    forms: { isolated: "ع", beginning: "عـ", middle: "ـعـ", end: "ـع" },
    examples: [
      { arabic: "عِلْم", transliteration: "'ilm", meaning: "knowledge" },
      { arabic: "سَمْع", transliteration: "sam'", meaning: "hearing" }
    ]
  },
  {
    letter: "غ",
    name: "Ghayn",
    transliteration: "gh",
    forms: { isolated: "غ", beginning: "غـ", middle: "ـغـ", end: "ـغ" },
    examples: [
      { arabic: "غَفُور", transliteration: "ghafoor", meaning: "forgiving" },
      { arabic: "بَلَاغ", transliteration: "balagh", meaning: "message" }
    ]
  },
  {
    letter: "ف",
    name: "Fa",
    transliteration: "f",
    forms: { isolated: "ف", beginning: "فـ", middle: "ـفـ", end: "ـف" },
    examples: [
      { arabic: "فَجْر", transliteration: "fajr", meaning: "dawn" },
      { arabic: "شَرَف", transliteration: "sharaf", meaning: "honor" }
    ]
  },
  {
    letter: "ق",
    name: "Qaf",
    transliteration: "q",
    forms: { isolated: "ق", beginning: "قـ", middle: "ـقـ", end: "ـق" },
    examples: [
      { arabic: "قُرْآن", transliteration: "quran", meaning: "Quran" },
      { arabic: "حَقّ", transliteration: "haqq", meaning: "truth" }
    ]
  },
  {
    letter: "ك",
    name: "Kaf",
    transliteration: "k",
    forms: { isolated: "ك", beginning: "كـ", middle: "ـكـ", end: "ـك" },
    examples: [
      { arabic: "كِتَاب", transliteration: "kitab", meaning: "book" },
      { arabic: "مَلَك", transliteration: "malak", meaning: "angel" }
    ]
  },
  {
    letter: "ل",
    name: "Lam",
    transliteration: "l",
    forms: { isolated: "ل", beginning: "لـ", middle: "ـلـ", end: "ـل" },
    examples: [
      { arabic: "لَيْل", transliteration: "layl", meaning: "night" },
      { arabic: "جَمَل", transliteration: "jamal", meaning: "camel" }
    ]
  },
  {
    letter: "م",
    name: "Meem",
    transliteration: "m",
    forms: { isolated: "م", beginning: "مـ", middle: "ـمـ", end: "ـم" },
    examples: [
      { arabic: "مَاء", transliteration: "ma", meaning: "water" },
      { arabic: "يَوْم", transliteration: "yawm", meaning: "day" }
    ]
  },
  {
    letter: "ن",
    name: "Noon",
    transliteration: "n",
    forms: { isolated: "ن", beginning: "نـ", middle: "ـنـ", end: "ـن" },
    examples: [
      { arabic: "نُور", transliteration: "noor", meaning: "light" },
      { arabic: "إِيمَان", transliteration: "iman", meaning: "faith" }
    ]
  },
  {
    letter: "ه",
    name: "Ha",
    transliteration: "h",
    forms: { isolated: "ه", beginning: "هـ", middle: "ـهـ", end: "ـه" },
    examples: [
      { arabic: "هُدَى", transliteration: "huda", meaning: "guidance" },
      { arabic: "اللَّه", transliteration: "Allah", meaning: "Allah" }
    ]
  },
  {
    letter: "و",
    name: "Waw",
    transliteration: "w/u",
    forms: { isolated: "و", beginning: "و", middle: "ـو", end: "ـو" },
    examples: [
      { arabic: "وَحْي", transliteration: "wahy", meaning: "revelation" },
      { arabic: "دَعْوَة", transliteration: "da'wah", meaning: "invitation" }
    ]
  },
  {
    letter: "ي",
    name: "Ya",
    transliteration: "y/i",
    forms: { isolated: "ي", beginning: "يـ", middle: "ـيـ", end: "ـي" },
    examples: [
      { arabic: "يَد", transliteration: "yad", meaning: "hand" },
      { arabic: "نَبِي", transliteration: "nabi", meaning: "prophet" }
    ]
  }
];

export const vowels: Vowel[] = [
  {
    name: "Fatha",
    symbol: "َ",
    description: "A short 'a' sound placed above the letter",
    examples: [
      { arabic: "بَ", transliteration: "ba" },
      { arabic: "كَ", transliteration: "ka" },
      { arabic: "مَ", transliteration: "ma" }
    ]
  },
  {
    name: "Kasra",
    symbol: "ِ",
    description: "A short 'i' sound placed below the letter",
    examples: [
      { arabic: "بِ", transliteration: "bi" },
      { arabic: "كِ", transliteration: "ki" },
      { arabic: "مِ", transliteration: "mi" }
    ]
  },
  {
    name: "Damma",
    symbol: "ُ",
    description: "A short 'u' sound placed above the letter",
    examples: [
      { arabic: "بُ", transliteration: "bu" },
      { arabic: "كُ", transliteration: "ku" },
      { arabic: "مُ", transliteration: "mu" }
    ]
  },
  {
    name: "Sukoon",
    symbol: "ْ",
    description: "Indicates no vowel sound after the letter",
    examples: [
      { arabic: "بْ", transliteration: "b" },
      { arabic: "كْ", transliteration: "k" },
      { arabic: "مْ", transliteration: "m" }
    ]
  },
  {
    name: "Shadda",
    symbol: "ّ",
    description: "Doubles the letter sound (emphasis)",
    examples: [
      { arabic: "بَّ", transliteration: "bba" },
      { arabic: "رَبِّ", transliteration: "rabbi" },
      { arabic: "حَقٌّ", transliteration: "haqqun" }
    ]
  },
  {
    name: "Tanween Fath",
    symbol: "ً",
    description: "Double fatha - adds 'an' sound",
    examples: [
      { arabic: "كِتَابًا", transliteration: "kitaban" },
      { arabic: "شُكْرًا", transliteration: "shukran" }
    ]
  },
  {
    name: "Tanween Kasr",
    symbol: "ٍ",
    description: "Double kasra - adds 'in' sound",
    examples: [
      { arabic: "كِتَابٍ", transliteration: "kitabin" },
      { arabic: "يَوْمٍ", transliteration: "yawmin" }
    ]
  },
  {
    name: "Tanween Damm",
    symbol: "ٌ",
    description: "Double damma - adds 'un' sound",
    examples: [
      { arabic: "كِتَابٌ", transliteration: "kitabun" },
      { arabic: "رَجُلٌ", transliteration: "rajulun" }
    ]
  }
];

export const joiningExamples: JoiningExample[] = [
  {
    id: "1",
    letters: ["ك", "ت", "ب"],
    word: "كَتَبَ",
    transliteration: "ka-ta-ba",
    breakdown: "ك (ka) + ت (ta) + ب (ba) = كَتَبَ (he wrote)"
  },
  {
    id: "2",
    letters: ["س", "ل", "م"],
    word: "سَلَامٌ",
    transliteration: "sa-la-mun",
    breakdown: "س (sa) + ل (la) + م (mun) = سَلَامٌ (peace)"
  },
  {
    id: "3",
    letters: ["م", "ح", "م", "د"],
    word: "مُحَمَّدٌ",
    transliteration: "mu-ham-ma-dun",
    breakdown: "م (mu) + ح (ha) + م (m) + د (dun) = مُحَمَّدٌ (Muhammad)"
  },
  {
    id: "4",
    letters: ["ق", "ر", "أ"],
    word: "قَرَأَ",
    transliteration: "qa-ra-a",
    breakdown: "ق (qa) + ر (ra) + أ (a) = قَرَأَ (he read)"
  },
  {
    id: "5",
    letters: ["م", "س", "ج", "د"],
    word: "مَسْجِدٌ",
    transliteration: "mas-ji-dun",
    breakdown: "م (mas) + ج (ji) + د (dun) = مَسْجِدٌ (mosque)"
  }
];

export const readingLessons: ReadingLesson[] = [
  {
    id: "syllables",
    level: "syllable",
    title: "Basic Syllables",
    examples: [
      { arabic: "بَ", transliteration: "ba" },
      { arabic: "تَ", transliteration: "ta" },
      { arabic: "مَ", transliteration: "ma" },
      { arabic: "نَ", transliteration: "na" },
      { arabic: "لَ", transliteration: "la" },
      { arabic: "كَ", transliteration: "ka" }
    ]
  },
  {
    id: "simple-words",
    level: "word",
    title: "Simple Two-Letter Words",
    examples: [
      { arabic: "مَا", transliteration: "ma", meaning: "what" },
      { arabic: "مَن", transliteration: "man", meaning: "who" },
      { arabic: "لَا", transliteration: "la", meaning: "no" },
      { arabic: "نَا", transliteration: "na", meaning: "us" }
    ]
  },
  {
    id: "three-letter",
    level: "word",
    title: "Three-Letter Words",
    examples: [
      { arabic: "رَبِّ", transliteration: "rabbi", meaning: "my Lord" },
      { arabic: "نُورٌ", transliteration: "noor", meaning: "light" },
      { arabic: "حَقٌّ", transliteration: "haqq", meaning: "truth" },
      { arabic: "كُلّ", transliteration: "kull", meaning: "all" }
    ]
  },
  {
    id: "common-words",
    level: "word",
    title: "Common Islamic Words",
    examples: [
      { arabic: "اللَّه", transliteration: "Allah", meaning: "Allah" },
      { arabic: "سَلَام", transliteration: "salam", meaning: "peace" },
      { arabic: "إِيمَان", transliteration: "iman", meaning: "faith" },
      { arabic: "قُرْآن", transliteration: "quran", meaning: "Quran" },
      { arabic: "صَلَاة", transliteration: "salah", meaning: "prayer" }
    ]
  },
  {
    id: "short-ayahs",
    level: "ayah",
    title: "Short Ayahs and Phrases",
    examples: [
      { arabic: "بِسْمِ اللَّهِ", transliteration: "bismillah", meaning: "In the name of Allah" },
      { arabic: "الْحَمْدُ لِلَّهِ", transliteration: "alhamdulillah", meaning: "Praise be to Allah" },
      { arabic: "سُبْحَانَ اللَّهِ", transliteration: "subhanallah", meaning: "Glory be to Allah" },
      { arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest" },
      { arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ", transliteration: "la ilaha illallah", meaning: "There is no god but Allah" }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    type: "transliteration",
    question: "What is the transliteration of this letter?",
    arabic: "ب",
    options: ["ba", "ta", "na", "la"],
    correctAnswer: "ba"
  },
  {
    id: "q2",
    type: "transliteration",
    question: "What is the transliteration of this letter?",
    arabic: "م",
    options: ["na", "ma", "la", "ra"],
    correctAnswer: "ma"
  },
  {
    id: "q3",
    type: "vowel",
    question: "Which vowel is this? َ",
    options: ["Fatha", "Kasra", "Damma", "Sukoon"],
    correctAnswer: "Fatha"
  },
  {
    id: "q4",
    type: "reading",
    question: "Read this word:",
    arabic: "نُورٌ",
    options: ["noor", "door", "hoor", "boor"],
    correctAnswer: "noor"
  },
  {
    id: "q5",
    type: "transliteration",
    question: "What is the transliteration?",
    arabic: "سَلَام",
    options: ["salam", "kalam", "halam", "qalam"],
    correctAnswer: "salam"
  },
  {
    id: "q6",
    type: "vowel",
    question: "What sound does Kasra (ِ) make?",
    options: ["i", "a", "u", "no sound"],
    correctAnswer: "i"
  },
  {
    id: "q7",
    type: "reading",
    question: "Read this phrase:",
    arabic: "بِسْمِ اللَّهِ",
    options: ["bismillah", "alhamdulillah", "subhanallah", "mashallah"],
    correctAnswer: "bismillah"
  },
  {
    id: "q8",
    type: "matching",
    question: "Which letter makes the 'k' sound?",
    options: ["ك", "ق", "خ", "ح"],
    correctAnswer: "ك"
  }
];

export const tajwidRules: TajwidRule[] = [
  {
    id: "noon-sakinah-idgham",
    title: "Noon Sakinah - Idgham (Merging)",
    description: "When Noon Sakinah or Tanween is followed by ي ر م ل و ن, it merges with the following letter. Letters: يرملون (YARMALOON)",
    examples: [
      {
        arabic: "مَنْ يَقُولُ",
        transliteration: "may-yaqoolu",
        highlight: "نْ ي",
        explanation: "Idgham with Ghunna - Noon merges with Ya (ي), nasal sound held for 2 counts"
      },
      {
        arabic: "مِنْ رَبِّهِمْ",
        transliteration: "mir-rabbihim",
        highlight: "نْ ر",
        explanation: "Idgham without Ghunna - Noon merges with Ra (ر), no nasal sound"
      },
      {
        arabic: "مِنْ مَاءٍ",
        transliteration: "mim-ma'in",
        highlight: "نْ م",
        explanation: "Idgham with Ghunna - Noon merges with Meem (م), nasal sound for 2 counts"
      },
      {
        arabic: "مِنْ لَدُنْهُ",
        transliteration: "mil-ladunhu",
        highlight: "نْ ل",
        explanation: "Idgham without Ghunna - Noon merges with Lam (ل), no nasal sound"
      },
      {
        arabic: "مَنْ وَلِيًّا",
        transliteration: "maw-waliyyan",
        highlight: "نْ و",
        explanation: "Idgham with Ghunna - Noon merges with Waw (و), nasal sound for 2 counts"
      },
      {
        arabic: "مِنْ نِعْمَةٍ",
        transliteration: "min-ni'matin",
        highlight: "نْ ن",
        explanation: "Idgham with Ghunna - Noon merges with Noon (ن), strong nasal sound for 2 counts"
      }
    ]
  },
  {
    id: "noon-sakinah-ikhfa",
    title: "Noon Sakinah - Ikhfa (Concealment)",
    description: "When Noon Sakinah or Tanween is followed by 15 specific letters (ص ذ ث ك ج ش ق س د ط ز ف ت ض ظ), pronounce it with a nasal sound between clear pronunciation and merging.",
    examples: [
      {
        arabic: "مَنْ صَدَّ",
        transliteration: "man sadda (with nasal)",
        highlight: "نْ ص",
        explanation: "Ikhfa before Sad (ص) - Conceal the noon with ghunna for 2 counts"
      },
      {
        arabic: "مِنْ ذَكَرٍ",
        transliteration: "min dhakarin (with nasal)",
        highlight: "نْ ذ",
        explanation: "Ikhfa before Dhal (ذ) - Partially hide the noon with nasal sound"
      },
      {
        arabic: "مِنْ ثَمَرَةٍ",
        transliteration: "min thamaratin (with nasal)",
        highlight: "نْ ث",
        explanation: "Ikhfa before Tha (ث) - Conceal with ghunna"
      },
      {
        arabic: "أَنْ كَانَ",
        transliteration: "an kaana (with nasal)",
        highlight: "نْ ك",
        explanation: "Ikhfa before Kaf (ك) - Hide noon with nasal resonance"
      },
      {
        arabic: "مَنْ جَاءَ",
        transliteration: "man ja'a (with nasal)",
        highlight: "نْ ج",
        explanation: "Ikhfa before Jeem (ج) - Conceal the noon sound"
      }
    ]
  },
  {
    id: "noon-sakinah-iqlab",
    title: "Noon Sakinah - Iqlab (Conversion)",
    description: "When Noon Sakinah or Tanween is followed by Ba (ب), convert the noon sound to Meem (م) with ghunna for 2 counts.",
    examples: [
      {
        arabic: "مِنْ بَعْدِ",
        transliteration: "mim ba'di",
        highlight: "نْ ب",
        explanation: "Iqlab - Change Noon to Meem sound before Ba, hold nasal for 2 counts"
      },
      {
        arabic: "سَمِيعٌ بَصِيرٌ",
        transliteration: "samee'um baseer",
        highlight: "عٌ ب",
        explanation: "Iqlab with Tanween - Convert tanween to Meem before Ba"
      },
      {
        arabic: "أَنْ بُورِكَ",
        transliteration: "am boorika",
        highlight: "نْ ب",
        explanation: "Iqlab - Noon becomes Meem sound, lips close as if saying Meem"
      }
    ]
  },
  {
    id: "noon-sakinah-idhar",
    title: "Noon Sakinah - Idhar (Clear Pronunciation)",
    description: "When Noon Sakinah or Tanween is followed by throat letters (ء ه ع ح غ خ), pronounce the noon clearly without ghunna.",
    examples: [
      {
        arabic: "مِنْ ءَامَنَ",
        transliteration: "min aamana",
        highlight: "نْ ء",
        explanation: "Idhar - Clear noon before Hamza (ء), no nasal sound"
      },
      {
        arabic: "مِنْ هَادٍ",
        transliteration: "min haadin",
        highlight: "نْ ه",
        explanation: "Idhar - Pronounce noon clearly before Ha (ه)"
      },
      {
        arabic: "مَنْ عَمِلَ",
        transliteration: "man 'amila",
        highlight: "نْ ع",
        explanation: "Idhar - Clear pronunciation before Ayn (ع)"
      },
      {
        arabic: "إِنْ حَسِبْتُمْ",
        transliteration: "in hasibtum",
        highlight: "نْ ح",
        explanation: "Idhar - Pronounce noon clearly before Ha (ح)"
      }
    ]
  },
  {
    id: "meem-sakinah",
    title: "Meem Sakinah Rules",
    description: "Three rules apply when Meem has Sukoon (مْ): Idgham (merging with another Meem), Ikhfa (hiding before Ba), and Idhar (clear pronunciation before other letters).",
    examples: [
      {
        arabic: "لَهُمْ مَا",
        transliteration: "lahum-ma",
        highlight: "مْ م",
        explanation: "Idgham Mithlayn - Meem merges with Meem, hold ghunna for 2 counts"
      },
      {
        arabic: "تَرْمِيهِمْ بِحِجَارَةٍ",
        transliteration: "tarmeehim bihijarah",
        highlight: "مْ ب",
        explanation: "Ikhfa Shafawi - Hide Meem before Ba (ب) with slight nasal sound"
      },
      {
        arabic: "عَلَيْهِمْ تَتْلُو",
        transliteration: "alayhim tatloo",
        highlight: "مْ ت",
        explanation: "Idhar Shafawi - Pronounce Meem clearly before all letters except م and ب"
      },
      {
        arabic: "أَمْ كُنتُمْ",
        transliteration: "am kuntum",
        highlight: "مْ ك",
        explanation: "Idhar - Clear Meem pronunciation before Kaf"
      }
    ]
  },
  {
    id: "qalqalah",
    title: "Qalqalah (Echoing Sound)",
    description: "When letters ق ط ب ج د (QUTB JAD) have sukoon, create a strong echoing/bouncing sound. Stronger at the end of words.",
    examples: [
      {
        arabic: "أَحَدْ",
        transliteration: "ahad",
        highlight: "دْ",
        explanation: "Strong Qalqalah - Dal (د) at word end creates strong echo"
      },
      {
        arabic: "الْفَلَقْ",
        transliteration: "al-falaq",
        highlight: "قْ",
        explanation: "Strong Qalqalah - Qaf (ق) at word end bounces"
      },
      {
        arabic: "يَكْتُبُ",
        transliteration: "yak-tubu",
        highlight: "كْ",
        explanation: "Minor Qalqalah - Ta (ت) in middle has subtle echo"
      },
      {
        arabic: "رِجْسٌ",
        transliteration: "rijs",
        highlight: "جْ",
        explanation: "Minor Qalqalah - Jeem (ج) with sukoon echoes"
      },
      {
        arabic: "رَبِّ",
        transliteration: "rabbi",
        highlight: "بِّ",
        explanation: "Qalqalah with Shadda - Ba (ب) creates bouncing sound even with vowel due to shadda"
      }
    ]
  },
  {
    id: "madd-types",
    title: "Madd - Types of Elongation",
    description: "Madd means elongation of vowel sounds. Different types have different lengths measured in counts (harakaat).",
    examples: [
      {
        arabic: "قَالَ",
        transliteration: "qaa-la",
        highlight: "ا",
        explanation: "Madd Tabee'i (Natural) - Elongate 'a' with Alif for 2 counts"
      },
      {
        arabic: "يَقُولُ",
        transliteration: "ya-qoo-lu",
        highlight: "و",
        explanation: "Madd Tabee'i - Elongate 'oo' with Waw for 2 counts"
      },
      {
        arabic: "قِيلَ",
        transliteration: "qee-la",
        highlight: "ي",
        explanation: "Madd Tabee'i - Elongate 'ee' with Ya for 2 counts"
      },
      {
        arabic: "جَاءَ",
        transliteration: "jaa'a",
        highlight: "ا ء",
        explanation: "Madd Munfasil - Hamza after madd letter, elongate 4-5 counts"
      },
      {
        arabic: "السَّمَاءِ",
        transliteration: "as-samaa'i",
        highlight: "ا ء",
        explanation: "Madd Muttasil - Hamza in same word after madd, elongate 4-5 counts (obligatory)"
      },
      {
        arabic: "آمَنَ",
        transliteration: "aa-ma-na",
        highlight: "آ",
        explanation: "Madd Laazim - Mandatory elongation for 6 counts with Madd Alif"
      }
    ]
  },
  {
    id: "lam-rules",
    title: "Lam Rules (Al-Shamsiyyah & Al-Qamariyyah)",
    description: "The definite article 'AL' (ال) has two pronunciations: Sun Letters (assimilate Lam) and Moon Letters (pronounce Lam clearly).",
    examples: [
      {
        arabic: "الشَّمْس",
        transliteration: "ash-shams",
        highlight: "لش",
        explanation: "Lam Shamsiyyah - Lam (ل) silent, Sheen (ش) has shadda, say 'ash-shams' not 'al-shams'"
      },
      {
        arabic: "النَّار",
        transliteration: "an-naar",
        highlight: "لن",
        explanation: "Lam Shamsiyyah - Lam silent before Noon (ن), say 'an-naar'"
      },
      {
        arabic: "الرَّحْمَن",
        transliteration: "ar-rahmaan",
        highlight: "لر",
        explanation: "Lam Shamsiyyah - Lam assimilates into Ra (ر)"
      },
      {
        arabic: "الْقَمَر",
        transliteration: "al-qamar",
        highlight: "لق",
        explanation: "Lam Qamariyyah - Pronounce Lam clearly before Qaf (ق)"
      },
      {
        arabic: "الْكِتَاب",
        transliteration: "al-kitaab",
        highlight: "لك",
        explanation: "Lam Qamariyyah - Clear Lam pronunciation before Kaf (ك)"
      },
      {
        arabic: "الْبَيْت",
        transliteration: "al-bayt",
        highlight: "لب",
        explanation: "Lam Qamariyyah - Pronounce Lam before Ba (ب)"
      }
    ]
  },
  {
    id: "sun-moon-letters",
    title: "Sun and Moon Letters Guide",
    description: "14 Sun Letters (assimilate AL): ت ث د ذ ر ز س ش ص ض ط ظ ل ن. 14 Moon Letters (keep AL clear): ء ب ج ح خ ع غ ف ق ك م ه و ي",
    examples: [
      {
        arabic: "الذِّكْر",
        transliteration: "adh-dhikr",
        highlight: "الذ",
        explanation: "Sun Letter - Dhal (ذ) is a sun letter, Lam becomes silent"
      },
      {
        arabic: "التَّوْبَة",
        transliteration: "at-tawbah",
        highlight: "الت",
        explanation: "Sun Letter - Ta (ت) assimilates the Lam"
      },
      {
        arabic: "الصَّلَاة",
        transliteration: "as-salaah",
        highlight: "الص",
        explanation: "Sun Letter - Sad (ص) takes the Lam sound"
      },
      {
        arabic: "الْمَلَك",
        transliteration: "al-malak",
        highlight: "الم",
        explanation: "Moon Letter - Meem (م) keeps Lam pronunciation clear"
      },
      {
        arabic: "الْحَقّ",
        transliteration: "al-haqq",
        highlight: "الح",
        explanation: "Moon Letter - Ha (ح) is a moon letter, say 'al' clearly"
      }
    ]
  },
  {
    id: "tafkheem-tarqeeq",
    title: "Tafkheem (Heavy) vs Tarqeeq (Light)",
    description: "Some letters are always heavy (thick sound), some are always light (thin sound). Heavy letters: خ ص ض غ ط ق ظ (KHUṢṢ DHAQATH QATH). Ra (ر) changes based on vowels.",
    examples: [
      {
        arabic: "صَلَاة",
        transliteration: "salaah (heavy S)",
        highlight: "ص",
        explanation: "Tafkheem - Sad (ص) is always heavy, tongue raised to roof of mouth"
      },
      {
        arabic: "طَعَام",
        transliteration: "ta'aam (heavy T)",
        highlight: "ط",
        explanation: "Tafkheem - Ta (ط) is heavy, creates thick sound"
      },
      {
        arabic: "قُرْآن",
        transliteration: "qur'aan (heavy Q)",
        highlight: "ق",
        explanation: "Tafkheem - Qaf (ق) always pronounced with heaviness"
      },
      {
        arabic: "سَلَام",
        transliteration: "salaam (light s)",
        highlight: "س",
        explanation: "Tarqeeq - Seen (س) is light, tongue low"
      },
      {
        arabic: "تِين",
        transliteration: "teen (light t)",
        highlight: "ت",
        explanation: "Tarqeeq - Ta (ت) is light and thin in sound"
      }
    ]
  },
  {
    id: "ra-rules",
    title: "Rules of Ra (ر) - Heavy or Light",
    description: "Ra (ر) can be heavy (tafkheem) or light (tarqeeq) depending on its vowel, the previous letter's vowel, and whether it has sukoon.",
    examples: [
      {
        arabic: "رَبِّ",
        transliteration: "rabbi (heavy R)",
        highlight: "رَ",
        explanation: "Heavy Ra - Ra with Fatha is always heavy"
      },
      {
        arabic: "رُوح",
        transliteration: "rooh (heavy R)",
        highlight: "رُ",
        explanation: "Heavy Ra - Ra with Damma is always heavy"
      },
      {
        arabic: "رِزْق",
        transliteration: "rizq (light R)",
        highlight: "رِ",
        explanation: "Light Ra - Ra with Kasra is light"
      },
      {
        arabic: "مِرْيَة",
        transliteration: "miryah (light R)",
        highlight: "ِرْ",
        explanation: "Light Ra with Sukoon - Ra with sukoon after kasra is light"
      },
      {
        arabic: "فِرْعَوْن",
        transliteration: "fir'awn (light R)",
        highlight: "ِرْ",
        explanation: "Light Ra - Preceded by kasra, followed by light letter"
      },
      {
        arabic: "قُرْآن",
        transliteration: "qur'aan (heavy R)",
        highlight: "ُرْ",
        explanation: "Heavy Ra with Sukoon - After damma remains heavy"
      }
    ]
  },
  {
    id: "ghunna",
    title: "Ghunna (Nasal Sound)",
    description: "Ghunna is a nasal sound produced from the nose, lasting 2 counts. Occurs with Noon and Meem in certain situations (Idgham, Ikhfa, Iqlab, and when they have Shadda).",
    examples: [
      {
        arabic: "إِنَّ",
        transliteration: "inna",
        highlight: "نَّ",
        explanation: "Ghunna with Shadda on Noon - Hold nasal sound for 2 counts"
      },
      {
        arabic: "ثُمَّ",
        transliteration: "thumma",
        highlight: "مَّ",
        explanation: "Ghunna with Shadda on Meem - Nasal sound for 2 counts"
      },
      {
        arabic: "مِنْ وَلِيٍّ",
        transliteration: "min waliyy (with nasal)",
        highlight: "نْ و",
        explanation: "Ghunna with Idgham - Noon merges with Waw, hold nasal"
      },
      {
        arabic: "عَلِيمٌ حَكِيمٌ",
        transliteration: "aleemun hakeemun (with nasal)",
        highlight: "مٌ ح",
        explanation: "No Ghunna - Tanween before throat letter is clear, no nasal"
      }
    ]
  },
  {
    id: "waqf-rules",
    title: "Waqf (Stopping) Rules",
    description: "Rules for pausing or stopping at the end of words during recitation. Common symbols include: ۘ (must stop), ج (permissible to stop), لا (better not to stop), م (must continue).",
    examples: [
      {
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "ar-rahmaanir-raheem",
        highlight: "نِ",
        explanation: "Waqf on ending - When stopping, tanween and kasra become silent"
      },
      {
        arabic: "يَوْمَ الدِّينِ ۝",
        transliteration: "yawmid-deen",
        highlight: "نِ",
        explanation: "Stop here completely - The circle symbol indicates end of ayah, must stop briefly"
      },
      {
        arabic: "مَالِكِ يَوْمِ",
        transliteration: "maaliki yawmi",
        highlight: "كِ",
        explanation: "When stopping on Kasra, pronounce it softly or drop it"
      },
      {
        arabic: "نَسْتَعِينُ",
        transliteration: "nasta'een",
        highlight: "نُ",
        explanation: "Waqf on Damma - Final damma becomes silent when stopping"
      }
    ]
  },
  {
    id: "lam-al-tarif",
    title: "Lam Al-Ta'rif (AL definite article)",
    description: "Special rules for the Lam in 'AL' (the) - distinguishes between pronunciation with different types of following letters.",
    examples: [
      {
        arabic: "اللَّهُ",
        transliteration: "Allaah",
        highlight: "لل",
        explanation: "Lam of Majesty - Lam of Allah is always heavy when preceded by fatha or damma"
      },
      {
        arabic: "بِسْمِ اللَّهِ",
        transliteration: "bismillaah",
        highlight: "لل",
        explanation: "Light Lam - When preceded by kasra, Lam of Allah is light"
      },
      {
        arabic: "الْمُسْلِمِينَ",
        transliteration: "al-muslimeen",
        highlight: "لم",
        explanation: "Moon Letter - Clear Lam before Meem"
      },
      {
        arabic: "الصِّرَاطَ",
        transliteration: "as-siraata",
        highlight: "لص",
        explanation: "Sun Letter - Lam merges with Sad"
      }
    ]
  },
  {
    id: "mad-lazim",
    title: "Madd Laazim (Necessary Elongation)",
    description: "The longest type of Madd, held for 6 counts. Occurs when a madd letter is followed by a letter with shadda (doubled letter) or specific patterns.",
    examples: [
      {
        arabic: "الْحَاقَّةُ",
        transliteration: "al-haaqqah",
        highlight: "اقّ",
        explanation: "Madd Laazim Kalimi - Alif followed by doubled Qaf, hold for 6 counts"
      },
      {
        arabic: "الصَّاخَّةُ",
        transliteration: "as-saakhkhah",
        highlight: "اخّ",
        explanation: "Madd Laazim - Hold elongation for full 6 counts before shadda"
      },
      {
        arabic: "وَالضَّالِّينَ",
        transliteration: "wadh-dhaaleen",
        highlight: "الّ",
        explanation: "Madd Laazim - Elongate before doubled Lam for 6 counts"
      }
    ]
  },
  {
    id: "advanced-idgham",
    title: "Advanced Idgham Types",
    description: "Deeper understanding of merging rules: Idgham Kamil (complete merging) vs Idgham Naqis (incomplete merging with ghunna).",
    examples: [
      {
        arabic: "مِنْ رَبِّكُمْ",
        transliteration: "mir-rabbikum",
        highlight: "نْ ر",
        explanation: "Idgham Kamil (Complete) - Noon completely merges with Ra, no ghunna, no trace of noon"
      },
      {
        arabic: "مِنْ لَدُنْهُ",
        transliteration: "mil-ladunhu",
        highlight: "نْ ل",
        explanation: "Idgham Kamil - Complete merging with Lam, no nasal sound"
      },
      {
        arabic: "مِنْ نِعْمَةٍ",
        transliteration: "min-ni'matin",
        highlight: "نْ ن",
        explanation: "Idgham Naqis (Incomplete) - Merges with ghunna for 2 counts, nasal remains"
      },
      {
        arabic: "مَنْ يَعْمَلْ",
        transliteration: "may-ya'mal",
        highlight: "نْ ي",
        explanation: "Idgham Naqis - Noon merges with Ya while retaining nasal quality"
      },
      {
        arabic: "حَمْدًا مُّبَارَكًا",
        transliteration: "hamdam-mubaarakan",
        highlight: "دًا م",
        explanation: "Idgham of Tanween - Tanween merges with Meem with ghunna"
      }
    ]
  }
];
