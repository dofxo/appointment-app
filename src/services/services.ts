import { supabase } from "../Supabase/initialize";

export const getReserves = async () => {
  const { data } = await supabase.from("reserves").select("*");

  return { data };
};
