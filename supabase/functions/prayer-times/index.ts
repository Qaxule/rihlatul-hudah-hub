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
    const { latitude, longitude, method = 2 } = await req.json();

    // Validate latitude and longitude
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      throw new Error("Latitude and longitude must be numbers");
    }

    if (latitude < -90 || latitude > 90) {
      throw new Error("Latitude must be between -90 and 90");
    }

    if (longitude < -180 || longitude > 180) {
      throw new Error("Longitude must be between -180 and 180");
    }

    // Validate method parameter (allowed values: 0-23)
    if (typeof method !== 'number' || method < 0 || method > 23) {
      throw new Error("Method must be a number between 0 and 23");
    }

    console.log(`Fetching prayer times for: ${latitude}, ${longitude}`);

    // Call Aladhan API for prayer times
    const date = new Date();
    const timestamp = Math.floor(date.getTime() / 1000);
    const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${method}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Aladhan API error: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
