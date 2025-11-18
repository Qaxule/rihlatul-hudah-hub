import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to get a deterministic "random" ayat based on the current date
const getAyatForToday = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  
  // Total approximate number of ayahs in the Quran: 6236
  // We'll select from a curated list of meaningful ayahs
  const meaningfulAyahs = [
    { surah: 2, ayah: 286, name: "Al-Baqarah" },
    { surah: 2, ayah: 255, name: "Al-Baqarah" }, // Ayat al-Kursi
    { surah: 3, ayah: 159, name: "Ali 'Imran" },
    { surah: 4, ayah: 58, name: "An-Nisa" },
    { surah: 5, ayah: 3, name: "Al-Ma'idah" },
    { surah: 9, ayah: 51, name: "At-Tawbah" },
    { surah: 13, ayah: 28, name: "Ar-Ra'd" },
    { surah: 14, ayah: 7, name: "Ibrahim" },
    { surah: 16, ayah: 97, name: "An-Nahl" },
    { surah: 17, ayah: 23, name: "Al-Isra" },
    { surah: 18, ayah: 46, name: "Al-Kahf" },
    { surah: 20, ayah: 25, name: "Ta-Ha" },
    { surah: 21, ayah: 87, name: "Al-Anbya" },
    { surah: 23, ayah: 115, name: "Al-Mu'minun" },
    { surah: 25, ayah: 63, name: "Al-Furqan" },
    { surah: 29, ayah: 45, name: "Al-'Ankabut" },
    { surah: 31, ayah: 15, name: "Luqman" },
    { surah: 33, ayah: 41, name: "Al-Ahzab" },
    { surah: 39, ayah: 53, name: "Az-Zumar" },
    { surah: 41, ayah: 34, name: "Fussilat" },
    { surah: 42, ayah: 40, name: "Ash-Shuraa" },
    { surah: 49, ayah: 10, name: "Al-Hujurat" },
    { surah: 49, ayah: 13, name: "Al-Hujurat" },
    { surah: 55, ayah: 13, name: "Ar-Rahman" },
    { surah: 59, ayah: 18, name: "Al-Hashr" },
    { surah: 64, ayah: 11, name: "At-Taghabun" },
    { surah: 65, ayah: 3, name: "At-Talaq" },
    { surah: 94, ayah: 5, name: "Ash-Sharh" },
    { surah: 103, ayah: 1, name: "Al-'Asr" },
    { surah: 112, ayah: 1, name: "Al-Ikhlas" },
  ];
  
  // Use day of year to select an ayah (cycles through the list)
  const selectedIndex = dayOfYear % meaningfulAyahs.length;
  return meaningfulAyahs[selectedIndex];
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const selectedAyat = getAyatForToday();
    console.log(`Fetching Ayat of the Day: Surah ${selectedAyat.surah}, Ayah ${selectedAyat.ayah}`);
    
    // Fetch Arabic text
    const arabicResponse = await fetch(
      `https://api.alquran.cloud/v1/ayah/${selectedAyat.surah}:${selectedAyat.ayah}/ar.alafasy`
    );
    
    if (!arabicResponse.ok) {
      throw new Error('Failed to fetch Arabic text');
    }
    
    const arabicData = await arabicResponse.json();
    
    // Fetch English translation
    const englishResponse = await fetch(
      `https://api.alquran.cloud/v1/ayah/${selectedAyat.surah}:${selectedAyat.ayah}/en.sahih`
    );
    
    if (!englishResponse.ok) {
      throw new Error('Failed to fetch English translation');
    }
    
    const englishData = await englishResponse.json();
    
    // Combine the data
    const result = {
      surah: {
        number: selectedAyat.surah,
        name: selectedAyat.name,
        englishName: arabicData.data.surah.englishName,
        arabicName: arabicData.data.surah.name
      },
      ayah: {
        number: selectedAyat.ayah,
        numberInSurah: arabicData.data.numberInSurah,
        arabic: arabicData.data.text,
        translation: englishData.data.text
      }
    };
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching Ayat of the Day:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
