import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service_role key.
 *
 * This must only ever be imported from server code (API routes, server
 * actions). The service_role key bypasses Row Level Security, so it can
 * never be shipped to the browser.
 *
 * Returns null when env vars are missing so the app still builds/renders
 * without Supabase configured (e.g. a fresh Vercel preview).
 */
export function getServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
