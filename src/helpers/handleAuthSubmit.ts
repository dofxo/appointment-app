import { supabase } from "../Supabase/initialize";
import { FormValues } from "../types/types";
import toast from "react-hot-toast";
import uniqueIdGenerator from "./uniqueIdGenerator";
import setToken from "./setToken";
import { convertPersianToEnglishNumbers } from "./convertPersianToEnglishNubmers";
import { setOpenModal, setUserId } from "../redux/appReducer";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const handleSubmit = async ({
  values,
  isLogin,
  setLoading,
  dispatch,
}: {
  values: FormValues;
  isLogin: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: Dispatch<UnknownAction>;
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
            ["phone_number"]: convertPersianToEnglishNumbers(
              values.phoneNumber,
            ),
            id: userId,
          },
        ]);

        if (error) throw error;
        toast.success("ثبت نام با موفقیت انجام شد");
        dispatch(setOpenModal(false));
        setToken(String(userId));
        dispatch(setUserId(String(userId)));
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
          dispatch(setOpenModal(false));
          setToken(String(data[0].id));
          dispatch(setUserId(String(data[0].id)));
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
