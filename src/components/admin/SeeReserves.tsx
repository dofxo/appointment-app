import { useEffect } from "react";
import axios from "axios";
import { HiTrash } from "react-icons/hi";

import "./styles.scss";

const SeeReserves = ({
  dates,
  setDates,
}: {
  dates: never[];
  setDates: React.Dispatch<React.SetStateAction<never[]>>;
}) => {
  useEffect(() => {
    (async () => {
      const { data: dates } = await axios.get("http://localhost:3000/reserves");
      setDates(dates);
    })();
  }, []);
  return (
    <>
      <div className="text-[#00A9FF] font-bold text-xl">لیست رزرو ها</div>
      <div className="flex flex-col max-w-[800px] gap-10 mt-10 bg-gray-600 p-5 rounded-[20px]">
        <div className="grid grid-cols-4 gap-10 text-white text-xl border-b-black border-b pb-2">
          <p>تاریخ</p>
          <p>زمان</p>
          <p>رزرو کننده</p>
          <p>عملیات</p>
        </div>
        {dates.length ? (
          dates?.map((date: any) => (
            <div
              className="grid grid-cols-4 gap-10 text-white text-xl"
              key={date.id}
            >
              <p> {date.date}</p>
              <p> {date.time}</p>
              <p> {date.userName ?? "-"}</p>
              <p
                className="text-red-500 cursor-pointer flex justify-center items-center "
                onClick={async () => {
                  await axios.delete(
                    `http://localhost:3000/reserves/${date.id}`,
                  );

                  const { data: reservedDates } = await axios.get(
                    "http://localhost:3000/reserves",
                  );
                  setDates(reservedDates);
                }}
              >
                <HiTrash className="w-[30px] h-[25px]" />
              </p>
            </div>
          ))
        ) : (
          <div className="self-center flex items-center gap-5">
            <span className="text-white">داده ای یافت نشد</span>
            <img
              className="w-[100px]"
              src="/appointment-app/assets/no-data.png"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SeeReserves;
