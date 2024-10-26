import { Card } from "@mui/material";
import { supabase } from "../../Supabase/initialize";
import toast from "react-hot-toast";

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
        }
      }}
      className="border p-2 rounded cursor-pointer !bg-[#00A9FF]"
    >
      {date}
    </Card>
  );
};

export default ShowTimeAndDates;
