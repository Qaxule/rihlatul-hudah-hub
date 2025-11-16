import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query || query.trim().length < 2) {
      return new Response(
        JSON.stringify({ error: "Search query must be at least 2 characters" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Searching Quran for: ${query}`);

    // Search in both Arabic and English
    const searchPromises = [
      // Search Arabic text
      fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/ar.alafasy`),
      // Search English translation
      fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/en.sahih`),
    ];

    const [arabicResponse, englishResponse] = await Promise.all(searchPromises);

    if (!arabicResponse.ok && !englishResponse.ok) {
      throw new Error("Search failed");
    }

    const results: any[] = [];
    const seenAyahs = new Set<string>();

    // Process English results first (most likely for English queries)
    if (englishResponse.ok) {
      const englishData = await englishResponse.json();
      if (englishData.data?.matches) {
        for (const match of englishData.data.matches) {
          const key = `${match.surah.number}-${match.numberInSurah}`;
          if (!seenAyahs.has(key)) {
            seenAyahs.add(key);
            
            // Fetch Arabic text for this ayah
            const arabicAyahResponse = await fetch(
              `https://api.alquran.cloud/v1/ayah/${match.surah.number}:${match.numberInSurah}/ar.alafasy`
            );
            
            let arabicText = match.text; // fallback
            if (arabicAyahResponse.ok) {
              const arabicAyahData = await arabicAyahResponse.json();
              arabicText = arabicAyahData.data.text;
            }

            results.push({
              surahNumber: match.surah.number,
              ayahNumber: match.numberInSurah,
              arabicText: arabicText,
              translation: match.text,
              surahName: match.surah.englishName,
            });
          }
        }
      }
    }

    // Process Arabic results
    if (arabicResponse.ok) {
      const arabicData = await arabicResponse.json();
      if (arabicData.data?.matches) {
        for (const match of arabicData.data.matches) {
          const key = `${match.surah.number}-${match.numberInSurah}`;
          if (!seenAyahs.has(key)) {
            seenAyahs.add(key);
            
            // Fetch English translation for this ayah
            const englishAyahResponse = await fetch(
              `https://api.alquran.cloud/v1/ayah/${match.surah.number}:${match.numberInSurah}/en.sahih`
            );
            
            let translation = "";
            if (englishAyahResponse.ok) {
              const englishAyahData = await englishAyahResponse.json();
              translation = englishAyahData.data.text;
            }

            results.push({
              surahNumber: match.surah.number,
              ayahNumber: match.numberInSurah,
              arabicText: match.text,
              translation: translation,
              surahName: match.surah.englishName,
            });
          }
        }
      }
    }

    return new Response(JSON.stringify({ results: results.slice(0, 20) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error searching Quran:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
