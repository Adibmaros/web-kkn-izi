import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Supabase client with anon key for storage operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Bucket name for article images
export const STORAGE_BUCKET = "images";
