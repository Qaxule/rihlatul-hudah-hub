import { useState, useEffect } from "react";
import { PageWrapper } from "@/components/app/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useSEO, SEO_DATA } from "@/hooks/useSEO";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Dua {
  arabic: string;
  transliteration: string;
  meaning: string;
}

interface DuaCategory {
  category: string;
  duas: Dua[];
}

const duaCategories: DuaCategory[] = [
  {
    category: "Morning & Evening",
    duas: [
      {
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
        transliteration: "Asbahna wa asbahal mulku lillah",
        meaning: "We have entered morning and the dominion has entered morning belonging to Allah",
      },
      {
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا",
        transliteration: "Allahumma bika asbahna wa bika amsayna",
        meaning: "O Allah, by You we enter the morning and by You we enter the evening",
      },
      {
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ",
        transliteration: "Amsayna wa amsal mulku lillahi wal hamdulillah",
        meaning: "We have entered the evening and the dominion has entered the evening belonging to Allah, and all praise is for Allah",
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ",
        transliteration: "Allahumma inni as'aluka khayra hadhal yawm",
        meaning: "O Allah, I ask You for the good of this day",
      },
      {
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        transliteration: "A'udhu bikalimatillahit-tammati min sharri ma khalaq",
        meaning: "I seek refuge in the perfect words of Allah from the evil of what He has created",
      },
    ],
  },
  {
    category: "Before & After Meals",
    duas: [
      {
        arabic: "بِسْمِ اللَّهِ",
        transliteration: "Bismillah",
        meaning: "In the name of Allah",
      },
      {
        arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
        transliteration: "Bismillahi wa 'ala barakatillah",
        meaning: "In the name of Allah and with the blessings of Allah",
      },
      {
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
        transliteration: "Alhamdulillahil-ladhi at'amana wa saqana wa ja'alana muslimeen",
        meaning: "Praise be to Allah who has fed us and given us drink and made us Muslims",
      },
      {
        arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَأَطْعِمْنَا خَيْرًا مِنْهُ",
        transliteration: "Allahumma barik lana fihi wa at'imna khayran minhu",
        meaning: "O Allah, bless it for us and feed us with something better than it",
      },
    ],
  },
  {
    category: "Travel",
    duas: [
      {
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
        transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrineen",
        meaning: "Glory be to Him who has subjected this to us, and we could never have it by our efforts",
      },
      {
        arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى",
        transliteration: "Allahumma inna nas'aluka fi safarina hadhal birra wat-taqwa",
        meaning: "O Allah, we ask You for righteousness and piety in this journey of ours",
      },
      {
        arabic: "اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا",
        transliteration: "Allahumma hawwin 'alayna safarana hadha",
        meaning: "O Allah, make this journey of ours easy for us",
      },
    ],
  },
  {
    category: "Entering & Leaving Home",
    duas: [
      {
        arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        transliteration: "Bismillah, tawakkaltu 'alallah, la hawla wa la quwwata illa billah",
        meaning: "In the name of Allah, I place my trust in Allah, there is no might nor power except with Allah",
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ",
        transliteration: "Allahumma inni a'udhu bika an adilla aw udall",
        meaning: "O Allah, I seek refuge in You from going astray or being led astray",
      },
      {
        arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
        transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'alallahi rabbina tawakkalna",
        meaning: "In the name of Allah we enter and in the name of Allah we leave, and upon Allah our Lord we place our trust",
      },
    ],
  },
  {
    category: "Before & After Sleep",
    duas: [
      {
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliteration: "Bismika Allahumma amutu wa ahya",
        meaning: "In Your name, O Allah, I die and I live",
      },
      {
        arabic: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
        transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak",
        meaning: "O Allah, protect me from Your punishment on the Day You resurrect Your servants",
      },
      {
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        transliteration: "Alhamdulillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
        meaning: "Praise be to Allah who gave us life after causing us to die, and to Him is the resurrection",
      },
    ],
  },
  {
    category: "Entering & Leaving Masjid",
    duas: [
      {
        arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        transliteration: "Allahummaftah li abwaba rahmatik",
        meaning: "O Allah, open for me the doors of Your mercy",
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
        transliteration: "Allahumma inni as'aluka min fadlik",
        meaning: "O Allah, I ask You from Your bounty",
      },
    ],
  },
  {
    category: "Seeking Forgiveness",
    duas: [
      {
        arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ",
        transliteration: "Astaghfirullaha al-'Adheem alladhi la ilaha illa Huwal-Hayyul-Qayyum wa atubu ilayh",
        meaning: "I seek forgiveness from Allah the Almighty, besides whom there is no god, the Ever-Living, the Self-Subsisting, and I repent to Him",
      },
      {
        arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        transliteration: "Rabbighfir li wa tub 'alayya innaka antat-Tawwabur-Raheem",
        meaning: "My Lord, forgive me and accept my repentance. Indeed, You are the Accepting of repentance, the Merciful",
      },
      {
        arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        transliteration: "Allahumma inni dhalamtu nafsi dhulman kathiran wa la yaghfirudh-dhunuba illa ant",
        meaning: "O Allah, I have wronged myself greatly and none forgives sins but You",
      },
    ],
  },
  {
    category: "Protection & Safety",
    duas: [
      {
        arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ",
        transliteration: "Bismillahil-ladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'",
        meaning: "In the name of Allah with whose name nothing on earth or in heaven can cause harm",
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan",
        meaning: "O Allah, I seek refuge in You from anxiety and grief",
      },
      {
        arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ",
        transliteration: "Hasbiyallahu la ilaha illa Huwa 'alayhi tawakkaltu",
        meaning: "Allah is sufficient for me. There is no god but Him. In Him I put my trust",
      },
    ],
  },
  {
    category: "Gratitude & Praise",
    duas: [
      {
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Alhamdulillahi Rabbil-'alameen",
        meaning: "All praise is due to Allah, Lord of all the worlds",
      },
      {
        arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
        transliteration: "Subhanallahi wa bihamdihi, Subhanallahil-'Adheem",
        meaning: "Glory be to Allah and praise Him, Glory be to Allah the Almighty",
      },
      {
        arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ",
        transliteration: "La ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamd",
        meaning: "There is no god but Allah alone, with no partner. His is the dominion and His is the praise",
      },
    ],
  },
  {
    category: "When in Difficulty",
    duas: [
      {
        arabic: "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
        transliteration: "La ilaha illa Anta, Subhanaka, inni kuntu minadh-dhalimeen",
        meaning: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers",
      },
      {
        arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا",
        transliteration: "Allahumma la sahla illa ma ja'altahu sahla",
        meaning: "O Allah, there is nothing easy except what You make easy",
      },
      {
        arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
        transliteration: "Inna lillahi wa inna ilayhi raji'un",
        meaning: "Indeed, to Allah we belong and to Him we shall return",
      },
      {
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
        transliteration: "Ya Hayyu Ya Qayyum, bi rahmatika astaghith",
        meaning: "O Ever-Living, O Self-Sustaining, by Your mercy I seek relief",
      },
    ],
  },
  {
    category: "For Parents",
    duas: [
      {
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        transliteration: "Rabbir-hamhuma kama rabbayani saghira",
        meaning: "My Lord, have mercy upon them as they brought me up when I was small",
      },
      {
        arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
        transliteration: "Rabbighfir li wa liwalidayya wa lil-mu'minina yawma yaqumul-hisab",
        meaning: "My Lord, forgive me and my parents and the believers on the Day the account is established",
      },
    ],
  },
  {
    category: "For Knowledge",
    duas: [
      {
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        transliteration: "Rabbi zidni 'ilma",
        meaning: "My Lord, increase me in knowledge",
      },
      {
        arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي، وَعَلِّمْنِي مَا يَنْفَعُنِي",
        transliteration: "Allahumma anfa'ni bima 'allamtani, wa 'allimni ma yanfa'uni",
        meaning: "O Allah, benefit me with what You have taught me, and teach me that which will benefit me",
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا",
        transliteration: "Allahumma inni as'aluka 'ilman nafi'a",
        meaning: "O Allah, I ask You for beneficial knowledge",
      },
    ],
  },
];

const Duas = () => {
  useSEO(SEO_DATA.duas);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [savedDuas, setSavedDuas] = useState<Set<string>>(new Set());
  const [savingDua, setSavingDua] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSavedDuas();
    }
  }, [user]);

  const fetchSavedDuas = async () => {
    const { data, error } = await supabase
      .from("dua_bookmarks")
      .select("arabic");

    if (!error && data) {
      setSavedDuas(new Set(data.map((d) => d.arabic)));
    }
  };

  const toggleSaveDua = async (dua: Dua, category: string) => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to save duas",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setSavingDua(dua.arabic);
    const isSaved = savedDuas.has(dua.arabic);

    if (isSaved) {
      const { error } = await supabase
        .from("dua_bookmarks")
        .delete()
        .eq("arabic", dua.arabic)
        .eq("user_id", user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove dua",
          variant: "destructive",
        });
      } else {
        setSavedDuas((prev) => {
          const next = new Set(prev);
          next.delete(dua.arabic);
          return next;
        });
        toast({
          title: "Removed",
          description: "Dua removed from bookmarks",
        });
      }
    } else {
      const { error } = await supabase.from("dua_bookmarks").insert({
        user_id: user.id,
        category,
        arabic: dua.arabic,
        transliteration: dua.transliteration,
        meaning: dua.meaning,
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save dua",
          variant: "destructive",
        });
      } else {
        setSavedDuas((prev) => new Set(prev).add(dua.arabic));
        toast({
          title: "Saved",
          description: "Dua added to bookmarks",
        });
      }
    }

    setSavingDua(null);
  };

  return (
    <PageWrapper className="bg-gradient-subtle">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Duas & Supplications</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Essential prayers for every moment of your life
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {duaCategories.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
              <div className="space-y-4">
                {category.duas.map((dua, index) => {
                  const isSaved = savedDuas.has(dua.arabic);
                  const isSaving = savingDua === dua.arabic;

                  return (
                    <Card key={index} className="shadow-soft">
                      <CardHeader>
                        <CardTitle className="text-3xl font-arabic text-center leading-relaxed">
                          {dua.arabic}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-center text-muted-foreground italic">
                          {dua.transliteration}
                        </p>
                        <p className="text-center">{dua.meaning}</p>
                        <div className="flex justify-center">
                          <Button
                            variant={isSaved ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleSaveDua(dua, category.category)}
                            disabled={isSaving}
                          >
                            <Heart
                              className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`}
                            />
                            {isSaved ? "Saved" : "Save"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </PageWrapper>
  );
};

export default Duas;
