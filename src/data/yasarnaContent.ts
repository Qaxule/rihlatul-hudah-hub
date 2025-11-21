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
    id: "noon-sakinah",
    title: "Noon Sakinah Rules",
    description: "Rules for Noon with Sukoon (نْ) or Tanween",
    examples: [
      {
        arabic: "مِنْ بَعْدِ",
        transliteration: "mim ba'di",
        highlight: "نْ ب",
        explanation: "Iqlab - The noon changes to meem sound before ب"
      },
      {
        arabic: "مَنْ يَعْمَلْ",
        transliteration: "may-ya'mal",
        highlight: "نْ ي",
        explanation: "Idgham - The noon merges with the following letter"
      }
    ]
  },
  {
    id: "meem-sakinah",
    title: "Meem Sakinah Rules",
    description: "Rules for Meem with Sukoon (مْ)",
    examples: [
      {
        arabic: "هُمْ مُؤْمِنُونَ",
        transliteration: "hum-mu'minoon",
        highlight: "مْ م",
        explanation: "Idgham - Meem merges with another Meem (with ghunna)"
      },
      {
        arabic: "أَلَمْ تَرَ",
        transliteration: "alam tara",
        highlight: "مْ ت",
        explanation: "Ikhfa - Clear pronunciation without ghunna"
      }
    ]
  },
  {
    id: "madd",
    title: "Madd (Elongation)",
    description: "Basic rules for elongating vowels",
    examples: [
      {
        arabic: "قَالَ",
        transliteration: "qa-la",
        highlight: "ا",
        explanation: "Madd with Alif - elongate the 'a' sound for 2 counts"
      },
      {
        arabic: "يَقُولُ",
        transliteration: "ya-qoo-lu",
        highlight: "و",
        explanation: "Madd with Waw - elongate the 'oo' sound for 2 counts"
      },
      {
        arabic: "قِيلَ",
        transliteration: "qee-la",
        highlight: "ي",
        explanation: "Madd with Ya - elongate the 'ee' sound for 2 counts"
      }
    ]
  }
];
