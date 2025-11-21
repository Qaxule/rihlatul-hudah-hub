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
  // Basic Connecting Letters
  {
    id: "1",
    letters: ["ك", "ت", "ب"],
    word: "كَتَبَ",
    transliteration: "ka-ta-ba",
    breakdown: "ك (ka) + ت (ta) + ب (ba) = كَتَبَ (he wrote) - All letters connect smoothly in a flowing script"
  },
  {
    id: "2",
    letters: ["س", "ل", "م"],
    word: "سَلَامٌ",
    transliteration: "sa-la-mun",
    breakdown: "س (sa) + ل (la) + م (mun) = سَلَامٌ (peace) - Notice how Seen's teeth flow into Lam"
  },
  {
    id: "3",
    letters: ["م", "ح", "م", "د"],
    word: "مُحَمَّدٌ",
    transliteration: "mu-ham-ma-dun",
    breakdown: "م (mu) + ح (ha) + مّ (mma) + د (dun) = مُحَمَّدٌ (Muhammad) - Shows Meem connecting in different positions with shadda"
  },
  {
    id: "4",
    letters: ["ق", "ر", "أ"],
    word: "قَرَأَ",
    transliteration: "qa-ra-a",
    breakdown: "ق (qa) + ر (ra) + أ (a) = قَرَأَ (he read) - Ra and Hamza are non-connecting letters, creating breaks"
  },
  {
    id: "5",
    letters: ["م", "س", "ج", "د"],
    word: "مَسْجِدٌ",
    transliteration: "mas-ji-dun",
    breakdown: "م (mas) + ج (ji) + د (dun) = مَسْجِدٌ (mosque) - Common Islamic word showing flowing connections"
  },
  
  // Non-Connecting Letters Examples
  {
    id: "6",
    letters: ["ا", "ل", "ل", "ه"],
    word: "اللَّهُ",
    transliteration: "Allah",
    breakdown: "ا (A) + لل (lla) + ه (h) = اللَّهُ (Allah) - Alif doesn't connect to the right, creating a break"
  },
  {
    id: "7",
    letters: ["ن", "و", "ر"],
    word: "نُورٌ",
    transliteration: "noor",
    breakdown: "ن (noo) + و (blank) + ر (r) = نُورٌ (light) - Waw and Ra don't connect forward, causing two breaks"
  },
  {
    id: "8",
    letters: ["د", "ي", "ن"],
    word: "دِينٌ",
    transliteration: "deen",
    breakdown: "د (dee) + ي (blank) + ن (n) = دِينٌ (religion) - Dal doesn't connect forward, Ya connects backward only"
  },
  {
    id: "9",
    letters: ["ر", "ز", "ق"],
    word: "رِزْقٌ",
    transliteration: "rizq",
    breakdown: "ر (ri) + ز (z) + ق (q) = رِزْقٌ (provision) - Ra and Zay are non-connectors, each stands separate"
  },
  {
    id: "10",
    letters: ["ذ", "ك", "ر"],
    word: "ذِكْرٌ",
    transliteration: "dhikr",
    breakdown: "ذ (dhi) + ك (k) + ر (r) = ذِكْرٌ (remembrance) - Dhal and Ra don't connect to next letter"
  },
  
  // Complex Joining Patterns
  {
    id: "11",
    letters: ["ع", "ب", "د"],
    word: "عَبْدٌ",
    transliteration: "abd",
    breakdown: "ع (a) + ب (b) + د (d) = عَبْدٌ (servant) - Ayn has unique middle form with deep connection"
  },
  {
    id: "12",
    letters: ["ق", "ل", "ب"],
    word: "قَلْبٌ",
    transliteration: "qalb",
    breakdown: "ق (qal) + ل (blank) + ب (b) = قَلْبٌ (heart) - All connecting letters flow as one unit"
  },
  {
    id: "13",
    letters: ["ك", "ر", "ي", "م"],
    word: "كَرِيمٌ",
    transliteration: "kareem",
    breakdown: "ك (ka) + ر (ree) + ي (blank) + م (m) = كَرِيمٌ (generous) - Ra breaks connection, Ya reconnects"
  },
  {
    id: "14",
    letters: ["ص", "ل", "ا", "ة"],
    word: "صَلَاةٌ",
    transliteration: "salaah",
    breakdown: "ص (sa) + ل (laa) + ا (blank) + ة (h) = صَلَاةٌ (prayer) - Alif creates break, Ta Marbuta at end"
  },
  {
    id: "15",
    letters: ["ش", "ه", "ا", "د", "ة"],
    word: "شَهَادَةٌ",
    transliteration: "shahaadah",
    breakdown: "ش (sha) + ه (haa) + ا (blank) + د (da) + ة (h) = شَهَادَةٌ (testimony) - Multiple breaks with Alif and Dal"
  },
  
  // Words with Shadda (Doubling)
  {
    id: "16",
    letters: ["ر", "ب"],
    word: "رَبِّ",
    transliteration: "rabbi",
    breakdown: "ر (ra) + بِّ (bbi with shadda) = رَبِّ (my Lord) - Shadda creates emphasis, Ra doesn't connect forward"
  },
  {
    id: "17",
    letters: ["ح", "ق"],
    word: "حَقٌّ",
    transliteration: "haqq",
    breakdown: "ح (ha) + قّ (qq with shadda) = حَقٌّ (truth) - Shadda doubles the Qaf sound"
  },
  {
    id: "18",
    letters: ["ا", "م", "ة"],
    word: "أُمَّةٌ",
    transliteration: "ummah",
    breakdown: "أُ (u) + مَّ (mma with shadda) + ة (h) = أُمَّةٌ (nation) - Hamza on Alif, Meem doubled, Ta Marbuta ending"
  },
  {
    id: "19",
    letters: ["ج", "ن", "ة"],
    word: "جَنَّةٌ",
    transliteration: "jannah",
    breakdown: "ج (ja) + نَّ (nna with shadda) + ة (h) = جَنَّةٌ (paradise) - Beautiful word showing Noon with shadda"
  },
  {
    id: "20",
    letters: ["ن", "ب", "ي"],
    word: "نَبِيٌّ",
    transliteration: "nabiyy",
    breakdown: "ن (na) + ب (biy) + يّ (yy with shadda) = نَبِيٌّ (prophet) - Ya with shadda at the end"
  },
  
  // Common Quranic Words
  {
    id: "21",
    letters: ["ق", "ر", "ا", "ن"],
    word: "قُرْآنٌ",
    transliteration: "quran",
    breakdown: "ق (qur) + ر (blank) + آ (aa) + ن (n) = قُرْآنٌ (Quran) - Madd Alif (آ) shows special form"
  },
  {
    id: "22",
    letters: ["ا", "ي", "م", "ا", "ن"],
    word: "إِيمَانٌ",
    transliteration: "eemaan",
    breakdown: "إِ (ee) + ي (blank) + م (maa) + ا (blank) + ن (n) = إِيمَانٌ (faith) - Multiple non-connectors create spacing"
  },
  {
    id: "23",
    letters: ["ت", "و", "ب", "ة"],
    word: "تَوْبَةٌ",
    transliteration: "tawbah",
    breakdown: "ت (taw) + و (blank) + ب (ba) + ة (h) = تَوْبَةٌ (repentance) - Waw breaks connection mid-word"
  },
  {
    id: "24",
    letters: ["ر", "ح", "م", "ة"],
    word: "رَحْمَةٌ",
    transliteration: "rahmah",
    breakdown: "ر (rah) + ح (blank) + م (ma) + ة (h) = رَحْمَةٌ (mercy) - Ra causes break, Ha connects through"
  },
  {
    id: "25",
    letters: ["ص", "د", "ق", "ة"],
    word: "صَدَقَةٌ",
    transliteration: "sadaqah",
    breakdown: "ص (sa) + د (da) + ق (qa) + ة (h) = صَدَقَةٌ (charity) - Dal breaks the flow before Qaf"
  },
  
  // Advanced Patterns
  {
    id: "26",
    letters: ["م", "ؤ", "م", "ن"],
    word: "مُؤْمِنٌ",
    transliteration: "mu'min",
    breakdown: "م (mu') + ؤ (blank) + م (mi) + ن (n) = مُؤْمِنٌ (believer) - Hamza on Waw creates unique shape"
  },
  {
    id: "27",
    letters: ["ه", "د", "ا", "ي", "ة"],
    word: "هِدَايَةٌ",
    transliteration: "hidaayah",
    breakdown: "ه (hi) + د (daa) + ا (blank) + ي (ya) + ة (h) = هِدَايَةٌ (guidance) - Complex word with multiple breaks"
  },
  {
    id: "28",
    letters: ["ع", "ل", "ي", "م"],
    word: "عَلِيمٌ",
    transliteration: "aleem",
    breakdown: "ع (a) + ل (lee) + ي (blank) + م (m) = عَلِيمٌ (All-Knowing) - Name of Allah showing Ayn's connection"
  },
  {
    id: "29",
    letters: ["غ", "ف", "و", "ر"],
    word: "غَفُورٌ",
    transliteration: "ghafoor",
    breakdown: "غ (gha) + ف (foo) + و (blank) + ر (r) = غَفُورٌ (Most Forgiving) - Waw and Ra both non-connecting"
  },
  {
    id: "30",
    letters: ["م", "ل", "ا", "ئ", "ك", "ة"],
    word: "مَلَائِكَةٌ",
    transliteration: "malaa'ikah",
    breakdown: "م (ma) + ل (laa) + ا (blank) + ئ ('i) + ك (ka) + ة (h) = مَلَائِكَةٌ (angels) - Long word showing Hamza on Ya"
  },
  
  // Letter Position Demonstrations
  {
    id: "31",
    letters: ["ب", "س", "م"],
    word: "بِسْمِ",
    transliteration: "bismi",
    breakdown: "ب (bis) + س (blank) + م (mi) = بِسْمِ (in the name of) - Part of Bismillah, all letters connect"
  },
  {
    id: "32",
    letters: ["ي", "و", "م"],
    word: "يَوْمٌ",
    transliteration: "yawm",
    breakdown: "ي (yaw) + و (blank) + م (m) = يَوْمٌ (day) - Ya connects backward, Waw stands alone"
  },
  {
    id: "33",
    letters: ["ك", "ل"],
    word: "كُلُّ",
    transliteration: "kull",
    breakdown: "ك (kul) + لّ (l with shadda) = كُلُّ (all/every) - Simple but important word with shadda"
  },
  {
    id: "34",
    letters: ["خ", "ي", "ر"],
    word: "خَيْرٌ",
    transliteration: "khayr",
    breakdown: "خ (khay) + ي (blank) + ر (r) = خَيْرٌ (good) - Two non-connectors create separate segments"
  },
  {
    id: "35",
    letters: ["ن", "ف", "س"],
    word: "نَفْسٌ",
    transliteration: "nafs",
    breakdown: "ن (naf) + ف (blank) + س (s) = نَفْسٌ (soul/self) - All connecting letters form continuous line"
  },
  
  // Special Forms and Ligatures
  {
    id: "36",
    letters: ["ل", "ا"],
    word: "لَا",
    transliteration: "laa",
    breakdown: "ل (laa) + ا = لَا (no) - Special ligature where Lam and Alif merge into one shape"
  },
  {
    id: "37",
    letters: ["ا", "ل", "ر", "ح", "م", "ن"],
    word: "الرَّحْمَٰنِ",
    transliteration: "ar-rahmaan",
    breakdown: "ال (ar) + ر (blank) + ح (ma) + م (blank) + ن (n) = الرَّحْمَٰنِ - AL + sun letter Ra with shadda"
  },
  {
    id: "38",
    letters: ["و", "ا", "ح", "د"],
    word: "وَاحِدٌ",
    transliteration: "waahid",
    breakdown: "و (waa) + ا (blank) + ح (hi) + د (d) = وَاحِدٌ (one) - Waw and Alif non-connecting, then Ha-Dal connect"
  },
  {
    id: "39",
    letters: ["ج", "م", "ي", "ع"],
    word: "جَمِيعٌ",
    transliteration: "jamee'",
    breakdown: "ج (ja) + م (mee) + ي (blank) + ع (' ) = جَمِيعٌ (all together) - Ya creates break before Ayn"
  },
  {
    id: "40",
    letters: ["ع", "ظ", "ي", "م"],
    word: "عَظِيمٌ",
    transliteration: "adheem",
    breakdown: "ع (a) + ظ (dhee) + ي (blank) + م (m) = عَظِيمٌ (Magnificent) - Name of Allah with complex Ayn connection"
  }
];

export const readingLessons: ReadingLesson[] = [
  {
    id: "syllables-fatha",
    level: "syllable",
    title: "Basic Syllables with Fatha (َ)",
    examples: [
      { arabic: "بَ", transliteration: "ba" },
      { arabic: "تَ", transliteration: "ta" },
      { arabic: "ثَ", transliteration: "tha" },
      { arabic: "جَ", transliteration: "ja" },
      { arabic: "حَ", transliteration: "ha" },
      { arabic: "خَ", transliteration: "kha" },
      { arabic: "دَ", transliteration: "da" },
      { arabic: "ذَ", transliteration: "dha" },
      { arabic: "رَ", transliteration: "ra" },
      { arabic: "زَ", transliteration: "za" },
      { arabic: "سَ", transliteration: "sa" },
      { arabic: "شَ", transliteration: "sha" }
    ]
  },
  {
    id: "syllables-kasra",
    level: "syllable",
    title: "Syllables with Kasra (ِ)",
    examples: [
      { arabic: "بِ", transliteration: "bi" },
      { arabic: "تِ", transliteration: "ti" },
      { arabic: "جِ", transliteration: "ji" },
      { arabic: "حِ", transliteration: "hi" },
      { arabic: "دِ", transliteration: "di" },
      { arabic: "رِ", transliteration: "ri" },
      { arabic: "سِ", transliteration: "si" },
      { arabic: "عِ", transliteration: "'i" },
      { arabic: "فِ", transliteration: "fi" },
      { arabic: "قِ", transliteration: "qi" },
      { arabic: "كِ", transliteration: "ki" },
      { arabic: "لِ", transliteration: "li" }
    ]
  },
  {
    id: "syllables-damma",
    level: "syllable",
    title: "Syllables with Damma (ُ)",
    examples: [
      { arabic: "بُ", transliteration: "bu" },
      { arabic: "تُ", transliteration: "tu" },
      { arabic: "جُ", transliteration: "ju" },
      { arabic: "حُ", transliteration: "hu" },
      { arabic: "دُ", transliteration: "du" },
      { arabic: "رُ", transliteration: "ru" },
      { arabic: "سُ", transliteration: "su" },
      { arabic: "عُ", transliteration: "'u" },
      { arabic: "فُ", transliteration: "fu" },
      { arabic: "قُ", transliteration: "qu" },
      { arabic: "كُ", transliteration: "ku" },
      { arabic: "نُ", transliteration: "nu" }
    ]
  },
  {
    id: "syllables-sukoon",
    level: "syllable",
    title: "Syllables with Sukoon (ْ)",
    examples: [
      { arabic: "بْ", transliteration: "b" },
      { arabic: "تْ", transliteration: "t" },
      { arabic: "جْ", transliteration: "j" },
      { arabic: "حْ", transliteration: "h" },
      { arabic: "دْ", transliteration: "d" },
      { arabic: "رْ", transliteration: "r" },
      { arabic: "سْ", transliteration: "s" },
      { arabic: "فْ", transliteration: "f" },
      { arabic: "كْ", transliteration: "k" },
      { arabic: "لْ", transliteration: "l" },
      { arabic: "مْ", transliteration: "m" },
      { arabic: "نْ", transliteration: "n" }
    ]
  },
  {
    id: "simple-two-letter",
    level: "word",
    title: "Simple Two-Letter Words",
    examples: [
      { arabic: "مَا", transliteration: "ma", meaning: "what" },
      { arabic: "مَن", transliteration: "man", meaning: "who" },
      { arabic: "لَا", transliteration: "la", meaning: "no" },
      { arabic: "نَا", transliteration: "na", meaning: "us" },
      { arabic: "فِي", transliteration: "fi", meaning: "in" },
      { arabic: "لَنْ", transliteration: "lan", meaning: "will not" },
      { arabic: "قَدْ", transliteration: "qad", meaning: "indeed" },
      { arabic: "هُوَ", transliteration: "huwa", meaning: "he" },
      { arabic: "هِيَ", transliteration: "hiya", meaning: "she" }
    ]
  },
  {
    id: "three-letter-basic",
    level: "word",
    title: "Three-Letter Words - Basic",
    examples: [
      { arabic: "رَبِّ", transliteration: "rabbi", meaning: "my Lord" },
      { arabic: "نُورٌ", transliteration: "noor", meaning: "light" },
      { arabic: "حَقٌّ", transliteration: "haqq", meaning: "truth" },
      { arabic: "كُلّ", transliteration: "kull", meaning: "all" },
      { arabic: "يَوْم", transliteration: "yawm", meaning: "day" },
      { arabic: "بَيْت", transliteration: "bayt", meaning: "house" },
      { arabic: "حَمْد", transliteration: "hamd", meaning: "praise" },
      { arabic: "عِلْم", transliteration: "'ilm", meaning: "knowledge" },
      { arabic: "قَلْب", transliteration: "qalb", meaning: "heart" }
    ]
  },
  {
    id: "three-letter-shadda",
    level: "word",
    title: "Words with Shadda (ّ)",
    examples: [
      { arabic: "رَبّ", transliteration: "rabb", meaning: "Lord" },
      { arabic: "حَجّ", transliteration: "hajj", meaning: "pilgrimage" },
      { arabic: "صَفّ", transliteration: "saff", meaning: "row" },
      { arabic: "ضَلّ", transliteration: "dall", meaning: "went astray" },
      { arabic: "مَدّ", transliteration: "madd", meaning: "to extend" },
      { arabic: "شَرّ", transliteration: "sharr", meaning: "evil" },
      { arabic: "خَيْرٌ", transliteration: "khayr", meaning: "good" },
      { arabic: "بِرّ", transliteration: "birr", meaning: "righteousness" }
    ]
  },
  {
    id: "words-tanween",
    level: "word",
    title: "Words with Tanween (ٌ ٍ ً)",
    examples: [
      { arabic: "كِتَابٌ", transliteration: "kitabun", meaning: "a book" },
      { arabic: "رَجُلٌ", transliteration: "rajulun", meaning: "a man" },
      { arabic: "شُكْرًا", transliteration: "shukran", meaning: "thank you" },
      { arabic: "جَمِيلٌ", transliteration: "jameelun", meaning: "beautiful" },
      { arabic: "كَرِيمٌ", transliteration: "kareemun", meaning: "generous" },
      { arabic: "عَظِيمٌ", transliteration: "adheemun", meaning: "magnificent" },
      { arabic: "أَحَدًا", transliteration: "ahadan", meaning: "anyone" },
      { arabic: "قَلِيلًا", transliteration: "qaleelan", meaning: "little" }
    ]
  },
  {
    id: "body-parts",
    level: "word",
    title: "Body Parts",
    examples: [
      { arabic: "يَدٌ", transliteration: "yad", meaning: "hand" },
      { arabic: "رَأْسٌ", transliteration: "ra's", meaning: "head" },
      { arabic: "عَيْنٌ", transliteration: "'ayn", meaning: "eye" },
      { arabic: "أُذُنٌ", transliteration: "udhun", meaning: "ear" },
      { arabic: "فَمٌ", transliteration: "fam", meaning: "mouth" },
      { arabic: "قَلْبٌ", transliteration: "qalb", meaning: "heart" },
      { arabic: "لِسَانٌ", transliteration: "lisan", meaning: "tongue" },
      { arabic: "رِجْلٌ", transliteration: "rijl", meaning: "foot" }
    ]
  },
  {
    id: "numbers",
    level: "word",
    title: "Numbers 1-10",
    examples: [
      { arabic: "وَاحِدٌ", transliteration: "wahid", meaning: "one" },
      { arabic: "إِثْنَانِ", transliteration: "ithnan", meaning: "two" },
      { arabic: "ثَلَاثَةٌ", transliteration: "thalatha", meaning: "three" },
      { arabic: "أَرْبَعَةٌ", transliteration: "arba'a", meaning: "four" },
      { arabic: "خَمْسَةٌ", transliteration: "khamsa", meaning: "five" },
      { arabic: "سِتَّةٌ", transliteration: "sitta", meaning: "six" },
      { arabic: "سَبْعَةٌ", transliteration: "sab'a", meaning: "seven" },
      { arabic: "ثَمَانِيَةٌ", transliteration: "thamaniya", meaning: "eight" },
      { arabic: "تِسْعَةٌ", transliteration: "tis'a", meaning: "nine" },
      { arabic: "عَشَرَةٌ", transliteration: "'ashara", meaning: "ten" }
    ]
  },
  {
    id: "family-words",
    level: "word",
    title: "Family Members",
    examples: [
      { arabic: "أَبٌ", transliteration: "ab", meaning: "father" },
      { arabic: "أُمٌّ", transliteration: "umm", meaning: "mother" },
      { arabic: "أَخٌ", transliteration: "akh", meaning: "brother" },
      { arabic: "أُخْتٌ", transliteration: "ukht", meaning: "sister" },
      { arabic: "اِبْنٌ", transliteration: "ibn", meaning: "son" },
      { arabic: "بِنْتٌ", transliteration: "bint", meaning: "daughter" },
      { arabic: "جَدٌّ", transliteration: "jadd", meaning: "grandfather" },
      { arabic: "جَدَّةٌ", transliteration: "jaddah", meaning: "grandmother" }
    ]
  },
  {
    id: "islamic-words",
    level: "word",
    title: "Common Islamic Words",
    examples: [
      { arabic: "اللَّه", transliteration: "Allah", meaning: "Allah" },
      { arabic: "إِسْلَام", transliteration: "islam", meaning: "Islam" },
      { arabic: "إِيمَان", transliteration: "iman", meaning: "faith" },
      { arabic: "قُرْآن", transliteration: "quran", meaning: "Quran" },
      { arabic: "صَلَاة", transliteration: "salah", meaning: "prayer" },
      { arabic: "زَكَاة", transliteration: "zakah", meaning: "charity" },
      { arabic: "صَوْم", transliteration: "sawm", meaning: "fasting" },
      { arabic: "حَجّ", transliteration: "hajj", meaning: "pilgrimage" },
      { arabic: "مَسْجِد", transliteration: "masjid", meaning: "mosque" },
      { arabic: "نَبِيّ", transliteration: "nabi", meaning: "prophet" },
      { arabic: "رَسُول", transliteration: "rasool", meaning: "messenger" },
      { arabic: "مَلَك", transliteration: "malak", meaning: "angel" }
    ]
  },
  {
    id: "nature-words",
    level: "word",
    title: "Nature & Elements",
    examples: [
      { arabic: "سَمَاء", transliteration: "sama", meaning: "sky" },
      { arabic: "أَرْض", transliteration: "ard", meaning: "earth" },
      { arabic: "شَمْس", transliteration: "shams", meaning: "sun" },
      { arabic: "قَمَر", transliteration: "qamar", meaning: "moon" },
      { arabic: "نَجْم", transliteration: "najm", meaning: "star" },
      { arabic: "مَاء", transliteration: "ma'", meaning: "water" },
      { arabic: "نَار", transliteration: "nar", meaning: "fire" },
      { arabic: "رِيح", transliteration: "reeh", meaning: "wind" },
      { arabic: "جَبَل", transliteration: "jabal", meaning: "mountain" },
      { arabic: "بَحْر", transliteration: "bahr", meaning: "sea" },
      { arabic: "شَجَرَة", transliteration: "shajara", meaning: "tree" },
      { arabic: "زَهْرَة", transliteration: "zahra", meaning: "flower" }
    ]
  },
  {
    id: "verbs-basic",
    level: "word",
    title: "Basic Verbs",
    examples: [
      { arabic: "قَرَأَ", transliteration: "qara'a", meaning: "he read" },
      { arabic: "كَتَبَ", transliteration: "kataba", meaning: "he wrote" },
      { arabic: "ذَهَبَ", transliteration: "dhahaba", meaning: "he went" },
      { arabic: "جَلَسَ", transliteration: "jalasa", meaning: "he sat" },
      { arabic: "قَامَ", transliteration: "qama", meaning: "he stood" },
      { arabic: "أَكَلَ", transliteration: "akala", meaning: "he ate" },
      { arabic: "شَرِبَ", transliteration: "shariba", meaning: "he drank" },
      { arabic: "نَامَ", transliteration: "nama", meaning: "he slept" },
      { arabic: "فَعَلَ", transliteration: "fa'ala", meaning: "he did" }
    ]
  },
  {
    id: "short-phrases",
    level: "ayah",
    title: "Short Phrases & Dhikr",
    examples: [
      { arabic: "بِسْمِ اللَّهِ", transliteration: "bismillah", meaning: "In the name of Allah" },
      { arabic: "الْحَمْدُ لِلَّهِ", transliteration: "alhamdulillah", meaning: "Praise be to Allah" },
      { arabic: "سُبْحَانَ اللَّهِ", transliteration: "subhanallah", meaning: "Glory be to Allah" },
      { arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest" },
      { arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ", transliteration: "la ilaha illallah", meaning: "There is no god but Allah" },
      { arabic: "أَسْتَغْفِرُ اللَّهَ", transliteration: "astaghfirullah", meaning: "I seek forgiveness from Allah" },
      { arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", transliteration: "la hawla wa la quwwata illa billah", meaning: "There is no power nor strength except with Allah" },
      { arabic: "إِنْ شَاءَ اللَّهُ", transliteration: "insha'Allah", meaning: "If Allah wills" },
      { arabic: "مَا شَاءَ اللَّهُ", transliteration: "masha'Allah", meaning: "What Allah has willed" }
    ]
  },
  {
    id: "ayat-al-kursi-beginning",
    level: "ayah",
    title: "Ayat al-Kursi - Beginning",
    examples: [
      { arabic: "اللَّهُ", transliteration: "Allahu", meaning: "Allah" },
      { arabic: "لَا إِلَٰهَ إِلَّا هُوَ", transliteration: "la ilaha illa huwa", meaning: "There is no deity except Him" },
      { arabic: "الْحَيُّ الْقَيُّومُ", transliteration: "al-hayyu al-qayyoom", meaning: "The Ever-Living, The Sustainer" },
      { arabic: "لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ", transliteration: "la ta'khudhuhu sinatun wa la nawm", meaning: "Neither drowsiness overtakes Him nor sleep" },
      { arabic: "لَهُ مَا فِي السَّمَاوَاتِ", transliteration: "lahu ma fis-samawati", meaning: "To Him belongs whatever is in the heavens" },
      { arabic: "وَمَا فِي الْأَرْضِ", transliteration: "wa ma fil-ard", meaning: "And whatever is on the earth" }
    ]
  },
  {
    id: "surah-fatiha-parts",
    level: "ayah",
    title: "Surah Al-Fatiha - Parts",
    examples: [
      { arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "bismillahir-rahmanir-raheem", meaning: "In the name of Allah, the Most Gracious, the Most Merciful" },
      { arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", transliteration: "alhamdu lillahi rabbil-'aalameen", meaning: "All praise is due to Allah, Lord of all the worlds" },
      { arabic: "الرَّحْمَٰنِ الرَّحِيمِ", transliteration: "ar-rahmanir-raheem", meaning: "The Most Gracious, the Most Merciful" },
      { arabic: "مَالِكِ يَوْمِ الدِّينِ", transliteration: "maliki yawmid-deen", meaning: "Master of the Day of Judgment" },
      { arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", transliteration: "iyyaka na'budu wa iyyaka nasta'een", meaning: "You alone we worship and You alone we ask for help" },
      { arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", transliteration: "ihdinassiratal-mustaqeem", meaning: "Guide us to the straight path" }
    ]
  },
  {
    id: "short-surahs-ikhlas",
    level: "ayah",
    title: "Surah Al-Ikhlas (112)",
    examples: [
      { arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", transliteration: "qul huwa Allahu ahad", meaning: "Say: He is Allah, the One" },
      { arabic: "اللَّهُ الصَّمَدُ", transliteration: "Allahus-samad", meaning: "Allah, the Eternal Refuge" },
      { arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", transliteration: "lam yalid wa lam yoolad", meaning: "He neither begets nor is born" },
      { arabic: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", transliteration: "wa lam yakul-lahu kufuwan ahad", meaning: "Nor is there to Him any equivalent" }
    ]
  },
  {
    id: "short-surahs-falaq",
    level: "ayah",
    title: "Surah Al-Falaq (113)",
    examples: [
      { arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", transliteration: "qul a'udhu bi rabbil-falaq", meaning: "Say: I seek refuge in the Lord of daybreak" },
      { arabic: "مِنْ شَرِّ مَا خَلَقَ", transliteration: "min sharri ma khalaq", meaning: "From the evil of that which He created" },
      { arabic: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", transliteration: "wa min sharri ghasiqin idha waqab", meaning: "And from the evil of darkness when it settles" },
      { arabic: "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", transliteration: "wa min sharrin-naffathati fil-'uqad", meaning: "And from the evil of the blowers in knots" },
      { arabic: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", transliteration: "wa min sharri hasidin idha hasad", meaning: "And from the evil of an envier when he envies" }
    ]
  },
  {
    id: "short-surahs-nas",
    level: "ayah",
    title: "Surah An-Nas (114)",
    examples: [
      { arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", transliteration: "qul a'udhu bi rabbin-nas", meaning: "Say: I seek refuge in the Lord of mankind" },
      { arabic: "مَلِكِ النَّاسِ", transliteration: "malikin-nas", meaning: "The King of mankind" },
      { arabic: "إِلَٰهِ النَّاسِ", transliteration: "ilahin-nas", meaning: "The God of mankind" },
      { arabic: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", transliteration: "min sharril-waswasil-khannas", meaning: "From the evil of the retreating whisperer" },
      { arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", transliteration: "alladhi yuwaswisu fi sudoorin-nas", meaning: "Who whispers into the breasts of mankind" },
      { arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", transliteration: "minal-jinnati wan-nas", meaning: "From among the jinn and mankind" }
    ]
  },
  {
    id: "common-duas",
    level: "ayah",
    title: "Common Daily Duas",
    examples: [
      { arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", transliteration: "rabbana atina fid-dunya hasanah", meaning: "Our Lord, give us good in this world" },
      { arabic: "وَفِي الْآخِرَةِ حَسَنَةً", transliteration: "wa fil-akhirati hasanah", meaning: "And good in the Hereafter" },
      { arabic: "رَبِّ اشْرَحْ لِي صَدْرِي", transliteration: "rabbish-rah li sadri", meaning: "My Lord, expand for me my breast" },
      { arabic: "وَيَسِّرْ لِي أَمْرِي", transliteration: "wa yassir li amri", meaning: "And ease for me my task" },
      { arabic: "رَبِّ زِدْنِي عِلْمًا", transliteration: "rabbi zidni 'ilma", meaning: "My Lord, increase me in knowledge" },
      { arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا", transliteration: "rabbana la tuzigh quloobana", meaning: "Our Lord, let not our hearts deviate" }
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
    description: "When Noon Sakinah (نْ) or Tanween is followed by one of six letters ي ر م ل و ن (YARMALOON), the noon sound merges into the following letter. With ي و م ن there is ghunna (nasal sound) for 2 counts. With ر ل there is no ghunna. This rule beautifies recitation by creating smooth transitions between words.",
    examples: [
      {
        arabic: "مَنْ يَقُولُ - Surah Al-Baqarah 2:8",
        transliteration: "may-yaqoolu",
        highlight: "نْ ي",
        explanation: "Idgham with Ghunna - The noon sakinah completely merges with Ya (ي), creating a nasal 'yy' sound held for 2 counts. From the verse 'And among the people are those who say...'"
      },
      {
        arabic: "مِنْ رَبِّهِمْ - Surah Al-Baqarah 2:5",
        transliteration: "mir-rabbihim",
        highlight: "نْ ر",
        explanation: "Idgham without Ghunna - Noon completely disappears into Ra (ر) with no nasal sound, lips don't close for 'n'. From 'They are on guidance from their Lord.' The noon is completely absorbed."
      },
      {
        arabic: "مِنْ مَاءٍ - Surah Al-Anbiya 21:30",
        transliteration: "mim-ma'in",
        highlight: "نْ م",
        explanation: "Idgham with Ghunna - Noon merges completely with Meem (م), hold nasal sound for 2 counts. From 'And We made from water every living thing.' The sound comes purely from the nose."
      },
      {
        arabic: "مِنْ لَدُنْهُ - Surah Al-Kahf 18:2",
        transliteration: "mil-ladunhu",
        highlight: "نْ ل",
        explanation: "Idgham without Ghunna - Noon is absorbed into Lam (ل) without any nasal resonance. From the verse about guidance 'from His presence.' Tongue goes directly to 'l' position."
      },
      {
        arabic: "مَنْ وَلِيًّا - Surah Al-Kahf 18:17",
        transliteration: "maw-waliyyan",
        highlight: "نْ و",
        explanation: "Idgham with Ghunna - Noon merges with Waw (و) with nasal sound for 2 counts, creating prolonged 'ww' sound from the nose. From 'And whom Allah sends astray, you will never find for him a protecting guide.'"
      },
      {
        arabic: "مِنْ نِعْمَةٍ - Surah An-Nahl 16:53",
        transliteration: "min-ni'matin",
        highlight: "نْ ن",
        explanation: "Idgham Mutamathlain - Two identical letters (Noon into Noon). Hold strong nasal ghunna for 2 counts. From 'And whatever you have of favor, it is from Allah.' This creates the strongest nasal sound."
      },
      {
        arabic: "عَلِيمٌ حَكِيمٌ - Surah Al-Baqarah 2:32",
        transliteration: "aleemun hakeemun",
        highlight: "مٌ ح",
        explanation: "Note: This is NOT Idgham - Tanween before throat letter Ha (ح) requires Idhar (clear pronunciation). This shows what Idgham is NOT. Say the 'n' sound clearly before 'h'."
      }
    ]
  },
  {
    id: "noon-sakinah-ikhfa",
    title: "Noon Sakinah - Ikhfa (Concealment)",
    description: "When Noon Sakinah (نْ) or Tanween is followed by 15 specific letters (ص ذ ث ك ج ش ق س د ط ز ف ت ض ظ), the noon is concealed - pronounced somewhere between clear (Idhar) and merged (Idgham). Produce a light nasal ghunna for 2 counts without pressing tongue to roof of mouth. These 15 letters are neither throat letters (Idhar) nor YARMALOON letters (Idgham) nor Ba (Iqlab).",
    examples: [
      {
        arabic: "مَنْ صَدَّ - Surah An-Nisa 4:115",
        transliteration: "man sadda (with nasal)",
        highlight: "نْ ص",
        explanation: "Ikhfa before Sad (ص) - Conceal the noon with gentle ghunna for 2 counts. Don't say 'man' clearly, don't merge completely - hover between them. From 'And whoever opposes the Messenger...' The tongue doesn't touch the roof of mouth."
      },
      {
        arabic: "مِنْ ذَكَرٍ - Surah Al-An'am 6:143",
        transliteration: "min dhakarin (with nasal)",
        highlight: "نْ ذ",
        explanation: "Ikhfa before Dhal (ذ) - Hide the noon with nasal resonance. From 'Of the male or female?' in the verse about eight pairs of livestock. The noon sound is present but concealed, coming through the nose only."
      },
      {
        arabic: "مِنْ ثَمَرَةٍ - Surah Al-Baqarah 2:22",
        transliteration: "min thamaratin (with nasal)",
        highlight: "نْ ث",
        explanation: "Ikhfa before Tha (ث) - Conceal with gentle ghunna. From the verse about Allah bringing forth fruits as provision. Keep the mouth relaxed, let the nasal sound flow naturally without tongue touching roof."
      },
      {
        arabic: "أَنْ كَانَ - Surah Al-Insan 76:1",
        transliteration: "an kaana (with nasal)",
        highlight: "نْ ك",
        explanation: "Ikhfa before Kaf (ك) - Hide noon with nasal resonance for 2 counts. From Surah Al-Insan: 'Has there come upon man a period of time when he was not a thing mentioned?' The noon whispers through the nose."
      },
      {
        arabic: "مَنْ جَاءَ - Surah Yunus 10:26",
        transliteration: "man ja'a (with nasal)",
        highlight: "نْ ج",
        explanation: "Ikhfa before Jeem (ج) - Conceal the noon with ghunna. From 'For them who have done good is the best reward and extra.' Pronounce with nose while preparing mouth for 'j' sound."
      },
      {
        arabic: "يَنْشُرُ - Surah Fatir 35:9",
        transliteration: "yanshuru (with nasal)",
        highlight: "نْ ش",
        explanation: "Ikhfa before Sheen (ش) - From the verse about Allah sending winds. The noon is concealed with nasal quality while transitioning to 'sh' sound. This is in the middle of a word, showing Ikhfa can occur mid-word too."
      },
      {
        arabic: "أَنْ قَالَ - Surah Al-Qasas 28:34",
        transliteration: "an qaala (with nasal)",
        highlight: "نْ ق",
        explanation: "Ikhfa before Qaf (ق) - Conceal with ghunna. From the story of Musa (Moses). The heavy 'q' sound is prepared while the noon hides in nasal resonance for 2 counts."
      },
      {
        arabic: "مِنْ سُوءٍ - Surah Yusuf 12:25",
        transliteration: "min soo'in (with nasal)",
        highlight: "نْ س",
        explanation: "Ikhfa before Seen (س) - From the story of Prophet Yusuf. Light ghunna flows from nose while lips prepare for 's' sound, without stopping for a clear 'n'."
      },
      {
        arabic: "مِنْ دُونِهِ - Surah Al-Isra 17:22",
        transliteration: "min doonihi (with nasal)",
        highlight: "نْ د",
        explanation: "Ikhfa before Dal (د) - From 'So do not set up with Allah another deity.' Conceal noon with nasal sound. Very common pattern in Quran when speaking about 'other than Him'."
      },
      {
        arabic: "مِنْ طَعَامٍ - Surah Al-Baqarah 2:61",
        transliteration: "min ta'aamin (with nasal)",
        highlight: "نْ ط",
        explanation: "Ikhfa before Ta (ط) - From the story of Bani Israel asking for food. The heavy 'ṭ' is preceded by concealed noon with ghunna. Prepare the tongue for emphatic 't' while nasal sound resonates."
      },
      {
        arabic: "يَنْزِلُ - Surah Al-Qadr 97:4",
        transliteration: "yanzilu (with nasal)",
        highlight: "نْ ز",
        explanation: "Ikhfa before Zay (ز) - From Surah Al-Qadr: 'The angels and the Spirit descend.' Within a word, the noon sakinah is concealed before 'z' with ghunna. Very melodious when recited properly."
      },
      {
        arabic: "مِنْ فَوْقِهِمْ - Surah Al-Baqarah 2:26",
        transliteration: "min fawqihim (with nasal)",
        highlight: "نْ ف",
        explanation: "Ikhfa before Fa (ف) - From a parable Allah strikes. Noon concealed with nasal ghunna while lips begin to form 'f' sound. The transition should be smooth and natural."
      },
      {
        arabic: "مِنْ تَحْتِهِمْ - Surah Al-Baqarah 2:25",
        transliteration: "min tahtihim (with nasal)",
        highlight: "نْ ت",
        explanation: "Ikhfa before Ta (ت) - From description of Paradise with rivers flowing beneath. Conceal noon with nasal quality. Very frequent combination in Quran."
      },
      {
        arabic: "مِنْ ضَرَرٍ - Surah Al-Baqarah 2:231",
        transliteration: "min dhararin (with nasal)",
        highlight: "نْ ض",
        explanation: "Ikhfa before Dhad (ض) - From rulings about divorce. The heavy emphatic 'ḍ' is preceded by concealed noon. Rare but important - Dhad is unique to Arabic."
      },
      {
        arabic: "يُنْظَرُونَ - Surah Al-Baqarah 2:162",
        transliteration: "yunzharoona (with nasal)",
        highlight: "نْ ظ",
        explanation: "Ikhfa before Dha (ظ) - From 'They will not be reprieved.' Within the word, noon sakinah concealed before the heavy 'ẓ' with ghunna. Another emphatic letter requiring Ikhfa."
      }
    ]
  },
  {
    id: "noon-sakinah-iqlab",
    title: "Noon Sakinah - Iqlab (Conversion)",
    description: "When Noon Sakinah (نْ) or Tanween is followed by Ba (ب), convert the noon sound completely to a Meem (م) sound with ghunna for 2 counts. Close your lips as if saying Meem while producing nasal resonance. This is the only letter that requires Iqlab. The word Iqlab literally means 'to flip' or 'convert'.",
    examples: [
      {
        arabic: "مِنْ بَعْدِ - Surah Al-Baqarah 2:27",
        transliteration: "mim ba'di",
        highlight: "نْ ب",
        explanation: "Iqlab - Change the written Noon sakinah to Meem sound before Ba. Close lips completely (like م) and hold nasal ghunna for 2 counts. From 'Those who break the covenant of Allah after contracting it.' Don't say 'min ba'di' - say 'mim ba'di'."
      },
      {
        arabic: "سَمِيعٌ بَصِيرٌ - Surah Al-Baqarah 2:181",
        transliteration: "samee'um baseer",
        highlight: "عٌ ب",
        explanation: "Iqlab with Tanween Damm - Convert the tanween 'un' to Meem sound. From 'Indeed, Allah is Hearing and Seeing.' Lips close as if Meem is written, nasal sound flows for 2 counts before opening for 'b'."
      },
      {
        arabic: "أَنْ بُورِكَ - Surah Al-Qasas 28:30",
        transliteration: "am boorika",
        highlight: "نْ ب",
        explanation: "Iqlab - From the story of Musa and the blessed spot. Transform noon completely into Meem with ghunna. Both lips must touch completely. Common mistake: don't let tongue touch roof of mouth (that's noon) - only lips close (meem)."
      },
      {
        arabic: "لَنَسْفَعًا بِالنَّاصِيَةِ - Surah Al-Alaq 96:15",
        transliteration: "lanasfa'am bin-naasiyah",
        highlight: "عًا ب",
        explanation: "Iqlab with Tanween Fath - 'We will surely drag him by the forelock.' The tanween 'an' transforms to Meem sound before 'bin'. Nasal ghunna resonates while lips prepare for 'b'."
      },
      {
        arabic: "شَيْءٍ بَصِيرٌ - Surah Fatir 35:45",
        transliteration: "shay'im baseer",
        highlight: "ءٍ ب",
        explanation: "Iqlab with Tanween Kasr - From 'Indeed, Allah, of all things, is Seeing.' Tanween 'in' becomes Meem sound. The lips close for ghunna while the nasal cavity resonates for 2 full counts."
      },
      {
        arabic: "عَلِيمٌ بِذَاتِ الصُّدُورِ - Surah Ali 'Imran 3:119",
        transliteration: "aleemum bidhatis-sudoor",
        highlight: "مٌ ب",
        explanation: "Iqlab after Meem - Even though the word ends in Meem with tanween, you still apply Iqlab rule when Ba follows. From 'And Allah is Knowing of that within the breasts.' Double the Meem sound with ghunna."
      },
      {
        arabic: "غَفُورٌ رَحِيمٌ - Surah Al-Baqarah 2:173",
        transliteration: "ghafoorur raheem",
        highlight: "رٌ ر",
        explanation: "Note: This is NOT Iqlab - This example shows Idgham (merging) with Ra, not Iqlab. Iqlab ONLY happens with Ba (ب). This is to clarify the difference. With Ra, the tanween merges, with Ba it converts to Meem."
      }
    ]
  },
  {
    id: "noon-sakinah-idhar",
    title: "Noon Sakinah - Idhar (Clear Pronunciation)",
    description: "When Noon Sakinah (نْ) or Tanween is followed by one of the six throat letters (ء ه ع ح غ خ), pronounce the noon clearly and distinctly without any ghunna (nasal sound). These throat letters prevent merging or concealment. The word Idhar means 'to clarify' or 'make clear'. This is also called Idhar Halqi (throat clarity).",
    examples: [
      {
        arabic: "مِنْ آمَنَ - Surah Al-Baqarah 2:62",
        transliteration: "min aamana",
        highlight: "نْ آ",
        explanation: "Idhar before Hamza (ء) - From 'Indeed, those who believed...' Pronounce the noon sakinah clearly from the tip of tongue touching upper gum, no nasal sound. Complete stop of noon, then start hamza fresh from deep throat."
      },
      {
        arabic: "مِنْ هَادٍ - Surah Ar-Ra'd 13:7",
        transliteration: "min haadin",
        highlight: "نْ ه",
        explanation: "Idhar before Ha (ه) - From 'And for every people is a guide.' Clear, crisp noon with tongue touching roof, no ghunna whatsoever. The Ha comes from the throat, making noon stand separately."
      },
      {
        arabic: "مَنْ عَمِلَ - Surah Al-Kahf 18:30",
        transliteration: "man 'amila",
        highlight: "نْ ع",
        explanation: "Idhar before Ayn (ع) - From 'Indeed, those who have believed and done righteous deeds.' Say 'n' sound completely and clearly before the deep throat sound of Ayn. No nasal extension at all."
      },
      {
        arabic: "إِنْ حَسِبْتُمْ - Surah Ibrahim 14:34",
        transliteration: "in hasibtum",
        highlight: "نْ ح",
        explanation: "Idhar before Ha (ح) - From 'And if you should count the favors of Allah, you could not enumerate them.' Pronounce noon distinctly, cut it off, then pronounce Ha from middle of throat. Common combination in Quran."
      },
      {
        arabic: "مَنْ غَفُورٌ - Surah Fatir 35:41",
        transliteration: "man ghafoor",
        highlight: "نْ غ",
        explanation: "Idhar before Ghayn (غ) - From verse about Allah maintaining heavens and earth. Clear noon pronunciation, no merging with the throat letter Ghayn. The tongue tip presses firmly for 'n' then releases for the gargling 'gh' sound."
      },
      {
        arabic: "مِنْ خَيْرٍ - Surah Al-Baqarah 2:215",
        transliteration: "min khayrin",
        highlight: "نْ خ",
        explanation: "Idhar before Kha (خ) - From 'Whatever you spend of good...' Articulate noon clearly with no nasal continuation before the throaty Kha. Very common phrase in Quran regarding spending in good."
      },
      {
        arabic: "يَوْمَئِذٍ خَاشِعَةٌ - Surah Al-Ghashiyah 88:2",
        transliteration: "yawma'idhin khaashi'ah",
        highlight: "ذٍ خ",
        explanation: "Idhar with Tanween Kasr - From Surah Al-Ghashiyah describing the Day of Judgment. The tanween is pronounced clearly before throat letter Kha. No nasal sound extends into the following letter."
      },
      {
        arabic: "جَنَّاتٍ عَدْنٍ - Surah At-Tawbah 9:72",
        transliteration: "jannaatin 'adnin",
        highlight: "تٍ ع",
        explanation: "Idhar with Tanween - 'Gardens of perpetual residence.' Tanween pronounced clearly before Ayn. The 'n' sound stops completely before the deep throat Ayn begins. This clarity prevents confusion in meaning."
      }
    ]
  },
  {
    id: "meem-sakinah",
    title: "Meem Sakinah Rules",
    description: "Meem with sukoon (مْ) has three rules: 1) Idgham Shafawi - merge with another Meem (م) with ghunna. 2) Ikhfa Shafawi - hide before Ba (ب) with ghunna. 3) Idhar Shafawi - pronounce clearly before all other 26 letters. Shafawi means 'labial' because these sounds come from the lips.",
    examples: [
      {
        arabic: "لَهُمْ مَا - Surah Al-Baqarah 2:7",
        transliteration: "lahum-ma",
        highlight: "مْ م",
        explanation: "Idgham Mithlayn Sagheer (Small Similar Merging) - First Meem sakinah merges completely into second Meem, creating one emphasized Meem with ghunna held for 2 counts. From 'For them is a disease in their hearts.' Close lips completely, nasal resonance."
      },
      {
        arabic: "تَرْمِيهِمْ بِحِجَارَةٍ - Surah Al-Fil 105:4",
        transliteration: "tarmeehim bihijarah",
        highlight: "مْ ب",
        explanation: "Ikhfa Shafawi (Labial Concealment) - Conceal the Meem sakinah before Ba with light nasal ghunna for 2 counts. From Surah Al-Fil about birds striking them with stones. Don't open lips fully between Meem and Ba - slight nasal hum while transitioning."
      },
      {
        arabic: "عَلَيْهِمْ تَتْلُو - Surah Al-Baqarah 2:102",
        transliteration: "alayhim tatloo",
        highlight: "مْ ت",
        explanation: "Idhar Shafawi (Clear Labial) - Pronounce Meem clearly before Ta without ghunna. From the story of magic in Babylon. Press lips together for clear 'm' sound, release completely, no nasal extension, then fresh 't' sound from tongue."
      },
      {
        arabic: "أَمْ كُنتُمْ - Surah Al-Baqarah 2:133",
        transliteration: "am kuntum",
        highlight: "مْ ك",
        explanation: "Idhar Shafawi - Clear Meem before Kaf. From Ya'qub questioning his sons. Lips close firmly for Meem, open cleanly, no ghunna, then back of tongue rises for 'k'. Complete separation between letters."
      },
      {
        arabic: "هُمْ فِيهَا - Surah Al-Baqarah 2:39",
        transliteration: "hum feeha",
        highlight: "مْ ف",
        explanation: "Idhar Shafawi - Meem sakinah clear before Fa. From 'They will abide therein eternally.' Even though both Meem and Fa use lips, pronounce Meem distinctly with no merging or concealment."
      },
      {
        arabic: "لَكُمْ وَلِأَبْنَائِكُمْ - Surah An-Nisa 4:11",
        transliteration: "lakum wali'abna'ikum",
        highlight: "مْ و",
        explanation: "Idhar Shafawi - Clear Meem before Waw. From inheritance laws. Lips close for 'm', open completely with no nasal, then round for 'w'. Common pattern in Quran."
      },
      {
        arabic: "عَلَيْهِمْ مِنَ - Surah Al-Baqarah 2:90",
        transliteration: "alayhim mina",
        highlight: "مْ م",
        explanation: "Idgham Shafawi - Two Meems merge with ghunna. From 'So they returned with anger from Allah.' The first Meem completely disappears into the second. Hold the merged Meem with nasal sound for 2 counts while lips stay closed."
      },
      {
        arabic: "يَعْتَصِمْ بِاللَّهِ - Surah Ali 'Imran 3:101",
        transliteration: "ya'tasim billaah",
        highlight: "مْ ب",
        explanation: "Ikhfa Shafawi - Conceal Meem before Ba. From 'And whoever holds firmly to Allah.' Transition from Meem to Ba with continuous lip closure and light ghunna. The lips barely open between the two letters, creating a hidden transition."
      }
    ]
  },
  {
    id: "qalqalah",
    title: "Qalqalah (Echoing/Bouncing Sound)",
    description: "When the five Qalqalah letters ق ط ب ج د (remembered as 'QUTB JAD') have sukoon, produce a strong echoing/bouncing sound by releasing a small burst of air. Qalqalah is stronger (Kubra) when at the end of words/verses, and lighter (Sughra) when in the middle of words. Never drag the sound - it should be crisp and short.",
    examples: [
      {
        arabic: "أَحَدْ - Surah Al-Ikhlas 112:1",
        transliteration: "ahad",
        highlight: "دْ",
        explanation: "Qalqalah Kubra (Major) - Dal (د) at the end of Surah Al-Ikhlas creates strong echoing bounce. From 'Allah is One.' Let a burst of air escape when releasing the 'd' - like a mini explosion. End of verse = strongest Qalqalah."
      },
      {
        arabic: "الْفَلَقْ - Surah Al-Falaq 113:1",
        transliteration: "al-falaq",
        highlight: "قْ",
        explanation: "Qalqalah Kubra - Qaf (ق) at word/surah end creates powerful echo. From 'Say: I seek refuge in the Lord of daybreak.' The 'q' sound bounces from deep in throat with burst of air. One of most recognizable Qalqalah sounds."
      },
      {
        arabic: "يَكْتُبُ - Surah Al-Baqarah 2:282",
        transliteration: "yak-tubu",
        highlight: "كْ",
        explanation: "Qalqalah Sughra (Minor) - This shows what Qalqalah is NOT. Kaf (ك) is not a Qalqalah letter, so even with sukoon, no bouncing. From verse about writing down debts. Only the 5 letters QUTB JAD get Qalqalah."
      },
      {
        arabic: "اقْرَأْ - Surah Al-Alaq 96:1",
        transliteration: "iqra'",
        highlight: "قْ",
        explanation: "Qalqalah Sughra - Qaf with sukoon in middle of word has lighter echo. First word revealed to Prophet ﷺ: 'Read!' Still bounce the 'q' but less forcefully than at word end. Air pressure builds behind tongue, releases quickly."
      },
      {
        arabic: "أَطَعْنَا - Surah Al-Ahzab 33:66",
        transliteration: "ata'na",
        highlight: "طْ",
        explanation: "Qalqalah Sughra - Ta (ط) with sukoon mid-word echoes lightly. From 'They will say: Our Lord, indeed we obeyed...' The emphatic 'ṭ' bounces slightly when released. Less intense than end position."
      },
      {
        arabic: "رِجْسٌ - Surah Al-An'am 6:145",
        transliteration: "rijs",
        highlight: "جْ",
        explanation: "Qalqalah Sughra - Jeem (ج) with sukoon creates subtle echo mid-word. From 'Indeed, it is impure.' The 'j' sound has slight bounce when tongue releases from roof of mouth. Build pressure, then quick release."
      },
      {
        arabic: "يَحْسَبُ - Surah Al-Humaza 104:3",
        transliteration: "yahsabu",
        highlight: "بُ",
        explanation: "Qalqalah with Vowel - Ba (ب) here has vowel (damma), so technically no Qalqalah since it's not sakin. But with practice, you'll notice slight natural bounce in Qalqalah letters even with vowels. From 'He thinks his wealth will make him immortal.'"
      },
      {
        arabic: "لَمْ يَلِدْ - Surah Al-Ikhlas 112:3",
        transliteration: "lam yalid",
        highlight: "دْ",
        explanation: "Qalqalah Kubra - Dal at verse end in Surah Al-Ikhlas bounces strongly. 'He neither begets...' Common mistake: don't drag it like 'yalidda' - it's a sharp, quick bounce 'yalid' with air burst. Crisp and clean."
      },
      {
        arabic: "فَتَبَيَّنُوا - Surah Al-Hujurat 49:6",
        transliteration: "fatabayyanoo",
        highlight: "بَ",
        explanation: "No Qalqalah - Ba has fatha (vowel), not sukoon. From 'Verify first' verse. This clarifies that Qalqalah ONLY occurs when the five letters have sukoon. Voweled letters don't echo."
      }
    ]
  },
  {
    id: "madd-types",
    title: "Madd - Types of Elongation",
    description: "Madd means prolonging/stretching vowel sounds beyond their natural length. Madd letters are: Alif (with fatha before), Waw (with damma before), and Ya (with kasra before). Different types: Madd Tabee'i (2 counts), Madd Munfasil (4-5 counts), Madd Muttasil (4-6 counts), Madd Laazim (6 counts). One count (haraka) = roughly the time to close/open a finger.",
    examples: [
      {
        arabic: "قَالَ - Surah Al-Baqarah 2:30",
        transliteration: "qaa-la",
        highlight: "ا",
        explanation: "Madd Tabee'i (Natural Madd) - Fatha (َ) before Alif creates natural 'aa' elongation for 2 counts. From 'And when your Lord said to the angels...' Most basic and common madd. Don't shorten or over-elongate - exactly 2 beats."
      },
      {
        arabic: "يَقُولُ - Surah Al-Baqarah 2:8",
        transliteration: "ya-qoo-lu",
        highlight: "و",
        explanation: "Madd Tabee'i - Damma (ُ) before Waw creates 'oo' sound for 2 counts. From 'And of the people are some who say...' Natural elongation - hold for time of 2 finger movements, no more, no less."
      },
      {
        arabic: "قِيلَ - Surah Al-Baqarah 2:11",
        transliteration: "qee-la",
        highlight: "ي",
        explanation: "Madd Tabee'i - Kasra (ِ) before Ya creates 'ee' sound for 2 counts. From 'And when it is said to them...' Standard natural madd. Ya here is a madd letter, not consonant 'y'."
      },
      {
        arabic: "جَاءَ أُمَّةً - Surah Al-Baqarah 2:213",
        transliteration: "jaa'a ummatan",
        highlight: "ا ء",
        explanation: "Madd Munfasil (Separated Madd) - Madd letter at end of word, Hamza at start of next word. Elongate for 4-5 counts. From 'And came to a nation...' Also called Madd Al-Jaiz (permissible) because count can vary 4-5."
      },
      {
        arabic: "السَّمَاءِ - Surah Al-Baqarah 2:19",
        transliteration: "as-samaa'i",
        highlight: "ا ء",
        explanation: "Madd Muttasil (Connected Madd) - Madd letter followed by Hamza in SAME word. Elongate 4-5 counts (some scholars say must be 6). From 'from the sky' in lightning verse. Called Madd Waajib (obligatory). Longer than natural madd."
      },
      {
        arabic: "آمَنَّا - Surah Al-Baqarah 2:14",
        transliteration: "aa-man-na",
        highlight: "آ",
        explanation: "Madd Laazim (Necessary Madd) - The combined Alif-Hamza-Alif (آ) always gets 6 counts elongation. From 'We have believed' when hypocrites speak. Longest natural madd. The double Alif creates emphasized elongation."
      },
      {
        arabic: "دَابَّةٍ - Surah Al-Baqarah 2:164",
        transliteration: "daaabbatin",
        highlight: "ابّ",
        explanation: "Madd Laazim Harfi Muthaqqal - Alif followed by Ba with shadda creates 6-count madd. From 'creature' in signs of Allah verse. The shadda (doubled letter) after madd letter mandates 6 counts. Rare but important."
      },
      {
        arabic: "الضَّالِّينَ - Surah Al-Fatihah 1:7",
        transliteration: "adh-dhaaaalleen",
        highlight: "الّ",
        explanation: "Madd Laazim - 'Those who have gone astray' - final word of Al-Fatihah. Alif followed by shadda on Lam requires 6 full counts. One of most recited madds in Islam. Hold the 'aa' for 6 beats clearly."
      },
      {
        arabic: "وَلَا تَمُدَّنَّ - Surah Al-Hijr 15:88",
        transliteration: "wa laa tamud-dan-na",
        highlight: "ا ت",
        explanation: "Madd Tabee'i only - Even though verse is about 'extending' (madd), the Alif before Ta is just natural 2-count madd. No Hamza or shadda follows. Shows that madd rules depend on what follows the madd letter."
      }
    ]
  },
  {
    id: "lam-rules",
    title: "Lam Al-Ta'rif Rules (AL - Sun & Moon Letters)",
    description: "The definite article AL (ال) changes pronunciation based on following letter. 14 Sun Letters (Shamsiyyah ت ث د ذ ر ز س ش ص ض ط ظ ل ن): Lam is silent, following letter gets shadda. 14 Moon Letters (Qamariyyah - all others): Pronounce Lam clearly. Sun letters assimilate the L sound; Moon letters keep it.",
    examples: [
      {
        arabic: "الشَّمْس - Surah Ash-Shams 91:1",
        transliteration: "ash-shams",
        highlight: "لش",
        explanation: "Lam Shamsiyyah - Sheen (ش) is a sun letter. Don't say 'al-shams' - say 'ash-shams'. Lam completely silent, Sheen gets shadda (emphasis). From 'By the sun and its brightness.' The name of this surah demonstrates the rule!"
      },
      {
        arabic: "النَّار - Surah Al-Baqarah 2:24",
        transliteration: "an-naar",
        highlight: "لن",
        explanation: "Lam Shamsiyyah - Noon (ن) is sun letter. Say 'an-naar' not 'al-naar'. From 'whose fuel is men and stones' speaking of Hellfire. Very common word in Quran - Lam assimilates into Noon."
      },
      {
        arabic: "الرَّحْمَٰن - Surah Al-Fatihah 1:3",
        transliteration: "ar-rahmaan",
        highlight: "لر",
        explanation: "Lam Shamsiyyah - Ra (ر) is sun letter. Say 'ar-Rahmaan' with emphasized 'rr'. From Al-Fatihah, most recited verse. The Lam disappears into Ra. Second most common Name of Allah after 'Allah'."
      },
      {
        arabic: "الْقَمَر - Surah Al-Qamar 54:1",
        transliteration: "al-qamar",
        highlight: "لق",
        explanation: "Lam Qamariyyah - Qaf (ق) is a moon letter. Pronounce Lam clearly: 'al-qamar'. From 'The Hour has come near, and the moon has split.' The surah name itself demonstrates moon letter rule - how fitting!"
      },
      {
        arabic: "الْكِتَاب - Surah Al-Baqarah 2:2",
        transliteration: "al-kitaab",
        highlight: "لك",
        explanation: "Lam Qamariyyah - Kaf (ك) is moon letter. Clear Lam: 'al-kitaab'. From 'This is the Book about which there is no doubt.' One of most frequent words in Quran. Lam stays audible with moon letters."
      },
      {
        arabic: "الْبَيْت - Surah Al-Baqarah 2:125",
        transliteration: "al-bayt",
        highlight: "لب",
        explanation: "Lam Qamariyyah - Ba (ب) is moon letter. Say 'al-bayt' clearly. From verse about Ka'bah: 'And take the standing place of Abraham as a place of prayer.' Referring to the sacred house."
      },
      {
        arabic: "التَّوْرَاة - Surah Al-Baqarah 2:41",
        transliteration: "at-tawraah",
        highlight: "لت",
        explanation: "Lam Shamsiyyah - Ta (ت) is sun letter. Say 'at-Tawraah' not 'al-Tawraah'. From 'the Torah' in verse about Bani Israel. Lam merges completely into Ta. Notice the shadda on Ta."
      },
      {
        arabic: "الصَّلَاة - Surah Al-Baqarah 2:43",
        transliteration: "as-salaah",
        highlight: "لص",
        explanation: "Lam Shamsiyyah - Sad (ص) is sun letter. Pronounce 'as-Salaah' with emphasis. From 'establish prayer' - most important act of worship. Lam silent, heavy Sad gets shadda."
      },
      {
        arabic: "الذِّكْر - Surah Al-Hijr 15:9",
        transliteration: "adh-dhikr",
        highlight: "الذ",
        explanation: "Lam Shamsiyyah - Dhal (ذ) is sun letter. Say 'adh-dhikr' not 'al-dhikr'. From 'Indeed, it is We who sent down the Reminder (Quran).' Lam assimilated into Dhal."
      },
      {
        arabic: "الْمُتَّقِينَ - Surah Al-Baqarah 2:2",
        transliteration: "al-muttaqeen",
        highlight: "لم",
        explanation: "Lam Qamariyyah - Meem (م) is moon letter. Pronounce 'al-muttaqeen' clearly. From 'guidance for the righteous.' Lam remains fully pronounced before Meem. Very common word in Quran describing the pious."
      }
    ]
  },
  {
    id: "sun-moon-letters",
    title: "Complete Sun and Moon Letters Guide",
    description: "14 Sun Letters (Huroof Shamsiyyah): ت ث د ذ ر ز س ش ص ض ط ظ ل ن - these assimilate the Lam of AL. Mnemonic: 'Taa tha daal dhal, raa zaay seen sheen, saad daad taa' dhaa', lam noon' OR remember they're mostly tongue-tip letters. 14 Moon Letters (Huroof Qamariyyah): ء ب ج ح خ ع غ ف ق ك م ه و ي - keep Lam clear. Remember: what remains are moon letters.",
    examples: [
      {
        arabic: "الذِّكْر - Surah Ar-Rahman 55:1-2",
        transliteration: "adh-dhikr",
        highlight: "الذ",
        explanation: "Sun Letter - Dhal (ذ) assimilates Lam. From 'The Most Merciful, Taught the Quran.' Lam becomes silent, Dhal gets emphasis. Tongue-tip letter."
      },
      {
        arabic: "التَّوْبَة - Surah At-Tawbah 9:104",
        transliteration: "at-tawbah",
        highlight: "الت",
        explanation: "Sun Letter - Ta (ت) takes the Lam sound. From 'Indeed, Allah is the Accepting of repentance.' Say 'at-tawbah' with emphasized T. Common word meaning repentance."
      },
      {
        arabic: "الصَّلَاة - Surah Al-Baqarah 2:238",
        transliteration: "as-salaah",
        highlight: "الص",
        explanation: "Sun Letter - Sad (ص) absorbs Lam. From 'Maintain the prayers.' Heavy emphatic S. Prayer is pillar of Islam mentioned hundreds of times with this sun letter rule."
      },
      {
        arabic: "الزَّكَاة - Surah Al-Baqarah 2:43",
        transliteration: "az-zakaah",
        highlight: "الز",
        explanation: "Sun Letter - Zay (ز) assimilates Lam. From 'give zakah' - obligatory charity. Say 'az-zakaah' clearly. Zay is sun letter from tongue tip."
      },
      {
        arabic: "الدُّنْيَا - Surah Al-Baqarah 2:85",
        transliteration: "ad-dunya",
        highlight: "الد",
        explanation: "Sun Letter - Dal (د) takes Lam sound. From 'the worldly life' - extremely common phrase in Quran. Lam silent, Dal emphasized: 'ad-dunya'."
      },
      {
        arabic: "الظَّالِمِينَ - Surah Al-Baqarah 2:35",
        transliteration: "adh-dhaalimeen",
        highlight: "الظ",
        explanation: "Sun Letter - Dhaa (ظ) assimilates Lam. From 'and you will be among the wrongdoers.' Heavy emphatic 'dh'. Say 'adh-dhaalimeen' with emphasis."
      },
      {
        arabic: "الطَّيِّبَات - Surah Al-Baqarah 2:57",
        transliteration: "at-tayyibaat",
        highlight: "الط",
        explanation: "Sun Letter - Heavy Ta (ط) assimilates Lam. From 'the good things' We provided. Emphatic 't' sound, Lam disappears: 'at-tayyibaat'."
      },
      {
        arabic: "الضَّرَّاء - Surah Al-Baqarah 2:177",
        transliteration: "adh-dharraa'",
        highlight: "الض",
        explanation: "Sun Letter - Heavy Daad (ض) unique to Arabic. From 'hardship and adversity'. Lam silent, emphatic 'dh': 'adh-dharraa'. Daad is the rarest letter in Quran."
      },
      {
        arabic: "الثَّمَرَات - Surah Al-Baqarah 2:22",
        transliteration: "ath-thamaraat",
        highlight: "الث",
        explanation: "Sun Letter - Tha (ث) assimilates Lam. From 'fruits as provision' in creation verse. Say 'ath-thamaraat' not 'al-thamaraat'. Tongue between teeth for 'th'."
      },
      {
        arabic: "اللَّيْل - Surah Al-Layl 92:1",
        transliteration: "al-layl",
        highlight: "الل",
        explanation: "Sun Letter - Lam (ل) after AL creates double Lam with shadda. From 'By the night when it covers.' Say 'al-layl' with strong double L. Surah Al-Layl demonstrates this rule."
      },
      {
        arabic: "النَّاس - Surah An-Nas 114:1",
        transliteration: "an-naas",
        highlight: "الن",
        explanation: "Sun Letter - Noon (ن) assimilates Lam. From 'Say: I seek refuge in the Lord of mankind.' Last surah demonstrates sun letter. Very common word: 'mankind/people'."
      },
      {
        arabic: "السَّمَاء - Surah Al-Baqarah 2:19",
        transliteration: "as-samaa'",
        highlight: "الس",
        explanation: "Sun Letter - Seen (س) takes Lam. From 'the sky' in lightning verse. Say 'as-samaa'' not 'al-samaa''. Light 's' but Lam still disappears."
      },
      {
        arabic: "الرَّحِيم - Surah Al-Fatihah 1:1",
        transliteration: "ar-raheem",
        highlight: "الر",
        explanation: "Sun Letter - Ra (ر) assimilates Lam. From Bismillah - most recited phrase. Say 'ar-Raheem' with rolling R. Name of Allah meaning 'Most Merciful'."
      },
      {
        arabic: "الْمَلَائِكَة - Surah Al-Baqarah 2:30",
        transliteration: "al-malaa'ikah",
        highlight: "الم",
        explanation: "Moon Letter - Meem (م) keeps Lam clear. From 'the angels' when Allah informed them about Adam. Say 'al-malaa'ikah' with clear L sound."
      },
      {
        arabic: "الْحَقّ - Surah Al-Baqarah 2:42",
        transliteration: "al-haqq",
        highlight: "الح",
        explanation: "Moon Letter - Ha (ح) is moon letter. Pronounce Lam clearly: 'al-haqq'. From 'the truth' - Name of Allah. Ha is throat letter, so Lam stays audible."
      },
      {
        arabic: "الْغَيْب - Surah Al-Baqarah 2:3",
        transliteration: "al-ghayb",
        highlight: "الغ",
        explanation: "Moon Letter - Ghayn (غ) keeps AL clear. From 'the unseen' in qualities of believers. Throat letter, so say 'al-ghayb' with full Lam."
      },
      {
        arabic: "الْفُرْقَان - Surah Al-Baqarah 2:53",
        transliteration: "al-furqaan",
        highlight: "الف",
        explanation: "Moon Letter - Fa (ف) is moon letter. Say 'al-furqaan' clearly. From giving Musa the criterion (Torah). Lip letter Fa doesn't affect Lam."
      },
      {
        arabic: "الْعَالَمِين - Surah Al-Fatihah 1:2",
        transliteration: "al-'aalameen",
        highlight: "الع",
        explanation: "Moon Letter - Ayn (ع) is moon letter. Pronounce 'al-'aalameen' with clear L. From 'Lord of all worlds' in Al-Fatihah. Deep throat Ayn doesn't assimilate Lam."
      },
      {
        arabic: "الْخَالِق - Surah Al-Hashr 59:24",
        transliteration: "al-khaaliq",
        highlight: "الخ",
        explanation: "Moon Letter - Kha (خ) keeps Lam. From Names of Allah: 'The Creator'. Throat letter, say 'al-Khaaliq' with clear L before guttural 'kh'."
      },
      {
        arabic: "الْهُدَىٰ - Surah Al-Baqarah 2:120",
        transliteration: "al-huda",
        highlight: "الهـ",
        explanation: "Moon Letter - Ha (ه) is moon letter. Say 'al-huda' clearly. From 'the guidance of Allah is the true guidance.' Breathy H doesn't affect Lam pronunciation."
      },
      {
        arabic: "الْوَاحِد - Surah Al-Baqarah 2:163",
        transliteration: "al-waahid",
        highlight: "الو",
        explanation: "Moon Letter - Waw (و) keeps Lam audible. From 'One God' in Tawheed verse. Pronounce 'al-Waahid' with clear L. Lip-rounding Waw doesn't assimilate."
      },
      {
        arabic: "الْيَوْم - Surah Al-Baqarah 2:8",
        transliteration: "al-yawm",
        highlight: "الي",
        explanation: "Moon Letter - Ya (ي) is moon letter. Say 'al-yawm' clearly. From 'the Day' (of Judgment). Ya doesn't affect Lam - remains fully pronounced."
      },
      {
        arabic: "الْجَنَّة - Surah Al-Baqarah 2:35",
        transliteration: "al-jannah",
        highlight: "الج",
        explanation: "Moon Letter - Jeem (ج) keeps AL clear. From 'Paradise' in Adam's story. Say 'al-jannah' with pronounced L. Most beautiful word in Quran!"
      },
      {
        arabic: "الْأَرْض - Surah Al-Baqarah 2:11",
        transliteration: "al-ard",
        highlight: "الأ",
        explanation: "Moon Letter - Hamza (ء) is moon letter. Pronounce 'al-ard' clearly. From 'the earth' mentioned with 'heavens'. Glottal stop Hamza doesn't assimilate Lam."
      }
    ]
  },
  {
    id: "tafkheem-tarqeeq",
    title: "Tafkheem (Heavy Letters) vs Tarqeeq (Light Letters)",
    description: "Tafkheem = thick, full-mouth sound with tongue raised. 7 letters ALWAYS heavy: خ ص ض غ ط ق ظ (remember: KHUṢṢ DHAQATH QAṬ or 'heavy letters of Arabic'). Ra (ر) and Lam (in Allah) can be heavy or light based on context. All other letters are light (Tarqeeq). Heavy letters give Quran its unique resonance.",
    examples: [
      {
        arabic: "صَلَاة - Surah Al-Baqarah 2:3",
        transliteration: "salaah (heavy S)",
        highlight: "ص",
        explanation: "Tafkheem - Sad (ص) is ALWAYS heavy. From 'establish prayer' - most common Islamic term. Tongue raised to roof, back of tongue elevated, mouth cavity hollow. Compare light 's' in 'seen' - totally different sound."
      },
      {
        arabic: "طَعَام - Surah Al-Baqarah 2:184",
        transliteration: "ta'aam (heavy T)",
        highlight: "ط",
        explanation: "Tafkheem - Heavy Ta (ط) always thick. From 'feeding a poor person' in fasting rules. Emphatic 't' - tongue presses hard, throat opens. Different from light ت."
      },
      {
        arabic: "قُرْآن - Surah Al-Baqarah 2:185",
        transliteration: "qur'aan (heavy Q)",
        highlight: "ق",
        explanation: "Tafkheem - Qaf (ق) always heavy, from deep in throat. From 'the month in which Quran was revealed.' Back of tongue to back of roof. Creates powerful, resonant sound unique to Arabic."
      },
      {
        arabic: "ضَلَالَة - Surah Al-Baqarah 2:16",
        transliteration: "dalaalah (heavy D)",
        highlight: "ض",
        explanation: "Tafkheem - Heavy Daad (ض) is unique to Arabic, always emphatic. From 'misguidance' verse. Side of tongue presses molars, creates thick 'd' sound. No equivalent in English - uniquely Arabic."
      },
      {
        arabic: "ظُلُمَات - Surah Al-Baqarah 2:17",
        transliteration: "dhulumaat (heavy DH)",
        highlight: "ظ",
        explanation: "Tafkheem - Heavy Dha (ظ) always emphatic. From 'darkness' in lightning parable. Tongue between teeth but with throat expanded, creates thick 'dh' unlike light ذ."
      },
      {
        arabic: "غَفُور - Surah Al-Baqarah 2:173",
        transliteration: "ghafoor (heavy GH)",
        highlight: "غ",
        explanation: "Tafkheem - Ghayn (غ) always heavy from throat. From 'Most Forgiving' - Name of Allah. Gargling sound from throat, back of tongue raised. Creates resonance in throat cavity."
      },
      {
        arabic: "خَلَقَ - Surah Al-Alaq 96:1",
        transliteration: "khalaqa (heavy KH)",
        highlight: "خ",
        explanation: "Tafkheem - Kha (خ) always heavy, throaty. From first revelation: 'Created'. Deep throat fricative with mouth cavity open. Back of tongue near uvula."
      },
      {
        arabic: "سَلَام - Surah Al-Waqi'ah 56:26",
        transliteration: "salaam (light s)",
        highlight: "س",
        explanation: "Tarqeeq - Seen (س) is ALWAYS light, thin. From 'Peace, peace' in Paradise description. Tongue low and forward, creates crisp 's'. Contrast with heavy ص."
      },
      {
        arabic: "تِين - Surah At-Tin 95:1",
        transliteration: "teen (light t)",
        highlight: "ت",
        explanation: "Tarqeeq - Light Ta (ت) is thin, delicate. From 'By the fig' - surah opening. Tongue tip to ridge, mouth relaxed. Compare to heavy ط - completely different mouth position."
      },
      {
        arabic: "دِين - Surah Al-Fatihah 1:4",
        transliteration: "deen (light d)",
        highlight: "د",
        explanation: "Tarqeeq - Dal (د) is light. From 'Day of Judgment' in Al-Fatihah. Thin, crisp 'd' with tongue forward. Compare to heavy ض - shows importance of Tafkheem/Tarqeeq distinction."
      },
      {
        arabic: "ذِكْر - Surah Al-Hijr 15:9",
        transliteration: "dhikr (light dh)",
        highlight: "ذ",
        explanation: "Tarqeeq - Light Dhal (ذ) is thin. From 'the Reminder' (Quran). Tongue between teeth, soft 'th' as in 'this'. Compare to heavy ظ - night and day difference."
      },
      {
        arabic: "اللَّهُ - After fatha/damma",
        transliteration: "Allaah (heavy L)",
        highlight: "لل",
        explanation: "Special Tafkheem - Lam (ل) in 'Allah' is heavy when preceded by fatha or damma. From Name of Allah. Only time Lam gets heavy. Tongue raised, full resonance. Majestic pronunciation."
      },
      {
        arabic: "بِسْمِ اللَّهِ - After kasra",
        transliteration: "bismillaah (light L)",
        highlight: "لل",
        explanation: "Special Tarqeeq - Lam in 'Allah' becomes light after kasra. From Bismillah. Preceding kasra makes Lam thin and clear. Shows how preceding vowel affects pronunciation."
      }
    ]
  },
  {
    id: "ra-rules",
    title: "Rules of Ra (ر) - Tafkheem or Tarqeeq",
    description: "Ra (ر) is unique - can be heavy (Tafkheem) or light (Tarqeeq) based on: 1) Its own vowel: Fatha/Damma = heavy, Kasra = light. 2) Previous vowel if Ra has sukoon: after Fatha/Damma = heavy, after Kasra = light. 3) Exceptions exist with heavy letters nearby. Ra rules are complex but create beautiful variations in recitation. Master these for proper Quran reading.",
    examples: [
      {
        arabic: "رَبِّ - Surah Al-Fatihah 1:2",
        transliteration: "rabbi (heavy R)",
        highlight: "رَ",
        explanation: "Heavy Ra Rule 1 - Ra with Fatha (َ) is ALWAYS heavy. From 'Lord of all worlds.' Tongue rolls back, throat opens, creates thick 'r'. Most common Ra type in Quran. Fatha = automatic Tafkheem."
      },
      {
        arabic: "رُوح - Surah Al-Isra 17:85",
        transliteration: "rooh (heavy R)",
        highlight: "رُ",
        explanation: "Heavy Ra Rule 2 - Ra with Damma (ُ) is ALWAYS heavy. From 'the soul' verse. Thick rolling R with back of tongue raised. Damma makes Ra full-bodied and resonant."
      },
      {
        arabic: "رِزْق - Surah Al-Baqarah 2:22",
        transliteration: "rizq (light R)",
        highlight: "رِ",
        explanation: "Light Ra Rule 3 - Ra with Kasra (ِ) is ALWAYS light. From 'provision' in creation verse. Thin, forward R, tongue doesn't pull back. Kasra makes Ra delicate and clear."
      },
      {
        arabic: "قُرْآن - Surah Al-Baqarah 2:185",
        transliteration: "qur'aan (heavy R)",
        highlight: "ُرْ",
        explanation: "Heavy Ra with Sukoon Rule 4 - Ra sukoon preceded by Damma stays heavy. From 'Quran' - most important word! Previous damma carries heaviness through to Ra. Rolling, thick R sound."
      },
      {
        arabic: "مِرْيَة - Surah Hud 11:17",
        transliteration: "miryah (light R)",
        highlight: "ِرْ",
        explanation: "Light Ra with Sukoon Rule 5 - Ra sukoon after Kasra becomes light. From 'doubt' in verse. Previous kasra makes Ra light even with sukoon. Thin, crisp R with tongue forward."
      },
      {
        arabic: "فِرْعَوْن - Surah Al-Baqarah 2:49",
        transliteration: "fir'awn (light R)",
        highlight: "ِرْ",
        explanation: "Light Ra Exception Rule 6 - Ra sukoon after kasra before light letter stays light. From 'Pharaoh' - mentioned 74 times in Quran. The 'Ayn after is light letter, so Ra remains light despite sukoon."
      },
      {
        arabic: "يُشْرِكُونَ - Surah Yunus 10:18",
        transliteration: "yushrikoon (light R)",
        highlight: "رِ",
        explanation: "Light Ra - Ra with kasra is light. From 'they associate partners' in shirk verse. Clear demonstration: even surrounded by heavier letters, kasra on Ra makes it light."
      },
      {
        arabic: "الْقَرْيَة - Surah Al-Baqarah 2:259",
        transliteration: "al-qaryah (heavy R)",
        highlight: "َرْ",
        explanation: "Heavy Ra with Sukoon Rule 7 - Ra sukoon after Fatha is heavy. From 'the town' in resurrection story. Preceding fatha gives Ra heaviness even with sukoon. Thick rolling R."
      },
      {
        arabic: "خَيْر - Surah Al-Baqarah 2:103",
        transliteration: "khayr (heavy R)",
        highlight: "يْر",
        explanation: "Heavy Ra at Word End Rule 8 - Ra at end of word with preceding sukoon and fatha before that = heavy. From 'better' - common word. The madd before doesn't change that original fatha made Ra heavy."
      },
      {
        arabic: "النَّار - Surah Al-Baqarah 2:24",
        transliteration: "an-naar (heavy R)",
        highlight: "ار",
        explanation: "Heavy Ra - Final Ra with Alif-madd before it (which needs fatha before Alif) makes Ra heavy. From 'the Hellfire'. Long 'aa' from fatha keeps Ra thick and rolling at end."
      },
      {
        arabic: "نُذُر - Surah Al-Qamar 54:5",
        transliteration: "nudhur (heavy R)",
        highlight: "ُر",
        explanation: "Heavy Ra with Damma - From 'warnings' in Surah Al-Qamar. Damma on final Ra makes it heavy. Creates strong, resonant ending to word."
      },
      {
        arabic: "مَا صَبَرُوا - Waqf on 'صَبَرُوا'",
        transliteration: "maa sabaroo",
        highlight: "رُو",
        explanation: "Waqf Rule - When stopping on final Ra with preceding damma/fatha, Ra stays heavy. From 'they were not patient'. At pause, the heaviness remains even without continuing."
      }
    ]
  },
  {
    id: "ghunna",
    title: "Ghunna (Nasal Sound)",
    description: "Ghunna is a nasal sound produced from the nasal cavity (nose), lasting exactly 2 counts. Occurs in: 1) Noon or Meem with Shadda (most common). 2) Idgham with ghunna (نْ before يومن). 3) Ikhfa (concealment). 4) Iqlab (conversion). Ghunna is beautiful, melodious aspect of Tajweed. Must come from nose, not mouth. Hold for exact 2 harakaat.",
    examples: [
      {
        arabic: "إِنَّ - Surah Al-Baqarah 2:6",
        transliteration: "inna",
        highlight: "نَّ",
        explanation: "Ghunna with Shadda on Noon - From 'Indeed, those who disbelieve...' Most common ghunna type. Noon with shadda creates strong nasal resonance for 2 full counts. Sound vibrates in nasal cavity. Block nose - can't say it properly!"
      },
      {
        arabic: "ثُمَّ - Surah Al-Baqarah 2:28",
        transliteration: "thumma",
        highlight: "مَّ",
        explanation: "Ghunna with Shadda on Meem - From 'Then' connecting creation stages. Meem with shadda requires 2-count nasal hum. Lips close completely, sound comes purely from nose. Very common connecting word."
      },
      {
        arabic: "مِنْ وَلِيٍّ - Surah An-Nisa 4:45",
        transliteration: "min waliyy (with nasal)",
        highlight: "نْ و",
        explanation: "Ghunna with Idgham - Noon sakinah before Waw merges with ghunna. From 'any protector' verse. Noon disappears into Waw while nasal sound holds 2 counts. One of six YARMALOON letters."
      },
      {
        arabic: "مِنْ صَلْصَالٍ - Surah Ar-Rahman 55:14",
        transliteration: "min salsaalin (with nasal)",
        highlight: "نْ ص",
        explanation: "Ghunna with Ikhfa - Noon sakinah before Sad (ص) concealed with ghunna. From 'clay like pottery' in creation verse. Light nasal hum for 2 counts while transitioning to Sad. Demonstrates Ikhfa ghunna."
      },
      {
        arabic: "مِنْ بَعْدِ - Surah Al-Baqarah 2:27",
        transliteration: "mim ba'di",
        highlight: "نْ ب",
        explanation: "Ghunna with Iqlab - Noon converts to Meem sound before Ba, with ghunna 2 counts. From 'after' in covenant verse. Lips close like Meem, nasal resonance flows, then open for Ba."
      },
      {
        arabic: "الْجَنَّة - Surah Al-Baqarah 2:25",
        transliteration: "al-jannah",
        highlight: "نَّ",
        explanation: "Ghunna in 'Jannah' - From 'Paradise' promise to believers. Noon with shadda in middle of most beautiful word. Hold nasal 2 counts - creates melodious, prolonged 'nn' sound that beautifies recitation."
      },
      {
        arabic: "عَلِيمٌ حَكِيمٌ - Surah Al-Baqarah 2:32",
        transliteration: "aleemun hakeemun",
        highlight: "مٌ ح",
        explanation: "NO Ghunna - Tanween before throat letter Ha (ح) has NO ghunna. This demonstrates what ghunna is NOT. Pronounce tanween clearly without nasal extension. From 'Knowing and Wise' - Names of Allah. Idhar rule, not ghunna."
      },
      {
        arabic: "مَنْ يَعْمَلْ - Surah An-Nisa 4:123",
        transliteration: "may-ya'mal",
        highlight: "نْ ي",
        explanation: "Ghunna with Idgham - Noon before Ya merges with 2-count ghunna. From 'whoever does' in deeds verse. YARMALOON rule. Nasal sound resonates while noon merges into Ya."
      },
      {
        arabic: "رَبَّنَا - Surah Al-Baqarah 2:127",
        transliteration: "rabbanaa",
        highlight: "بَّ",
        explanation: "Note: Ba with Shadda - While Ba has shadda, there's NO ghunna because Ba is not Noon or Meem. From 'Our Lord' in Ibrahim's dua. Only Noon and Meem get ghunna with shadda, not other letters."
      },
      {
        arabic: "مِنْ مَالٍ - Surah Al-Baqarah 2:254",
        transliteration: "mim maalin",
        highlight: "نْ م",
        explanation: "Ghunna with Idgham - Noon before Meem merges with full 2-count ghunna. From Day of Judgment warning 'no wealth'. Both nasal letters create strong nasal resonance. Idgham with ghunna - beautiful transition."
      }
    ]
  },
  {
    id: "waqf-rules",
    title: "Waqf (Stopping/Pausing) Rules",
    description: "Waqf means stopping at end of words during recitation. Rules: 1) Drop tanween (ًٌٍ) when stopping. 2) Short vowels (fatha, kasra, damma) become silent. 3) Sukoon remains. 4) Some words change form. Symbols: ۝ (must stop - ayah end), ۘ (recommended stop), ج (permissible), لا (better not to stop), م (must continue), قلى (better to stop), صلى (better to connect). Understanding waqf is crucial for proper recitation.",
    examples: [
      {
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ - Surah Al-Fatihah 1:3",
        transliteration: "ar-rahmaanir-raheem",
        highlight: "نِ",
        explanation: "Waqf on Kasra - When stopping on 'Ar-Rahmaan', the final kasra becomes silent: say 'ar-Rahmaan' not 'ar-Rahmaani'. From Al-Fatihah. Kasra drops at pause. When continuing, connect with 'Ar-Raheem'."
      },
      {
        arabic: "مَالِكِ يَوْمِ الدِّينِ ۝ - Surah Al-Fatihah 1:4",
        transliteration: "maaliki yawmid-deen",
        highlight: "نِ ۝",
        explanation: "Waqf at Ayah End - The ۝ symbol marks verse end. Must pause here briefly. Drop final kasra: say 'deen' not 'deeni'. From Al-Fatihah 'Master of Day of Judgment'. Required pause in prayer."
      },
      {
        arabic: "نَسْتَعِينُ ۝ - Surah Al-Fatihah 1:5",
        transliteration: "nasta'een",
        highlight: "نُ",
        explanation: "Waqf on Damma - Final damma becomes silent when stopping. Say 'nasta'een' not 'nasta'eenu'. From 'We seek help' in Al-Fatihah. At verse end, all short vowels drop. Creates clean stop."
      },
      {
        arabic: "الْمُسْتَقِيمَ ۝ - Surah Al-Fatihah 1:6",
        transliteration: "al-mustaqeem",
        highlight: "مَ",
        explanation: "Waqf on Fatha - When stopping, final fatha disappears. From 'the straight path'. Say 'mustaqeem' without ending vowel. Ayah ending requires pause. In continuous reading, fatha connects to next word."
      },
      {
        arabic: "سَمِيعٌ بَصِيرٌ - Surah Al-Baqarah 2:181",
        transliteration: "samee'un baseer",
        highlight: "عٌ",
        explanation: "Waqf on Tanween - When pausing on 'samee'', drop the tanween completely. Don't say 'samee'un' at pause. From 'Hearing and Seeing' - Names of Allah. Tanween only pronounced when continuing to next word."
      },
      {
        arabic: "عَلِيمٌ حَكِيمٌ ۝ - Surah Al-Baqarah 2:32",
        transliteration: "aleemun hakeemun",
        highlight: "مٌ ۝",
        explanation: "Waqf on Final Word - At verse end, both tanween drop. Say 'aleem hakeem' not 'aleemun hakeemun'. From 'Knowing, Wise'. Most verses end with Allah's Names - always drop tanween at pause."
      },
      {
        arabic: "هُدًى لِلْمُتَّقِينَ ۝ - Surah Al-Baqarah 2:2",
        transliteration: "hudan lil-muttaqeen",
        highlight: "نَ",
        explanation: "Waqf Changes - When stopping on 'hudan', drop tanween: becomes 'huda'. From 'guidance for the righteous'. Continuous reading needs tanween for proper flow, but pause requires dropping it."
      },
      {
        arabic: "لَا رَيْبَ ۘ فِيهِ - Surah Al-Baqarah 2:2",
        transliteration: "laa rayba feehi",
        highlight: "بَ ۘ",
        explanation: "Small Meem (ۘ) Symbol - Recommended to pause here briefly. From 'no doubt in it' about Quran. Can connect but pause is better. Helps emphasize meaning: 'No doubt' then 'in it'. Tajweed symbol for better recitation."
      },
      {
        arabic: "صِرَاطَ الَّذِينَ - Surah Al-Fatihah 1:7",
        transliteration: "siraatal-ladheena",
        highlight: "طَ",
        explanation: "La (لا) Symbol - Better NOT to stop here. From Al-Fatihah: 'Path of those' must connect to 'You have favored'. Stopping breaks meaning. Continue without pause for proper understanding."
      },
      {
        arabic: "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ - Surah Al-Baqarah 2:30",
        transliteration: "wa idh qaala rabbuka lil-malaa'ikah",
        highlight: "كَةِ",
        explanation: "Normal Waqf - No special symbol, but can pause if needed. From 'And when your Lord said to angels'. Drop final kasra if stopping. Most words allow optional pausing unless specifically marked."
      }
    ]
  },
  {
    id: "lam-al-tarif",
    title: "Lam Al-Ta'rif Special Rules (AL in Allah's Name)",
    description: "Special focus on Lam (ل) in 'Allah' (اللَّه): 1) Heavy Lam (Tafkheem) - when preceded by Fatha or Damma: 'Allaah'. 2) Light Lam (Tarqeeq) - when preceded by Kasra: 'billaah'. This is called 'Lam of Majesty' (Lam al-Jalaalah). Most majestic Name gets most beautiful pronunciation rule. Affects entire tone of recitation.",
    examples: [
      {
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "bismillaahir-rahmaanir-raheem",
        highlight: "لل",
        explanation: "Light Lam in Allah - Preceded by kasra in 'bismi', the Lam in Allah becomes light/thin. From Bismillah - most recited phrase in Islam. Say 'billaah' with thin L. Kasra before makes it delicate, clear."
      },
      {
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ - Surah Al-Ikhlas 112:1",
        transliteration: "qul huwallaahu ahad",
        highlight: "لل",
        explanation: "Heavy Lam in Allah - Preceded by fatha in 'huwa', Lam becomes heavy/thick. From Surah Al-Ikhlas. Say 'Allaahu' with full, resonant L. Fatha makes Lam majestic and powerful. Most beautiful pronunciation of Allah's Name."
      },
      {
        arabic: "وَاللَّهُ عَلِيمٌ حَكِيمٌ - Surah An-Nisa 4:26",
        transliteration: "wallaahu aleemun hakeem",
        highlight: "لل",
        explanation: "Heavy Lam - After 'wa' with fatha, Lam is heavy. From 'And Allah is Knowing, Wise'. Say 'wallaahu' with thick L. Opening fatha creates majesty in pronunciation of Supreme Name."
      },
      {
        arabic: "قُلِ اللَّهُمَّ مَالِكَ - Surah Ali 'Imran 3:26",
        transliteration: "qulil-laahumma maalika",
        highlight: "لل",
        explanation: "Light Lam - After kasra in 'quli', Lam is light. From 'Say: O Allah, Owner of Sovereignty'. Preceding kasra makes Lam thin and delicate. Used in supplication."
      },
      {
        arabic: "إِلَّا اللَّهَ - Surah Muhammad 47:19",
        transliteration: "illallaaha",
        highlight: "لل",
        explanation: "Light Lam - After kasra in 'illa', Lam is light. From Tawheed statement 'except Allah'. Say 'illallaah' with thin L. Kasra creates humble, submissive tone when declaring Only Allah."
      },
      {
        arabic: "حَسْبُنَا اللَّهُ - Surah Ali 'Imran 3:173",
        transliteration: "hasbunal-laahu",
        highlight: "لل",
        explanation: "Heavy Lam - After fatha in 'hasbuna', Lam is heavy. From 'Allah is Sufficient for us' - powerful statement of trust. Heavy Lam shows strength and confidence in Allah. Fatha gives power."
      },
      {
        arabic: "مِنَ اللَّهِ - Common phrase",
        transliteration: "minallaahi",
        highlight: "لل",
        explanation: "Light Lam - After kasra in 'mina', Lam becomes light. From 'from Allah' - common phrase. Thin, delicate L shows reception from Allah. Kasra creates tone of receiving."
      },
      {
        arabic: "اللَّهُمَّ - In Du'a",
        transliteration: "Allaahumma",
        highlight: "لل",
        explanation: "Heavy Lam - Beginning of sentence, takes fatha by default, Lam is heavy. Means 'O Allah' in supplication. Majestic, full-throated call to Allah. No preceding kasra, so naturally heavy."
      },
      {
        arabic: "عَبْدُ اللَّهِ - Name 'Abdullah'",
        transliteration: "abdullah",
        highlight: "لل",
        explanation: "Heavy Lam - After damma in 'abdu', Lam is heavy. 'Servant of Allah' - most common Islamic name. Say with thick, resonant L. Damma makes Lam full and proud."
      },
      {
        arabic: "فِي اللَّهِ - Common phrase",
        transliteration: "fillaahi",
        highlight: "لل",
        explanation: "Light Lam - After kasra in 'fi', Lam is light. From 'in Allah' or 'for sake of Allah'. Thin L creates intimate tone. Used in phrases about doing things for Allah's sake."
      }
    ]
  },
  {
    id: "mad-lazim",
    title: "Madd Laazim (Necessary/Obligatory Elongation)",
    description: "The longest type of Madd - must hold for 6 counts (3x longer than natural madd). Occurs when: 1) Madd letter followed by letter with shadda (doubled). 2) Madd letter followed by sukoon in same word. Called 'Laazim' (necessary) because 6 counts is obligatory, not optional. Creates powerful, resonant recitation. Types: Kalimi (in words), Harfi (in individual letters at surah starts).",
    examples: [
      {
        arabic: "الْحَاقَّةُ - Surah Al-Haqqah 69:1",
        transliteration: "al-haaaaaqqah",
        highlight: "اقّ",
        explanation: "Madd Laazim Kalimi Muthaqqal - Alif followed by Qaf with shadda. From Surah Al-Haqqah 'The Inevitable Hour'. Hold 'aa' for FULL 6 counts before doubled Qaf. Creates dramatic, powerful effect. Surah name demonstrates this rule!"
      },
      {
        arabic: "الصَّاخَّةُ - Surah As-Sakhkhah 80:33",
        transliteration: "as-saaaaaakhkhah",
        highlight: "اخّ",
        explanation: "Madd Laazim - Alif before Kha with shadda. From 'The Deafening Blast' of Day of Judgment. Elongate for 6 full counts. The length mirrors the intensity of the meaning. Longest hold in Tajweed."
      },
      {
        arabic: "وَالضَّالِّينَ - Surah Al-Fatihah 1:7",
        transliteration: "wadh-dhaaaaaaalleen",
        highlight: "الّ",
        explanation: "Madd Laazim - Final word of Al-Fatihah. Alif followed by Lam with shadda = 6 counts. From 'nor of those who have gone astray'. Most recited Madd Laazim in Islam - said 17 times daily minimum in salah!"
      },
      {
        arabic: "دَابَّةٍ - Surah Al-Baqarah 2:164",
        transliteration: "daaaaaabbah",
        highlight: "ابّ",
        explanation: "Madd Laazim Kalimi - Alif before Ba with shadda. From 'creature' in signs of Allah. Hold madd 6 counts before doubled Ba. Shows rule applies in middle of verses too, not just famous words."
      },
      {
        arabic: "آلْآنَ - Surah Yunus 10:51",
        transliteration: "aa'aaaaaaal'aana",
        highlight: "آ",
        explanation: "Madd Laazim with Hamza - From 'Now?' in disbelievers' question. The آ at start has inherent 6-count madd. Also Madd Munfasil after. Complex combination showing multiple madd rules together."
      },
      {
        arabic: "ولا الضَّالِّينَ - Al-Fatihah waqf",
        transliteration: "wa ladh-dhaaaalleen",
        highlight: "الّ",
        explanation: "Madd Laazim at Pause - When stopping on last word of Fatihah, still hold 6 full counts. The rule doesn't change at waqf. Creates beautiful, sustained ending to most important surah."
      },
      {
        arabic: "طسم - Surah Ash-Shu'ara 26:1 letters",
        transliteration: "taa seen meem",
        highlight: "Disconnected letters",
        explanation: "Madd Laazim Harfi - At surah opening, disconnected letters. 'Seen' (ﺱ spelled سين) has Madd Laazim of 6 counts. From mysterious letters at surah starts. Special elongation for proper pronunciation of letter names."
      },
      {
        arabic: "الطَّامَّةُ - Surah An-Nazi'at 79:34",
        transliteration: "at-taaaaaammah",
        highlight: "امّ",
        explanation: "Madd Laazim - From 'The Overwhelming Calamity' on Day of Judgment. Alif before Meem with shadda = 6 counts. The dramatic length emphasizes the severity of the event described."
      },
      {
        arabic: "الْقَارِعَةُ - Surah Al-Qari'ah 101:1",
        transliteration: "al-qaari'ah",
        highlight: "ار",
        explanation: "NOT Madd Laazim - This is only Madd Tabee'i (2 counts). From 'The Striking Hour'. Even though powerful surah, Alif before Ra without shadda = just natural madd. Shows importance of shadda for Madd Laazim."
      }
    ]
  },
  {
    id: "advanced-idgham",
    title: "Advanced Idgham Types - Complete & Incomplete",
    description: "Deeper understanding of Idgham (merging): Two types - 1) Idgham Kamil (Complete Merging): Noon sakinah/tanween completely disappears into ر ل (Ra and Lam) with NO ghunna. Tongue moves directly to second letter. 2) Idgham Naqis (Incomplete Merging): Noon merges with ي و م ن (Ya, Waw, Meem, Noon) WITH ghunna for 2 counts - the nasal quality remains. Understanding this distinction perfects recitation.",
    examples: [
      {
        arabic: "مِنْ رَبِّكُمْ - Surah Al-Baqarah 2:21",
        transliteration: "mir-rabbikum",
        highlight: "نْ ر",
        explanation: "Idgham Kamil (Complete Merging) - Noon sakinah completely absorbed into Ra with ZERO ghunna. From 'from your Lord' in worship command. Tongue doesn't touch roof for 'n' - goes straight to rolling 'r'. No trace of noon, no nasal sound. Pure Ra."
      },
      {
        arabic: "مِنْ لَدُنْهُ - Surah Al-Kahf 18:2",
        transliteration: "mil-ladunhu",
        highlight: "نْ ل",
        explanation: "Idgham Kamil - Complete merging with Lam, absolutely NO ghunna. From 'from His presence'. Noon vanishes entirely into Lam. Tongue position shifts directly from noon position to 'l' without stopping. Clean, complete merge."
      },
      {
        arabic: "مِنْ نِعْمَةٍ - Surah An-Nahl 16:53",
        transliteration: "min-ni'matin",
        highlight: "نْ ن",
        explanation: "Idgham Naqis (Incomplete) - First Noon merges with second WITH ghunna for 2 counts. From 'any favor' in blessings verse. Called Mutamathlain (two identicals). Nasal quality remains - creates prolonged 'nn' sound from nose. Most intense ghunna."
      },
      {
        arabic: "مَنْ يَعْمَلْ - Surah An-Nisa 4:123",
        transliteration: "may-ya'mal",
        highlight: "نْ ي",
        explanation: "Idgham Naqis - Noon merges with Ya while retaining ghunna nasal quality. From 'whoever does' in deeds verse. Not complete disappearance - nasal resonance continues for 2 counts during 'y' sound. Creates melodious transition."
      },
      {
        arabic: "مَنْ وَلِيًّا - Surah Al-Kahf 18:17",
        transliteration: "maw-waliyyan",
        highlight: "نْ و",
        explanation: "Idgham Naqis - Noon merges with Waw with ghunna. From 'any protector' in guidance verse. The noon sound partially remains as nasal hum for 2 counts while lips round for 'w'. Beautiful blending with nasal."
      },
      {
        arabic: "مِنْ مَاءٍ - Surah Al-Anbiya 21:30",
        transliteration: "mim-ma'in",
        highlight: "نْ م",
        explanation: "Idgham Naqis - Noon merges with Meem WITH ghunna. From 'from water' in creation verse. Both nasal letters create strong resonance. Noon transforms into Meem sound, nasal quality held 2 counts. Lips close completely."
      },
      {
        arabic: "حَمْدًا مُّبَارَكًا - Surah Maryam 19:11",
        transliteration: "hamdam-mubaarakan",
        highlight: "دًا م",
        explanation: "Idgham of Tanween - Tanween Fath merges with Meem with ghunna. From 'praise, blessed'. Not noon sakinah but tanween - same Idgham Naqis rule applies. Nasal 'n' of tanween becomes 'm' sound with 2-count ghunna."
      },
      {
        arabic: "غَفُورٌ رَحِيمٌ - Surah Al-Baqarah 2:173",
        transliteration: "ghafoorur-raheem",
        highlight: "رٌ ر",
        explanation: "Idgham Kamil with Tanween - Tanween merges completely with Ra, NO ghunna. From 'Forgiving, Merciful' - Names of Allah. First Ra (from tanween 'un') completely disappears into second Ra. Clean merge, no nasal."
      },
      {
        arabic: "عَذَابٌ أَلِيمٌ ۝ وَلَا - Between verses",
        transliteration: "adhaabun aleemun wa laa",
        highlight: "مٌ و",
        explanation: "No Idgham across verse boundaries - When waqf (stop) occurs, no Idgham even if next word starts with Idgham letter. From 'painful punishment. And not...' Must pause at verse end, so 'aleemun' said fully."
      },
      {
        arabic: "صَافَّاتٍ يَسْبَحْنَ - Surah An-Nur 24:41",
        transliteration: "saaffaatin yasbahna",
        highlight: "تٍ ي",
        explanation: "Idgham Naqis with Tanween - Tanween Kasr merges with Ya with ghunna. From 'lined up, glorifying' about birds. The 'in' sound transforms to nasal 'y' with 2-count ghunna. Demonstrates tanween follows same Idgham rules as noon sakinah."
      }
    ]
  }
];
