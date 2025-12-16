import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { gunzipSync } from "node:zlib";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Magic bytes for compression formats
const ZSTD_MAGIC = [0x28, 0xb5, 0x2f, 0xfd];
const GZIP_MAGIC = [0x1f, 0x8b];

async function fetchAndParse(url: string, retries = 3): Promise<any> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Add cache-busting to avoid compressed cached responses
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
      
      // If no encoding, try text directly
      if (!contentEncoding || contentEncoding === "identity") {
        const text = await response.text();
        // Check if it starts with zstd magic bytes as text
        if (text.charCodeAt(0) === 0x28 && text.charCodeAt(1) === 0xb5) {
          console.log(`Attempt ${attempt + 1}: Got zstd in text, retrying...`);
          await new Promise(r => setTimeout(r, 100 * (attempt + 1)));
          continue;
        }
        return JSON.parse(text);
      }

      // Handle compressed response
      const arrayBuffer = await response.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      // Check for zstd - retry if found
      if (bytes[0] === ZSTD_MAGIC[0] && bytes[1] === ZSTD_MAGIC[1]) {
        console.log(`Attempt ${attempt + 1}: Got zstd compressed, retrying...`);
        await new Promise(r => setTimeout(r, 100 * (attempt + 1)));
        continue;
      }

      // Handle gzip
      if (contentEncoding === "gzip" || (bytes[0] === GZIP_MAGIC[0] && bytes[1] === GZIP_MAGIC[1])) {
        const decompressed = gunzipSync(bytes);
        return JSON.parse(new TextDecoder().decode(decompressed));
      }

      // Try as text
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
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

    console.log(`Searching Quran for: ${trimmedQuery}`);

    // Search in English translation
    const englishData = await fetchAndParse(
      `https://api.alquran.cloud/v1/search/${encodeURIComponent(trimmedQuery)}/all/en.sahih`
    );

    const results: any[] = [];
    const seenAyahs = new Set<string>();

    if (englishData?.data?.matches) {
      // Limit to first 15 matches to reduce API calls
      const matches = englishData.data.matches.slice(0, 15);
      
      for (const match of matches) {
        const key = `${match.surah.number}-${match.numberInSurah}`;
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
          });
        }
      }
    }

    console.log(`Found ${results.length} results`);

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
