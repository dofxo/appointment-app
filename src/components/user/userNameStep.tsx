import { InputAdornment, TextField } from "@mui/material";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Formik, Form, Field } from "formik";
import { usernameSchema } from "../../schemas/usernameSchema";

const UserNameStep = ({
  userNameInputRef,
  setUserName,
  setStep,
  submitButtonRef,
}: {
  userNameInputRef: React.MutableRefObject<HTMLInputElement | null>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  submitButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
}) => {
  return (
    <Formik
      initialValues={{ userName: "" }}
      validationSchema={usernameSchema}
      onSubmit={() => {
        if (userNameInputRef.current?.value) {
          setUserName(userNameInputRef.current.value);

          setStep((prev) => prev + 1);
        }
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form className="input-wrapper flex flex-col mt-[40px] gap-4 text-start max-w-[200px]">
            <label htmlFor="userName">نام و نام خانوادگی</label>

            {/* Using Field component to connect form state */}
            <Field name="userName">
              {({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  className="rounded bg-[#00A9FF] outline-none p-1 !text-white w-[200px]"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineAccountCircle
                          className={`ml-2 w-[20px] h-[20px] fill-white ${
                            touched.userName && errors.userName
                              ? "fill-red-500"
                              : ""
                          }`}
                        />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(errors.userName)}
                  helperText={
                    touched.userName && errors.userName ? errors.userName : ""
                  }
                  inputRef={userNameInputRef}
                  type="text"
                  id="userName"
                />
              )}
            </Field>
            <button type="submit" ref={submitButtonRef}></button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserNameStep;
