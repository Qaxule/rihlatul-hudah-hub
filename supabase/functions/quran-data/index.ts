import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Rihlatul-Hudah/1.0",
          "Accept": "application/json",
        }
      });
      
      if (response.ok) {
        return response;
      }
      
      if (i < retries - 1) {
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error("Failed after retries");
}

async function getResponseText(response: Response): Promise<string> {
  const contentEncoding = response.headers.get("content-encoding");
  
  if (contentEncoding === "gzip" || contentEncoding === "deflate") {
    // Handle compressed response
    const arrayBuffer = await response.arrayBuffer();
    const decompressedStream = new Response(arrayBuffer).body!
      .pipeThrough(new DecompressionStream(contentEncoding as "gzip" | "deflate"));
    const decompressedResponse = new Response(decompressedStream);
    return await decompressedResponse.text();
  }
  
  return await response.text();
}

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
      "ar.alafasy", "ar.husary", "ar.minshawi", "ar.quran",
      // Audio reciters
      "ar.abdurrahmaansudais", "ar.abdulsamad", "ar.shaatree", "ar.ahmedajamy",
      "ar.hanirifai", "ar.husarymujawwad", "ar.hudhaify", "ar.ibrahimakhbar",
      "ar.mahermuaiqly", "ar.muhammadayyoub", "ar.muhammadjibreel", "ar.saoodshuraym"
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

    const response = await fetchWithRetry(url);
    
    if (!response.ok) {
      throw new Error(`AlQuran API error: ${response.status}`);
    }

    const text = await getResponseText(response);
    
    // Validate JSON before parsing
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse response:", text.substring(0, 100));
      throw new Error("Invalid JSON response from API");
    }

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
