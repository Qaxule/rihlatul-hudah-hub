import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fallback URLs for reliability
const fetchWithFallback = async (urls: string[]) => {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log(`Failed to fetch from ${url}, trying next...`);
    }
  }
  throw new Error('All API endpoints failed');
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Read from request body for POST requests
    const requestData = await req.json().catch(() => ({}));
    const collection = requestData.collection || 'eng-bukhari';
    const hadithNumber = requestData.hadith;

    console.log(`Fetching hadith data: collection=${collection}, hadith=${hadithNumber}`);

    let data;

    // Get Arabic collection name
    const arabicCollection = collection.replace('eng-', 'ara-');

    // If specific hadith is requested
    if (hadithNumber) {
      const urls = [
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}/${hadithNumber}.min.json`,
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}/${hadithNumber}.json`,
        `https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/${collection}/${hadithNumber}.json`
      ];
      const englishData = await fetchWithFallback(urls);

      // Ensure we have at least some English text; otherwise treat as missing
      if (!englishData?.hadiths || !englishData.hadiths[0] || !englishData.hadiths[0].text) {
        throw new Error(`Hadith ${hadithNumber} in collection "${collection}" has no English text`);
      }
      
      // Try to fetch Arabic version
      const arabicUrls = [
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${arabicCollection}/${hadithNumber}.min.json`,
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${arabicCollection}/${hadithNumber}.json`,
        `https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/${arabicCollection}/${hadithNumber}.json`
      ];
      try {
        const arabicData = await fetchWithFallback(arabicUrls);
        // Merge Arabic text into English data
        if (arabicData?.hadiths && arabicData.hadiths[0]?.text) {
          englishData.hadiths[0].arabictext = arabicData.hadiths[0].text;
        }
      } catch (_) {
        // If Arabic not available, continue with English only
      }
      
      data = englishData;
    }
    // Otherwise, get collection metadata and first few hadiths
    else {
      // Paginated lightweight fetch to avoid loading huge collection files (e.g., Musnad Ahmad)
      const page = Math.max(1, Number(requestData.page) || 1);
      const limit = Math.min(50, Math.max(1, Number(requestData.limit) || 20)); // Cap to 50 per call
      const start = (page - 1) * limit + 1;

      const hadiths: any[] = [];
      let metadata: any = null;

      // Try sequential hadith numbers, skipping missing ones
      let num = start;
      let attempts = 0;
      let consecutiveFailures = 0;
      const maxConsecutiveFailures = 50; // Stop if we hit 50 consecutive failures
      
      while (hadiths.length < limit && consecutiveFailures < maxConsecutiveFailures) {
        const urls = [
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}/${num}.min.json`,
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}/${num}.json`,
          `https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/${collection}/${num}.json`
        ];
        try {
          const item = await fetchWithFallback(urls);
          if (!metadata && item?.metadata) metadata = item.metadata;

          const baseHadith = item?.hadiths?.[0];
          // Skip entries that don't have English text
          if (baseHadith && baseHadith.text) {
            // Try to fetch Arabic version for this hadith
            const arabicUrls = [
              `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${arabicCollection}/${num}.min.json`,
              `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${arabicCollection}/${num}.json`,
              `https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/${arabicCollection}/${num}.json`
            ];
            try {
              const arabicItem = await fetchWithFallback(arabicUrls);
              if (arabicItem?.hadiths?.[0]?.text) {
                baseHadith.arabictext = arabicItem.hadiths[0].text;
              }
            } catch (_) {
              // If Arabic not available, continue with English only
            }
            hadiths.push(baseHadith);
            consecutiveFailures = 0; // Reset on success
          } else {
            // No usable English text, treat as failure for paging purposes
            consecutiveFailures++;
          }
        } catch (_) {
          // Count consecutive failures to detect end of collection
          consecutiveFailures++;
        }
        num++;
        attempts++;
      }

      // If nothing could be fetched, return error
      if (!metadata && hadiths.length === 0) {
        throw new Error(`Collection "${collection}" not found or contains no accessible hadiths`);
      }

      data = { metadata: metadata ?? { name: collection }, hadiths };
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in hadith-data function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Failed to fetch hadith data. Please try again.'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
