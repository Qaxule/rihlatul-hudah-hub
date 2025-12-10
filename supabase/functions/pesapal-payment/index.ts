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

async function getAuthToken(): Promise<string> {
  console.log('Requesting PesaPal auth token...');
  
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
    throw new Error(`Failed to authenticate with PesaPal: ${errorText}`);
  }

  const data = await response.json();
  console.log('Auth successful');
  return data.token;
}

async function registerIPN(token: string, callbackUrl: string): Promise<string> {
  console.log('Registering IPN URL:', callbackUrl);
  
  const response = await fetch(PESAPAL_REGISTER_IPN_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: callbackUrl,
      ipn_notification_type: 'GET',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('IPN registration error:', errorText);
    throw new Error(`Failed to register IPN: ${errorText}`);
  }

  const data = await response.json();
  console.log('IPN registered:', data.ipn_id);
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
  console.log('Submitting order:', { amount, currency, description });
  
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

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Order submission error:', errorText);
    throw new Error(`Failed to submit order: ${errorText}`);
  }

  const data = await response.json();
  console.log('Order submitted:', data.order_tracking_id);
  
  return {
    redirect_url: data.redirect_url,
    order_tracking_id: data.order_tracking_id,
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!PESAPAL_CONSUMER_KEY || !PESAPAL_CONSUMER_SECRET) {
      throw new Error('PesaPal credentials not configured');
    }

    const { action, amount, currency = 'KES', description, callbackUrl, ipnUrl, donorEmail, donorName, donorPhone } = await req.json();

    console.log('Request action:', action);

    if (action === 'initiate-payment') {
      if (!amount || !callbackUrl || !ipnUrl) {
        throw new Error('Missing required fields: amount, callbackUrl, ipnUrl');
      }

      // Step 1: Get auth token
      const token = await getAuthToken();

      // Step 2: Register IPN URL
      const ipnId = await registerIPN(token, ipnUrl);

      // Step 3: Submit order
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
    console.error('PesaPal payment error:', error);
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
