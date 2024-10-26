import { useEffect, useState } from "react";
import axios from "axios";
import ShowTimeAndDates from "./ShowTimeAndDates";
import { reservredDatesArrayType } from "../../types/types";
import { getReserves } from "../../services/services";

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

  useEffect(() => {
    (async () => {
      const { data: reserves } = await getReserves();

      const filteredReservers: reservredDatesArrayType | any = reserves?.filter(
        (date: any) => date.date === selectedDate && !date.userName,
      );

      if (filteredReservers) setReservedTime(filteredReservers);
    })();
  }, []);

  return (
    <div>
      <h2>{userName} گرامی، لطفا زمان مورد نظر خودتان را انتخاب کنید</h2>
      <div className="flex justify-center mt-20 gap-5">
        {reservedTimes?.map((date) => (
          <ShowTimeAndDates
            date={date.time}
            key={date.id}
            dateId={date.id}
            setStep={setStep}
            selectedDate={selectedDate}
            userName={userName}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeStep;
