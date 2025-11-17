import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const collection = url.searchParams.get('collection') || 'bukhari';
    const bookNumber = url.searchParams.get('book');
    const hadithNumber = url.searchParams.get('hadith');
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';

    console.log(`Fetching hadith data: collection=${collection}, book=${bookNumber}, hadith=${hadithNumber}`);

    let apiUrl: string;
    
    // If specific hadith is requested
    if (hadithNumber) {
      apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}/${hadithNumber}.json`;
    }
    // If book number is requested, get hadiths from that book
    else if (bookNumber) {
      apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}/books/${bookNumber}.json`;
    }
    // Otherwise, get collection info
    else {
      apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${collection}.json`;
    }

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Hadith API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Paginate if getting multiple hadiths
    if (Array.isArray(data.hadiths)) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const start = (pageNum - 1) * limitNum;
      const end = start + limitNum;
      
      return new Response(
        JSON.stringify({
          metadata: data.metadata,
          hadiths: data.hadiths.slice(start, end),
          pagination: {
            page: pageNum,
            limit: limitNum,
            total: data.hadiths.length,
            hasMore: end < data.hadiths.length
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
