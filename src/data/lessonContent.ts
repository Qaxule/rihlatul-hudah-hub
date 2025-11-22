export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      points?: string[];
    }[];
    conclusion: string;
    keyTakeaways: string[];
  };
  quiz: QuizQuestion[];
}

export const lessons: LessonContent[] = [
  {
    id: "five-pillars",
    title: "The Five Pillars of Islam",
    description: "Foundation of Islamic practice with authentic sources",
    duration: "25 min",
    category: "Fundamentals",
    content: {
      introduction: "The Five Pillars of Islam are the core practices that define a Muslim's life and worship. These pillars are firmly established in the Quran and Sunnah, forming the foundation upon which the entire religion stands. The Prophet ﷺ said: 'Islam is built upon five pillars...' [Sahih al-Bukhari 8, Sahih Muslim 16]",
      sections: [
        {
          title: "1. Shahada (Declaration of Faith)",
          content: "The testimony that 'There is no god but Allah, and Muhammad is His messenger' (Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasul Allah). This declaration is the gateway to Islam and the foundation of all other pillars.\n\n📖 Quranic Foundation:\n'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence...' (Surah Al-Baqarah 2:255 - Ayat al-Kursi)\n\n'Muhammad is not the father of any of your men, but he is the Messenger of Allah and the last of the prophets.' (Surah Al-Ahzab 33:40)\n\n💡 Deeper Understanding:\nThe Shahada embodies two key concepts:\n1. La ilaha illa Allah (No god but Allah) - Affirms Tawhid, the absolute oneness of Allah\n2. Muhammadan rasul Allah (Muhammad is His messenger) - Affirms prophethood and our duty to follow the Sunnah",
          points: [
            "Must be pronounced with full understanding and conviction",
            "Requires belief in the heart, not just verbal statement",
            "Negates all false deities and affirms Allah's uniqueness",
            "Obligates following Prophet Muhammad's ﷺ teachings",
            "Said during conversion, and recommended to repeat regularly",
            "The last words a Muslim hopes to say before death"
          ]
        },
        {
          title: "2. Salah (Prayer)",
          content: "Performing the five daily prayers (Salah) is the most important pillar after Shahada. It is the direct link between the believer and Allah, performed five times daily at specific times.\n\n📖 Quranic Foundation:\n'Indeed, I am Allah. There is no deity except Me, so worship Me and establish prayer for My remembrance.' (Surah Ta-Ha 20:14)\n\n'Guard strictly your prayers, especially the Middle Prayer, and stand before Allah devoutly.' (Surah Al-Baqarah 2:238)\n\n📚 Hadith Evidence:\n'The first matter that the slave will be brought to account for on the Day of Judgment is the prayer. If it is sound, then the rest of his deeds will be sound. And if it is bad, then the rest of his deeds will be bad.' [Sunan al-Tirmidhi 413]\n\n⏰ The Five Daily Prayers:\n1. Fajr - Dawn prayer (2 Rakah) - Before sunrise\n2. Dhuhr - Noon prayer (4 Rakah) - After sun passes meridian  \n3. Asr - Afternoon prayer (4 Rakah) - Mid-afternoon\n4. Maghrib - Sunset prayer (3 Rakah) - Right after sunset\n5. Isha - Night prayer (4 Rakah) - After twilight disappears",
          points: [
            "Salah purifies the soul and keeps one away from evil: 'Indeed, prayer prohibits immorality and wrongdoing' (Surah Al-Ankabut 29:45)",
            "Requires ritual purity (Wudu - ablution)",
            "Must face the Qibla (direction of Kaaba in Mecca)",
            "Includes standing, bowing, prostrating, and sitting",
            "Can be shortened during travel",
            "Women menstruating or in postpartum bleeding are exempt",
            "Salah is better than sleep - as said in Fajr Adhan"
          ]
        },
        {
          title: "3. Zakat (Obligatory Charity)",
          content: "Zakat is the obligatory charity given annually on wealth that has reached the Nisab (minimum threshold) and been held for one lunar year. It purifies wealth and helps those in need, redistributing resources to create social justice.\n\n📖 Quranic Foundation:\n'And establish prayer and give Zakat, and whatever good you put forward for yourselves - you will find it with Allah.' (Surah Al-Baqarah 2:110)\n\n'Take from their wealth a charity by which you purify them and cause them increase, and invoke Allah's blessings upon them.' (Surah At-Tawbah 9:103)\n\n📊 Zakat Calculation:\n• Standard Rate: 2.5% of eligible wealth annually\n• Nisab: Equivalent to 85 grams of gold or 595 grams of silver\n• Due on: Cash, gold, silver, business inventory, stocks, rental income, agricultural produce (different rates)\n\n👥 Who Receives Zakat:\nAllah specified eight categories in Surah At-Tawbah (9:60):\n1. The poor (Al-Fuqara)\n2. The needy (Al-Masakin)  \n3. Zakat administrators\n4. Those whose hearts are to be reconciled\n5. Freeing captives\n6. Those in debt\n7. In the cause of Allah\n8. Travelers in need",
          points: [
            "Different from voluntary charity (Sadaqah) - Zakat is obligatory",
            "Purifies wealth and soul: 'their wealth will be a form of punishment for them' if not given (Surah At-Tawbah 9:34-35)",
            "Creates circulation of wealth in society",
            "Cannot give to: parents, children, spouse (must support them regardless)",
            "Can give to: extended family members in need, other eligible recipients",
            "Not just financial obligation - spiritual purification",
            "Withheld Zakat is a major sin warned about in Quran and Hadith"
          ]
        },
        {
          title: "4. Sawm (Fasting in Ramadan)",
          content: "Fasting during the blessed month of Ramadan (the 9th month of Islamic calendar) from dawn (Fajr) until sunset (Maghrib). Muslims abstain from food, drink, and marital relations during daylight hours.\n\n📖 Quranic Foundation:\n'O you who have believed, fasting is prescribed for you as it was prescribed for those before you, that you may become righteous.' (Surah Al-Baqarah 2:183)\n\n'The month of Ramadan in which was revealed the Quran, a guidance for mankind and clear proofs for guidance and criterion.' (Surah Al-Baqarah 2:185)\n\n🌙 Significance of Ramadan:\n• Month when the Quran was first revealed\n• Contains Laylat al-Qadr (Night of Power) - better than 1000 months\n• Gates of Paradise opened, gates of Hell closed\n• Devils are chained up\n• Rewards for good deeds are multiplied\n\n📚 Hadith Evidence:\n'Whoever fasts Ramadan out of faith and seeking reward, his previous sins will be forgiven.' [Sahih al-Bukhari 1901, Sahih Muslim 760]",
          points: [
            "Fast begins at Fajr (dawn) with Suhoor (pre-dawn meal)",
            "Fast breaks at Maghrib (sunset) with Iftar, traditionally with dates",
            "Develops Taqwa (consciousness of Allah) and self-discipline",
            "Teaches empathy for the hungry and poor",
            "Exempt: Children before puberty, elderly, sick, pregnant/nursing women, travelers, menstruating women",
            "Missed fasts must be made up later except for valid permanent reasons",
            "Eid al-Fitr celebrates the completion of Ramadan",
            "Spiritual retreat (I'tikaf) in last 10 nights is recommended"
          ]
        },
        {
          title: "5. Hajj (Pilgrimage to Mecca)",
          content: "Hajj is the pilgrimage to the sacred city of Mecca, required once in a lifetime for those who are physically and financially capable. Performed during the Islamic month of Dhul-Hijjah, it brings together millions of Muslims from across the world.\n\n📖 Quranic Foundation:\n'And proclaim to the people the Hajj; they will come to you on foot and on every lean camel; they will come from every distant pass.' (Surah Al-Hajj 22:27)\n\n'Pilgrimage to the House is a duty owed to Allah by people who are able to undertake it. And whoever disbelieves - then indeed, Allah is Free from need of the worlds.' (Surah Aal-Imran 3:97)\n\n🕋 Hajj Rituals Overview:\n1. Ihram - State of consecration and pilgrims' garments\n2. Tawaf - Circumambulating the Kaaba 7 times\n3. Sa'i - Walking between Safa and Marwa 7 times  \n4. Day of Arafah - Standing at Mount Arafah (9th Dhul-Hijjah)\n5. Muzdalifah - Spending night and collecting pebbles\n6. Rami - Stoning the pillars representing Satan\n7. Sacrifice - Animal sacrifice on Eid al-Adha\n8. Tawaf al-Ifadah - Tawaf of returning\n\n📚 Hadith Evidence:\n'Whoever performs Hajj and does not commit any obscenity or transgression will return [free from sin] as on the day his mother gave birth to him.' [Sahih al-Bukhari 1521, Sahih Muslim 1350]",
          points: [
            "Only obligatory for those physically and financially able",
            "Must have safe passage and funds for family during absence",
            "Women should travel with a Mahram (male guardian) or safe group",
            "Commemorates Prophet Ibrahim, his wife Hajar, and son Ismail",
            "Represents equality - all pilgrims wear simple white garments",
            "Sins forgiven if performed with sincerity and devotion",
            "The Day of Arafah is the core and most important day",
            "Umrah (minor pilgrimage) can be performed year-round"
          ]
        }
      ],
      conclusion: "The Five Pillars work in harmony to create a balanced, purposeful life centered on worship, character, and community. The Prophet ﷺ described them as the foundation: 'Islam is built upon five: testifying that there is no god but Allah and that Muhammad is His messenger, establishing prayer, giving Zakat, fasting Ramadan, and pilgrimage to the House for whoever is able.' [Sahih al-Bukhari 8] Each pillar strengthens our connection to Allah, develops our character, and binds the Muslim community together.",
      keyTakeaways: [
        "The Five Pillars are firmly established in Quran and authentic Hadith",
        "Shahada is the foundation; other pillars are built upon it",
        "Salah is the most important act of worship after Shahada",
        "Zakat purifies wealth and creates social justice - 8 categories of recipients",
        "Ramadan fasting develops Taqwa and includes Laylat al-Qadr",
        "Hajj unites the Ummah and commemorates Prophet Ibrahim's legacy",
        "Each pillar has conditions, exemptions, and deeper spiritual meanings",
        "Together they form a comprehensive system for worship and life"
      ]
    },
    quiz: [
      {
        question: "What is the first pillar of Islam?",
        options: ["Salah (Prayer)", "Shahada (Declaration of Faith)", "Zakat (Charity)", "Hajj (Pilgrimage)"],
        correctAnswer: 1,
        explanation: "The Shahada, the declaration of faith, is the first and most fundamental pillar of Islam. It is the testimony that there is no god but Allah and Muhammad is His messenger."
      },
      {
        question: "How many times do Muslims pray each day?",
        options: ["Three times", "Four times", "Five times", "Seven times"],
        correctAnswer: 2,
        explanation: "Muslims perform Salah five times daily: Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), and Isha (night)."
      },
      {
        question: "What percentage of savings is typically given as Zakat annually?",
        options: ["1.5%", "2.5%", "5%", "10%"],
        correctAnswer: 1,
        explanation: "Zakat is typically 2.5% of one's savings annually, calculated on wealth that has been held for one lunar year."
      },
      {
        question: "During which month do Muslims fast from dawn to sunset?",
        options: ["Dhul-Hijjah", "Ramadan", "Shawwal", "Muharram"],
        correctAnswer: 1,
        explanation: "Muslims fast during the entire month of Ramadan, the ninth month of the Islamic calendar."
      },
      {
        question: "Hajj is required for those who are:",
        options: ["All Muslims without exception", "Only men", "Physically and financially able", "Only those over 60"],
        correctAnswer: 2,
        explanation: "Hajj is obligatory only for Muslims who are physically and financially able to undertake the journey. There are exemptions for those who cannot afford it or are physically unable."
      }
    ]
  },
  {
    id: "understanding-tawhid",
    title: "Understanding Tawhid",
    description: "The concept of Divine Unity",
    duration: "20 min",
    category: "Aqeedah",
    content: {
      introduction: "Tawhid is the fundamental concept in Islam - the absolute oneness and uniqueness of Allah. It is the most important principle that distinguishes Islamic monotheism.",
      sections: [
        {
          title: "What is Tawhid?",
          content: "Tawhid means the oneness of Allah in His essence, attributes, and actions. It is the pure monotheism that forms the core of Islamic belief.",
          points: [
            "Allah is One with no partners",
            "Nothing resembles Him",
            "He alone deserves worship",
            "All power belongs to Him alone"
          ]
        },
        {
          title: "Types of Tawhid",
          content: "Scholars categorize Tawhid into three main types to better understand this concept:",
          points: [
            "Tawhid ar-Rububiyyah: Oneness of Lordship - Allah alone is the Creator, Sustainer, and Controller",
            "Tawhid al-Uluhiyyah: Oneness of Worship - Allah alone deserves worship",
            "Tawhid al-Asma was-Sifat: Oneness of Names and Attributes - Allah's names and attributes are unique to Him"
          ]
        },
        {
          title: "The Opposite of Tawhid: Shirk",
          content: "Shirk means associating partners with Allah. It is the only unforgivable sin if one dies without repenting from it.",
          points: [
            "Major shirk: Worshiping others besides Allah",
            "Minor shirk: Showing off in worship, swearing by other than Allah",
            "Hidden shirk: Relying on other than Allah in the heart"
          ]
        },
        {
          title: "Living with Tawhid",
          content: "Tawhid should manifest in every aspect of a Muslim's life.",
          points: [
            "Direct all worship to Allah alone",
            "Trust in Allah's plan completely",
            "Seek help only from Allah",
            "Follow only Allah's guidance",
            "Purify intentions in all actions"
          ]
        }
      ],
      conclusion: "Tawhid is not just a belief to affirm, but a reality to live by. It should guide every decision, action, and thought in a Muslim's life, bringing peace, purpose, and clarity.",
      keyTakeaways: [
        "Tawhid is the foundation of Islam",
        "It encompasses belief, worship, and daily life",
        "Shirk (associating partners with Allah) contradicts Tawhid",
        "True Tawhid brings inner peace and purpose"
      ]
    },
    quiz: [
      {
        question: "What does Tawhid mean?",
        options: ["Five daily prayers", "The oneness of Allah", "Fasting in Ramadan", "Pilgrimage to Mecca"],
        correctAnswer: 1,
        explanation: "Tawhid means the absolute oneness and uniqueness of Allah. It is the core principle of Islamic monotheism."
      },
      {
        question: "How many types of Tawhid do scholars identify?",
        options: ["Two", "Three", "Four", "Five"],
        correctAnswer: 1,
        explanation: "Scholars categorize Tawhid into three types: Tawhid ar-Rububiyyah (Lordship), Tawhid al-Uluhiyyah (Worship), and Tawhid al-Asma was-Sifat (Names and Attributes)."
      },
      {
        question: "What is Shirk?",
        options: ["A type of prayer", "Associating partners with Allah", "A pillar of Islam", "Islamic charity"],
        correctAnswer: 1,
        explanation: "Shirk means associating partners with Allah. It is the opposite of Tawhid and the only unforgivable sin if one dies without repenting from it."
      },
      {
        question: "Tawhid ar-Rububiyyah refers to:",
        options: ["Oneness of worship", "Oneness of Lordship", "Oneness of names", "Oneness of prayer"],
        correctAnswer: 1,
        explanation: "Tawhid ar-Rububiyyah is the belief that Allah alone is the Creator, Sustainer, and Controller of all things."
      },
      {
        question: "What should Tawhid affect in a Muslim's life?",
        options: ["Only prayer times", "Only charity giving", "Every aspect of life", "Only during Ramadan"],
        correctAnswer: 2,
        explanation: "Tawhid should manifest in every aspect of a Muslim's life, guiding all decisions, actions, and thoughts."
      }
    ]
  },
  {
    id: "prophet-life",
    title: "Prophet Muhammad's Life",
    description: "Seerah - The prophetic biography",
    duration: "45 min",
    category: "Seerah",
    content: {
      introduction: "The life of Prophet Muhammad ﷺ is the greatest example for humanity. Studying his biography (Seerah) helps us understand Islam and follow his noble character.",
      sections: [
        {
          title: "Early Life (570-610 CE)",
          content: "Born in Mecca in the Year of the Elephant, the Prophet ﷺ faced early hardships that shaped his character.",
          points: [
            "Father died before his birth",
            "Mother died when he was 6 years old",
            "Raised by grandfather, then uncle Abu Talib",
            "Known as 'Al-Amin' (the trustworthy) and 'As-Sadiq' (the truthful)",
            "Married Khadijah at age 25",
            "Known for honesty, integrity, and contemplation"
          ]
        },
        {
          title: "The First Revelation (610 CE)",
          content: "At age 40, while meditating in Cave Hira, Angel Jibreel brought the first revelation.",
          points: [
            "Received the first verses of Surah Al-Alaq",
            "Khadijah believed and supported him immediately",
            "Abu Bakr became the first male Muslim",
            "Ali was the first young boy to accept Islam",
            "Began calling people to Islam secretly for 3 years"
          ]
        },
        {
          title: "The Meccan Period (610-622 CE)",
          content: "Years of persecution and steadfastness in Mecca while building the Muslim community.",
          points: [
            "Public preaching after 3 years",
            "Boycott of Banu Hashim for 3 years",
            "Year of Sorrow: Death of Khadijah and Abu Talib",
            "Journey to Ta'if seeking support",
            "The Night Journey (Isra and Mi'raj)",
            "Pledge of Aqabah with people of Yathrib"
          ]
        },
        {
          title: "The Medinan Period (622-632 CE)",
          content: "Migration to Medina marked a new phase - building an Islamic state and society.",
          points: [
            "Established the first Islamic state",
            "Built the Prophet's Mosque",
            "Brotherhood between Muhajirin and Ansar",
            "Constitution of Medina",
            "Battles: Badr, Uhud, Khandaq, and others",
            "Treaty of Hudaybiyah",
            "Conquest of Mecca (630 CE)",
            "Farewell Pilgrimage and Sermon (632 CE)"
          ]
        },
        {
          title: "His Character and Legacy",
          content: "The Prophet's ﷺ character was the Quran in action, as described by Aisha (RA).",
          points: [
            "Mercy to all creation",
            "Justice and fairness with everyone",
            "Humility despite being a leader",
            "Generosity and selflessness",
            "Patience in adversity",
            "Kindness to family, neighbors, and strangers",
            "Excellence in worship and devotion"
          ]
        }
      ],
      conclusion: "The Prophet Muhammad ﷺ transformed Arabia and the world through his character, teachings, and leadership. His life is a complete guide for humanity in every aspect - personal, social, spiritual, and moral.",
      keyTakeaways: [
        "The Prophet ﷺ was chosen by Allah as the final messenger",
        "His life had two main phases: Meccan (persecution) and Medinan (building)",
        "He exemplified the highest moral character",
        "His teachings and example (Sunnah) are the second source of Islamic law",
        "Following his example brings success in this life and the Hereafter"
      ]
    },
    quiz: [
      {
        question: "In what year was Prophet Muhammad ﷺ born?",
        options: ["570 CE", "610 CE", "622 CE", "632 CE"],
        correctAnswer: 0,
        explanation: "Prophet Muhammad ﷺ was born in 570 CE in Mecca, in the Year of the Elephant."
      },
      {
        question: "At what age did the Prophet ﷺ receive the first revelation?",
        options: ["25", "30", "40", "50"],
        correctAnswer: 2,
        explanation: "The Prophet ﷺ was 40 years old when he received the first revelation from Angel Jibreel in Cave Hira."
      },
      {
        question: "What was the Prophet ﷺ known as before receiving revelation?",
        options: ["Al-Amin and As-Sadiq", "Al-Malik", "Al-Hakim", "Al-Qadi"],
        correctAnswer: 0,
        explanation: "Before prophethood, Muhammad ﷺ was known as 'Al-Amin' (the trustworthy) and 'As-Sadiq' (the truthful) due to his exceptional character."
      },
      {
        question: "What event marks the beginning of the Islamic calendar?",
        options: ["Birth of the Prophet", "First revelation", "Migration to Medina (Hijrah)", "Conquest of Mecca"],
        correctAnswer: 2,
        explanation: "The Hijrah (migration to Medina) in 622 CE marks the beginning of the Islamic calendar, as it was a pivotal moment in Islamic history."
      },
      {
        question: "In what year did the conquest of Mecca occur?",
        options: ["622 CE", "624 CE", "630 CE", "632 CE"],
        correctAnswer: 2,
        explanation: "The conquest of Mecca occurred in 630 CE, marking a peaceful return of the Prophet ﷺ to his birthplace."
      }
    ]
  },
  {
    id: "islamic-manners",
    title: "Islamic Manners & Etiquette",
    description: "Adab in daily life",
    duration: "25 min",
    category: "Adab",
    content: {
      introduction: "Adab (manners and etiquette) is a fundamental part of Islamic character. The Prophet ﷺ said: 'I was sent to perfect good character.' Beautiful manners distinguish a true believer.",
      sections: [
        {
          title: "General Manners",
          content: "Islam emphasizes excellent character in all interactions and situations.",
          points: [
            "Speak gently and kindly",
            "Smile - it's charity (Sadaqah)",
            "Greet with Salam (peace)",
            "Be truthful in speech",
            "Avoid backbiting and gossip",
            "Be humble and modest",
            "Show gratitude and say Alhamdulillah"
          ]
        },
        {
          title: "Manners with Parents",
          content: "Honoring and respecting parents is emphasized repeatedly in Islam.",
          points: [
            "Speak to them with utmost respect",
            "Never say 'uff' (even a slight word of disrespect)",
            "Obey them in what is good",
            "Make dua for them",
            "Take care of them in old age",
            "Maintain ties even if they are non-Muslim"
          ]
        },
        {
          title: "Manners in the Mosque",
          content: "The mosque is a sacred space that requires special etiquette.",
          points: [
            "Enter with the right foot, saying the prescribed dua",
            "Pray 2 Rakah Tahiyyat al-Masjid upon entering",
            "Keep it clean and fragrant",
            "Avoid eating onions or garlic before coming",
            "Lower your voice",
            "Don't cross in front of someone praying",
            "Turn off mobile phones"
          ]
        },
        {
          title: "Eating and Drinking Etiquette",
          content: "Islam provides guidance even for daily activities like eating.",
          points: [
            "Say Bismillah before eating",
            "Eat with the right hand",
            "Eat from what is in front of you",
            "Don't criticize food",
            "Eat in moderation - fill 1/3 with food, 1/3 with water, 1/3 with air",
            "Thank Allah after finishing (Alhamdulillah)",
            "Don't waste food"
          ]
        },
        {
          title: "Social Manners",
          content: "Islam promotes harmony and respect in social interactions.",
          points: [
            "Visit the sick",
            "Attend funerals",
            "Accept invitations when possible",
            "Give gifts to strengthen bonds",
            "Maintain ties of kinship",
            "Be good to neighbors",
            "Help those in need",
            "Respect elders and be kind to young"
          ]
        }
      ],
      conclusion: "Good manners are not optional in Islam but an integral part of faith. The Prophet ﷺ said: 'The most perfect believer in faith is the one whose character is finest.' By perfecting our adab, we draw closer to Allah and benefit society.",
      keyTakeaways: [
        "Adab is a core part of Islamic character",
        "Islam guides behavior in all situations",
        "Good manners with parents are especially emphasized",
        "Proper etiquette in worship spaces is essential",
        "Social harmony requires respect and kindness"
      ]
    },
    quiz: [
      {
        question: "According to the Prophet ﷺ, what was he sent to perfect?",
        options: ["Prayer rituals", "Good character", "Fasting rules", "Pilgrimage rites"],
        correctAnswer: 1,
        explanation: "The Prophet ﷺ said: 'I was sent to perfect good character.' This emphasizes that excellent manners are central to Islam."
      },
      {
        question: "What is considered charity (Sadaqah) in Islam?",
        options: ["Only giving money", "Only feeding the poor", "Smiling at others", "Only building mosques"],
        correctAnswer: 2,
        explanation: "The Prophet ﷺ taught that even smiling at your brother is charity, showing that good manners themselves are acts of worship."
      },
      {
        question: "How should one eat according to Islamic etiquette?",
        options: ["With the left hand", "With the right hand", "With both hands", "It doesn't matter"],
        correctAnswer: 1,
        explanation: "Islamic etiquette teaches us to eat with the right hand, as this was the practice of the Prophet ﷺ."
      },
      {
        question: "What should you avoid saying to your parents, even slightly?",
        options: ["Alhamdulillah", "Uff", "Bismillah", "Salam"],
        correctAnswer: 1,
        explanation: "The Quran specifically forbids saying 'uff' (even a slight word of disrespect) to parents, emphasizing the importance of respectful speech."
      },
      {
        question: "What is the recommended way to fill your stomach when eating?",
        options: ["Completely full", "1/3 food, 1/3 water, 1/3 air", "Only water", "Mostly food"],
        correctAnswer: 1,
        explanation: "The Prophet ﷺ taught moderation: fill one-third with food, one-third with water, and leave one-third empty for air."
      }
    ]
  },
  {
    id: "fiqh-prayer",
    title: "Fiqh of Prayer",
    description: "Detailed rulings on Salah",
    duration: "30 min",
    category: "Fiqh",
    content: {
      introduction: "Salah (prayer) is the second pillar of Islam and the most important act of worship after the Shahada. Understanding its rulings (fiqh) helps us perform it correctly and with devotion.",
      sections: [
        {
          title: "Conditions of Prayer (Shurut as-Salah)",
          content: "These conditions must be met before prayer is valid.",
          points: [
            "Being Muslim",
            "Having reached the age of reason",
            "Being in a state of purity (Wudu or Ghusl)",
            "Cleanliness of body, clothes, and place",
            "Covering the Awrah (private parts)",
            "Facing the Qiblah (direction of Kaaba)",
            "Proper time for the prayer has entered"
          ]
        },
        {
          title: "Pillars of Prayer (Arkan as-Salah)",
          content: "These essential components must be performed in every prayer.",
          points: [
            "Standing (if able)",
            "Opening Takbir (Allahu Akbar)",
            "Reciting Al-Fatihah",
            "Bowing (Ruku)",
            "Rising from bowing",
            "Prostrating (Sujud) - twice per cycle",
            "Sitting between two prostrations",
            "Final sitting (Tashahhud)",
            "Sending blessings on the Prophet (Salawat)",
            "Giving Salam (ending the prayer)"
          ]
        },
        {
          title: "Obligations in Prayer (Wajibat)",
          content: "These are required but can be compensated if forgotten with prostration of forgetfulness.",
          points: [
            "Saying Takbir (Allahu Akbar) when transitioning",
            "Saying 'Sami Allahu liman hamidah' when rising from Ruku",
            "Saying 'Rabbana wa lakal hamd' after rising",
            "Saying 'Subhana Rabbi al-Adheem' in Ruku",
            "Saying 'Subhana Rabbi al-A'la' in Sujud",
            "Saying 'Rabbi ghfir li' between prostrations",
            "First Tashahhud in prayers with more than 2 cycles"
          ]
        },
        {
          title: "Nullifiers of Prayer",
          content: "Actions that invalidate the prayer and require starting over.",
          points: [
            "Intentional speech unrelated to prayer",
            "Excessive movement unrelated to prayer",
            "Eating or drinking",
            "Laughing out loud",
            "Breaking Wudu during prayer",
            "Turning chest away from Qiblah",
            "Uncovering the Awrah"
          ]
        },
        {
          title: "Prostration of Forgetfulness (Sujud as-Sahw)",
          content: "How to handle mistakes during prayer.",
          points: [
            "Performed when forgetting part of prayer",
            "Two prostrations before or after Salam",
            "For adding, omitting, or doubting in prayer",
            "Different opinions on when to do it (before/after Salam)"
          ]
        },
        {
          title: "Types of Prayers",
          content: "Understanding different categories of prayers.",
          points: [
            "Fard (Obligatory): The five daily prayers",
            "Sunnah Mu'akkadah: Strongly recommended (Fajr sunnah, Witr)",
            "Sunnah Ghayr Mu'akkadah: Recommended but less emphasized",
            "Nafl: Voluntary prayers (Tahajjud, Duha, Tahiyyat al-Masjid)"
          ]
        }
      ],
      conclusion: "Understanding the fiqh of prayer helps us perform this essential worship correctly and with concentration. While the details may seem complex, with practice and study, they become natural, allowing us to focus on our connection with Allah.",
      keyTakeaways: [
        "Prayer has conditions, pillars, and obligations",
        "Missing a pillar requires restarting the prayer",
        "Missing an obligation can be fixed with Sujud as-Sahw",
        "Different types of prayers have different rulings",
        "Learning proper fiqh enhances our worship"
      ]
    },
    quiz: [
      {
        question: "What is a condition (Shart) of prayer?",
        options: ["Reciting Al-Fatihah", "Being in a state of purity", "Prostrating twice", "Saying Salam"],
        correctAnswer: 1,
        explanation: "Being in a state of purity (having Wudu or Ghusl) is a condition that must be met before prayer begins. Without it, the prayer is not valid."
      },
      {
        question: "Which Surah must be recited in every unit (Rakah) of prayer?",
        options: ["Al-Ikhlas", "Al-Fatihah", "Al-Nas", "Al-Falaq"],
        correctAnswer: 1,
        explanation: "Reciting Surah Al-Fatihah is a pillar of prayer and must be recited in every Rakah for the prayer to be valid."
      },
      {
        question: "What happens if you forget an obligation (Wajib) in prayer?",
        options: ["Prayer is invalid", "Perform Sujud as-Sahw", "Nothing needs to be done", "Must make up the prayer"],
        correctAnswer: 1,
        explanation: "If you forget an obligation, you can compensate by performing Sujud as-Sahw (prostration of forgetfulness) before or after Salam."
      },
      {
        question: "How many times do you prostrate in each unit (Rakah) of prayer?",
        options: ["Once", "Twice", "Three times", "Four times"],
        correctAnswer: 1,
        explanation: "Prostrating (Sujud) twice in each Rakah is a pillar of prayer that must be performed."
      },
      {
        question: "What is Fard prayer?",
        options: ["Voluntary prayer", "The five daily obligatory prayers", "Night prayer", "Friday prayer only"],
        correctAnswer: 1,
        explanation: "Fard prayers are the five daily obligatory prayers that every Muslim must perform: Fajr, Dhuhr, Asr, Maghrib, and Isha."
      }
    ]
  },
  {
    id: "day-of-judgment",
    title: "Signs of the Day of Judgment",
    description: "Major and minor signs",
    duration: "35 min",
    category: "Aqeedah",
    content: {
      introduction: "Belief in the Day of Judgment (Yawm al-Qiyamah) is one of the six pillars of Iman. The Prophet ﷺ informed us of signs that would precede this momentous event, divided into minor and major signs.",
      sections: [
        {
          title: "Minor Signs (Already Occurring)",
          content: "These signs began appearing during or after the Prophet's ﷺ time and continue today.",
          points: [
            "Knowledge will decrease and ignorance will increase",
            "Time will pass quickly",
            "Wealth will increase but charity will decrease",
            "Music and singing will be widespread",
            "Alcohol consumption will be common",
            "Immorality will spread openly",
            "People will compete in building tall structures",
            "Barefoot, naked shepherds will compete in constructing lofty buildings",
            "Children will be disobedient to parents",
            "People will be dishonest in trade",
            "False testimony will be common and true witness will be hidden"
          ]
        },
        {
          title: "Minor Signs (Increasing)",
          content: "Signs that are becoming more apparent in recent times.",
          points: [
            "Prevalence of earthquakes",
            "Violence and bloodshed will increase",
            "Religious knowledge will be taken away with the death of scholars",
            "The conquest of Constantinople (already occurred)",
            "Arabia will return to being green with rivers",
            "The Euphrates will uncover a mountain of gold",
            "Women will outnumber men"
          ]
        },
        {
          title: "Major Signs",
          content: "Ten major signs that will occur close to the Day of Judgment, in no particular order.",
          points: [
            "1. The appearance of the Mahdi",
            "2. The appearance of Dajjal (False Messiah/Antichrist)",
            "3. The descent of Jesus (Isa) son of Mary",
            "4. The appearance of Gog and Magog (Ya'juj and Ma'juj)",
            "5. Three major landslides: East, West, and Arabian Peninsula",
            "6. Smoke covering the earth",
            "7. The rising of the sun from the West",
            "8. The emergence of the Beast (Dabbat al-Ard)",
            "9. A fire from Yemen driving people to their place of assembly",
            "10. The blowing of the Trumpet (marking the actual end)"
          ]
        },
        {
          title: "The Mahdi",
          content: "A righteous leader who will appear before the end times.",
          points: [
            "From the lineage of the Prophet ﷺ",
            "Will establish justice on earth",
            "Will rule for 7, 8, or 9 years",
            "Contemporary with the Dajjal",
            "Jesus will pray behind him"
          ]
        },
        {
          title: "The Dajjal (False Messiah)",
          content: "The greatest trial humanity will face before the Day of Judgment.",
          points: [
            "Will claim to be God",
            "One-eyed, with 'Kafir' (disbeliever) written between his eyes",
            "Will have powers to deceive people",
            "Will travel the earth except Mecca and Medina",
            "First ten verses of Surah Al-Kahf protect from his trial",
            "Will be killed by Jesus (Isa) at the gate of Ludd"
          ]
        },
        {
          title: "The Return of Jesus (Isa)",
          content: "Jesus will descend to earth as a just ruler and follower of Islam.",
          points: [
            "Will descend at the white minaret in Damascus",
            "Will break the cross (end Christianity as practiced)",
            "Will kill the swine",
            "Will abolish the Jizyah (tax on non-Muslims)",
            "Will kill the Dajjal",
            "Will marry and have children",
            "Will die a natural death and be buried next to the Prophet ﷺ"
          ]
        },
        {
          title: "Lessons and Preparation",
          content: "How believers should respond to knowledge of these signs.",
          points: [
            "Strengthen your faith and practice",
            "Don't obsess over which signs have occurred",
            "Focus on personal preparation through good deeds",
            "Memorize the first ten verses of Surah Al-Kahf",
            "Increase in seeking knowledge",
            "Repent sincerely before it's too late",
            "Live as if death could come at any moment"
          ]
        }
      ],
      conclusion: "Knowledge of the signs serves as a reminder that this world is temporary and the Hereafter is eternal. Rather than causing fear, it should motivate us to prepare through sincere faith, righteous deeds, and repentance. The Prophet ﷺ taught us these signs not to scare us, but to keep us aware and prepared.",
      keyTakeaways: [
        "Signs are divided into minor (many occurred) and major (yet to occur)",
        "Minor signs serve as warnings and reminders",
        "Major signs will occur rapidly near the end",
        "The Dajjal will be the greatest trial",
        "Jesus will return as a Muslim leader",
        "Focus on preparation, not just prediction"
      ]
    },
    quiz: [
      {
        question: "How many major signs of the Day of Judgment are there?",
        options: ["Five", "Seven", "Ten", "Twelve"],
        correctAnswer: 2,
        explanation: "There are ten major signs of the Day of Judgment mentioned in authentic hadith, which will occur close to the end of time."
      },
      {
        question: "What is written between the eyes of the Dajjal?",
        options: ["Believer", "Kafir (disbeliever)", "Prophet", "Leader"],
        correctAnswer: 1,
        explanation: "The word 'Kafir' (disbeliever) will be written between the Dajjal's eyes, visible to all believers."
      },
      {
        question: "Which Surah provides protection from the trial of the Dajjal?",
        options: ["First ten verses of Surah Al-Kahf", "Surah Al-Fatihah", "Surah Yaseen", "Ayat al-Kursi"],
        correctAnswer: 0,
        explanation: "The Prophet ﷺ taught that memorizing the first ten verses of Surah Al-Kahf protects from the trial of the Dajjal."
      },
      {
        question: "Who will kill the Dajjal?",
        options: ["The Mahdi", "Prophet Isa (Jesus)", "An army of believers", "He will die naturally"],
        correctAnswer: 1,
        explanation: "Jesus (Isa) will descend and kill the Dajjal at the gate of Ludd, ending his trial."
      },
      {
        question: "What is one of the minor signs already occurring?",
        options: ["The sun rising from the west", "The appearance of the Beast", "People competing in building tall structures", "The descent of Jesus"],
        correctAnswer: 2,
        explanation: "The Prophet ﷺ mentioned that barefoot shepherds competing in constructing lofty buildings is a minor sign, which we see occurring today."
      }
    ]
  }
];
