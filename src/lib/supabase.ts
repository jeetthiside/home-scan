import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hqppuxrmfnzjxhxigzvs.supabase.co";
const supabaseAnonKey = "sb_publishable_7cYVg5gJ-b0aLdk42C1b7g_qoUxnQ7Z";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);