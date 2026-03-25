import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PESAPAL_CONSUMER_KEY = Deno.env.get('PESAPAL_CONSUMER_KEY');
const PESAPAL_CONSUMER_SECRET = Deno.env.get('PESAPAL_CONSUMER_SECRET');

// PesaPal API endpoints (using live environment)
const PESAPAL_AUTH_URL = 'https://pay.pesapal.com/v3/api/Auth/RequestToken';
const PESAPAL_SUBMIT_ORDER_URL = 'https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest';
const PESAPAL_REGISTER_IPN_URL = 'https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN';

// Hardcoded allowed origins for IPN/callback — not client-controlled
const ALLOWED_ORIGIN = Deno.env.get('APP_ORIGIN') || 'https://rihlatul-hudah-hub.lovable.app';
const IPN_URL = `${ALLOWED_ORIGIN}/support?ipn=true`;

// Server-side amount limits per currency (matching client config)
const CURRENCY_LIMITS: Record<string, { min: number; max: number }> = {
  UGX: { min: 1000, max: 25000 },
  KES: { min: 100, max: 700 },
  USD: { min: 1, max: 7 },
  EUR: { min: 1, max: 7 },
  AED: { min: 1, max: 25 },
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

async function getAuthToken(): Promise<string> {
  const response = await fetch(PESAPAL_AUTH_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      consumer_key: PESAPAL_CONSUMER_KEY,
      consumer_secret: PESAPAL_CONSUMER_SECRET,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Auth error:', errorText);
    throw new Error('Failed to authenticate with payment provider');
  }

  const data = await response.json();
  return data.token;
}

async function registerIPN(token: string): Promise<string> {
  const response = await fetch(PESAPAL_REGISTER_IPN_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: IPN_URL,
      ipn_notification_type: 'GET',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('IPN registration error:', errorText);
    throw new Error('Failed to register IPN');
  }

  const data = await response.json();
  return data.ipn_id;
}

async function submitOrder(
  token: string,
  ipnId: string,
  amount: number,
  currency: string,
  description: string,
  callbackUrl: string,
  donorEmail?: string,
  donorName?: string,
  donorPhone?: string
): Promise<{ redirect_url: string; order_tracking_id: string }> {
  const merchantReference = `DONATION-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const orderRequest = {
    id: merchantReference,
    currency: currency,
    amount: amount,
    description: description,
    callback_url: callbackUrl,
    notification_id: ipnId,
    billing_address: {
      email_address: donorEmail || '',
      phone_number: donorPhone || '',
      first_name: donorName?.split(' ')[0] || 'Anonymous',
      last_name: donorName?.split(' ').slice(1).join(' ') || 'Donor',
    },
  };

  const response = await fetch(PESAPAL_SUBMIT_ORDER_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orderRequest),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Order submission error:', JSON.stringify(data));
    throw new Error('Failed to submit order');
  }

  const redirectUrl = data.redirect_url || data.redirectUrl || data.payment_url;
  const trackingId = data.order_tracking_id || data.orderTrackingId || data.tracking_id || data.merchant_reference;
  
  if (!redirectUrl) {
    console.error('No redirect URL in response:', JSON.stringify(data));
    throw new Error('Payment provider did not return a payment URL');
  }
  
  return {
    redirect_url: redirectUrl,
    order_tracking_id: trackingId,
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!PESAPAL_CONSUMER_KEY || !PESAPAL_CONSUMER_SECRET) {
      throw new Error('Payment credentials not configured');
    }

    const { action, amount, currency = 'KES', description, donorEmail, donorName, donorPhone } = await req.json();

    if (action === 'initiate-payment') {
      if (!amount) {
        throw new Error('Missing required field: amount');
      }

      // Server-side amount validation
      const limits = CURRENCY_LIMITS[currency];
      if (!limits) {
        throw new Error(`Unsupported currency: ${currency}`);
      }
      if (typeof amount !== 'number' || amount < limits.min || amount > limits.max) {
        throw new Error(`Amount must be between ${limits.min} and ${limits.max} ${currency}`);
      }

      // Hardcoded callback URL using allowed origin
      const callbackUrl = `${ALLOWED_ORIGIN}/support?payment=complete`;

      const token = await getAuthToken();
      const ipnId = await registerIPN(token);
      const result = await submitOrder(
        token,
        ipnId,
        amount,
        currency,
        description || 'Donation to Rihlatul Hudah',
        callbackUrl,
        donorEmail,
        donorName,
        donorPhone
      );

      return new Response(
        JSON.stringify({
          success: true,
          redirect_url: result.redirect_url,
          order_tracking_id: result.order_tracking_id,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    throw new Error('Invalid action');
  } catch (error) {
    console.error('Payment error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
