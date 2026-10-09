import { createClient } from '@supabase/supabase-js';

const STORAGE_KEYS = {
  URL: 'mza_supabase_url',
  ANON_KEY: 'mza_supabase_anon_key'
};

export function getSupabaseConfig() {
  const url = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem(STORAGE_KEYS.URL) || '';
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem(STORAGE_KEYS.ANON_KEY) || '';
  return { url, anonKey };
}

export function saveSupabaseConfig(url, anonKey) {
  if (url) localStorage.setItem(STORAGE_KEYS.URL, url.trim());
  else localStorage.removeItem(STORAGE_KEYS.URL);

  if (anonKey) localStorage.setItem(STORAGE_KEYS.ANON_KEY, anonKey.trim());
  else localStorage.removeItem(STORAGE_KEYS.ANON_KEY);

  window.dispatchEvent(new Event('mza_data_updated'));
}

export function isSupabaseConfigured() {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey && url.startsWith('http') && anonKey.length > 20);
}

let cachedClient = null;
let lastUrl = '';
let lastKey = '';

export function getSupabaseClient() {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return null;

  if (cachedClient && lastUrl === url && lastKey === anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, anonKey);
    lastUrl = url;
    lastKey = anonKey;
    return cachedClient;
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
    return null;
  }
}
