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
    const tafsirAuthor = tafsirId === 1 ? "Ibn Kathir" : tafsirId === 2 ? "Maarif-ul-Quran" : "Tazkirul Quran";
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

    return new Response(
      JSON.stringify({
        surah,
        ayah,
        tafsirId,
        tafsirName: tafsirAuthor,
        text: tafsirObj.content ?? tafsirObj.text,
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
