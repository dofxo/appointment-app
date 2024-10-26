import { Card } from "@mui/material";
import { supabase } from "../../Supabase/initialize";
import toast from "react-hot-toast";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const ShowTimeAndDates = ({
  date,
  setSelectedDate,
  setStep,
  userName,
  selectedDate,
  dateId,
}: {
  date: string;
  setSelectedDate?: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userName?: string;
  selectedDate?: string;
  dateId?: string;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Card
      variant="outlined"
      onClick={async () => {
        try {
          // select date step
          if (setSelectedDate) {
            setSelectedDate(date);
          }
          // select time step
          else {
            setLoading(true);
            const { error } = await supabase
              .from("reserves")
              .update({ userName })
              .eq("id", dateId)
              .select();

            if (error) throw error;

            toast.success(
              `نوبت شما در تاریخ ${selectedDate}, ${date} با موفقیت ثبت شد`,
              {
                duration: 4000,
              },
            );
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
