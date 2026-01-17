import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WordData {
  position: number;
  arabic: string;
  transliteration: string;
  translation: string;
  grammar?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { surah, ayah } = await req.json();
    
    if (!surah || !ayah) {
      return new Response(
        JSON.stringify({ error: 'Missing surah or ayah parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Fetching word-by-word data for ${surah}:${ayah}`);

    // Quran.com API v4 endpoint for word-by-word data
    const url = `https://api.quran.com/api/v4/verses/by_key/${surah}:${ayah}?words=true&word_fields=text_uthmani,text_indopak,transliteration,translation&translation_fields=text`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Quran.com API error: ${response.status}`);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch word data from Quran.com' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    
    if (!data.verse || !data.verse.words) {
      return new Response(
        JSON.stringify({ error: 'No word data available', words: [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Transform the data to our format
    const words: WordData[] = data.verse.words
      .filter((word: any) => word.char_type_name === 'word') // Filter out end markers
      .map((word: any, index: number) => ({
        position: index + 1,
        arabic: word.text_uthmani || word.text_indopak || '',
        transliteration: word.transliteration?.text || '',
        translation: word.translation?.text || '',
        grammar: formatGrammar(word),
      }));

    console.log(`Successfully fetched ${words.length} words for ${surah}:${ayah}`);

    return new Response(
      JSON.stringify({ 
        surah, 
        ayah, 
        words,
        verseKey: data.verse.verse_key,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error fetching word-by-word data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Format grammar information from word data
function formatGrammar(word: any): string | undefined {
  const parts: string[] = [];
  
  if (word.qpc_uthmani_hafs) {
    // This contains position info
  }
  
  // Add any available grammatical info
  if (word.char_type_name === 'word') {
    // Could add part of speech, root, lemma if available from API
    // The Quran.com API provides limited grammar data in the free tier
  }
  
  return parts.length > 0 ? parts.join(' • ') : undefined;
}
