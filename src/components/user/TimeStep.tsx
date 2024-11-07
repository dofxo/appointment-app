import { useEffect, useState } from "react";
import { reservredDatesArrayType } from "../../types/types";
import { getReserves } from "../../services/services";
import { Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { ShowTimeAndDates } from "../";
import { convertToPersianDate } from "../../helpers/convertToPersianDate";

const TimeStep = ({
  userName = "کاربر",
  selectedDate,
  setStep,
  setForceRender,
  setShowState,
  setPhoneNumberModalStatus,
}: {
  userName: string;
  selectedDate: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
  setShowState: React.Dispatch<React.SetStateAction<"reserves" | "new">>;
  setPhoneNumberModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
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
        (date: any) =>
          convertToPersianDate(date.date, "date") === selectedDate &&
          !date.userName,
      );

      if (filteredReservers) setReservedTime(filteredReservers);

      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <Typography sx={{ fontSize: { xs: "15px", sm: "17px" } }}>
        {userName} گرامی، لطفا زمان مورد نظر خودتان را انتخاب کنید
      </Typography>
      <div className="flex justify-center flex-wrap mt-20 gap-5">
        {loading ? (
          <Box sx={{ width: "30%" }}>
            <LinearProgress />
          </Box>
        ) : (
          reservedTimes?.map((date) => (
            <ShowTimeAndDates
              date={convertToPersianDate(new Date(date.date), "time")}
              key={date.id}
              dateId={date.id}
              setStep={setStep}
              selectedDate={selectedDate}
              userName={userName}
              setForceRender={setForceRender}
              setShowState={setShowState}
              setPhoneNumberModalStatus={setPhoneNumberModalStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TimeStep;
