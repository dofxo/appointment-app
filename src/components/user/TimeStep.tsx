import { useEffect, useState } from "react";
import ShowTimeAndDates from "./ShowTimeAndDates";
import { reservredDatesArrayType } from "../../types/types";
import { getReserves } from "../../services/services";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const TimeStep = ({
  userName = "کاربر",
  selectedDate,
  setStep,
}: {
  userName: string;
  selectedDate: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [reservedTimes, setReservedTime] = useState<reservredDatesArrayType>(
    [],
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: reserves } = await getReserves();

      const filteredReservers: reservredDatesArrayType | any = reserves?.filter(
        (date: any) => date.date === selectedDate && !date.userName,
      );

      if (filteredReservers) setReservedTime(filteredReservers);

      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h2>{userName} گرامی، لطفا زمان مورد نظر خودتان را انتخاب کنید</h2>
      <div className="flex justify-center mt-20 gap-5">
        {loading ? (
          <Box sx={{ width: "30%" }}>
            <LinearProgress />
          </Box>
        ) : (
          reservedTimes?.map((date) => (
            <ShowTimeAndDates
              date={date.time}
              key={date.id}
              dateId={date.id}
              setStep={setStep}
              selectedDate={selectedDate}
              userName={userName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TimeStep;
