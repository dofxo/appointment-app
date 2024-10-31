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

const Settings = ({ userId }: { userId: string | null }) => {
  const [userInfo, setUserInfo] = useState<{
    username: string;
    password: string;
  }>();
  const [loading, setLoading] = useState(false);

  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({
    confirmPassword: false,
    password: false,
  });

  const toggleShowPassword = (name: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
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

  const handleSubmit = () => {};

  return (
    <>
      {loading ? (
        <CircularProgress size={70} />
      ) : (
        <div id="userInfoWrapper" className="flex flex-col justify-start">
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
              <Form className="flex flex-col gap-1 max-w-[300px]" id="userInfo">
                {inputs.map((inputInfo, idx) => (
                  <Field name={inputInfo.name} key={idx}>
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        size="small"
                        variant="standard"
                        label={inputInfo.label}
                        type={
                          inputInfo.type === "password" &&
                          !showPasswords[inputInfo.name]
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
                                        showPasswords[inputInfo.name]
                                          ? "hide the password"
                                          : "display the password"
                                      }
                                      onClick={() =>
                                        toggleShowPassword(inputInfo.name)
                                      }
                                      edge="end"
                                    >
                                      {showPasswords[inputInfo.name] ? (
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
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default Settings;
