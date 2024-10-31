import { useEffect, useState } from "react";
import { supabase } from "../../Supabase/initialize";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Field, Formik, FormikErrors, FormikTouched, Form } from "formik";
import { FormValues } from "../../types/types";
import { authSchema } from "../../schemas/authSchema";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";

const Settings = ({ userId }: { userId: string | null }) => {
  const [userInfo, setUserInfo] = useState<{
    username: string;
    password: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [showPasswords, setShowPasswords] = useState(false);

  const toggleShowPassword = () => {
    setShowPasswords((prev) => !prev);
  };

  const inputs = [
    {
      value: userInfo?.username || "",
      name: "username",
      type: "text",
      label: "نام کاربری",
    },
    {
      value: userInfo?.password || "",
      name: "password",
      type: "password",
      label: "رمز عبور",
    },
    {
      value: userInfo?.password || "",
      name: "confirmPassword",
      type: "password",
      label: "تایید رمز عبور",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { error, data: user } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        setUserInfo(user);

        if (error) throw error;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      setButtonLoading(true);
      const { error } = await supabase
        .from("users")
        .update({ password: values.password, username: values.username })
        .eq("id", userId)
        .select();

      toast.success("تغییرات با موفقیت انجام شد");

      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress size={70} />
      ) : (
        <div
          id="userInfoWrapper"
          className="flex flex-col justify-center items-center gap-5"
        >
          <Formik<FormValues>
            onSubmit={handleSubmit}
            validationSchema={authSchema}
            initialValues={{
              username: userInfo?.username || "",
              password: userInfo?.password || "",
              confirmPassword: userInfo?.password || "",
            }}
            enableReinitialize
          >
            {({
              errors,
              touched,
            }: {
              errors: FormikErrors<FormValues>;
              touched: FormikTouched<FormValues>;
            }) => (
              <Form className="flex flex-col gap-5 " id="userInfo">
                {inputs.map((inputInfo, idx) => (
                  <Field name={inputInfo.name} key={idx}>
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        variant="standard"
                        label={inputInfo.label}
                        type={
                          inputInfo.type === "password" && !showPasswords
                            ? "password"
                            : "text"
                        }
                        InputProps={
                          inputInfo.type === "password"
                            ? {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label={
                                        showPasswords
                                          ? "hide the password"
                                          : "display the password"
                                      }
                                      onClick={toggleShowPassword}
                                      edge="end"
                                    >
                                      {showPasswords ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }
                            : undefined
                        }
                        helperText={
                          touched[inputInfo.name as keyof FormValues] &&
                          errors[inputInfo.name as keyof FormValues]
                            ? errors[inputInfo.name as keyof FormValues]
                            : ""
                        }
                        error={Boolean(
                          touched[inputInfo.name as keyof FormValues] &&
                            errors[inputInfo.name as keyof FormValues],
                        )}
                      />
                    )}
                  </Field>
                ))}
                <LoadingButton
                  loading={buttonLoading}
                  variant="contained"
                  type="submit"
                  className="!font-[inherit]"
                >
                  ذخیره
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default Settings;
