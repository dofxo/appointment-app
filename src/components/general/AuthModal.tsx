import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Button } from "@mui/material";
import { Formik, Form, Field, FormikErrors, FormikTouched } from "formik";
import { authSchema } from "../../schemas/authSchema";
import { FormValues, InputInfo, inputTypes } from "../../types/types";
import LoadingButton from "@mui/lab/LoadingButton";
import { handleSubmit } from "../../helpers/handleAuthSubmit";
import { style } from "../../constants/modalStyle";

const AuthModal = ({
  setOpenModal,
  openModal,
  setUserId,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [isLogin, setStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const usernameRef = useRef<inputTypes>();
  const passwordRef = useRef<inputTypes>();
  const confirmPasswordRef = useRef<inputTypes>();
  const phoneNumberRef = useRef<inputTypes>();

  const inputs: InputInfo[] = [
    {
      label: "نام کاربری",
      name: "username",
      ref: usernameRef,
    },
    {
      label: "شماره تلفن",
      name: "phoneNumber",
      type: "text",
      ref: phoneNumberRef,
      hide: isLogin,
      inputMode: "numeric",
    },

    {
      label: "رمز عبور",
      name: "password",
      type: "password",
      ref: passwordRef,
    },
    {
      label: "تکرار رمز عبور",
      name: "confirmPassword",
      type: "password",
      ref: confirmPasswordRef,
      hide: isLogin,
    },
  ];

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CloseIcon
          className="self-end text-red-500 cursor-pointer"
          onClick={() => setOpenModal(false)}
        />
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isLogin ? "ورود" : "عضویت"}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          اطلاعات {isLogin ? "ورود" : "عضویت"} خود را وارد کنید
        </Typography>

        <Formik<FormValues>
          onSubmit={(values) => {
            handleSubmit({
              values,
              isLogin,
              setOpenModal,
              setLoading,
              setUserId,
            });
          }}
          validationSchema={authSchema(isLogin)}
          initialValues={{
            password: "",
            confirmPassword: "",
            username: "",
            phoneNumber: "",
          }}
        >
          {({
            errors,
            touched,
          }: {
            errors: FormikErrors<FormValues>;
            touched: FormikTouched<FormValues>;
          }) => (
            <Form className="flex flex-col gap-1">
              {inputs.map((inputInfo, idx) => {
                if (!inputInfo.hide) {
                  return (
                    <Field name={inputInfo.name} key={idx}>
                      {({ field }: any) => (
                        <TextField
                          {...field}
                          inputRef={inputInfo.ref}
                          size="small"
                          variant="standard"
                          label={inputInfo.label}
                          type={inputInfo.type || "text"}
                          inputMode={
                            inputInfo.inputMode ? inputInfo.inputMode : "text"
                          }
                          helperText={
                            touched[inputInfo.name] && errors[inputInfo.name]
                          }
                          error={Boolean(
                            touched[inputInfo.name] && errors[inputInfo.name],
                          )}
                        />
                      )}
                    </Field>
                  );
                } else {
                  return null;
                }
              })}
              <hr className="my-5" />
              <LoadingButton
                loading={isLoading}
                variant="contained"
                type="submit"
              >
                {isLogin ? "ورود" : "عضویت"}
              </LoadingButton>
            </Form>
          )}
        </Formik>

        <div className="flex gap-1 items-center !text-[12px]">
          <span className="text-black">
            {!isLogin ? "حساب کاربری دارید؟" : "حساب کاربری ندارید؟"}
          </span>
          <Button
            className="self-start"
            variant="text"
            onClick={() => setStatus((prev) => !prev)}
          >
            {!isLogin ? "وارد حساب خود شوید" : "ثبت نام کنید"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AuthModal;
