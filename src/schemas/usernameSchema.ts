import * as Yup from "yup";

export const usernameSchema = Yup.object().shape({
  userName: Yup.string().required("نام خود را وارد کنید"),
});
