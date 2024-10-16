import axios from "axios";
import { useEffect, useState } from "react";
import ShowDates from "./ShowTimeAndDates.tsx";

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

  useEffect(() => {
    (async () => {
      const { data: dates } = await axios.get("http://localhost:3000/reserves");
      const filteredDates: string[] = [];

      dates.map((date: any) => {
        if (filteredDates.includes(date.date) || date.userName) return;
        filteredDates.push(date.date);
      });

      setReservedDate(filteredDates);
    })();
  }, []);

  return (
    <div className="first-step">
      <h2>{userName} گرامی، لطفا تاریخ مورد نظر خودتان را انتخاب کنید</h2>

      <div className="available-dates mt-20 flex gap-5 justify-center">
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
      </div>
    </div>
  );
};

export default DateStep;
