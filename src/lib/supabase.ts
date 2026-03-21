import { supabase as officialClient } from "@/integrations/supabase/client";

// Export the official client to maintain compatibility with existing imports
export const supabase = officialClient;