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
    }
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  // Always read as arrayBuffer first to handle both gzip and plain text
  const arrayBuffer = await response.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  
  // Check for gzip magic bytes (0x1f 0x8b)
  const isGzip = bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;
  
  let text: string;
  
  if (isGzip) {
    console.log("Detected gzip response, decompressing...");
    try {
      const decompressed = gunzipSync(bytes);
      text = new TextDecoder().decode(decompressed);
    } catch (e) {
      console.error("Gunzip failed:", e);
      throw new Error("Failed to decompress gzip response");
    }
  } else {
    text = new TextDecoder().decode(bytes);
  }
  
  return JSON.parse(text);
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

    const data = await fetchAndParse(url);

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
