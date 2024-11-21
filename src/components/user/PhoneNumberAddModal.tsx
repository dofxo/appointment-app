import { Modal, Box, Typography, TextField } from "@mui/material";
import { style } from "../../constants/modalStyle";
import { Field, Formik, FormikErrors, FormikTouched, Form } from "formik";
import { phoneNumberSchema } from "../../schemas/phoneNumber";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { supabase } from "../../Supabase/initialize";
import toast from "react-hot-toast";
import { convertPersianToEnglishNumbers } from "../../helpers/convertPersianToEnglishNubmers";
import { statesValues } from "../../redux/appReducerHelpers";

type formValue = { phoneNumber: string };

const PhoneNumberAddModal = ({
  phoneNumberModalStatus,
  setPhoneNumberModalStatus,
}: {
  phoneNumberModalStatus: boolean;
  setPhoneNumberModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { username: userName } = statesValues();

  return (
    <Modal
      open={phoneNumberModalStatus}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CloseIcon
          className="self-end text-red-500 cursor-pointer"
          onClick={() => setPhoneNumberModalStatus(false)}
        />
        <Typography id="modal-modal-title" variant="h6" component="h2">
          اضافه کردن شماره تلفن
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          شماره تلفن خود را وارد کنید
        </Typography>

        <Formik<formValue>
          onSubmit={async (values) => {
            try {
              setIsLoading(true);
              const { error } = await supabase
                .from("users")
                .update({
                  phone_number: convertPersianToEnglishNumbers(
                    values.phoneNumber,
                  ),
                })
                .eq("username", userName);

              toast.success("شماره تلفن شما با موفقیت ثبت شد");
              setPhoneNumberModalStatus(false);

              if (error) throw error;
            } catch (error) {
            } finally {
              setIsLoading(false);
            }
          }}
          validationSchema={phoneNumberSchema}
          initialValues={{
            phoneNumber: "",
          }}
        >
          {({
            errors,
            touched,
          }: {
            errors: FormikErrors<formValue>;
            touched: FormikTouched<formValue>;
          }) => (
            <Form className="flex flex-col gap-1">
              <Field name="phoneNumber">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    size="small"
                    variant="standard"
                    label="شماره تلفن"
                    inputMode="numeric"
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  />
                )}
              </Field>
              <hr className="my-5" />
              <LoadingButton
                loading={isLoading}
                variant="contained"
                type="submit"
              >
                ذخیره
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default PhoneNumberAddModal;
