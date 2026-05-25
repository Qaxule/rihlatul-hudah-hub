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
      
      try {
        const englishData = await fetchWithFallback(urls);

        // Check if we have valid English text
        if (!englishData?.hadiths || !englishData.hadiths[0] || !englishData.hadiths[0].text) {
          // Return empty result instead of throwing error - let frontend handle gracefully
          console.log(`Hadith ${hadithNumber} in collection "${collection}" has no English text - returning empty result`);
          return new Response(
            JSON.stringify({ metadata: { name: collection }, hadiths: [] }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
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
      } catch (error) {
        // Hadith number doesn't exist at all - return empty result
        console.log(`Hadith ${hadithNumber} not found in collection "${collection}" - returning empty result`);
        return new Response(
          JSON.stringify({ metadata: { name: collection }, hadiths: [] }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    // Otherwise, get collection metadata and first few hadiths
    else {
      // Paginated lightweight fetch with parallel batches
      const page = Math.max(1, Number(requestData.page) || 1);
      const limit = Math.min(50, Math.max(1, Number(requestData.limit) || 20));
      const start = (page - 1) * limit + 1;

      const fetchOne = async (col: string, n: number) => {
        const urls = [
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${col}/${n}.min.json`,
          `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${col}/${n}.json`,
        ];
        try {
          return await fetchWithFallback(urls);
        } catch {
          return null;
        }
      };

      const hadiths: any[] = [];
      let metadata: any = null;
      const BATCH = 20;
      let cursor = start;
      let consecutiveEmpty = 0;
      const maxConsecutiveEmpty = 60;

      while (hadiths.length < limit && consecutiveEmpty < maxConsecutiveEmpty) {
        const needed = limit - hadiths.length;
        const batchSize = Math.min(BATCH, needed + 10); // overfetch slightly to cover gaps
        const nums = Array.from({ length: batchSize }, (_, i) => cursor + i);

        // Fire English + Arabic for entire batch in parallel
        const [engResults, araResults] = await Promise.all([
          Promise.all(nums.map((n) => fetchOne(collection, n))),
          Promise.all(nums.map((n) => fetchOne(arabicCollection, n))),
        ]);

        let batchAdded = 0;
        for (let i = 0; i < nums.length; i++) {
          if (hadiths.length >= limit) break;
          const item = engResults[i];
          if (!metadata && item?.metadata) metadata = item.metadata;
          const baseHadith = item?.hadiths?.[0];
          if (baseHadith && baseHadith.text) {
            const arabicText = araResults[i]?.hadiths?.[0]?.text;
            if (arabicText) baseHadith.arabictext = arabicText;
            hadiths.push(baseHadith);
            batchAdded++;
          }
        }

        cursor += batchSize;
        if (batchAdded === 0) {
          consecutiveEmpty += batchSize;
        } else {
          consecutiveEmpty = 0;
        }
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
