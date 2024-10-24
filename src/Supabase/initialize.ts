import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eyraqcwgzioawbplykhj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5cmFxY3dnemlvYXdicGx5a2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3ODA5NDMsImV4cCI6MjA0NTM1Njk0M30.yShBrnGZwysN5iff3IxrOf6KaT1tt46EjYCS-XKGj8o";

export const supabase = createClient(supabaseUrl, supabaseKey);
