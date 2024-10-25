import * as Yup from "yup";

export const authSchema = Yup.object().shape({
  username: Yup.string().required("نام کاربری را وارد کنید"),

  password: Yup.string()
    .min(4, "رمز عبور حداقل باید ۴ کارکتر باشد")
    .max(16, "رمز عبور باید حداکثر ۱۶ کارکتر باشد")
    .required("رمز عبور را وارد کنید"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "رمز عبور یکسان نیست")
    .required("پر کردن این قسمت اجباری است"),
});
