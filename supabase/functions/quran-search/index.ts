import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { gunzipSync } from "node:zlib";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Magic bytes for compression formats
const ZSTD_MAGIC = [0x28, 0xb5, 0x2f, 0xfd];
const GZIP_MAGIC = [0x1f, 0x8b];

// Surah metadata for filtering
const surahMetadata: { [key: number]: { juz: number[]; revelationType: string } } = {
  1: { juz: [1], revelationType: "Meccan" },
  2: { juz: [1, 2, 3], revelationType: "Medinan" },
  3: { juz: [3, 4], revelationType: "Medinan" },
  4: { juz: [4, 5, 6], revelationType: "Medinan" },
  5: { juz: [6, 7], revelationType: "Medinan" },
  6: { juz: [7, 8], revelationType: "Meccan" },
  7: { juz: [8, 9], revelationType: "Meccan" },
  8: { juz: [9, 10], revelationType: "Medinan" },
  9: { juz: [10, 11], revelationType: "Medinan" },
  10: { juz: [11], revelationType: "Meccan" },
  11: { juz: [11, 12], revelationType: "Meccan" },
  12: { juz: [12, 13], revelationType: "Meccan" },
  13: { juz: [13], revelationType: "Medinan" },
  14: { juz: [13], revelationType: "Meccan" },
  15: { juz: [14], revelationType: "Meccan" },
  16: { juz: [14], revelationType: "Meccan" },
  17: { juz: [15], revelationType: "Meccan" },
  18: { juz: [15, 16], revelationType: "Meccan" },
  19: { juz: [16], revelationType: "Meccan" },
  20: { juz: [16], revelationType: "Meccan" },
  21: { juz: [17], revelationType: "Meccan" },
  22: { juz: [17], revelationType: "Medinan" },
  23: { juz: [18], revelationType: "Meccan" },
  24: { juz: [18], revelationType: "Medinan" },
  25: { juz: [18, 19], revelationType: "Meccan" },
  26: { juz: [19], revelationType: "Meccan" },
  27: { juz: [19, 20], revelationType: "Meccan" },
  28: { juz: [20], revelationType: "Meccan" },
  29: { juz: [20, 21], revelationType: "Meccan" },
  30: { juz: [21], revelationType: "Meccan" },
  31: { juz: [21], revelationType: "Meccan" },
  32: { juz: [21], revelationType: "Meccan" },
  33: { juz: [21, 22], revelationType: "Medinan" },
  34: { juz: [22], revelationType: "Meccan" },
  35: { juz: [22], revelationType: "Meccan" },
  36: { juz: [22, 23], revelationType: "Meccan" },
  37: { juz: [23], revelationType: "Meccan" },
  38: { juz: [23], revelationType: "Meccan" },
  39: { juz: [23, 24], revelationType: "Meccan" },
  40: { juz: [24], revelationType: "Meccan" },
  41: { juz: [24, 25], revelationType: "Meccan" },
  42: { juz: [25], revelationType: "Meccan" },
  43: { juz: [25], revelationType: "Meccan" },
  44: { juz: [25], revelationType: "Meccan" },
  45: { juz: [25], revelationType: "Meccan" },
  46: { juz: [26], revelationType: "Meccan" },
  47: { juz: [26], revelationType: "Medinan" },
  48: { juz: [26], revelationType: "Medinan" },
  49: { juz: [26], revelationType: "Medinan" },
  50: { juz: [26], revelationType: "Meccan" },
  51: { juz: [26, 27], revelationType: "Meccan" },
  52: { juz: [27], revelationType: "Meccan" },
  53: { juz: [27], revelationType: "Meccan" },
  54: { juz: [27], revelationType: "Meccan" },
  55: { juz: [27], revelationType: "Medinan" },
  56: { juz: [27], revelationType: "Meccan" },
  57: { juz: [27], revelationType: "Medinan" },
  58: { juz: [28], revelationType: "Medinan" },
  59: { juz: [28], revelationType: "Medinan" },
  60: { juz: [28], revelationType: "Medinan" },
  61: { juz: [28], revelationType: "Medinan" },
  62: { juz: [28], revelationType: "Medinan" },
  63: { juz: [28], revelationType: "Medinan" },
  64: { juz: [28], revelationType: "Medinan" },
  65: { juz: [28], revelationType: "Medinan" },
  66: { juz: [28], revelationType: "Medinan" },
  67: { juz: [29], revelationType: "Meccan" },
  68: { juz: [29], revelationType: "Meccan" },
  69: { juz: [29], revelationType: "Meccan" },
  70: { juz: [29], revelationType: "Meccan" },
  71: { juz: [29], revelationType: "Meccan" },
  72: { juz: [29], revelationType: "Meccan" },
  73: { juz: [29], revelationType: "Meccan" },
  74: { juz: [29], revelationType: "Meccan" },
  75: { juz: [29], revelationType: "Meccan" },
  76: { juz: [29], revelationType: "Medinan" },
  77: { juz: [29], revelationType: "Meccan" },
  78: { juz: [30], revelationType: "Meccan" },
  79: { juz: [30], revelationType: "Meccan" },
  80: { juz: [30], revelationType: "Meccan" },
  81: { juz: [30], revelationType: "Meccan" },
  82: { juz: [30], revelationType: "Meccan" },
  83: { juz: [30], revelationType: "Meccan" },
  84: { juz: [30], revelationType: "Meccan" },
  85: { juz: [30], revelationType: "Meccan" },
  86: { juz: [30], revelationType: "Meccan" },
  87: { juz: [30], revelationType: "Meccan" },
  88: { juz: [30], revelationType: "Meccan" },
  89: { juz: [30], revelationType: "Meccan" },
  90: { juz: [30], revelationType: "Meccan" },
  91: { juz: [30], revelationType: "Meccan" },
  92: { juz: [30], revelationType: "Meccan" },
  93: { juz: [30], revelationType: "Meccan" },
  94: { juz: [30], revelationType: "Meccan" },
  95: { juz: [30], revelationType: "Meccan" },
  96: { juz: [30], revelationType: "Meccan" },
  97: { juz: [30], revelationType: "Meccan" },
  98: { juz: [30], revelationType: "Medinan" },
  99: { juz: [30], revelationType: "Medinan" },
  100: { juz: [30], revelationType: "Meccan" },
  101: { juz: [30], revelationType: "Meccan" },
  102: { juz: [30], revelationType: "Meccan" },
  103: { juz: [30], revelationType: "Meccan" },
  104: { juz: [30], revelationType: "Meccan" },
  105: { juz: [30], revelationType: "Meccan" },
  106: { juz: [30], revelationType: "Meccan" },
  107: { juz: [30], revelationType: "Meccan" },
  108: { juz: [30], revelationType: "Meccan" },
  109: { juz: [30], revelationType: "Meccan" },
  110: { juz: [30], revelationType: "Medinan" },
  111: { juz: [30], revelationType: "Meccan" },
  112: { juz: [30], revelationType: "Meccan" },
  113: { juz: [30], revelationType: "Meccan" },
  114: { juz: [30], revelationType: "Meccan" },
};

// Check if query contains Arabic characters
function containsArabic(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);
}

async function fetchAndParse(url: string, retries = 3): Promise<any> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const cacheBuster = `_cb=${Date.now()}_${attempt}`;
      const urlWithCb = url.includes('?') ? `${url}&${cacheBuster}` : `${url}?${cacheBuster}`;
      
      const response = await fetch(urlWithCb, {
        headers: {
          "User-Agent": "Rihlatul-Hudah/1.0",
          "Accept": "application/json",
          "Accept-Encoding": "identity",
          "Cache-Control": "no-cache",
        }
      });

      if (!response.ok) {
        console.log(`Attempt ${attempt + 1}: HTTP ${response.status}`);
        return null;
      }

      const contentEncoding = response.headers.get("content-encoding");
      
      if (!contentEncoding || contentEncoding === "identity") {
        const text = await response.text();
        if (text.charCodeAt(0) === 0x28 && text.charCodeAt(1) === 0xb5) {
          console.log(`Attempt ${attempt + 1}: Got zstd in text, retrying...`);
          await new Promise(r => setTimeout(r, 100 * (attempt + 1)));
          continue;
        }
        return JSON.parse(text);
      }

      const arrayBuffer = await response.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      if (bytes[0] === ZSTD_MAGIC[0] && bytes[1] === ZSTD_MAGIC[1]) {
        console.log(`Attempt ${attempt + 1}: Got zstd compressed, retrying...`);
        await new Promise(r => setTimeout(r, 100 * (attempt + 1)));
        continue;
      }

      if (contentEncoding === "gzip" || (bytes[0] === GZIP_MAGIC[0] && bytes[1] === GZIP_MAGIC[1])) {
        const decompressed = gunzipSync(bytes);
        return JSON.parse(new TextDecoder().decode(decompressed));
      }

      return JSON.parse(new TextDecoder().decode(bytes));
    } catch (error) {
      console.error(`Attempt ${attempt + 1} error:`, error);
      if (attempt < retries - 1) {
        await new Promise(r => setTimeout(r, 100 * (attempt + 1)));
      }
    }
  }
  return null;
}

function matchesFilters(
  surahNumber: number,
  filters: { surah?: number; juz?: number; revelationType?: string }
): boolean {
  const meta = surahMetadata[surahNumber];
  if (!meta) return true;

  if (filters.surah && filters.surah !== surahNumber) {
    return false;
  }

  if (filters.juz && !meta.juz.includes(filters.juz)) {
    return false;
  }

  if (filters.revelationType && meta.revelationType !== filters.revelationType) {
    return false;
  }

  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, filters } = await req.json();
    
    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: "Search query must be a string" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const trimmedQuery = query.trim();
    
    if (trimmedQuery.length < 2) {
      return new Response(
        JSON.stringify({ results: [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (trimmedQuery.length > 500) {
      return new Response(
        JSON.stringify({ error: "Search query too long" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isArabicSearch = containsArabic(trimmedQuery);
    console.log(`Searching Quran for: ${trimmedQuery} (Arabic: ${isArabicSearch})`);
    console.log(`Filters:`, filters);

    const results: any[] = [];
    const seenAyahs = new Set<string>();

    if (isArabicSearch) {
      // Search in Arabic text
      const arabicData = await fetchAndParse(
        `https://api.alquran.cloud/v1/search/${encodeURIComponent(trimmedQuery)}/all/ar.alafasy`
      );

      if (arabicData?.data?.matches) {
        const matches = arabicData.data.matches.slice(0, 20);
        
        for (const match of matches) {
          const key = `${match.surah.number}-${match.numberInSurah}`;
          
          if (!matchesFilters(match.surah.number, filters || {})) {
            continue;
          }
          
          if (!seenAyahs.has(key)) {
            seenAyahs.add(key);
            
            // Fetch English translation
            const translationData = await fetchAndParse(
              `https://api.alquran.cloud/v1/ayah/${match.surah.number}:${match.numberInSurah}/en.sahih`
            );

            results.push({
              surahNumber: match.surah.number,
              ayahNumber: match.numberInSurah,
              arabicText: match.text,
              translation: translationData?.data?.text || "",
              surahName: match.surah.englishName,
              revelationType: surahMetadata[match.surah.number]?.revelationType || "Unknown",
            });
          }
        }
      }
    } else {
      // Search in English translation
      const englishData = await fetchAndParse(
        `https://api.alquran.cloud/v1/search/${encodeURIComponent(trimmedQuery)}/all/en.sahih`
      );

      if (englishData?.data?.matches) {
        const matches = englishData.data.matches.slice(0, 20);
        
        for (const match of matches) {
          const key = `${match.surah.number}-${match.numberInSurah}`;
          
          if (!matchesFilters(match.surah.number, filters || {})) {
            continue;
          }
          
          if (!seenAyahs.has(key)) {
            seenAyahs.add(key);
            
            // Fetch Arabic text
            const arabicData = await fetchAndParse(
              `https://api.alquran.cloud/v1/ayah/${match.surah.number}:${match.numberInSurah}/ar.alafasy`
            );

            results.push({
              surahNumber: match.surah.number,
              ayahNumber: match.numberInSurah,
              arabicText: arabicData?.data?.text || "",
              translation: match.text,
              surahName: match.surah.englishName,
              revelationType: surahMetadata[match.surah.number]?.revelationType || "Unknown",
            });
          }
        }
      }
    }

    console.log(`Found ${results.length} results after filtering`);

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Search error:", error);
    return new Response(
      JSON.stringify({ results: [], error: "Search temporarily unavailable" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
