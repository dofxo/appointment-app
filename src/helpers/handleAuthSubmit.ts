import { supabase } from "../Supabase/initialize";
import { FormValues } from "../types/types";
import toast from "react-hot-toast";
import uniqueIdGenerator from "./uniqueIdGenerator";
import setToken from "./setToken";

export const handleSubmit = async ({
  values,
  isLogin,
  setOpenModal,
  setLoading,
  setUserId,
}: {
  values: FormValues;
  isLogin: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  try {
    setLoading(true);
    const { data: users } = await supabase.from("users").select("*");

    if (!isLogin) {
      let newUser: boolean = true;

      if (users) {
        for (const user of users) {
          const userExists = user.username === values.username;

          if (userExists) {
            newUser = false;
            break;
          }
        }
      }

      if (newUser) {
        const userId = uniqueIdGenerator();

        const { error } = await supabase.from("users").insert([
          {
            username: values.username,
            password: values.password,
            id: userId,
          },
        ]);

        if (error) throw error;
        toast.success("ثبت نام با موفقیت انجام شد");
        setOpenModal(false);
        setToken(String(userId));
        setUserId(String(userId));
        navigate("/user");
      } else {
        toast.error("کاربری با نام کابری شما وجود دارد");
      }
    } else {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("username", values.username);

      if (data?.length) {
        if (data[0].password === values.password) {
          toast.success("ورود با موفقیت انجام شد");
          setOpenModal(false);
          setToken(String(data[0].id));
          setUserId(String(data[0].id));
          navigate(data[0].isAdmin ? "/admin" : "/user");
        } else {
          toast.error("رمز عبور اشتباه است");
        }
      } else {
        toast.error("نام کاربری وارد شده وجود ندارد");
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
  } finally {
    setLoading(false);
  }
};
