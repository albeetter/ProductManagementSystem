import {createClient} from "@supabase/supabase-js";

//Loads environment variable
//Should also exists in .env
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


//Initialize Supabase Client
export const supabase = createClient(supabaseURL, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    }
})