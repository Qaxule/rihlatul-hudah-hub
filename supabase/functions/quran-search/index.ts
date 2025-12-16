import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { gunzipSync } from "node:zlib";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function fetchAndParse(url: string): Promise<any> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Rihlatul-Hudah/1.0",
      "Accept": "application/json",
      "Accept-Encoding": "identity",
    }
  });

  if (!response.ok) {
    return null;
  }

  const contentEncoding = response.headers.get("content-encoding");

  // If no encoding or identity, parse directly
  if (!contentEncoding || contentEncoding === "identity") {
    const text = await response.text();
    return JSON.parse(text);
  }

  // Handle compressed responses
  const arrayBuffer = await response.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  // Check for gzip magic bytes
  if (contentEncoding === "gzip" || (bytes[0] === 0x1f && bytes[1] === 0x8b)) {
    const decompressed = gunzipSync(bytes);
    return JSON.parse(new TextDecoder().decode(decompressed));
  }

  // Try to decode as text
  return JSON.parse(new TextDecoder().decode(bytes));
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
        JSON.stringify({ error: "Search query must be at least 2 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (trimmedQuery.length > 500) {
      return new Response(
        JSON.stringify({ error: "Search query must not exceed 500 characters" }),
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

    // Process English results
    if (englishData?.data?.matches) {
      for (const match of englishData.data.matches.slice(0, 20)) {
        const key = `${match.surah.number}-${match.numberInSurah}`;
        if (!seenAyahs.has(key)) {
          seenAyahs.add(key);
          
          // Fetch Arabic text for this ayah
          const arabicAyahData = await fetchAndParse(
            `https://api.alquran.cloud/v1/ayah/${match.surah.number}:${match.numberInSurah}/ar.alafasy`
          );
          
          const arabicText = arabicAyahData?.data?.text || "";

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

    console.log(`Found ${results.length} results`);

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error searching Quran:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Search failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
