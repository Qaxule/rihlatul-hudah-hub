import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface LessonContentProps {
  text: string;
  className?: string;
}

// Map of Surah names to numbers
const surahNameToNumber: { [key: string]: number } = {
  "al-fatihah": 1, "al-baqarah": 2, "aal-imran": 3, "an-nisa": 4,
  "al-ma'idah": 5, "al-an'am": 6, "al-a'raf": 7, "al-anfal": 8,
  "at-tawbah": 9, "yunus": 10, "hud": 11, "yusuf": 12,
  "ar-ra'd": 13, "ibrahim": 14, "al-hijr": 15, "an-nahl": 16,
  "al-isra": 17, "al-kahf": 18, "maryam": 19, "ta-ha": 20,
  "al-anbiya": 21, "al-hajj": 22, "al-mu'minun": 23, "an-nur": 24,
  "al-furqan": 25, "ash-shu'ara": 26, "an-naml": 27, "al-qasas": 28,
  "al-ankabut": 29, "ar-rum": 30, "luqman": 31, "as-sajdah": 32,
  "al-ahzab": 33, "saba": 34, "fatir": 35, "ya-sin": 36,
  "as-saffat": 37, "sad": 38, "az-zumar": 39, "ghafir": 40,
  "fussilat": 41, "ash-shura": 42, "az-zukhruf": 43, "ad-dukhan": 44,
  "al-jathiyah": 45, "al-ahqaf": 46, "muhammad": 47, "al-fath": 48,
  "al-hujurat": 49, "qaf": 50, "adh-dhariyat": 51, "at-tur": 52,
  "an-najm": 53, "al-qamar": 54, "ar-rahman": 55, "al-waqi'ah": 56,
  "al-hadid": 57, "al-mujadilah": 58, "al-hashr": 59, "al-mumtahanah": 60,
  "as-saff": 61, "al-jumu'ah": 62, "al-munafiqun": 63, "at-taghabun": 64,
  "at-talaq": 65, "at-tahrim": 66, "al-mulk": 67, "al-qalam": 68,
  "al-haqqah": 69, "al-ma'arij": 70, "nuh": 71, "al-jinn": 72,
  "al-muzzammil": 73, "al-muddaththir": 74, "al-qiyamah": 75, "al-insan": 76,
  "al-mursalat": 77, "an-naba": 78, "an-nazi'at": 79, "abasa": 80,
  "at-takwir": 81, "al-infitar": 82, "al-mutaffifin": 83, "al-inshiqaq": 84,
  "al-buruj": 85, "at-tariq": 86, "al-a'la": 87, "al-ghashiyah": 88,
  "al-fajr": 89, "al-balad": 90, "ash-shams": 91, "al-layl": 92,
  "ad-duha": 93, "ash-sharh": 94, "at-tin": 95, "al-alaq": 96,
  "al-qadr": 97, "al-bayyinah": 98, "az-zalzalah": 99, "al-adiyat": 100,
  "al-qari'ah": 101, "at-takathur": 102, "al-asr": 103, "al-humazah": 104,
  "al-fil": 105, "quraysh": 106, "al-ma'un": 107, "al-kawthar": 108,
  "al-kafirun": 109, "an-nasr": 110, "al-masad": 111, "al-ikhlas": 112,
  "al-falaq": 113, "an-nas": 114
};

const LessonContent = ({ text, className = "" }: LessonContentProps) => {
  const navigate = useNavigate();

  const parseAndRenderContent = () => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // Pattern to match Surah references like "Surah Al-Baqarah 2:255" or "(Surah At-Tawbah 9:60)"
    const surahPattern = /(?:\()?Surah\s+([\w'-]+)\s+(\d+):(\d+)(?:-(\d+))?(?:\))?/gi;
    
    // Pattern to match Hadith references like "[Sahih al-Bukhari 8]" or "[Sunan al-Tirmidhi 413]"
    const hadithPattern = /\[(Sahih al-Bukhari|Sahih Muslim|Sunan al-Tirmidhi|Sunan Abu Dawud|Sunan an-Nasa'i|Sunan Ibn Majah|Musnad Ahmad|Muwatta Malik)\s+(\d+)\]/gi;

    // Combine both patterns
    const combinedPattern = new RegExp(
      `${surahPattern.source}|${hadithPattern.source}`,
      'gi'
    );

    let match;
    while ((match = combinedPattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Check if it's a Surah reference
      if (match[1]) {
        const surahName = match[1].toLowerCase().replace(/'/g, "'");
        const surahNumber = match[2];
        const ayahStart = match[3];
        const ayahEnd = match[4];
        const fullMatch = match[0];

        const surahNum = surahNameToNumber[surahName] || parseInt(surahNumber);

        parts.push(
          <button
            key={`surah-${match.index}`}
            onClick={() => navigate(`/surah/${surahNum}#ayah-${ayahStart}`)}
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 underline decoration-dotted underline-offset-2 transition-colors font-medium"
          >
            {fullMatch}
            <ExternalLink className="h-3 w-3" />
          </button>
        );
      }
      // Check if it's a Hadith reference
      else if (match[5]) {
        const collectionName = match[5];
        const hadithNumber = match[6];
        const fullMatch = match[0];

        parts.push(
          <button
            key={`hadith-${match.index}`}
            onClick={() => navigate('/hadith')}
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 underline decoration-dotted underline-offset-2 transition-colors font-medium"
          >
            {fullMatch}
            <ExternalLink className="h-3 w-3" />
          </button>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  const content = parseAndRenderContent();

  return (
    <div className={className}>
      {content.map((part, index) => (
        <span key={index}>{part}</span>
      ))}
    </div>
  );
};

export default LessonContent;
