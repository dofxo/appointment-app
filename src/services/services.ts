import { supabase } from "../Supabase/initialize";

export const getReserves = async () => {
  const { data } = await supabase.from("reserves").select("*");

  return { data };
};

export const getUsers = async () => {
  const { data } = await supabase.from("users").select("*");

  return { data };
};
