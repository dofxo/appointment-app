import { Card } from "@mui/material";
import { supabase } from "../../Supabase/initialize";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { MainContext } from "../../context/mainContext";

const ShowTimeAndDates = ({
  date,
  setSelectedDate,
  setStep,
  selectedDate,
  dateId,
  setForceRender,
  setShowState,
  setPhoneNumberModalStatus,
}: {
  date: string | undefined;
  setSelectedDate?: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedDate?: string;
  dateId?: string;
  setForceRender?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowState?: React.Dispatch<React.SetStateAction<"reserves" | "new">>;
  setPhoneNumberModalStatus?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { username: userName } = useContext(MainContext);

  const [loading, setLoading] = useState(false);

  const updateUserInfo = async () => {
    const { error } = await supabase
      .from("reserves")
      .update({ userName })
      .eq("id", dateId)
      .select();

    const { error: error2 } = await supabase
      .from("users")
      .update({ reserve: dateId })
      .eq("username", userName)
      .select();

    if (error) throw error;
    if (error2) throw error2;

    if (setForceRender) setForceRender((prev) => !prev);
    if (setShowState) setShowState("reserves");

    toast.success(
      `نوبت شما در تاریخ ${selectedDate}, ${date} با موفقیت ثبت شد`,
      {
        duration: 4000,
      },
    );
  };
  return (
    <Card
      variant="outlined"
      onClick={async () => {
        try {
          // select date step
          if (setSelectedDate && date) {
            setSelectedDate(date);
          }
          // select time step
          else {
            setLoading(true);

            const { error, data: user } = await supabase
              .from("users")
              .select("*")
              .eq("username", userName)
              .single();

            if (error) throw error;

            if (user.phone_number) {
              updateUserInfo();
            } else {
              if (setPhoneNumberModalStatus) {
                setPhoneNumberModalStatus(true);
                return;
              }
            }
          }

          setStep((prev) => {
            if (prev === 2) {
              return 1;
            } else {
              return prev + 1;
            }
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }}
      className="border p-2 rounded cursor-pointer !bg-[#00A9FF]"
    >
      {loading ? <CircularProgress size="15px" /> : date}
    </Card>
  );
};

export default ShowTimeAndDates;
