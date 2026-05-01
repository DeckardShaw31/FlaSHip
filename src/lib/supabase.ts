import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://scidppzandhsbtgaiykc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjaWRwcHphbmRoc2J0Z2FpeWtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2MDg2ODEsImV4cCI6MjA5MzE4NDY4MX0.0mzyFjYkGsrMnkGEQDNFM1NxIL0dHo317a6oVYuGIH8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
