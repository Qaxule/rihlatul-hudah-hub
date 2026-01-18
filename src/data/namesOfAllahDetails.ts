export interface NameDetail {
  transliteration: string;
  explanation: string;
  quranReference?: {
    surah: string;
    ayah: string;
    arabic: string;
    translation: string;
  };
  hadithReference?: {
    source: string;
    text: string;
  };
  benefits?: string[];
}

export const namesOfAllahDetails: Record<string, NameDetail> = {
  "Ar-Rahman": {
    transliteration: "Ar-Rahman",
    explanation: "Ar-Rahman denotes the intensity and vastness of Allah's mercy. This name encompasses all of creation—believers and disbelievers alike receive from His mercy in this world. It is a unique attribute that belongs only to Allah and cannot be used for anyone else. His mercy encompasses everything and extends to all creatures.",
    quranReference: {
      surah: "Al-Fatiha",
      ayah: "1:3",
      arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "The Most Merciful, the Especially Merciful"
    },
    hadithReference: {
      source: "Sahih Muslim 2752",
      text: "Allah divided mercy into one hundred parts. He kept ninety-nine parts with Himself and sent down one part to the earth. From that one part comes the compassion which creatures show to one another."
    },
    benefits: ["Recite to invoke Allah's encompassing mercy", "Reflect on it during hardship to remember His vast compassion"]
  },
  "Ar-Raheem": {
    transliteration: "Ar-Raheem",
    explanation: "Ar-Raheem refers to the special mercy that Allah bestows upon the believers, particularly in the Hereafter. While Ar-Rahman encompasses all creation, Ar-Raheem is specifically for those who believe and follow His guidance. This mercy is manifested in guidance, forgiveness, and eternal reward.",
    quranReference: {
      surah: "Al-Ahzab",
      ayah: "33:43",
      arabic: "وَكَانَ بِالْمُؤْمِنِينَ رَحِيمًا",
      translation: "And He is ever, to the believers, Merciful."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6000",
      text: "Those who show mercy will be shown mercy by the Most Merciful. Show mercy to those on earth, and the One above the heavens will show mercy to you."
    },
    benefits: ["Inspires believers to be merciful to others", "Gives hope for Allah's special mercy in the Hereafter"]
  },
  "Al-Malik": {
    transliteration: "Al-Malik",
    explanation: "Al-Malik signifies Allah's absolute sovereignty and dominion over all creation. He is the King who owns and controls everything, whose kingdom has no boundaries and whose authority is absolute. All worldly kings and rulers are merely temporary custodians, while Allah's kingship is eternal and complete.",
    quranReference: {
      surah: "Al-Hashr",
      ayah: "59:23",
      arabic: "هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ",
      translation: "He is Allah, other than whom there is no deity, the Sovereign, the Pure..."
    },
    hadithReference: {
      source: "Sahih Muslim 2788",
      text: "Allah will fold the heavens on the Day of Resurrection, then He will take them in His Right Hand and say: 'I am the King! Where are the tyrants? Where are the arrogant ones?'"
    },
    benefits: ["Reminds us to submit to His authority", "Teaches humility before the True King"]
  },
  "Al-Quddus": {
    transliteration: "Al-Quddus",
    explanation: "Al-Quddus means The Most Holy, Pure, and Sacred. Allah is free from all imperfections, defects, and anything that does not befit His majesty. He is pure from having any partners, children, or equals. This name affirms Allah's transcendence above all creation and any attribute of weakness or limitation.",
    quranReference: {
      surah: "Al-Jumu'ah",
      ayah: "62:1",
      arabic: "يُسَبِّحُ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ الْمَلِكِ الْقُدُّوسِ",
      translation: "Whatever is in the heavens and whatever is on the earth is exalting Allah, the Sovereign, the Pure..."
    },
    hadithReference: {
      source: "Sahih Muslim 487",
      text: "The Prophet (ﷺ) used to say between the two prostrations: 'O Allah, forgive me, have mercy on me, guide me, and provide for me.'"
    },
    benefits: ["Encourages purification of the heart", "Inspires seeking holiness in actions and intentions"]
  },
  "As-Salam": {
    transliteration: "As-Salam",
    explanation: "As-Salam means The Source of Peace and Safety. Allah is free from all defects and imperfections, and He is the one who grants peace and security to His creation. True peace comes only from Him—peace of heart, peace in society, and ultimate peace in Paradise.",
    quranReference: {
      surah: "Al-Hashr",
      ayah: "59:23",
      arabic: "الْمَلِكُ الْقُدُّوسُ السَّلَامُ",
      translation: "The Sovereign, the Pure, the Perfection (Source of Peace)..."
    },
    hadithReference: {
      source: "Sahih Muslim 592",
      text: "When the Prophet (ﷺ) finished his prayer, he would seek forgiveness three times and say: 'Allahumma Antas-Salam wa minkas-salam, tabarakta ya Dhal-jalali wal-ikram.'"
    },
    benefits: ["Brings inner peace when invoked", "Reminds us that true security is from Allah alone"]
  },
  "Al-Mu'min": {
    transliteration: "Al-Mu'min",
    explanation: "Al-Mu'min means The Granter of Security, The Faithful. Allah is the One who fulfills His promises and grants security to His servants. He confirms the truthfulness of His messengers through miracles and signs, and He grants believers security from His punishment through faith.",
    quranReference: {
      surah: "Al-Hashr",
      ayah: "59:23",
      arabic: "السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ",
      translation: "...the Perfection, the Bestower of Faith, the Overseer..."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6343",
      text: "There is none worthy of worship but Allah alone, Who has no partner. His is the dominion and His is the praise, and He has power over all things."
    },
    benefits: ["Strengthens faith in times of doubt", "Provides assurance of Allah's protection"]
  },
  "Al-Muhaymin": {
    transliteration: "Al-Muhaymin",
    explanation: "Al-Muhaymin means The Guardian, The Watchful Protector. Allah watches over all creation, preserves them, and is fully aware of all their actions, words, and thoughts. Nothing escapes His knowledge or control. He is the Guardian over His Book, preserving it from corruption.",
    quranReference: {
      surah: "Al-Ma'idah",
      ayah: "5:48",
      arabic: "وَمُهَيْمِنًا عَلَيْهِ",
      translation: "...confirming that which preceded it of the Scripture and as a guardian over it..."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7405",
      text: "Allah knows what every female carries and what the wombs lose or exceed. And everything with Him is by due measure."
    },
    benefits: ["Inspires consciousness of Allah's watchfulness", "Encourages accountability in actions"]
  },
  "Al-Aziz": {
    transliteration: "Al-Aziz",
    explanation: "Al-Aziz means The Almighty, The Invincible. Allah possesses all power and might, and He can never be overcome or defeated. His strength is absolute, and He grants honor and might to whomever He wills. Nothing can overpower Him or prevent Him from accomplishing His will.",
    quranReference: {
      surah: "Al-Hashr",
      ayah: "59:23",
      arabic: "الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ",
      translation: "...the Exalted in Might, the Compeller, the Superior..."
    },
    hadithReference: {
      source: "Sahih Muslim 2713",
      text: "O Allah! Lord of the seven heavens and Lord of the Magnificent Throne! Our Lord and Lord of everything! Splitter of the grain and the date-stone..."
    },
    benefits: ["Provides strength during weakness", "Reminds us to seek honor only through Allah"]
  },
  "Al-Jabbar": {
    transliteration: "Al-Jabbar",
    explanation: "Al-Jabbar means The Compeller, The Restorer. Allah compels all creation to His will, and none can resist His command. He also mends the broken, heals the wounded, and restores what is lost. This name combines strength with mercy—He is mighty yet compassionate.",
    quranReference: {
      surah: "Al-Hashr",
      ayah: "59:23",
      arabic: "الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ",
      translation: "...the Exalted in Might, the Compeller, the Superior..."
    },
    hadithReference: {
      source: "Sunan Abu Dawud 5090",
      text: "The Prophet (ﷺ) said: 'O Allah, mend my heart and make good my work.'"
    },
    benefits: ["Seek healing and restoration through this name", "Trust in Allah's power to fix what is broken"]
  },
  "Al-Mutakabbir": {
    transliteration: "Al-Mutakabbir",
    explanation: "Al-Mutakabbir means The Supreme, The Majestic. Allah alone has the right to greatness and pride, as He is truly above all creation. For humans, arrogance is a sin, but for Allah it is an attribute of perfection because He alone is truly great and worthy of supreme status.",
    quranReference: {
      surah: "Al-Hashr",
      ayah: "59:23",
      arabic: "سُبْحَانَ اللَّهِ عَمَّا يُشْرِكُونَ",
      translation: "Exalted is Allah above whatever they associate with Him."
    },
    hadithReference: {
      source: "Sahih Muslim 91",
      text: "Pride is His cloak and Greatness is His garment. Whoever competes with Me in either of them, I shall throw him into the Fire."
    },
    benefits: ["Teaches humility before Allah", "Reminds us that true greatness belongs to Allah alone"]
  },
  "Al-Khaliq": {
    transliteration: "Al-Khaliq",
    explanation: "Al-Khaliq means The Creator. Allah is the One who brings everything into existence from nothing. He creates with perfect wisdom and planning, determining the nature and characteristics of all things before bringing them into being. He is the only true Creator.",
    quranReference: {
      surah: "Al-Hashr",
      ayah: "59:24",
      arabic: "هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ",
      translation: "He is Allah, the Creator, the Inventor, the Fashioner..."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7458",
      text: "Allah created mercy in one hundred parts. He retained ninety-nine parts with Himself and sent down one part to earth."
    },
    benefits: ["Inspires gratitude for creation", "Reminds us of our purpose as Allah's creation"]
  },
  "Al-Bari": {
    transliteration: "Al-Bari",
    explanation: "Al-Bari means The Evolver, The Maker. Allah is the One who creates from nothing and gives each creation its distinct existence. He evolves and develops things according to His perfect plan, bringing them from conception to completion with absolute precision.",
    quranReference: {
      surah: "Al-Hashr",
      ayah: "59:24",
      arabic: "هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ",
      translation: "He is Allah, the Creator, the Inventor, the Fashioner..."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 3208",
      text: "Allah created Adam in His image, and his height was sixty cubits."
    },
    benefits: ["Reflects on the perfection of creation", "Appreciates the diversity in Allah's creation"]
  },
  "Al-Musawwir": {
    transliteration: "Al-Musawwir",
    explanation: "Al-Musawwir means The Fashioner of Forms. Allah is the One who gives every creation its unique form, shape, and appearance. Each person's face, fingerprints, and features are uniquely designed by Him. He fashions as He wills, creating infinite variety and beauty.",
    quranReference: {
      surah: "Al-Hashr",
      ayah: "59:24",
      arabic: "لَهُ الْأَسْمَاءُ الْحُسْنَىٰ",
      translation: "...to Him belong the best names."
    },
    hadithReference: {
      source: "Sahih Muslim 2612",
      text: "When Allah fashions the servant in the womb, He sends an angel who shapes him and says: 'O Lord! Male or female?'"
    },
    benefits: ["Appreciates one's unique creation", "Finds beauty in diversity"]
  },
  "Al-Ghaffar": {
    transliteration: "Al-Ghaffar",
    explanation: "Al-Ghaffar means The Great Forgiver, The Repeatedly Forgiving. Allah forgives sins again and again, no matter how many times one repents. His forgiveness is vast and constant, covering sins completely so that no trace remains. He conceals faults and pardons repeatedly.",
    quranReference: {
      surah: "Nuh",
      ayah: "71:10",
      arabic: "فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا",
      translation: "And said, 'Ask forgiveness of your Lord. Indeed, He is ever a Perpetual Forgiver.'"
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6308",
      text: "By Allah! I seek Allah's forgiveness and repent to Him more than seventy times a day."
    },
    benefits: ["Never despair of Allah's forgiveness", "Encourages constant repentance"]
  },
  "Al-Qahhar": {
    transliteration: "Al-Qahhar",
    explanation: "Al-Qahhar means The All-Prevailing, The Subduer. Allah has complete dominion and power over all things. He subdues all of creation, and nothing can escape His control. His power is irresistible, and all tyrants and oppressors will ultimately be brought before His judgment.",
    quranReference: {
      surah: "Az-Zumar",
      ayah: "39:4",
      arabic: "هُوَ اللَّهُ الْوَاحِدُ الْقَهَّارُ",
      translation: "...He is Allah, the One, the Prevailing."
    },
    hadithReference: {
      source: "Sahih Muslim 2788",
      text: "The Prophet (ﷺ) said: 'Allah will fold the heavens on the Day of Resurrection... Where are the tyrants?'"
    },
    benefits: ["Trust in Allah's justice against oppressors", "Submit willingly to His authority"]
  },
  "Al-Wahhab": {
    transliteration: "Al-Wahhab",
    explanation: "Al-Wahhab means The Supreme Bestower. Allah gives generously without expecting anything in return. His gifts are countless and constant—life, health, family, sustenance, guidance, and more. He gives freely to whoever He wills, out of His infinite generosity.",
    quranReference: {
      surah: "Ali 'Imran",
      ayah: "3:8",
      arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ",
      translation: "Our Lord, let not our hearts deviate... and grant us from Yourself mercy. Indeed, You are the Bestower."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 2977",
      text: "O Allah, there is no one to withhold what You give, and none to give what You withhold."
    },
    benefits: ["Ask Allah for His gifts", "Be grateful for countless blessings"]
  },
  "Ar-Razzaq": {
    transliteration: "Ar-Razzaq",
    explanation: "Ar-Razzaq means The Provider, The Sustainer. Allah provides sustenance to all creation—physical sustenance like food and water, and spiritual sustenance like knowledge and faith. He is the source of all provision, and every creature's rizq is already decreed and guaranteed.",
    quranReference: {
      surah: "Adh-Dhariyat",
      ayah: "51:58",
      arabic: "إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ",
      translation: "Indeed, it is Allah who is the Provider, the Firm Possessor of Strength."
    },
    hadithReference: {
      source: "Sahih Muslim 2999",
      text: "If you were to rely on Allah with true reliance, He would provide for you as He provides for the birds."
    },
    benefits: ["Trust in Allah for provision", "Work while relying on Allah as the source"]
  },
  "Al-Fattah": {
    transliteration: "Al-Fattah",
    explanation: "Al-Fattah means The Supreme Solver, The Opener. Allah opens doors of mercy, provision, knowledge, and guidance. He removes obstacles and solves problems. When all doors seem closed, He can open them. He also judges between His servants with truth and justice.",
    quranReference: {
      surah: "Saba",
      ayah: "34:26",
      arabic: "قُلْ يَجْمَعُ بَيْنَنَا رَبُّنَا ثُمَّ يَفْتَحُ بَيْنَنَا بِالْحَقِّ وَهُوَ الْفَتَّاحُ الْعَلِيمُ",
      translation: "Say, 'Our Lord will bring us together; then He will judge between us in truth. And He is the Knowing Judge.'"
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7385",
      text: "None of you should say: 'O Allah! Forgive me if You wish, O Allah! Bestow mercy on me if You wish.' Rather, be firm in asking, for no one can compel Allah."
    },
    benefits: ["Call upon this name when facing closed doors", "Trust that Allah can solve any problem"]
  },
  "Al-Aleem": {
    transliteration: "Al-Aleem",
    explanation: "Al-Aleem means The All-Knowing. Allah's knowledge is perfect, complete, and eternal—encompassing the past, present, and future. He knows what is in the heavens and earth, what is hidden and apparent, and even what is in the depths of hearts.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:29",
      arabic: "وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ",
      translation: "...and He is Knowing of all things."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7380",
      text: "Allah knew what His servants would do, and He has written it. His pens have dried and His Books are folded up."
    },
    benefits: ["Be conscious that Allah knows all actions and thoughts", "Take comfort that He knows your struggles"]
  },
  "Al-Qabid": {
    transliteration: "Al-Qabid",
    explanation: "Al-Qabid means The Withholder, The Constrictor. Allah withholds provision, health, or other blessings according to His wisdom. What may seem like deprivation is often a test, protection, or redirection. He constricts as a manifestation of His perfect wisdom and plan.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:245",
      arabic: "وَاللَّهُ يَقْبِضُ وَيَبْسُطُ",
      translation: "And Allah withholds and grants abundance..."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 2879",
      text: "Allah's Hand is full, and it is not affected by continuous spending. He has spent since He created the heavens and the earth."
    },
    benefits: ["Accept times of difficulty with patience", "Understand that restriction is part of Divine wisdom"]
  },
  "Al-Basit": {
    transliteration: "Al-Basit",
    explanation: "Al-Basit means The Extender, The Expander. Allah expands and increases provision, mercy, and blessings for His servants. He opens hearts to faith and guidance, and He grants abundance in ways both material and spiritual. His expansion is a sign of His generosity.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:245",
      arabic: "وَاللَّهُ يَقْبِضُ وَيَبْسُطُ وَإِلَيْهِ تُرْجَعُونَ",
      translation: "...And Allah withholds and grants abundance, and to Him you will be returned."
    },
    hadithReference: {
      source: "Sahih Muslim 2692",
      text: "Allah is more delighted with the repentance of His servant than one of you would be if you suddenly found your camel in a waterless desert."
    },
    benefits: ["Be grateful during times of abundance", "Share blessings with others"]
  },
  "Al-Khafid": {
    transliteration: "Al-Khafid",
    explanation: "Al-Khafid means The Reducer, The Abaser. Allah lowers the status of the arrogant, the tyrants, and the disbelievers. He brings down those who transgress against His commandments. This is a warning against pride and transgression.",
    quranReference: {
      surah: "Al-Waqi'ah",
      ayah: "56:3",
      arabic: "خَافِضَةٌ رَّافِعَةٌ",
      translation: "It will bring down [some] and raise up [others]."
    },
    hadithReference: {
      source: "Sahih Muslim 91",
      text: "Pride is My cloak and Greatness is My garment. Whoever competes with Me in either of them, I shall throw him into the Fire."
    },
    benefits: ["Stay humble to avoid being lowered", "Trust in Allah's justice"]
  },
  "Ar-Rafi": {
    transliteration: "Ar-Rafi",
    explanation: "Ar-Rafi means The Exalter, The Elevator. Allah raises the status of whomever He wills—through faith, knowledge, good deeds, or worldly honor. He elevates the humble believers and those who submit to Him. True honor comes only from Him.",
    quranReference: {
      surah: "Al-An'am",
      ayah: "6:83",
      arabic: "نَرْفَعُ دَرَجَاتٍ مَّن نَّشَاءُ",
      translation: "We raise by degrees whom We will..."
    },
    hadithReference: {
      source: "Sahih Muslim 2865",
      text: "Whoever humbles himself for Allah's sake, Allah will raise him."
    },
    benefits: ["Seek elevation through humility and good deeds", "Trust in Allah's plan for your status"]
  },
  "Al-Mu'izz": {
    transliteration: "Al-Mu'izz",
    explanation: "Al-Mu'izz means The Giver of Honor. Allah grants honor, power, and dignity to whomever He wills. True honor comes only from obedience to Him, not from worldly possessions or lineage. He honored the believers and will honor them in the Hereafter.",
    quranReference: {
      surah: "Ali 'Imran",
      ayah: "3:26",
      arabic: "تُعِزُّ مَن تَشَاءُ وَتُذِلُّ مَن تَشَاءُ",
      translation: "You honor whom You will and You humble whom You will..."
    },
    hadithReference: {
      source: "Sahih Muslim 2865",
      text: "Whoever seeks honor through other than Allah, Allah will humiliate him."
    },
    benefits: ["Seek honor through faith and good deeds", "Never feel inferior due to worldly status"]
  },
  "Al-Mudhill": {
    transliteration: "Al-Mudhill",
    explanation: "Al-Mudhill means The Giver of Dishonor. Allah humiliates and disgraces those who disobey Him and transgress against His limits. The arrogant and oppressors will face humiliation in this world and the Hereafter. No one can protect from Allah's humiliation.",
    quranReference: {
      surah: "Ali 'Imran",
      ayah: "3:26",
      arabic: "تُعِزُّ مَن تَشَاءُ وَتُذِلُّ مَن تَشَاءُ ۖ بِيَدِكَ الْخَيْرُ",
      translation: "...You honor whom You will and You humble whom You will. In Your hand is all good..."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 4642",
      text: "Pride is disdaining the truth and looking down on people."
    },
    benefits: ["Fear humiliation through disobedience", "Remain humble and grateful"]
  },
  "As-Sami": {
    transliteration: "As-Sami",
    explanation: "As-Sami means The All-Hearing. Allah hears everything—every whisper, every thought spoken or unspoken, every prayer, and every cry. His hearing is not like human hearing; it is perfect, encompassing all sounds simultaneously without confusion or limitation.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:127",
      arabic: "رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
      translation: "Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6340",
      text: "You are not calling upon one who is deaf or absent. He is hearing and near."
    },
    benefits: ["Speak only what is good, knowing Allah hears", "Take comfort that your prayers are heard"]
  },
  "Al-Basir": {
    transliteration: "Al-Basir",
    explanation: "Al-Basir means The All-Seeing. Allah sees everything—the visible and invisible, the atom and the galaxy, the open and the hidden. Nothing escapes His vision. His sight is perfect and encompasses all of creation simultaneously.",
    quranReference: {
      surah: "Al-Isra",
      ayah: "17:1",
      arabic: "إِنَّهُ هُوَ السَّمِيعُ الْبَصِيرُ",
      translation: "Indeed, He is the Hearing, the Seeing."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7416",
      text: "Worship Allah as if you see Him. If you cannot see Him, He sees you."
    },
    benefits: ["Act righteously knowing Allah sees all", "Find comfort that He sees your struggles"]
  },
  "Al-Hakam": {
    transliteration: "Al-Hakam",
    explanation: "Al-Hakam means The Judge, The Arbitrator. Allah is the ultimate Judge who decides between His servants with perfect justice. His judgment is final and absolute. On the Day of Judgment, He will settle all disputes and give everyone their due rights.",
    quranReference: {
      surah: "Al-An'am",
      ayah: "6:114",
      arabic: "أَفَغَيْرَ اللَّهِ أَبْتَغِي حَكَمًا",
      translation: "Shall I seek other than Allah as a judge...?"
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 2410",
      text: "Allah will judge between His servants on the Day of Resurrection."
    },
    benefits: ["Trust in Allah's ultimate justice", "Accept His judgments with contentment"]
  },
  "Al-Adl": {
    transliteration: "Al-Adl",
    explanation: "Al-Adl means The Utterly Just. Allah's justice is perfect and absolute. He never wrongs anyone, not even by the weight of an atom. All His decrees, commands, and judgments are based on perfect justice and wisdom.",
    quranReference: {
      surah: "Al-Anbiya",
      ayah: "21:47",
      arabic: "وَنَضَعُ الْمَوَازِينَ الْقِسْطَ لِيَوْمِ الْقِيَامَةِ فَلَا تُظْلَمُ نَفْسٌ شَيْئًا",
      translation: "And We place the scales of justice for the Day of Resurrection, so no soul will be treated unjustly at all."
    },
    hadithReference: {
      source: "Sahih Muslim 2577",
      text: "O My servants, I have forbidden oppression for Myself and have made it forbidden amongst you, so do not oppress one another."
    },
    benefits: ["Be just in all dealings", "Trust that injustice will be addressed"]
  },
  "Al-Latif": {
    transliteration: "Al-Latif",
    explanation: "Al-Latif means The Subtle, The Kind. Allah is subtle in His knowledge, reaching the deepest secrets. He is gentle in His dealings, often blessing His servants in ways they don't expect or perceive. His kindness often works in subtle, unseen ways.",
    quranReference: {
      surah: "Al-An'am",
      ayah: "6:103",
      arabic: "لَّا تُدْرِكُهُ الْأَبْصَارُ وَهُوَ يُدْرِكُ الْأَبْصَارَ ۖ وَهُوَ اللَّطِيفُ الْخَبِيرُ",
      translation: "Vision perceives Him not, but He perceives all vision; and He is the Subtle, the Acquainted."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6389",
      text: "Allah is Kind and loves kindness in all affairs."
    },
    benefits: ["Trust in Allah's unseen care", "Notice His subtle blessings in life"]
  },
  "Al-Khabir": {
    transliteration: "Al-Khabir",
    explanation: "Al-Khabir means The All-Aware, The All-Acquainted. Allah knows the inner realities and true nature of all things. Nothing is hidden from His knowledge—He is aware of every secret, every intention, and every hidden matter.",
    quranReference: {
      surah: "Al-An'am",
      ayah: "6:18",
      arabic: "وَهُوَ الْحَكِيمُ الْخَبِيرُ",
      translation: "...And He is the Wise, the Acquainted."
    },
    hadithReference: {
      source: "Sahih Muslim 2564",
      text: "Allah does not look at your appearances or your wealth, but He looks at your hearts and your actions."
    },
    benefits: ["Purify intentions knowing Allah sees them", "Trust that He knows your true situation"]
  },
  "Al-Halim": {
    transliteration: "Al-Halim",
    explanation: "Al-Halim means The Forbearing, The Clement. Allah delays punishment despite having full power to punish immediately. He gives time for repentance and does not hasten to punish. His forbearance gives sinners opportunity to return to Him.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:225",
      arabic: "وَاللَّهُ غَفُورٌ حَلِيمٌ",
      translation: "...And Allah is Forgiving and Forbearing."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6099",
      text: "There is none more patient over something harmful that he hears than Allah. They claim He has a son, but He gives them health and provides for them."
    },
    benefits: ["Don't abuse Allah's patience by continuing in sin", "Practice forbearance with others"]
  },
  "Al-Azim": {
    transliteration: "Al-Azim",
    explanation: "Al-Azim means The Magnificent, The Supreme. Allah's greatness is beyond comprehension. He is great in His essence, attributes, and actions. Everything else is insignificant compared to His magnificence. This name inspires awe and reverence.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:255",
      arabic: "وَهُوَ الْعَلِيُّ الْعَظِيمُ",
      translation: "...And He is the Most High, the Most Great."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 4293",
      text: "How tremendous are the words: SubhanAllahi wa bihamdihi (Glory be to Allah and praise Him)."
    },
    benefits: ["Glorify Allah's greatness in prayer", "Put problems in perspective compared to His greatness"]
  },
  "Al-Ghafur": {
    transliteration: "Al-Ghafur",
    explanation: "Al-Ghafur means The Most Forgiving. Allah's forgiveness is vast and comprehensive. He not only forgives sins but covers them completely, wiping them out as if they never existed. His forgiveness brings complete pardon and removal of sins.",
    quranReference: {
      surah: "Az-Zumar",
      ayah: "39:53",
      arabic: "إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ",
      translation: "Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7507",
      text: "Allah's mercy prevails over His wrath."
    },
    benefits: ["Never despair of forgiveness, no matter the sin", "Be forgiving to others"]
  },
  "Ash-Shakur": {
    transliteration: "Ash-Shakur",
    explanation: "Ash-Shakur means The Most Appreciative, The Most Grateful. Allah appreciates and rewards even the smallest good deed. He multiplies rewards and never lets any good go unnoticed. His gratitude far exceeds what we deserve.",
    quranReference: {
      surah: "Fatir",
      ayah: "35:30",
      arabic: "إِنَّهُ غَفُورٌ شَكُورٌ",
      translation: "Indeed, He is Forgiving and Appreciative."
    },
    hadithReference: {
      source: "Sahih Muslim 2627",
      text: "A man removed a thorny branch from the road, and Allah thanked him for it and forgave him."
    },
    benefits: ["Do good deeds knowing Allah appreciates them", "Be grateful to Allah and to people"]
  },
  "Al-Ali": {
    transliteration: "Al-Ali",
    explanation: "Al-Ali means The Most High, The Sublime. Allah is exalted above all creation in His essence, attributes, and dominion. He is above the heavens, above the Throne, and above all imperfection. Nothing is above Him in any way.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:255",
      arabic: "وَهُوَ الْعَلِيُّ الْعَظِيمُ",
      translation: "...And He is the Most High, the Most Great."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7430",
      text: "The slave-girl said: 'In the heaven.' The Prophet said: 'Free her, for she is a believer.'"
    },
    benefits: ["Raise your hands in supplication to the Most High", "Lower yourself in prostration before Him"]
  },
  "Al-Kabir": {
    transliteration: "Al-Kabir",
    explanation: "Al-Kabir means The Most Great, The Grand. Allah is greater than everything in His essence, attributes, and actions. No mind can fully comprehend His greatness. This is why we say 'Allahu Akbar'—Allah is Greater (than everything).",
    quranReference: {
      surah: "Ar-Ra'd",
      ayah: "13:9",
      arabic: "الْكَبِيرُ الْمُتَعَالِ",
      translation: "...the Grand, the Exalted."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6382",
      text: "When you say 'Allahu Akbar' in prayer, then make your worldly concerns seem small before His greatness."
    },
    benefits: ["Say 'Allahu Akbar' with understanding", "No problem is too great for the Most Great"]
  },
  "Al-Hafiz": {
    transliteration: "Al-Hafiz",
    explanation: "Al-Hafiz means The Preserver, The Protector. Allah protects and preserves His creation from destruction, His Book from corruption, and His servants from harm when He wills. He keeps record of all deeds and guards whatever He chooses.",
    quranReference: {
      surah: "Hud",
      ayah: "11:57",
      arabic: "إِنَّ رَبِّي عَلَىٰ كُلِّ شَيْءٍ حَفِيظٌ",
      translation: "Indeed, my Lord is, over all things, Guardian."
    },
    hadithReference: {
      source: "Jami at-Tirmidhi 2516",
      text: "Guard Allah's commandments and He will guard you. Guard Allah's commandments and you will find Him before you."
    },
    benefits: ["Seek Allah's protection through obedience", "Trust in His preservation"]
  },
  "Al-Muqit": {
    transliteration: "Al-Muqit",
    explanation: "Al-Muqit means The Sustainer, The Nourisher. Allah provides the sustenance that maintains all life and creation. He gives each creature exactly what it needs for its sustenance—physical and spiritual. He has power over all things.",
    quranReference: {
      surah: "An-Nisa",
      ayah: "4:85",
      arabic: "وَكَانَ اللَّهُ عَلَىٰ كُلِّ شَيْءٍ مُّقِيتًا",
      translation: "...And ever is Allah, over all things, a Keeper."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7416",
      text: "There is no creature on earth but that upon Allah is its provision."
    },
    benefits: ["Trust in Allah for daily sustenance", "Seek both physical and spiritual nourishment"]
  },
  "Al-Hasib": {
    transliteration: "Al-Hasib",
    explanation: "Al-Hasib means The Reckoner, The Sufficient. Allah is sufficient for His servants in all their affairs, and He will call them to account for all their deeds. He keeps precise account of everything and is enough for whoever relies on Him.",
    quranReference: {
      surah: "An-Nisa",
      ayah: "4:6",
      arabic: "وَكَفَىٰ بِاللَّهِ حَسِيبًا",
      translation: "And sufficient is Allah as Accountant."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6565",
      text: "You will be brought to account even for the movement of stones."
    },
    benefits: ["Be mindful that all deeds are recorded", "Allah is sufficient—rely on Him"]
  },
  "Al-Jalil": {
    transliteration: "Al-Jalil",
    explanation: "Al-Jalil means The Majestic, The Glorious. Allah possesses perfect majesty, glory, and greatness. His majesty inspires reverence and awe. He combines all attributes of perfection and is free from all defects.",
    quranReference: {
      surah: "Ar-Rahman",
      ayah: "55:27",
      arabic: "وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ",
      translation: "And there will remain the Face of your Lord, Owner of Majesty and Honor."
    },
    hadithReference: {
      source: "Sahih Muslim 591",
      text: "Glorified and Exalted is the Owner of Majesty and Honor."
    },
    benefits: ["Approach Allah with awe and reverence", "Glorify His majesty in worship"]
  },
  "Al-Karim": {
    transliteration: "Al-Karim",
    explanation: "Al-Karim means The Most Generous, The Bountiful. Allah's generosity is unlimited. He gives without being asked, forgives without being prompted, and His gifts exceed all expectations. He gives to the deserving and undeserving, the grateful and ungrateful.",
    quranReference: {
      surah: "Al-Infitar",
      ayah: "82:6",
      arabic: "يَا أَيُّهَا الْإِنسَانُ مَا غَرَّكَ بِرَبِّكَ الْكَرِيمِ",
      translation: "O mankind, what has deceived you concerning your Lord, the Generous?"
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6502",
      text: "Allah stretches out His Hand during the night to accept the repentance of those who sinned during the day."
    },
    benefits: ["Ask Allah with confidence in His generosity", "Be generous to others"]
  },
  "Ar-Raqib": {
    transliteration: "Ar-Raqib",
    explanation: "Ar-Raqib means The Watchful, The Observer. Allah watches over all creation constantly. Nothing escapes His observation—not a leaf falls, not a thought occurs, not a secret is hidden. He watches to protect and to record.",
    quranReference: {
      surah: "An-Nisa",
      ayah: "4:1",
      arabic: "إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا",
      translation: "Indeed Allah is ever, over you, an Observer."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7416",
      text: "Ihsan (excellence) is to worship Allah as if you see Him, and if you cannot see Him, then know that He sees you."
    },
    benefits: ["Maintain awareness of Allah's watchfulness", "Act as if you're being observed"]
  },
  "Al-Mujib": {
    transliteration: "Al-Mujib",
    explanation: "Al-Mujib means The Responsive, The Answerer of Prayers. Allah responds to the supplications of His servants. He is near to those who call upon Him and answers their prayers in the way that is best for them, even if differently than expected.",
    quranReference: {
      surah: "Hud",
      ayah: "11:61",
      arabic: "إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ",
      translation: "Indeed, my Lord is near and responsive."
    },
    hadithReference: {
      source: "Sahih Muslim 2735",
      text: "Your Lord descends every night to the lowest heaven when the last third of the night remains, saying: 'Who is supplicating to Me so I may respond?'"
    },
    benefits: ["Call upon Allah with certainty He responds", "Make dua frequently and persistently"]
  },
  "Al-Wasi": {
    transliteration: "Al-Wasi",
    explanation: "Al-Wasi means The All-Encompassing, The Vast. Allah's mercy, knowledge, power, and generosity are vast and limitless. His resources never diminish, and His capacity to give is infinite. He encompasses all things.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:115",
      arabic: "إِنَّ اللَّهَ وَاسِعٌ عَلِيمٌ",
      translation: "Indeed, Allah is all-Encompassing and Knowing."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6469",
      text: "The spending of Allah never decreases from spending. If all creatures that ever existed asked Him, it would not decrease what He has."
    },
    benefits: ["Ask Allah without limitation", "His resources are infinite"]
  },
  "Al-Hakim": {
    transliteration: "Al-Hakim",
    explanation: "Al-Hakim means The Most Wise. Allah's wisdom is perfect in all His actions, decrees, and legislation. He places everything in its rightful place. Even when we don't understand His decree, His wisdom is certain.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:32",
      arabic: "إِنَّكَ أَنتَ الْعَلِيمُ الْحَكِيمُ",
      translation: "Indeed, it is You who is the Knowing, the Wise."
    },
    hadithReference: {
      source: "Sahih Muslim 2664",
      text: "Wondrous is the affair of the believer! Everything is good for him—and this is for no one except the believer."
    },
    benefits: ["Trust in Allah's wisdom even when confused", "Seek wisdom from the All-Wise"]
  },
  "Al-Wadud": {
    transliteration: "Al-Wadud",
    explanation: "Al-Wadud means The Most Loving. Allah loves His righteous servants and they love Him. His love is the highest form of love—pure, unconditional, and transformative. He loves those who repent, purify themselves, and do good.",
    quranReference: {
      surah: "Al-Buruj",
      ayah: "85:14",
      arabic: "وَهُوَ الْغَفُورُ الْوَدُودُ",
      translation: "And He is the Forgiving, the Affectionate."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6502",
      text: "When Allah loves a servant, He calls Jibreel and says: 'I love so-and-so, so love him.' So Jibreel loves him."
    },
    benefits: ["Seek Allah's love through good deeds", "Experience the sweetness of loving Allah"]
  },
  "Al-Majid": {
    transliteration: "Al-Majid",
    explanation: "Al-Majid means The Most Glorious. Allah is perfect in glory, honor, and generosity. His glory is manifest in His actions and attributes. He combines greatness with goodness, majesty with mercy.",
    quranReference: {
      surah: "Al-Buruj",
      ayah: "85:15",
      arabic: "ذُو الْعَرْشِ الْمَجِيدُ",
      translation: "Owner of the Glorious Throne."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 3370",
      text: "Say: O Allah, send blessings upon Muhammad and the family of Muhammad, as You sent blessings upon Ibrahim, indeed You are Praiseworthy, Glorious."
    },
    benefits: ["Glorify Allah in prayer", "Appreciate His magnificent attributes"]
  },
  "Al-Ba'ith": {
    transliteration: "Al-Ba'ith",
    explanation: "Al-Ba'ith means The Resurrector. Allah will resurrect all creation on the Day of Judgment. He brings the dead back to life and will raise all people from their graves to be held accountable. He also sends prophets to awaken humanity.",
    quranReference: {
      surah: "Al-Hajj",
      ayah: "22:7",
      arabic: "وَأَنَّ اللَّهَ يَبْعَثُ مَن فِي الْقُبُورِ",
      translation: "And [that they may know] that Allah will resurrect those in the graves."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7047",
      text: "People will be resurrected barefoot, naked, and uncircumcised."
    },
    benefits: ["Prepare for the Day of Resurrection", "Remember accountability after death"]
  },
  "Ash-Shahid": {
    transliteration: "Ash-Shahid",
    explanation: "Ash-Shahid means The Witness. Allah witnesses everything that occurs in creation—every action, word, thought, and intention. Nothing is hidden from Him. On the Day of Judgment, He will testify about all that occurred.",
    quranReference: {
      surah: "Al-Buruj",
      ayah: "85:9",
      arabic: "وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ شَهِيدٌ",
      translation: "And Allah, over all things, is Witness."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7121",
      text: "Each of you will speak to his Lord without an interpreter between them."
    },
    benefits: ["Be conscious that Allah witnesses all", "Find comfort that He witnesses your struggles"]
  },
  "Al-Haqq": {
    transliteration: "Al-Haqq",
    explanation: "Al-Haqq means The Truth, The Reality. Allah is the absolute Truth and Reality. Everything else is dependent and temporary, while He is eternal and independent. His words are truth, His promises are true, and His judgment is true.",
    quranReference: {
      surah: "Al-Hajj",
      ayah: "22:62",
      arabic: "ذَٰلِكَ بِأَنَّ اللَّهَ هُوَ الْحَقُّ",
      translation: "That is because Allah is the Truth."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 1120",
      text: "O Allah, You are the Truth, Your Promise is true, Your Speech is true, meeting You is true, Paradise is true, and Hell is true."
    },
    benefits: ["Seek truth from the source of all Truth", "Stand firm on truth in all matters"]
  },
  "Al-Wakil": {
    transliteration: "Al-Wakil",
    explanation: "Al-Wakil means The Trustee, The Disposer of Affairs. Allah is the One to whom we entrust our affairs. He is the best protector and manager of all matters. When we rely on Him, He takes care of our concerns in the best way.",
    quranReference: {
      surah: "Ali 'Imran",
      ayah: "3:173",
      arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
      translation: "Sufficient for us is Allah, and He is the best Disposer of affairs."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 4563",
      text: "Ibrahim said it when he was thrown into the fire, and Muhammad said it when people said: 'The people have gathered against you.'"
    },
    benefits: ["Place your trust in Allah completely", "Say 'Hasbunallahu wa ni'mal Wakil' in difficulty"]
  },
  "Al-Qawiyy": {
    transliteration: "Al-Qawiyy",
    explanation: "Al-Qawiyy means The Most Strong. Allah possesses perfect and unlimited strength. His strength never diminishes or weakens. He is the source of all power, and nothing can overcome or resist His might.",
    quranReference: {
      surah: "Ash-Shura",
      ayah: "42:19",
      arabic: "وَهُوَ الْقَوِيُّ الْعَزِيزُ",
      translation: "...and He is the Strong, the Exalted in Might."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6494",
      text: "The strong believer is better and more beloved to Allah than the weak believer, while there is good in both."
    },
    benefits: ["Rely on Allah's strength in weakness", "Draw strength from the Most Strong"]
  },
  "Al-Matin": {
    transliteration: "Al-Matin",
    explanation: "Al-Matin means The Firm, The Steadfast. Allah's strength is firm and unwavering. He never tires, weakens, or falters. His grip is firm, and His hold is unbreakable. He executes His will without any effort or fatigue.",
    quranReference: {
      surah: "Adh-Dhariyat",
      ayah: "51:58",
      arabic: "إِنَّ اللَّهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ",
      translation: "Indeed, it is Allah who is the Provider, the Firm possessor of strength."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7422",
      text: "Neither drowsiness nor sleep overtakes Him."
    },
    benefits: ["Find stability in the Most Firm", "Trust in His unwavering support"]
  },
  "Al-Waliyy": {
    transliteration: "Al-Waliyy",
    explanation: "Al-Waliyy means The Protecting Friend, The Guardian. Allah is the protecting friend of the believers. He guides them, protects them, supports them, and takes care of their affairs. His friendship brings honor and success.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:257",
      arabic: "اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا",
      translation: "Allah is the ally of those who believe."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6502",
      text: "Whoever takes a friend of Mine as an enemy, I declare war against him."
    },
    benefits: ["Seek Allah's friendship through faith", "He is the best friend and protector"]
  },
  "Al-Hamid": {
    transliteration: "Al-Hamid",
    explanation: "Al-Hamid means The Praiseworthy. Allah deserves all praise for His perfect attributes and actions. He is praiseworthy in Himself, regardless of whether He is praised. All praise ultimately returns to Him.",
    quranReference: {
      surah: "Ibrahim",
      ayah: "14:1",
      arabic: "الْحَمِيدُ",
      translation: "...the Praiseworthy."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 799",
      text: "Sami'Allahu liman hamidah, Rabbana wa lakal hamd—Allah hears the one who praises Him, Our Lord, and to You is all praise."
    },
    benefits: ["Praise Allah in all circumstances", "He alone deserves all praise"]
  },
  "Al-Muhsi": {
    transliteration: "Al-Muhsi",
    explanation: "Al-Muhsi means The Counter, The Reckoner. Allah counts and keeps record of everything. Every deed, word, and even intention is precisely recorded. Nothing is too small or too numerous to escape His accounting.",
    quranReference: {
      surah: "Maryam",
      ayah: "19:94",
      arabic: "لَّقَدْ أَحْصَاهُمْ وَعَدَّهُمْ عَدًّا",
      translation: "He has enumerated them and counted them a [full] counting."
    },
    hadithReference: {
      source: "Sahih Muslim 2677",
      text: "Allah has 99 names—whoever enumerates them will enter Paradise."
    },
    benefits: ["Every good deed is counted", "Be mindful of all actions"]
  },
  "Al-Mubdi": {
    transliteration: "Al-Mubdi",
    explanation: "Al-Mubdi means The Originator. Allah is the One who originated creation from nothing. He brought everything into existence without any prior model or example. Creation was initiated by His will and command alone.",
    quranReference: {
      surah: "Al-Buruj",
      ayah: "85:13",
      arabic: "إِنَّهُ هُوَ يُبْدِئُ وَيُعِيدُ",
      translation: "Indeed, it is He who originates [creation] and repeats."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7418",
      text: "Allah existed and nothing else existed before Him."
    },
    benefits: ["Marvel at the Originator of creation", "Trust in His creative power"]
  },
  "Al-Mu'id": {
    transliteration: "Al-Mu'id",
    explanation: "Al-Mu'id means The Restorer, The Repeater. Allah will restore creation on the Day of Resurrection. Just as He created initially, He will recreate and bring back all that existed. The second creation is even easier for Him.",
    quranReference: {
      surah: "Ar-Rum",
      ayah: "30:27",
      arabic: "وَهُوَ الَّذِي يَبْدَأُ الْخَلْقَ ثُمَّ يُعِيدُهُ",
      translation: "And it is He who begins creation; then He repeats it."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7383",
      text: "Allah will recreate man from a small bone at the base of the spine."
    },
    benefits: ["Believe in resurrection with certainty", "Prepare for the return to Allah"]
  },
  "Al-Muhyi": {
    transliteration: "Al-Muhyi",
    explanation: "Al-Muhyi means The Giver of Life. Allah is the One who gives life to the dead, to hearts through guidance, and to the earth through rain. He alone has the power to create life and to bring the dead back to life.",
    quranReference: {
      surah: "Ar-Rum",
      ayah: "30:50",
      arabic: "فَانظُرْ إِلَىٰ آثَارِ رَحْمَتِ اللَّهِ كَيْفَ يُحْيِي الْأَرْضَ بَعْدَ مَوْتِهَا",
      translation: "So observe the effects of the mercy of Allah—how He gives life to the earth after its lifelessness."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 3208",
      text: "Allah breathes the soul into the embryo after 120 days."
    },
    benefits: ["Seek spiritual life through guidance", "Allah can revive dead hearts"]
  },
  "Al-Mumit": {
    transliteration: "Al-Mumit",
    explanation: "Al-Mumit means The Bringer of Death. Allah is the One who decrees death for all living things. Every soul will taste death at its appointed time. He causes life to end according to His wisdom and perfect timing.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:258",
      arabic: "فَإِنَّ اللَّهَ يَأْتِي بِالشَّمْسِ مِنَ الْمَشْرِقِ فَأْتِ بِهَا مِنَ الْمَغْرِبِ",
      translation: "Ibrahim said, 'My Lord is He who gives life and causes death.'"
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6507",
      text: "Frequently remember the destroyer of pleasures—death."
    },
    benefits: ["Remember death to prioritize the Hereafter", "Prepare for the inevitable meeting with Allah"]
  },
  "Al-Hayy": {
    transliteration: "Al-Hayy",
    explanation: "Al-Hayy means The Ever-Living. Allah's life is eternal, perfect, and self-sustaining. He was not given life—He is Life itself. His life has no beginning and no end, unlike created life which is temporary and dependent.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:255",
      arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
      translation: "Allah—there is no deity except Him, the Ever-Living, the Sustainer of existence."
    },
    hadithReference: {
      source: "Jami at-Tirmidhi 3524",
      text: "Ya Hayyu Ya Qayyum, bi rahmatika astaghith—O Ever-Living, O Sustainer, by Your mercy I seek relief."
    },
    benefits: ["Call upon Al-Hayy in distress", "Trust in the One who never dies"]
  },
  "Al-Qayyum": {
    transliteration: "Al-Qayyum",
    explanation: "Al-Qayyum means The Self-Sustaining, The Sustainer of All. Allah sustains Himself and all of creation. Everything depends on Him, while He depends on nothing. He maintains the heavens, the earth, and all that exists.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:255",
      arabic: "الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
      translation: "The Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6306",
      text: "Ayatul Kursi is the greatest verse in the Quran because it contains the names Al-Hayy and Al-Qayyum."
    },
    benefits: ["Rely on the Sustainer of all", "Recite Ayatul Kursi for protection"]
  },
  "Al-Wajid": {
    transliteration: "Al-Wajid",
    explanation: "Al-Wajid means The Perceiver, The Finder. Allah finds and perceives everything. Nothing is lost or hidden from Him. He is also the Rich One who lacks nothing and finds no difficulty in anything.",
    quranReference: {
      surah: "Ad-Duha",
      ayah: "93:7",
      arabic: "وَوَجَدَكَ ضَالًّا فَهَدَىٰ",
      translation: "And He found you lost and guided [you]."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 5",
      text: "Allah found the Prophet unaware of the revelation and guided him."
    },
    benefits: ["Allah finds what is lost", "Nothing escapes His perception"]
  },
  "Al-Wahid": {
    transliteration: "Al-Wahid",
    explanation: "Al-Wahid means The Unique, The One. Allah is unique in His essence, attributes, and actions. There is none like Him, none comparable to Him, and none equal to Him. He is One without any partner.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:163",
      arabic: "وَإِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ",
      translation: "And your god is one God."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7392",
      text: "Say: He is Allah, the One. This surah equals one-third of the Quran."
    },
    benefits: ["Affirm Tawheed—Oneness of Allah", "Worship only the One God"]
  },
  "Al-Ahad": {
    transliteration: "Al-Ahad",
    explanation: "Al-Ahad means The One, The Indivisible. Allah is absolutely One—not composed of parts, not divisible, and not multiplied. His oneness is absolute and unique. This name emphasizes the uniqueness of His essence.",
    quranReference: {
      surah: "Al-Ikhlas",
      ayah: "112:1",
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      translation: "Say: He is Allah, [who is] One."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7392",
      text: "Say: He is Allah, the One. It equals one-third of the Quran."
    },
    benefits: ["Recite Surah Al-Ikhlas frequently", "Understand the absolute oneness of Allah"]
  },
  "As-Samad": {
    transliteration: "As-Samad",
    explanation: "As-Samad means The Eternal, The Absolute, The Self-Sufficient. Allah is the One upon whom all creation depends, while He depends on none. He is sought by all for their needs, yet He needs nothing. He is perfect and complete.",
    quranReference: {
      surah: "Al-Ikhlas",
      ayah: "112:2",
      arabic: "اللَّهُ الصَّمَدُ",
      translation: "Allah, the Eternal Refuge."
    },
    hadithReference: {
      source: "Jami at-Tirmidhi 3364",
      text: "As-Samad is the One who does not eat nor drink, the Eternal who is sought by all."
    },
    benefits: ["Turn to Allah for all needs", "He alone is self-sufficient"]
  },
  "Al-Qadir": {
    transliteration: "Al-Qadir",
    explanation: "Al-Qadir means The Omnipotent, The All-Capable. Allah has complete power over all things. Nothing is difficult for Him, and nothing can prevent Him from doing what He wills. His power is absolute and unlimited.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:284",
      arabic: "وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      translation: "...and Allah is over all things competent."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6400",
      text: "O Allah, I seek refuge in You by Your power—there is no deity but You."
    },
    benefits: ["Trust in Allah's unlimited power", "No problem is beyond His ability"]
  },
  "Al-Muqtadir": {
    transliteration: "Al-Muqtadir",
    explanation: "Al-Muqtadir means The All-Powerful, The Omnipotent. This name emphasizes the absolute extent of Allah's power. He has perfect control over everything, and nothing can resist or escape His authority.",
    quranReference: {
      surah: "Al-Qamar",
      ayah: "54:42",
      arabic: "فَأَخَذْنَاهُمْ أَخْذَ عَزِيزٍ مُّقْتَدِرٍ",
      translation: "...so We seized them with a seizure of one Exalted in Might and Perfect in Ability."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 3388",
      text: "There is no power and no strength except with Allah."
    },
    benefits: ["Recognize complete dependence on Allah", "His power overcomes all obstacles"]
  },
  "Al-Muqaddim": {
    transliteration: "Al-Muqaddim",
    explanation: "Al-Muqaddim means The Expediter, The Promoter. Allah brings forward or advances whomever and whatever He wills. He promotes in rank, brings forward in time, and hastens what He decrees according to His wisdom.",
    quranReference: {
      surah: "Ibrahim",
      ayah: "14:42",
      arabic: "إِنَّمَا يُؤَخِّرُهُمْ لِيَوْمٍ تَشْخَصُ فِيهِ الْأَبْصَارُ",
      translation: "He only delays them for a Day when eyes will stare [in horror]."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 744",
      text: "O Allah, forgive what I have done before and what I will do after."
    },
    benefits: ["Accept Allah's timing", "Trust that He advances what is best"]
  },
  "Al-Mu'akhkhir": {
    transliteration: "Al-Mu'akhkhir",
    explanation: "Al-Mu'akhkhir means The Delayer, The Retarder. Allah delays or holds back whomever and whatever He wills. He postpones according to His wisdom, and His delays are never without purpose. What is delayed may be for our benefit.",
    quranReference: {
      surah: "Ibrahim",
      ayah: "14:42",
      arabic: "وَلَا تَحْسَبَنَّ اللَّهَ غَافِلًا عَمَّا يَعْمَلُ الظَّالِمُونَ",
      translation: "And never think that Allah is unaware of what the wrongdoers do."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 744",
      text: "O Allah, forgive what I have done before and what I will do after."
    },
    benefits: ["Accept delays with patience", "His timing is perfect"]
  },
  "Al-Awwal": {
    transliteration: "Al-Awwal",
    explanation: "Al-Awwal means The First. Allah is the First without any beginning. He existed before anything else existed, before time, space, and creation. There was nothing before Him, and He brought everything else into existence.",
    quranReference: {
      surah: "Al-Hadid",
      ayah: "57:3",
      arabic: "هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ",
      translation: "He is the First and the Last, the Ascendant and the Intimate."
    },
    hadithReference: {
      source: "Sahih Muslim 2713",
      text: "O Allah, You are the First—there was nothing before You."
    },
    benefits: ["Begin all matters with Allah", "He preceded everything"]
  },
  "Al-Akhir": {
    transliteration: "Al-Akhir",
    explanation: "Al-Akhir means The Last. Allah is the Last without any end. After everything perishes, He will remain. He is eternal, and His existence has no conclusion. All creation will end, but He is everlasting.",
    quranReference: {
      surah: "Al-Hadid",
      ayah: "57:3",
      arabic: "هُوَ الْأَوَّلُ وَالْآخِرُ",
      translation: "He is the First and the Last..."
    },
    hadithReference: {
      source: "Sahih Muslim 2713",
      text: "And You are the Last—there is nothing after You."
    },
    benefits: ["Focus on the eternal, not temporary", "All returns to Allah in the end"]
  },
  "Az-Zahir": {
    transliteration: "Az-Zahir",
    explanation: "Az-Zahir means The Manifest, The Evident. Allah's existence is evident through His signs in creation. Though His essence is unseen, His power, wisdom, and mercy are manifest everywhere. He is above all creation.",
    quranReference: {
      surah: "Al-Hadid",
      ayah: "57:3",
      arabic: "وَالظَّاهِرُ وَالْبَاطِنُ",
      translation: "...the Ascendant and the Intimate."
    },
    hadithReference: {
      source: "Sahih Muslim 2713",
      text: "You are the Manifest—there is nothing above You."
    },
    benefits: ["See Allah's signs in creation", "Recognize His manifest presence"]
  },
  "Al-Batin": {
    transliteration: "Al-Batin",
    explanation: "Al-Batin means The Hidden, The Internal. While Allah's signs are manifest, His essence is hidden and unknowable. No vision can perceive Him in this world. He is closer to us than our jugular vein, yet hidden from sight.",
    quranReference: {
      surah: "Al-Hadid",
      ayah: "57:3",
      arabic: "وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ",
      translation: "...and He is, of all things, Knowing."
    },
    hadithReference: {
      source: "Sahih Muslim 2713",
      text: "And You are the Hidden—there is nothing closer than You."
    },
    benefits: ["Know that Allah is near even when unseen", "He knows all hidden matters"]
  },
  "Al-Wali": {
    transliteration: "Al-Wali",
    explanation: "Al-Wali means The Governor, The Patron. Allah governs all affairs of the universe. He is the sole administrator and owner of all creation. He manages, controls, and directs everything according to His perfect will.",
    quranReference: {
      surah: "Ar-Ra'd",
      ayah: "13:11",
      arabic: "وَمَا لَهُم مِّن دُونِهِ مِن وَالٍ",
      translation: "...and there is not for them besides Him any patron."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7431",
      text: "O Allah, Lord of the heavens and what they shade, Lord of the earths and what they carry..."
    },
    benefits: ["Submit to Allah's governance", "Trust in His management of affairs"]
  },
  "Al-Muta'ali": {
    transliteration: "Al-Muta'ali",
    explanation: "Al-Muta'ali means The Self-Exalted, The Most High. Allah is exalted above all His creation in every way—in His essence, attributes, and status. He is above any deficiency, comparison, or resemblance to creation.",
    quranReference: {
      surah: "Ar-Ra'd",
      ayah: "13:9",
      arabic: "عَالِمُ الْغَيْبِ وَالشَّهَادَةِ الْكَبِيرُ الْمُتَعَالِ",
      translation: "The Knower of the unseen and the witnessed, the Grand, the Exalted."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7429",
      text: "Glory be to the One who is exalted above what they attribute to Him."
    },
    benefits: ["Exalt Allah above all comparisons", "Worship the Most High alone"]
  },
  "Al-Barr": {
    transliteration: "Al-Barr",
    explanation: "Al-Barr means The Source of All Goodness. Allah is kind, generous, and benevolent to His creation. He is the source of all righteousness and goodness. His kindness extends to all creation in countless ways.",
    quranReference: {
      surah: "At-Tur",
      ayah: "52:28",
      arabic: "إِنَّهُ هُوَ الْبَرُّ الرَّحِيمُ",
      translation: "Indeed, it is He who is the Beneficent, the Merciful."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 5999",
      text: "Be dutiful to your parents and your children will be dutiful to you."
    },
    benefits: ["Appreciate Allah's countless kindnesses", "Be a source of good to others"]
  },
  "At-Tawwab": {
    transliteration: "At-Tawwab",
    explanation: "At-Tawwab means The Acceptor of Repentance, The Ever-Returning. Allah turns toward His servants with mercy when they turn to Him in repentance. He not only accepts repentance but also guides people to repent and loves to forgive.",
    quranReference: {
      surah: "At-Tawbah",
      ayah: "9:118",
      arabic: "ثُمَّ تَابَ عَلَيْهِمْ لِيَتُوبُوا ۚ إِنَّ اللَّهَ هُوَ التَّوَّابُ الرَّحِيمُ",
      translation: "Then He turned to them so they could repent. Indeed, Allah is the Accepting of repentance, the Merciful."
    },
    hadithReference: {
      source: "Sahih Muslim 2747",
      text: "Allah is more pleased with the repentance of His servant than one of you finding your lost camel."
    },
    benefits: ["Repent frequently and sincerely", "Never despair of returning to Allah"]
  },
  "Al-Muntaqim": {
    transliteration: "Al-Muntaqim",
    explanation: "Al-Muntaqim means The Avenger. Allah takes vengeance on those who persist in wrongdoing and transgression. His vengeance is based on perfect justice, not anger. He punishes the oppressors and vindicates the oppressed.",
    quranReference: {
      surah: "As-Sajdah",
      ayah: "32:22",
      arabic: "إِنَّا مِنَ الْمُجْرِمِينَ مُنتَقِمُونَ",
      translation: "Indeed We, from the criminals, will take retribution."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6927",
      text: "Allah gives respite to the oppressor until He seizes him, and then He does not let him go."
    },
    benefits: ["Fear Allah's vengeance for wrongdoing", "Trust that oppressors will be held accountable"]
  },
  "Al-Afuww": {
    transliteration: "Al-Afuww",
    explanation: "Al-Afuww means The Pardoner, The Effacer of Sins. Allah not only forgives sins but erases them completely as if they never occurred. His pardon is complete—He does not hold grudges or remind of past sins after forgiving.",
    quranReference: {
      surah: "An-Nisa",
      ayah: "4:99",
      arabic: "فَأُولَٰئِكَ عَسَى اللَّهُ أَن يَعْفُوَ عَنْهُمْ ۚ وَكَانَ اللَّهُ عَفُوًّا غَفُورًا",
      translation: "...For those it is expected that Allah will pardon them, and Allah is ever Pardoning and Forgiving."
    },
    hadithReference: {
      source: "Jami at-Tirmidhi 3513",
      text: "The Prophet taught Aisha to say in Laylatul Qadr: Allahumma innaka 'Afuwwun tuhibbul 'afwa fa'fu 'anni—O Allah, You are Pardoning and love to pardon, so pardon me."
    },
    benefits: ["Seek Allah's pardon especially in Ramadan", "Pardon others as you wish to be pardoned"]
  },
  "Ar-Ra'uf": {
    transliteration: "Ar-Ra'uf",
    explanation: "Ar-Ra'uf means The Most Kind, The Compassionate. Allah has extreme compassion and tenderness for His servants. He is gentle with them, does not burden them beyond their capacity, and shows the utmost care for their wellbeing.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:143",
      arabic: "إِنَّ اللَّهَ بِالنَّاسِ لَرَءُوفٌ رَّحِيمٌ",
      translation: "Indeed Allah is, to the people, Kind and Merciful."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6000",
      text: "Be merciful to others and you will receive mercy."
    },
    benefits: ["Experience Allah's tender care", "Show compassion to all creation"]
  },
  "Malik-ul-Mulk": {
    transliteration: "Malik-ul-Mulk",
    explanation: "Malik-ul-Mulk means Owner of All Sovereignty, Master of the Kingdom. Allah possesses absolute ownership and authority over all dominion. He gives power to whom He wills and takes it away from whom He wills.",
    quranReference: {
      surah: "Ali 'Imran",
      ayah: "3:26",
      arabic: "قُلِ اللَّهُمَّ مَالِكَ الْمُلْكِ تُؤْتِي الْمُلْكَ مَن تَشَاءُ",
      translation: "Say, 'O Allah, Owner of Sovereignty, You give sovereignty to whom You will.'"
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 2977",
      text: "O Allah, there is no one to withhold what You give, and none to give what You withhold."
    },
    benefits: ["Recognize that all power belongs to Allah", "Seek authority only through righteous means"]
  },
  "Dhul-Jalali wal-Ikram": {
    transliteration: "Dhul-Jalali wal-Ikram",
    explanation: "Dhul-Jalali wal-Ikram means Owner of Majesty and Honor. Allah possesses both awe-inspiring majesty and abundant generosity. He combines greatness that inspires reverence with kindness that inspires love.",
    quranReference: {
      surah: "Ar-Rahman",
      ayah: "55:27",
      arabic: "وَيَبْقَىٰ وَجْهُ رَبِّكَ ذُو الْجَلَالِ وَالْإِكْرَامِ",
      translation: "And there will remain the Face of your Lord, Owner of Majesty and Honor."
    },
    hadithReference: {
      source: "Jami at-Tirmidhi 3524",
      text: "Be constant in saying: Ya Dhal-Jalali wal-Ikram—O Possessor of Majesty and Honor."
    },
    benefits: ["Call upon Allah by this comprehensive name", "Balance reverence with hope in His generosity"]
  },
  "Al-Muqsit": {
    transliteration: "Al-Muqsit",
    explanation: "Al-Muqsit means The Just, The Equitable. Allah establishes perfect justice and equity. He never wrongs anyone, judges with complete fairness, and ensures that every right is fulfilled on the Day of Judgment.",
    quranReference: {
      surah: "Ali 'Imran",
      ayah: "3:18",
      arabic: "قَائِمًا بِالْقِسْطِ",
      translation: "...maintaining [creation] in justice."
    },
    hadithReference: {
      source: "Sahih Muslim 1827",
      text: "The just will be on pulpits of light on the Day of Judgment."
    },
    benefits: ["Be just in all dealings", "Trust in Allah's ultimate justice"]
  },
  "Al-Jami": {
    transliteration: "Al-Jami",
    explanation: "Al-Jami means The Gatherer. Allah will gather all creation on the Day of Judgment. He brings together what is scattered and unites what is separated. He also gathers various attributes of perfection in Himself.",
    quranReference: {
      surah: "Ali 'Imran",
      ayah: "3:9",
      arabic: "رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيهِ",
      translation: "Our Lord, surely You will gather the people for a Day about which there is no doubt."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 1347",
      text: "People will be gathered barefoot, naked, and uncircumcised."
    },
    benefits: ["Prepare for the Great Gathering", "Remember that all will be assembled before Allah"]
  },
  "Al-Ghaniyy": {
    transliteration: "Al-Ghaniyy",
    explanation: "Al-Ghaniyy means The Self-Sufficient, The Rich. Allah needs nothing from His creation. He is completely free of any need, while all creation is entirely dependent on Him. Our worship adds nothing to Him and our sins diminish nothing from Him.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:263",
      arabic: "وَاللَّهُ غَنِيٌّ حَلِيمٌ",
      translation: "And Allah is Free of need and Forbearing."
    },
    hadithReference: {
      source: "Sahih Muslim 2577",
      text: "O My servants, you will never attain harming Me so as to harm Me, and you will never attain benefiting Me so as to benefit Me."
    },
    benefits: ["Worship not for Allah's need but for your own", "Recognize your complete dependence on Him"]
  },
  "Al-Mughni": {
    transliteration: "Al-Mughni",
    explanation: "Al-Mughni means The Enricher. Allah enriches whom He wills with material wealth, spiritual contentment, or both. True richness is contentment of the heart, which comes only from Him. He makes self-sufficient whom He wills.",
    quranReference: {
      surah: "An-Najm",
      ayah: "53:48",
      arabic: "وَأَنَّهُ هُوَ أَغْنَىٰ وَأَقْنَىٰ",
      translation: "And that it is He who enriches and suffices."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6446",
      text: "Richness is not having many possessions, but richness is the richness of the soul."
    },
    benefits: ["Seek true richness through contentment", "Ask Allah to enrich your heart"]
  },
  "Al-Mani'": {
    transliteration: "Al-Mani'",
    explanation: "Al-Mani' means The Withholder, The Defender. Allah prevents harm from reaching His servants when He wills. He withholds things that would harm us, even if we desire them. He also defends and protects His chosen servants.",
    quranReference: {
      surah: "Ar-Ra'd",
      ayah: "13:11",
      arabic: "وَإِذَا أَرَادَ اللَّهُ بِقَوْمٍ سُوءًا فَلَا مَرَدَّ لَهُ",
      translation: "And when Allah intends for a people ill, there is no repelling it."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 2977",
      text: "There is no one to withhold what You give, and none to give what You withhold."
    },
    benefits: ["Trust that what Allah withholds may be protection", "Accept His decisions with contentment"]
  },
  "Ad-Darr": {
    transliteration: "Ad-Darr",
    explanation: "Ad-Darr means The Distresser, The Afflicter. Allah alone has the power to cause harm or affliction. This occurs according to His wisdom, often as a test, expiation, or wake-up call. No one can cause harm except by His permission.",
    quranReference: {
      surah: "Al-An'am",
      ayah: "6:17",
      arabic: "وَإِن يَمْسَسْكَ اللَّهُ بِضُرٍّ فَلَا كَاشِفَ لَهُ إِلَّا هُوَ",
      translation: "And if Allah should touch you with adversity, there is no remover of it except Him."
    },
    hadithReference: {
      source: "Jami at-Tirmidhi 2516",
      text: "Know that if the entire nation gathered to harm you, they could not harm you except with what Allah has already written for you."
    },
    benefits: ["Fear only Allah's harm", "Seek refuge in Him from all harm"]
  },
  "An-Nafi'": {
    transliteration: "An-Nafi'",
    explanation: "An-Nafi' means The Benefiter, The Creator of Good. Allah alone creates benefit and brings advantage. All good that reaches us is from Him. He is the source of every blessing, profit, and benefit in existence.",
    quranReference: {
      surah: "Al-An'am",
      ayah: "6:17",
      arabic: "وَإِن يَمْسَسْكَ بِخَيْرٍ فَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
      translation: "And if He touches you with good—then He is over all things competent."
    },
    hadithReference: {
      source: "Sahih Muslim 2722",
      text: "O Allah, benefit me with what You have taught me."
    },
    benefits: ["Recognize all benefit as from Allah", "Seek beneficial knowledge and deeds"]
  },
  "An-Nur": {
    transliteration: "An-Nur",
    explanation: "An-Nur means The Light. Allah is the Light of the heavens and the earth. He illuminates hearts with guidance, illuminates creation with His light, and His light is the source of all light—physical and spiritual.",
    quranReference: {
      surah: "An-Nur",
      ayah: "24:35",
      arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
      translation: "Allah is the Light of the heavens and the earth."
    },
    hadithReference: {
      source: "Sahih Muslim 179",
      text: "His veil is Light. If He were to remove it, the glory of His Face would burn everything of His creation as far as His sight reaches."
    },
    benefits: ["Seek Allah's light for guidance", "Let His light illuminate your heart"]
  },
  "Al-Hadi": {
    transliteration: "Al-Hadi",
    explanation: "Al-Hadi means The Guide. Allah guides His servants to what benefits them in this life and the next. He guides to faith, guides to the straight path, and guides through instinct every creature to its sustenance and survival.",
    quranReference: {
      surah: "Al-Hajj",
      ayah: "22:54",
      arabic: "وَإِنَّ اللَّهَ لَهَادِ الَّذِينَ آمَنُوا إِلَىٰ صِرَاطٍ مُّسْتَقِيمٍ",
      translation: "And indeed, Allah is the Guide of those who have believed to a straight path."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7392",
      text: "Ihdinas-siratal-mustaqeem—Guide us to the straight path."
    },
    benefits: ["Constantly ask for guidance", "Guidance is the greatest blessing"]
  },
  "Al-Badi'": {
    transliteration: "Al-Badi'",
    explanation: "Al-Badi' means The Incomparable Originator. Allah creates without any prior example or model. His creation is unique, original, and unprecedented. He invents and innovates in ways that no one has ever conceived before.",
    quranReference: {
      surah: "Al-Baqarah",
      ayah: "2:117",
      arabic: "بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ",
      translation: "Originator of the heavens and the earth."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7418",
      text: "Allah was, and nothing was before Him."
    },
    benefits: ["Marvel at the originality of creation", "Follow only His guidance, not innovations in religion"]
  },
  "Al-Baqi": {
    transliteration: "Al-Baqi",
    explanation: "Al-Baqi means The Everlasting, The Eternal. Allah remains forever while all else perishes. His existence has no end, just as it had no beginning. He will remain after everything else has ceased to exist.",
    quranReference: {
      surah: "Ar-Rahman",
      ayah: "55:26-27",
      arabic: "كُلُّ مَنْ عَلَيْهَا فَانٍ * وَيَبْقَىٰ وَجْهُ رَبِّكَ",
      translation: "Everyone upon it [the earth] will perish. And there will remain the Face of your Lord..."
    },
    hadithReference: {
      source: "Sahih Muslim 2717",
      text: "O Allah, I ask You for a blessing that does not end."
    },
    benefits: ["Focus on the eternal over the temporary", "Build for the lasting abode"]
  },
  "Al-Warith": {
    transliteration: "Al-Warith",
    explanation: "Al-Warith means The Inheritor. Allah inherits all things after their owners perish. When all creation ceases to exist, only He will remain. Everything returns to Him, and He is the ultimate owner of all that exists.",
    quranReference: {
      surah: "Al-Hijr",
      ayah: "15:23",
      arabic: "وَإِنَّا لَنَحْنُ نُحْيِي وَنُمِيتُ وَنَحْنُ الْوَارِثُونَ",
      translation: "And indeed, it is We who give life and cause death, and We are the Inheritor."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 7383",
      text: "You are the Living who does not die, while jinn and humans die."
    },
    benefits: ["Remember that everything returns to Allah", "Don't be attached to temporary possessions"]
  },
  "Ar-Rashid": {
    transliteration: "Ar-Rashid",
    explanation: "Ar-Rashid means The Guide to Right Path, The Righteous Teacher. Allah guides His servants to the path of righteousness and right conduct. His guidance is perfect, leading to success in this world and the Hereafter.",
    quranReference: {
      surah: "Al-Kahf",
      ayah: "18:17",
      arabic: "مَن يَهْدِ اللَّهُ فَهُوَ الْمُهْتَدِ",
      translation: "He whom Allah guides is the [rightly] guided."
    },
    hadithReference: {
      source: "Sahih Muslim 867",
      text: "The best guidance is the guidance of Muhammad (ﷺ)."
    },
    benefits: ["Follow righteous guidance", "Seek wisdom and right direction from Allah"]
  },
  "As-Sabur": {
    transliteration: "As-Sabur",
    explanation: "As-Sabur means The Most Patient. Allah is patient with His servants despite their sins and shortcomings. He does not hasten to punish but gives time for repentance. His patience is not from inability but from wisdom and mercy.",
    quranReference: {
      surah: "An-Nahl",
      ayah: "16:127",
      arabic: "وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ",
      translation: "And be patient, and your patience is not but through Allah."
    },
    hadithReference: {
      source: "Sahih Al-Bukhari 6099",
      text: "There is none more patient over something harmful that he hears than Allah. They claim He has a son, yet He gives them health and provides for them."
    },
    benefits: ["Develop patience through reliance on Allah", "Don't abuse His patience by persisting in sin"]
  }
};
