import axios from "axios";
import { Card } from "@mui/material";

const ShowTimeAndDates = ({
  date,
  setSelectedDate,
  setStep,
  userName,
  selectedDate,
  setUserName,
  dateId,
}: {
  date: string;
  setSelectedDate?: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userName?: string;
  selectedDate?: string;
  setUserName?: React.Dispatch<React.SetStateAction<string>>;
  dateId?: string;
}) => {
  return (
    <Card
      variant="outlined"
      onClick={async () => {
        // select date step
        if (setSelectedDate) {
          setSelectedDate(date);
        }
        // select time step
        else {
          const { data: reserveDate } = await axios.get(
            `http://localhost:3000/reserves/${dateId}`,
          );

          await axios.put(`http://localhost:3000/reserves/${dateId}`, {
            ...reserveDate,
            userName,
          });

          // @ts-ignore
          silverBox({
            title: {
              text: "رزرو موفق",
              alertIcon: "success",
            },
            centerContent: true,
            showCloseButton: true,
            text: `${userName} گرامی، نوبت شما در تاریخ: ${selectedDate} و در زمان: ${date} با موفقیت ثبت شد.`,
            cancelButton: {
              text: "تایید و برگشت",
              bgColor: "green",
              borderColor: "green",
            },

            onClose: () => {
              setStep(1);
              if (setUserName) setUserName("");
            },
          });
        }

        setStep((prev) => prev + 1);
      }}
      className="border p-2 rounded cursor-pointer !bg-[#00A9FF]"
    >
      {date}
    </Card>
  );
};

export default ShowTimeAndDates;
