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
    const { surah, edition = "en.sahih", type = "surah" } = await req.json();

    // Validate type parameter
    const allowedTypes = ["surah", "list"];
    if (!allowedTypes.includes(type)) {
      throw new Error("Type must be either 'surah' or 'list'");
    }

    // Validate surah number for surah type
    if (type === "surah") {
      if (typeof surah !== 'number' || surah < 1 || surah > 114) {
        throw new Error("Surah number must be between 1 and 114");
      }
    }

    // Validate edition parameter (whitelist common editions)
    const allowedEditions = [
      "en.sahih", "en.transliteration", "en.asad", "en.pickthall", "en.yusufali",
      "ar.alafasy", "ar.husary", "ar.minshawi", "ar.quran"
    ];
    if (!allowedEditions.includes(edition)) {
      throw new Error("Invalid edition parameter");
    }

    console.log(`Fetching Quran data: ${type} ${surah}, edition: ${edition}`);

    let url = "";
    if (type === "surah") {
      url = `https://api.alquran.cloud/v1/surah/${surah}/${edition}`;
    } else if (type === "list") {
      url = "https://api.alquran.cloud/v1/surah";
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`AlQuran API error: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Quran data:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
