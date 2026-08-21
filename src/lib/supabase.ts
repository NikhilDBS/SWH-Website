/* =============================================================================
 * SUPABASE CLIENT — server + client safe
 * -----------------------------------------------------------------------------
 * Uses the public anon key — safe to use in both Server and Client Components.
 * The anon key is intentionally prefixed with NEXT_PUBLIC_ so it can reach
 * the browser bundle for client-side fetching if needed.
 * ========================================================================== */

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Returns a Supabase client configured with the public anon key.
 * RLS policies on the Supabase side ensure write access is impossible
 * with this key -- it is strictly read-only for the website.
 */
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnon);
}
