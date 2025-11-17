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

    // If specific hadith is requested
    if (hadithNumber) {
      const urls = [
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}/hadith/${hadithNumber}.min.json`,
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}/hadith/${hadithNumber}.json`,
        `https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/${collection}/hadith/${hadithNumber}.json`
      ];
      data = await fetchWithFallback(urls);
    }
    // Otherwise, get collection metadata and first few hadiths
    else {
      const urls = [
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}.min.json`,
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}.json`,
        `https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/${collection}.json`
      ];
      data = await fetchWithFallback(urls);
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
