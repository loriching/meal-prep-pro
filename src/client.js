import { createClient } from "@supabase/supabase-js";
const URL = "https://wjiqiyijtccprnzuxubk.supabase.co";
const KEY = import.meta.env.API_KEY;
export const supabase = createClient(URL, KEY);