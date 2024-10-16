import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { Card } from "@mui/material";
import { HiOutlineClock, HiOutlineCalendar } from "react-icons/hi";

import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button } from "@mui/material";

import axios from "axios";
import { Moment } from "jalali-moment";
import moment from "jalali-moment";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageReserves = ({
  setDates,
}: {
  setDates: React.Dispatch<React.SetStateAction<never[]>>;
}) => {
  const [dateValue, setDateValue] = useState<Moment | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const persianDateTemplate = moment(dateValue?.toDate()).locale("fa");

    const date = persianDateTemplate.format(`YYYY/MM/DD`);
    const time = persianDateTemplate.format("HH:mm");

    setDate(date);
    setTime(time);
  }, [dateValue]);
  return (
    <div className="flex flex-col gap-5 max-w-[300px]">
      <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
        <DateTimePicker
          onChange={(newValue) => setDateValue(newValue)}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          ampm={false}
          minDate={moment(new Date())}
        />
      </LocalizationProvider>

      <Card className="!text-white flex flex-col items-start p-2 !bg-[#00A9FF]">
        <h3 className="text-black font-bold">زمان و تاریخ انتخابی </h3>
        <div className="self-start mt-5">
          <p className="flex gap-2 items-center">
            <HiOutlineCalendar className="w-[20px] h-[20px]" />
            <span>{date}</span>
          </p>
          <p className="flex gap-2 items-center">
            <HiOutlineClock className="w-[20px] h-[20px]" />
            <span> {time}</span>
          </p>
        </div>
      </Card>
      <Button
        variant="contained"
        onClick={async () => {
          try {
            // insert new date into db
            await axios.post("http://localhost:3000/reserves", { date, time });

            // update the dates
            const { data: dates } = await axios.get(
              "http://localhost:3000/reserves",
            );
            setDates(dates);

            navigate("/admin/see");
          } catch (error) {
            console.error(error);
          }
        }}
        className="text-white rounded p-1 !font-[unset]"
      >
        تایید زمان و تاریخ
      </Button>
    </div>
  );
};
export default ManageReserves;
