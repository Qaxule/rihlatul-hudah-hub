export interface ClarifiedSource {
  type: "quran" | "hadith";
  reference: string;
  arabic?: string;
  text: string;
  link?: string;
}

export interface ClarifiedArticle {
  id: string;
  category: string;
  myth: string;
  reality: string;
  summary: string;
  body: string[];
  sources: ClarifiedSource[];
}

export const clarifiedCategories = [
  { id: "beliefs", name: "Beliefs", description: "Who Muslims worship and what they believe" },
  { id: "women", name: "Women in Islam", description: "Rights, dignity and roles of women" },
  { id: "violence", name: "Violence and Jihad", description: "Peace, war and the sanctity of life" },
  { id: "society", name: "Society and Faith", description: "Freedom of belief and living with others" },
  { id: "terminology", name: "Terminology", description: "Commonly misunderstood words" },
];

export const clarifiedArticles: ClarifiedArticle[] = [
  {
    id: "allah-different-god",
    category: "beliefs",
    myth: "Muslims worship a different God called Allah",
    reality: "Allah is simply the Arabic word for God, the One Creator worshipped by Abraham, Moses and Jesus.",
    summary: "Arab Christians and Jews also use the word Allah for God.",
    body: [
      "The word Allah is the Arabic name for the One God. Arabic-speaking Christians use the same word in their Bibles and prayers.",
      "The Qur'an affirms that the God of Islam is the same God who sent the earlier prophets, and it calls Muslims to recognise the shared belief in One God with the People of the Book.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 29:46", link: "/surah/29", text: "And do not argue with the People of the Scripture except in a way that is best... and say, 'We believe in that which has been revealed to us and revealed to you. Our God and your God is one; and we are Muslims [in submission] to Him.'" },
      { type: "quran", reference: "Qur'an 112:1-4", link: "/surah/112", arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ", text: "Say, 'He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.'" },
    ],
  },
  {
    id: "jesus-rejected",
    category: "beliefs",
    myth: "Muslims do not believe in Jesus",
    reality: "Believing in Jesus as a mighty prophet and the Messiah is a requirement of Islamic faith.",
    summary: "Jesus and his mother Mary hold a place of great honour in the Qur'an.",
    body: [
      "Muslims believe in Jesus (Isa), peace be upon him, as one of the greatest messengers of God, born miraculously to the Virgin Mary. A whole chapter of the Qur'an is named after Mary.",
      "Islam differs from Christianity in that it regards Jesus as a human prophet rather than divine, but rejecting him would take a person outside of Islam.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 3:45", link: "/surah/3", text: "When the angels said, 'O Mary, indeed Allah gives you good tidings of a word from Him, whose name will be the Messiah, Jesus, the son of Mary, distinguished in this world and the Hereafter and among those brought near [to Allah].'" },
      { type: "hadith", reference: "Sahih al-Bukhari 3442", text: "The Prophet said: 'I am the closest of people to Jesus, son of Mary, in this world and the Hereafter. The prophets are brothers; their mothers are different, but their religion is one.'" },
    ],
  },
  {
    id: "forced-conversion",
    category: "society",
    myth: "Islam was spread by force and forces people to convert",
    reality: "The Qur'an explicitly forbids compulsion in religion. Faith that is forced is not valid.",
    summary: "The largest Muslim populations today, such as Indonesia, embraced Islam through trade and preaching.",
    body: [
      "Islamic law holds that belief must come from the heart, and so coercing belief is both forbidden and meaningless. Historically, non-Muslim communities lived for centuries under Muslim rule keeping their own religions.",
      "Indonesia, Malaysia and much of East and West Africa accepted Islam largely through merchants, scholars and personal example rather than conquest.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 2:256", link: "/surah/2", arabic: "لَا إِكْرَاهَ فِي الدِّينِ", text: "There shall be no compulsion in [acceptance of] the religion. The right course has become clear from the wrong." },
      { type: "quran", reference: "Qur'an 10:99", link: "/surah/10", text: "And had your Lord willed, those on earth would have believed - all of them entirely. Then, [O Muhammad], would you compel the people in order that they become believers?" },
      { type: "quran", reference: "Qur'an 109:6", link: "/surah/109", text: "For you is your religion, and for me is my religion." },
    ],
  },
  {
    id: "islam-terrorism",
    category: "violence",
    myth: "Islam promotes terrorism",
    reality: "Islam forbids the killing of innocent people and treats it as one of the gravest sins.",
    summary: "Mainstream scholars worldwide have consistently condemned terrorism as contrary to Islam.",
    body: [
      "The Qur'an equates the unjust killing of a single soul with killing all of humanity. Targeting civilians, women, children, the elderly and even trees is prohibited in Islamic rules of warfare.",
      "Acts of terror carried out by individuals claiming Islam are condemned by the overwhelming majority of Muslim scholars and are rejected by the texts themselves.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 5:32", link: "/surah/5", text: "Whoever kills a soul unless for a soul or for corruption [done] in the land - it is as if he had slain mankind entirely. And whoever saves one - it is as if he had saved mankind entirely." },
      { type: "hadith", reference: "Sahih al-Bukhari 6878", text: "The blood of a Muslim is not lawful to shed except in one of three cases... (showing the sanctity of human life is the default)." },
      { type: "hadith", reference: "Sahih al-Bukhari 3166", text: "The Prophet said: 'Whoever kills a person who has a treaty with the Muslims shall not smell the fragrance of Paradise.'" },
    ],
  },
  {
    id: "jihad-holy-war",
    category: "terminology",
    myth: "Jihad means holy war against non-Muslims",
    reality: "Jihad means striving or struggle, most importantly the struggle against one's own ego and wrongdoing.",
    summary: "Armed defence is only one limited form of jihad, bound by strict ethical rules.",
    body: [
      "Linguistically, jihad comes from the root j-h-d, meaning effort or exertion. It covers striving to worship well, seeking knowledge, speaking truth to injustice and caring for one's parents.",
      "Where armed struggle is permitted, it is restricted to legitimate authority, self-defence and the removal of oppression, and fighting must stop when the other side inclines to peace.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 2:190", link: "/surah/2", text: "Fight in the way of Allah those who fight you but do not transgress. Indeed, Allah does not like transgressors." },
      { type: "quran", reference: "Qur'an 8:61", link: "/surah/8", text: "And if they incline to peace, then incline to it [also] and rely upon Allah." },
      { type: "hadith", reference: "Sahih al-Bukhari 5972", text: "A man asked the Prophet for permission to join jihad. He asked, 'Are your parents alive?' He said yes. The Prophet said, 'Then strive (make jihad) in serving them.'" },
    ],
  },
  {
    id: "women-oppressed",
    category: "women",
    myth: "Islam oppresses women",
    reality: "Islam affirms the spiritual equality of women and granted rights to inheritance, property and consent in marriage over 1,400 years ago.",
    summary: "Cultural practices that harm women often contradict Islamic teachings.",
    body: [
      "The Qur'an addresses men and women equally in faith and reward. Women have the right to own and manage their wealth, to inherit, to seek education and to refuse a marriage proposal.",
      "The Prophet Muhammad, peace be upon him, taught that the best of men are those who treat their wives best. Oppression of women found in some societies stems from culture, not from the religion's sources.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 33:35", link: "/surah/33", text: "Indeed, the Muslim men and Muslim women, the believing men and believing women... Allah has prepared for them forgiveness and a great reward." },
      { type: "quran", reference: "Qur'an 4:7", link: "/surah/4", text: "For men is a share of what the parents and close relatives leave, and for women is a share of what the parents and close relatives leave." },
      { type: "hadith", reference: "Jami at-Tirmidhi 3895", text: "The Prophet said: 'The best of you are those who are best to their wives, and I am the best of you to my wives.'" },
    ],
  },
  {
    id: "hijab-forced",
    category: "women",
    myth: "The hijab is a symbol of oppression",
    reality: "For many Muslim women the hijab is a personal act of worship, modesty and identity chosen freely.",
    summary: "Modesty is commanded for both men and women in the Qur'an.",
    body: [
      "The Qur'an instructs believing men first to lower their gaze and guard their modesty, then gives similar instructions to believing women. Modesty is a shared value, not a burden placed only on women.",
      "Since there is no compulsion in religion, forcing the hijab on an unwilling woman undermines the sincerity that worship requires.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 24:30-31", link: "/surah/24", text: "Tell the believing men to reduce [some] of their vision and guard their private parts... And tell the believing women to reduce [some] of their vision and guard their private parts..." },
      { type: "hadith", reference: "Sahih al-Bukhari 1", text: "Actions are judged by intentions, and every person will have what they intended." },
    ],
  },
  {
    id: "women-education",
    category: "women",
    myth: "Islam discourages women from seeking education",
    reality: "Seeking knowledge is an obligation upon every Muslim, male and female.",
    summary: "Aishah, the Prophet's wife, was one of the greatest scholars of her time.",
    body: [
      "The first word revealed of the Qur'an was 'Read'. Knowledge is praised throughout the Qur'an and Sunnah without distinction between men and women.",
      "The world's oldest existing university, al-Qarawiyyin in Fez, was founded in 859 CE by a Muslim woman, Fatima al-Fihri.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 96:1", link: "/surah/96", arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ", text: "Read in the name of your Lord who created." },
      { type: "hadith", reference: "Sunan Ibn Majah 224", text: "The Prophet said: 'Seeking knowledge is an obligation upon every Muslim.'" },
    ],
  },
  {
    id: "hate-non-muslims",
    category: "society",
    myth: "Muslims are taught to hate non-Muslims",
    reality: "Muslims are commanded to be just and kind to all people who live peacefully with them.",
    summary: "The Prophet stood up out of respect for the funeral of a Jewish man.",
    body: [
      "The Qur'an permits and encourages kindness and fairness towards non-Muslims who do not fight Muslims. Muslims may do business with, marry from among the People of the Book, and share food with non-Muslims.",
      "Human diversity is presented in the Qur'an as a sign of God, meant for people to know one another.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 60:8", link: "/surah/60", text: "Allah does not forbid you from those who do not fight you because of religion and do not expel you from your homes - from being righteous toward them and acting justly toward them." },
      { type: "quran", reference: "Qur'an 49:13", link: "/surah/49", text: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another." },
      { type: "hadith", reference: "Sahih al-Bukhari 1312", text: "A funeral passed by and the Prophet stood up. It was said, 'It is the funeral of a Jew.' He said, 'Is it not a human soul?'" },
    ],
  },
  {
    id: "arabs-only",
    category: "society",
    myth: "Islam is a religion for Arabs",
    reality: "Islam is a universal message. Only around 20 percent of Muslims are Arab.",
    summary: "The country with the most Muslims is Indonesia.",
    body: [
      "The Prophet Muhammad was sent as a mercy to all of creation. Muslims today live on every continent and speak hundreds of languages.",
      "In his Farewell Sermon, the Prophet declared that no Arab has superiority over a non-Arab except by piety.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 21:107", link: "/surah/21", text: "And We have not sent you, [O Muhammad], except as a mercy to the worlds." },
      { type: "hadith", reference: "Musnad Ahmad 23489", text: "There is no superiority of an Arab over a non-Arab, nor a non-Arab over an Arab, nor white over black, nor black over white, except by piety." },
    ],
  },
  {
    id: "sharia-meaning",
    category: "terminology",
    myth: "Sharia just means harsh punishments",
    reality: "Sharia is the whole path of Islamic guidance, covering prayer, charity, ethics, family and justice.",
    summary: "Most of Sharia deals with personal worship and good conduct.",
    body: [
      "Sharia literally means 'the path to water'. It includes how Muslims pray, fast, give charity, treat neighbours and conduct business honestly.",
      "Scholars describe its objectives as preserving life, religion, intellect, family and wealth. Criminal penalties form a small part, carry very high standards of proof, and are to be avoided in cases of doubt.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 45:18", link: "/surah/45", text: "Then We put you, [O Muhammad], on an ordained way (sharia) concerning the matter [of religion]; so follow it." },
      { type: "quran", reference: "Qur'an 2:185", link: "/surah/2", text: "Allah intends for you ease and does not intend for you hardship." },
    ],
  },
  {
    id: "allahu-akbar",
    category: "terminology",
    myth: "Allahu Akbar is a war cry",
    reality: "Allahu Akbar means 'God is Greater' and is said in every prayer, at births, celebrations and moments of awe.",
    summary: "Muslims repeat this phrase dozens of times each day in worship.",
    body: [
      "The phrase opens every Muslim prayer and is repeated throughout it. It is whispered into the ear of newborn babies and said when seeing something beautiful.",
      "Its misuse by criminals does not change its meaning for nearly two billion people who say it in peaceful worship.",
    ],
    sources: [
      { type: "quran", reference: "Qur'an 17:111", link: "/surah/17", text: "And say, 'Praise to Allah, who has not taken a son and has had no partner in [His] dominion... And glorify Him with [great] glorification.'" },
      { type: "hadith", reference: "Sahih Muslim 597", text: "Whoever glorifies Allah, praises Him and declares His greatness (Allahu Akbar) thirty-three times after every prayer... his sins will be forgiven." },
    ],
  },
];
