import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { supabase } from "../../Supabase/initialize";
import { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import { Formik, Form, Field, FormikErrors, FormikTouched } from "formik";
import { authSchema } from "../../schemas/authSchema";
import { FormValues, InputInfo, inputTypes } from "../../types/types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const AuthModal = ({
  setOpenModal,
  openModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLogin, setStatus] = useState(false);

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          // name: nameValue,
          // password: passwordValue,
        },
      ])
      .select();
  };

  const usernameRef = useRef<inputTypes>();
  const passwordRef = useRef<inputTypes>();
  const confirmPasswordRef = useRef<inputTypes>();

  const inputs: InputInfo[] = [
    {
      label: "نام کاربری",
      name: "username",
      ref: usernameRef,
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
          onSubmit={() => {}}
          validationSchema={authSchema}
          initialValues={{ password: "", confirmPassword: "", username: "" }}
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
            </Form>
          )}
        </Formik>

        <Button
          variant="contained"
          onClick={() => {
            const inputValues = {
              username: usernameRef?.current?.value,
              password: passwordRef?.current?.value,
            };
            console.log(inputValues);
          }}
        >
          {" "}
          {isLogin ? "ورود" : "عضویت"}
        </Button>

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
