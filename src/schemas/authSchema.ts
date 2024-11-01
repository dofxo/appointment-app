import * as yup from "yup";

export const authSchema = (isLogin: boolean) =>
  yup.object().shape({
    username: yup.string().required("نام کاربری اجباری است"),
    password: yup.string().required("رمز عبور اجباری است"),
    confirmPassword: yup.string().when("password", {
      is: () => !isLogin,
      then: (schema) =>
        schema
          .oneOf([yup.ref("password"), ""], "رمز عبور یکسان نیست")
          .required("تکرار رمز عبور اجباری است"),
      otherwise: (schema) => schema.notRequired(),
    }),
    profilePicture: yup
      .mixed()
      .test("fileSize", "حجم فایل نباید بیشتر از 3MB باشد.", (value: any) => {
        if (value) {
          return value.size <= 3145728;
        }
        return true;
      }),
  });
