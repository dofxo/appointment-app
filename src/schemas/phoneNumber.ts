import * as yup from "yup";
import { phoneNumberRegex } from "../constants/constants";
import { convertPersianToEnglishNumbers } from "../helpers/convertPersianToEnglishNubmers";

export const phoneNumberSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .transform((value) => convertPersianToEnglishNumbers(value.trim()))
    .matches(phoneNumberRegex, "شماره تلفن خود را به درستی وارد کنید")
    .required("شماره تلفن خود را وارد کنید"),
});
