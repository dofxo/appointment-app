import { useEffect, useState } from "react";
import ShowDates from "./ShowTimeAndDates.tsx";
import { getReserves } from "../../services/services.ts";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

const DateStep = ({
  userName = "کاربر",
  setSelectedDate,
  setStep,
}: {
  userName: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [reservedDates, setReservedDate] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: reserves } = await getReserves();

      const filteredDates: string[] = [];

      reserves?.map((date: any) => {
        if (filteredDates.includes(date.date) || date.userName) return;
        filteredDates.push(date.date);
      });

      setReservedDate(filteredDates);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="first-step">
      <h2>{userName} گرامی، لطفا تاریخ مورد نظر خودتان را انتخاب کنید</h2>

      <div className="available-dates mt-20 flex gap-5 justify-center">
        {loading ? (
          <Box sx={{ width: "30%" }}>
            <LinearProgress />
          </Box>
        ) : (
          <>
            {reservedDates.length ? (
              reservedDates.map((date) => (
                <ShowDates
                  date={date}
                  key={date}
                  setSelectedDate={setSelectedDate}
                  setStep={setStep}
                />
              ))
            ) : (
              <span className="text-yellow-500 text-xl">نوبتی وجود ندارد</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DateStep;
