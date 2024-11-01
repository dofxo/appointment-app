import { ChangeEvent, useEffect, useRef, useState } from "react";
import { supabase } from "../../Supabase/initialize";
import {
  Avatar,
  CircularProgress,
  IconButton,
  Input,
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
import readURL from "../../helpers/readUrl";
import noDataImage from "../../assets/no-data.png";

const Settings = ({ userId }: { userId: string | null }) => {
  const [userInfo, setUserInfo] = useState<{
    username: string;
    password: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const imageRef = useRef();

  const toggleShowPassword = () => {
    setShowPasswords((prev) => !prev);
  };

  const inputs = [
    {
      type: "file",
    },
    {
      value: userInfo?.username || "",
      name: "username",
      type: "text",
      label: "نام کاربری",
    },
    {
      value: userInfo?.password || "",
      name: "confirmPassword",
      type: "password",
      label: "تایید رمز عبور",
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
      console.log(values);
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
              profilePicture: "",
            }}
            enableReinitialize
          >
            {({
              errors,
              touched,
              setFieldValue,
            }: {
              errors: FormikErrors<FormValues>;
              touched: FormikTouched<FormValues>;
              setFieldValue: any;
            }) => (
              <Form className="flex flex-col gap-5 " id="userInfo">
                {inputs.map((inputInfo, idx) => (
                  <Field name={inputInfo.name} key={idx}>
                    {({ field }: any) =>
                      inputInfo.type !== "file" ? (
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
                      ) : (
                        <>
                          <label htmlFor="profilePicture">
                            <Avatar
                              imgProps={{}}
                              id="profilePictureImg"
                              className="cursor-pointer"
                              alt={userInfo?.username}
                              sx={{ width: 80, height: 80 }}
                            />
                          </label>
                          <Input
                            className="invisible h-0"
                            id="profilePicture"
                            type="file"
                            name="profilePicture"
                            onChange={async (
                              e: ChangeEvent<HTMLInputElement>,
                            ) => {
                              //TODO: fix this image rendering
                              const file = e.target.files?.[0];
                              setFieldValue("profilePicture", file);

                              const url = await readURL(file);

                              const img =
                                document.getElementById("profilePictureImg");
                              img.src = noDataImage;

                              console.log(img);
                            }}
                          />
                        </>
                      )
                    }
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
