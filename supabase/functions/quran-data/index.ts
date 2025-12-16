import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { gunzipSync } from "node:zlib";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zstandard magic bytes
const ZSTD_MAGIC = [0x28, 0xb5, 0x2f, 0xfd];
const GZIP_MAGIC = [0x1f, 0x8b];

async function fetchAndParse(url: string, retries = 3): Promise<any> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Add cache-busting parameter to avoid cached compressed responses
      const cacheBuster = `_=${Date.now()}_${attempt}`;
      const urlWithCacheBuster = url.includes('?') ? `${url}&${cacheBuster}` : `${url}?${cacheBuster}`;
      
      const response = await fetch(urlWithCacheBuster, {
        headers: {
          "User-Agent": "Rihlatul-Hudah/1.0",
          "Accept": "application/json",
          "Accept-Encoding": "identity",
          "Cache-Control": "no-cache, no-store",
          "Pragma": "no-cache",
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const contentEncoding = response.headers.get("content-encoding");
      console.log(`Attempt ${attempt + 1}: Content-Encoding: ${contentEncoding}`);

      // If no encoding or identity, parse directly as text
      if (!contentEncoding || contentEncoding === "identity") {
        const text = await response.text();
        console.log(`Success: Got uncompressed response (${text.length} chars)`);
        return JSON.parse(text);
      }

      // Handle compressed responses - read as arrayBuffer
      const arrayBuffer = await response.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      
      console.log(`Attempt ${attempt + 1}: Got ${contentEncoding} compressed response (${bytes.length} bytes)`);

      // Check for gzip
      if (contentEncoding === "gzip" || (bytes[0] === GZIP_MAGIC[0] && bytes[1] === GZIP_MAGIC[1])) {
        console.log("Decompressing gzip...");
        const decompressed = gunzipSync(bytes);
        return JSON.parse(new TextDecoder().decode(decompressed));
      }

      // Check for zstd - not supported, need to retry
      if (contentEncoding === "zstd" || (bytes[0] === ZSTD_MAGIC[0] && bytes[1] === ZSTD_MAGIC[1])) {
        lastError = new Error("Server returned zstd compressed data");
        console.log(`Attempt ${attempt + 1}: Got zstd, will retry...`);
        // Wait a bit before retrying
        await new Promise(r => setTimeout(r, 100 * (attempt + 1)));
        continue;
      }

      // Try to decode as text
      const text = new TextDecoder().decode(bytes);
      return JSON.parse(text);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Attempt ${attempt + 1} failed:`, lastError.message);
      if (attempt < retries - 1) {
        await new Promise(r => setTimeout(r, 100 * (attempt + 1)));
      }
    }
  }
  
  throw lastError || new Error("Failed to fetch after retries");
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
