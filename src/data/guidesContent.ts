export interface GuideStep {
  title: string;
  description: string;
  arabicText?: string;
  transliteration?: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconImage?: string;
  category: string;
  steps: GuideStep[];
  tips?: string[];
  resources?: string[];
}

export const guides: Guide[] = [
  {
    id: "wudhu",
    title: "How to Perform Wudhu (Ablution)",
    description: "Ritual purification required before prayer",
    icon: "Droplets",
    category: "Worship",
    steps: [
      {
        title: "Make Intention (Niyyah)",
        description: "Begin with the intention in your heart to perform wudhu for purification and to seek Allah's pleasure."
      },
      {
        title: "Say Bismillah",
        description: "Say 'Bismillah' (In the name of Allah) before beginning.",
        arabicText: "بِسْمِ اللَّهِ",
        transliteration: "Bismillah"
      },
      {
        title: "Wash Your Hands",
        description: "Wash both hands up to the wrists three times, making sure water reaches between your fingers and under rings."
      },
      {
        title: "Rinse Your Mouth",
        description: "Take water in your right hand, rinse your mouth thoroughly three times, swishing the water around."
      },
      {
        title: "Clean Your Nose",
        description: "Sniff water into your nostrils three times and blow it out using your left hand to clean the nose."
      },
      {
        title: "Wash Your Face",
        description: "Wash your entire face from forehead to chin and from ear to ear three times. Make sure water reaches all parts."
      },
      {
        title: "Wash Your Arms",
        description: "Wash your right arm from fingertips to elbow three times, then repeat with the left arm. Ensure the entire arm is washed."
      },
      {
        title: "Wipe Your Head",
        description: "Wet your hands and wipe over your head once, from front to back and back to front."
      },
      {
        title: "Wipe Your Ears",
        description: "Use your index fingers to wipe inside your ears and your thumbs to wipe behind your ears."
      },
      {
        title: "Wash Your Feet",
        description: "Wash your right foot up to the ankle three times, making sure water reaches between the toes, then repeat with the left foot."
      },
      {
        title: "Recite the Dua",
        description: "After completing wudhu, recite the dua:",
        arabicText: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        transliteration: "Ash-hadu an la ilaha illallah wahdahu la sharika lah, wa ash-hadu anna Muhammadan 'abduhu wa rasuluh"
      }
    ],
    tips: [
      "Use moderate amounts of water - don't waste",
      "Make sure no part is left dry",
      "Remove nail polish as it prevents water from reaching nails",
      "Wudhu breaks if you use the bathroom, pass gas, sleep, or bleed",
      "You can perform multiple prayers with one wudhu if it hasn't broken"
    ]
  },
  {
    id: "salah",
    title: "How to Perform Salah (Prayer)",
    description: "Step-by-step guide to the five daily prayers",
    icon: "HandPrayer",
    iconImage: "/guides/salah-icon.png",
    category: "Worship",
    steps: [
      {
        title: "Ensure You're in a State of Purity",
        description: "Make sure you have performed wudhu and your clothes and prayer space are clean. Face the Qiblah (direction of Kaaba in Mecca)."
      },
      {
        title: "Make Intention (Niyyah)",
        description: "In your heart, make the intention to pray the specific prayer (e.g., 'I intend to pray Fajr for the sake of Allah')."
      },
      {
        title: "Raise Hands and Say Takbir",
        description: "Raise your hands to ear level with palms facing forward and say 'Allahu Akbar' (Allah is the Greatest). Then place your right hand over your left on your chest.",
        arabicText: "اللَّهُ أَكْبَرُ",
        transliteration: "Allahu Akbar"
      },
      {
        title: "Recite Opening Supplication",
        description: "Recite the opening dua (optional but recommended):",
        arabicText: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ",
        transliteration: "Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta'ala jadduka, wa la ilaha ghayruk"
      },
      {
        title: "Seek Refuge and Recite Bismillah",
        description: "Say 'A'udhu billahi min ash-shaytan ir-rajeem, Bismillah ir-Rahman ir-Raheem'"
      },
      {
        title: "Recite Surah Al-Fatihah",
        description: "Recite the opening chapter of the Quran. This is obligatory in every unit of prayer.",
        arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ...",
        transliteration: "Bismillah ir-Rahman ir-Raheem..."
      },
      {
        title: "Recite Additional Verses",
        description: "After Al-Fatihah, recite another Surah or verses from the Quran (in the first two units only)."
      },
      {
        title: "Perform Ruku (Bowing)",
        description: "Say 'Allahu Akbar' and bow, placing your hands on your knees. Keep your back straight and head in line with your back. Say 'Subhana Rabbiyal Adheem' three times.",
        arabicText: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
        transliteration: "Subhana Rabbiyal Adheem"
      },
      {
        title: "Rise from Ruku",
        description: "Stand up straight saying 'Sami Allahu liman hamidah' (Allah hears those who praise Him), then 'Rabbana wa lakal hamd' (Our Lord, to You is all praise).",
        arabicText: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ",
        transliteration: "Sami Allahu liman hamidah, Rabbana wa lakal hamd"
      },
      {
        title: "First Sujud (Prostration)",
        description: "Say 'Allahu Akbar' and prostrate with your forehead, nose, both hands, both knees, and toes touching the ground. Say 'Subhana Rabbiyal A'la' three times.",
        arabicText: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        transliteration: "Subhana Rabbiyal A'la"
      },
      {
        title: "Sit Between Prostrations",
        description: "Say 'Allahu Akbar' and sit up briefly. Say 'Rabbi ghfir li' (My Lord, forgive me). Stay seated for a moment in a calm manner.",
        arabicText: "رَبِّ اغْفِرْ لِي",
        transliteration: "Rabbi ghfir li"
      },
      {
        title: "Second Sujud",
        description: "Say 'Allahu Akbar' and prostrate again, repeating 'Subhana Rabbiyal A'la' three times. This completes one unit (Rakah)."
      },
      {
        title: "Continue for Additional Units",
        description: "Stand up saying 'Allahu Akbar' to begin the next unit. Repeat steps 7-13 for each unit of the prayer."
      },
      {
        title: "Tashahhud (Sitting)",
        description: "After every two units, sit and recite the Tashahhud:",
        arabicText: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ...",
        transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibat..."
      },
      {
        title: "Final Tashahhud and Salawat",
        description: "In the final sitting, recite the complete Tashahhud and send blessings on the Prophet (Salawat)."
      },
      {
        title: "Give Salam (End Prayer)",
        description: "Turn your head to the right and say 'Assalamu alaikum wa rahmatullah', then to the left and repeat. Your prayer is complete.",
        arabicText: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
        transliteration: "Assalamu alaikum wa rahmatullah"
      }
    ],
    tips: [
      "Fajr: 2 units before sunrise",
      "Dhuhr: 4 units after sun passes zenith",
      "Asr: 4 units in late afternoon",
      "Maghrib: 3 units after sunset",
      "Isha: 4 units at night",
      "Focus on your prayer and avoid distractions",
      "Take your time - don't rush",
      "Learn the meanings of what you recite"
    ]
  },
  {
    id: "quran-basics",
    title: "How to Start Reading the Quran",
    description: "A beginner's guide to reading Allah's words",
    icon: "BookOpen",
    category: "Knowledge",
    steps: [
      {
        title: "Learn Arabic Alphabet",
        description: "Start by learning the 28 letters of the Arabic alphabet. Each letter has different forms depending on its position in a word."
      },
      {
        title: "Learn Harakat (Vowel Marks)",
        description: "Master the three basic vowels: Fatha (a), Kasra (i), and Damma (u). These marks tell you how to pronounce each letter."
      },
      {
        title: "Practice Joining Letters",
        description: "Learn how letters connect to form words. Practice writing and reading simple words."
      },
      {
        title: "Learn Tajweed Basics",
        description: "Tajweed is the art of proper Quranic recitation. Start with basic rules like elongation (madd) and pause signs."
      },
      {
        title: "Start with Short Surahs",
        description: "Begin with Juz Amma (the 30th part of Quran). These shorter chapters are easier for beginners."
      },
      {
        title: "Use a Mushaf (Quran Copy)",
        description: "Get a physical Quran with clear text. Color-coded tajweed editions are helpful for beginners."
      },
      {
        title: "Listen to Recitations",
        description: "Listen to expert reciters (Qaris) and follow along in your Mushaf. This helps with pronunciation and rhythm."
      },
      {
        title: "Find a Teacher or Join a Class",
        description: "Learning with a qualified teacher ensures proper pronunciation and understanding. Many mosques offer free Quran classes."
      },
      {
        title: "Practice Daily",
        description: "Consistency is key. Even 10-15 minutes of daily practice will show significant improvement over time."
      },
      {
        title: "Read with Understanding",
        description: "While learning Arabic, also read translations to understand the meanings. This deepens your connection with the Quran."
      }
    ],
    tips: [
      "Be patient - learning takes time",
      "Make dua for Allah to make it easy",
      "Use apps and online resources",
      "Join online Quran study groups",
      "Recite what you've memorized in your prayers",
      "The Prophet ﷺ said: 'The one who recites the Quran and is skilled in it will be with the noble, righteous scribes'"
    ]
  },
  {
    id: "daily-dhikr",
    title: "Daily Dhikr & Remembrance",
    description: "Essential daily supplications for every Muslim",
    icon: "Sparkles",
    iconImage: "/guides/dhikr-icon.png",
    category: "Worship",
    steps: [
      {
        title: "Morning Adhkar (After Fajr)",
        description: "Recite Ayat al-Kursi, last two verses of Surah Al-Baqarah, and Surahs Al-Ikhlas, Al-Falaq, and An-Nas three times each."
      },
      {
        title: "Before Leaving Home",
        description: "Recite the dua for leaving home:",
        arabicText: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah"
      },
      {
        title: "Upon Entering Home",
        description: "Say 'Bismillah' and greet with 'Assalamu Alaikum' even if alone. This brings blessings to your home."
      },
      {
        title: "Before Eating",
        description: "Say 'Bismillah wa 'ala barakatillah' (In the name of Allah and with the blessings of Allah).",
        arabicText: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
        transliteration: "Bismillah wa 'ala barakatillah"
      },
      {
        title: "After Eating",
        description: "Say 'Alhamdulillah' (All praise is for Allah) to thank Allah for the sustenance.",
        arabicText: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
        transliteration: "Alhamdulillahil-ladhi at'amana wa saqana wa ja'alana muslimeen"
      },
      {
        title: "Before Sleeping",
        description: "Recite Ayat al-Kursi, the last two verses of Surah Al-Baqarah, and Surahs Al-Ikhlas, Al-Falaq, and An-Nas."
      },
      {
        title: "Evening Adhkar (After Asr)",
        description: "Repeat morning adhkar. Add 100 times 'Subhanallah' (Glory be to Allah), 'Alhamdulillah' (All praise to Allah), and 'Allahu Akbar' (Allah is Greatest)."
      },
      {
        title: "Istighfar Throughout the Day",
        description: "Seek forgiveness frequently:",
        arabicText: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
        transliteration: "Astaghfirullah wa atubu ilayh"
      },
      {
        title: "Send Salawat on the Prophet",
        description: "Say blessings on Prophet Muhammad ﷺ frequently, especially on Fridays:",
        arabicText: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
        transliteration: "Allahumma salli 'ala Muhammad wa 'ala ali Muhammad"
      },
      {
        title: "Tasbih After Each Prayer",
        description: "After each obligatory prayer, say 'Subhanallah' 33 times, 'Alhamdulillah' 33 times, and 'Allahu Akbar' 34 times."
      }
    ],
    tips: [
      "Start with the most important ones",
      "Use a dhikr counter or app to track",
      "Learn the meanings in your language",
      "Make it a habit - consistency over quantity",
      "The Prophet ﷺ said: 'Two words are light on the tongue, heavy on the Scale, beloved to the Most Merciful: Subhanallahi wa bihamdihi, Subhanallahil-Adheem'"
    ]
  },
  {
    id: "halal-haram",
    title: "Halal & Haram Basics",
    description: "Understanding what is permissible and prohibited in Islam",
    icon: "ShieldCheck",
    category: "Knowledge",
    steps: [
      {
        title: "Food & Drink - Prohibited",
        description: "Pork and its by-products, alcohol and intoxicants, blood, animals not slaughtered in Allah's name, carnivorous animals with fangs, birds with talons."
      },
      {
        title: "Food & Drink - Permissible",
        description: "All vegetables and fruits, grains and legumes, seafood (according to most scholars), properly slaughtered halal meat (beef, chicken, lamb, etc.)."
      },
      {
        title: "Business & Money - Prohibited",
        description: "Interest (Riba) in any form, gambling, deception or fraud in trade, selling alcohol or pork, dealing with stolen goods, monopolizing essential goods."
      },
      {
        title: "Business & Money - Permissible",
        description: "Honest trade and commerce, fair employment, charity and voluntary giving, investing in halal businesses, entrepreneurship within Islamic guidelines."
      },
      {
        title: "Relationships - Prohibited",
        description: "Pre-marital and extra-marital relations, physical intimacy outside marriage, dating in Western sense, being alone with non-mahram opposite gender."
      },
      {
        title: "Relationships - Permissible",
        description: "Marriage according to Islamic law, proper courtship with family involvement, maintaining family ties, good treatment of spouse, children, and parents."
      },
      {
        title: "Behavior - Prohibited",
        description: "Lying, backbiting and gossip, arrogance and pride, anger and hatred, cursing and foul language, breaking promises, disrespecting parents."
      },
      {
        title: "Behavior - Encouraged",
        description: "Truthfulness, kindness and compassion, humility, patience, gratitude, fulfilling promises, honoring parents, helping those in need."
      },
      {
        title: "Entertainment - Guidelines",
        description: "Avoid: Content with nudity/sexuality, promotion of shirk or immorality, excessive music. Permissible: Educational content, halal sports, family activities, nature outings."
      },
      {
        title: "Doubtful Matters",
        description: "When unsure if something is halal or haram, the Prophet ﷺ advised: 'Leave what makes you doubt for what does not make you doubt.' Consult knowledgeable scholars."
      }
    ],
    tips: [
      "When in doubt, avoid it until clarified",
      "Good character is part of halal living",
      "Allah has made the halal abundant",
      "Intention matters - always check your motives",
      "Halal earnings lead to accepted duas",
      "The Prophet ﷺ said: 'The halal is clear and the haram is clear, and between them are doubtful matters'"
    ]
  },
  {
    id: "islamic-months",
    title: "Islamic Calendar & Important Dates",
    description: "Understanding the Hijri calendar and significant events",
    icon: "Calendar",
    category: "Knowledge",
    steps: [
      {
        title: "Muharram (1st Month)",
        description: "The sacred month marking the Islamic New Year. The 10th day is Ashura, a day of fasting recommended by the Prophet ﷺ. It commemorates the day Allah saved Moses from Pharaoh."
      },
      {
        title: "Safar (2nd Month)",
        description: "The Prophet ﷺ said there is no bad omen in Islam. This month has no specific acts of worship but continue regular good deeds."
      },
      {
        title: "Rabi' al-Awwal (3rd Month)",
        description: "The month in which Prophet Muhammad ﷺ was born (12th day). Many Muslims celebrate Mawlid, though opinions vary on this practice."
      },
      {
        title: "Rabi' al-Thani (4th Month)",
        description: "Continue with regular worship and good deeds. No specific events but maintain consistency in your practice."
      },
      {
        title: "Jumada al-Awwal & Jumada al-Thani (5th-6th Months)",
        description: "Focus on strengthening your relationship with Allah through regular prayer, Quran recitation, and good character."
      },
      {
        title: "Rajab (7th Month)",
        description: "One of the four sacred months. The night of Isra and Mi'raj (27th) commemorates the Prophet's night journey and ascension to heaven. Increase worship and good deeds."
      },
      {
        title: "Sha'ban (8th Month)",
        description: "The month before Ramadan. Use it to prepare for Ramadan. The 15th night (Laylat al-Bara'ah) is considered blessed by some scholars. Increase voluntary fasting."
      },
      {
        title: "Ramadan (9th Month)",
        description: "The holiest month of fasting from dawn to sunset. Includes Laylat al-Qadr (Night of Power) in the last 10 nights. Intensify worship, Quran reading, and charity."
      },
      {
        title: "Shawwal (10th Month)",
        description: "Begins with Eid al-Fitr (1st-3rd days) celebrating the completion of Ramadan. Fasting six days in Shawwal after Eid is highly recommended."
      },
      {
        title: "Dhul-Qi'dah (11th Month)",
        description: "One of the four sacred months. Preparation time for those going for Hajj pilgrimage begins."
      },
      {
        title: "Dhul-Hijjah (12th Month)",
        description: "Most sacred month. Hajj pilgrimage occurs (8th-13th). Eid al-Adha on 10th commemorates Prophet Ibrahim's willingness to sacrifice his son. The first 10 days are among the most blessed of the year - fast on the 9th (Day of Arafah)."
      }
    ],
    tips: [
      "The Islamic calendar is lunar (354-355 days)",
      "Each month begins with the sighting of the new moon",
      "Four sacred months: Muharram, Rajab, Dhul-Qi'dah, Dhul-Hijjah",
      "Friday (Jumu'ah) is the blessed day of the week",
      "The best day of the week is Friday",
      "The best month is Ramadan",
      "The best ten days are the first ten of Dhul-Hijjah"
    ]
  },
  {
    id: "new-muslim-checklist",
    title: "New Muslim Essential Checklist",
    description: "Important steps for those who just embraced Islam",
    icon: "ListChecks",
    category: "Fundamentals",
    steps: [
      {
        title: "Learn and Perfect Your Shahada",
        description: "Understand the meaning of 'La ilaha illallah, Muhammadur Rasulullah' (There is no god but Allah, and Muhammad is His messenger). This is your declaration of faith.",
        arabicText: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ مُحَمَّدٌ رَسُولُ ٱللَّٰهِ",
        transliteration: "La ilaha illallah, Muhammadur Rasulullah"
      },
      {
        title: "Learn How to Perform Wudhu",
        description: "Master the ablution that purifies you before prayer. See our detailed Wudhu guide."
      },
      {
        title: "Learn the Five Daily Prayers",
        description: "Start with learning how to pray correctly. Begin with one or two prayers and gradually add more. Focus on quality over quantity initially."
      },
      {
        title: "Memorize Surah Al-Fatihah",
        description: "This is the opening chapter of the Quran and must be recited in every unit of prayer. Learn its pronunciation and meaning."
      },
      {
        title: "Learn Short Surahs",
        description: "Memorize Surahs Al-Ikhlas, Al-Falaq, and An-Nas (the last three chapters). These are short and frequently used in prayer."
      },
      {
        title: "Understand the Six Pillars of Faith (Iman)",
        description: "Belief in: (1) Allah, (2) His Angels, (3) His Books, (4) His Messengers, (5) The Last Day, (6) Divine Decree (Qadr)."
      },
      {
        title: "Know the Five Pillars of Islam",
        description: "(1) Shahada, (2) Prayer, (3) Zakat, (4) Fasting in Ramadan, (5) Hajj (if able). See our detailed guide."
      },
      {
        title: "Find a Supportive Community",
        description: "Visit your local mosque, join Islamic study circles, connect with other Muslims. Don't try to learn everything alone."
      },
      {
        title: "Start Reading Quran with Translation",
        description: "Even if you can't read Arabic yet, read translations to understand Allah's message. Start with shorter chapters or stories of prophets."
      },
      {
        title: "Learn Basic Halal/Haram",
        description: "Understand what foods are permissible, basic Islamic ethics, and prohibited actions. See our Halal & Haram guide."
      },
      {
        title: "Adopt Islamic Lifestyle Gradually",
        description: "Change doesn't happen overnight. Work on improving one aspect at a time: prayer, then modest dress, then halal food, etc."
      },
      {
        title: "Make Dua Regularly",
        description: "Talk to Allah in your own language. Ask Him for guidance, help with your struggles, and thank Him for blessings."
      }
    ],
    tips: [
      "Be patient with yourself - learning takes time",
      "Don't be overwhelmed - start small and build gradually",
      "Past sins are forgiven upon accepting Islam",
      "It's okay to make mistakes - keep trying",
      "Focus on obligatory acts before voluntary ones",
      "The Prophet ﷺ said: 'The dearest deeds to Allah are those done regularly, even if they are small'",
      "Keep good company - surround yourself with practicing Muslims",
      "Don't be shy to ask questions - seeking knowledge is encouraged"
    ]
  }
];
