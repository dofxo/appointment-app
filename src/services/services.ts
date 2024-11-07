import { supabase } from "../Supabase/initialize";

export const getReserves = async (isAscending: boolean = true) => {
  const { data } = await supabase
    .from("reserves")
    .select("*")
    .order("date", { ascending: isAscending });

  return { data };
};

export const getUsers = async (isAscending: boolean = true) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: isAscending });
  return { data, error };
};

export const getUser = async (userId: string) => {
  const { error, data } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  return { data, error };
};
