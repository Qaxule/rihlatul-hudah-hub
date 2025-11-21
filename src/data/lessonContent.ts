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
    description: "Foundation of Islamic practice",
    duration: "15 min",
    category: "Fundamentals",
    content: {
      introduction: "The Five Pillars of Islam are the core practices that every Muslim must follow. They form the foundation of a Muslim's faith and practice.",
      sections: [
        {
          title: "1. Shahada (Declaration of Faith)",
          content: "The testimony that there is no god but Allah, and Muhammad is His messenger.",
          points: [
            "The foundation of Islamic belief",
            "Must be said with conviction and understanding",
            "Affirms monotheism and prophethood"
          ]
        },
        {
          title: "2. Salah (Prayer)",
          content: "Performing the five daily prayers at prescribed times throughout the day and night.",
          points: [
            "Fajr (before sunrise)",
            "Dhuhr (noon)",
            "Asr (afternoon)",
            "Maghrib (sunset)",
            "Isha (night)",
            "Strengthens connection with Allah"
          ]
        },
        {
          title: "3. Zakat (Charity)",
          content: "Giving a portion of one's wealth to those in need, typically 2.5% of savings annually.",
          points: [
            "Purifies wealth",
            "Helps those in need",
            "Creates social equity",
            "Due on specific types of wealth"
          ]
        },
        {
          title: "4. Sawm (Fasting)",
          content: "Fasting during the month of Ramadan from dawn until sunset.",
          points: [
            "Abstaining from food, drink, and intimate relations",
            "Increases taqwa (God-consciousness)",
            "Teaches self-discipline and empathy",
            "Exceptions for travelers, sick, and others"
          ]
        },
        {
          title: "5. Hajj (Pilgrimage)",
          content: "Making pilgrimage to Mecca at least once in a lifetime if physically and financially able.",
          points: [
            "Performed during the Islamic month of Dhul-Hijjah",
            "Unites Muslims from around the world",
            "Commemorates Prophet Ibrahim's devotion",
            "Required only for those who are able"
          ]
        }
      ],
      conclusion: "These five pillars work together to strengthen a Muslim's relationship with Allah and create a balanced, purposeful life. They combine belief, worship, charity, self-discipline, and unity.",
      keyTakeaways: [
        "The Five Pillars are obligatory for all Muslims",
        "They cover belief, worship, charity, fasting, and pilgrimage",
        "Each pillar has specific rules and conditions",
        "Together they create a comprehensive way of life"
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
