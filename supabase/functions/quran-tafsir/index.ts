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
    const { surah, ayah, tafsirId = 1 } = await req.json();

    // Validate inputs
    if (!surah || !ayah) {
      return new Response(
        JSON.stringify({ error: "Surah and ayah numbers are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (surah < 1 || surah > 114) {
      return new Response(
        JSON.stringify({ error: "Invalid surah number (must be 1-114)" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Available tafsirs:
    // 1 = Ibn Kathir (Tafsir Ibn Kathir)
    // 2 = Maarif Ul Quran (Maarif-ul-Quran)
    // 3 = Tazkirul Quran (Tazkirul Quran)
    if (![1, 2, 3].includes(tafsirId)) {
      return new Response(
        JSON.stringify({ error: "Invalid tafsir ID (must be 1, 2, or 3)" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Fetching tafsir ${tafsirId} for Surah ${surah}, Ayah ${ayah}`);

    // Fetch tafsir from quranapi.pages.dev
    const url = `https://quranapi.pages.dev/api/tafsir/${surah}_${ayah}.json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch tafsir: ${response.status}`);
    }

    const data = await response.json();

    // The API returns tafsirs array with author field
    const tafsirAuthor = tafsirId === 1 ? "Ibn Kathir" : tafsirId === 2 ? "Maarif Ul Quran" : "Tazkirul Quran";
    const tafsirObj = data.tafsirs?.find((t: any) => t.author === tafsirAuthor);

    if (!tafsirObj || !(tafsirObj.content ?? tafsirObj.text)) {
      return new Response(
        JSON.stringify({ error: "Tafsir not found for this verse" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let tafsirText = tafsirObj.content ?? tafsirObj.text;
    
    // For Ibn Kathir (tafsirId 1), provide an abridged version
    // by taking only the first 2-3 paragraphs (approximately 600 characters)
    if (tafsirId === 1 && tafsirText.length > 800) {
      // Split by double newlines (paragraphs in markdown)
      const paragraphs = tafsirText.split('\n\n');
      // Take first 2 paragraphs or first 800 characters, whichever is shorter
      let abridged = paragraphs.slice(0, 2).join('\n\n');
      if (abridged.length > 800) {
        abridged = tafsirText.substring(0, 800);
        // Try to end at a sentence
        const lastPeriod = abridged.lastIndexOf('.');
        if (lastPeriod > 400) {
          abridged = abridged.substring(0, lastPeriod + 1);
        }
      }
      tafsirText = abridged + '\n\n*[Abridged for readability]*';
    }

    return new Response(
      JSON.stringify({
        surah,
        ayah,
        tafsirId,
        tafsirName: tafsirAuthor,
        text: tafsirText,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching tafsir:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
