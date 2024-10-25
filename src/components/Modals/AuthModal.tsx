import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { supabase } from "../../Supabase/initialize";
import { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Input, TextField } from "@mui/material";

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

  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const inputs = [
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
      name: "confirm-password",
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

        <div className="flex flex-col gap-1">
          {inputs.map((inputInfo, idx) => {
            if (!inputInfo.hide) {
              return (
                <TextField
                  inputRef={inputInfo.ref}
                  size="small"
                  variant="standard"
                  label={inputInfo.label}
                  type={inputInfo.type ? inputInfo.type : "text"}
                  key={idx}
                />
              );
            } else {
              return "";
            }
          })}
        </div>

        <Button variant="contained"> {isLogin ? "ورود" : "عضویت"}</Button>

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
