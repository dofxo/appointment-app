import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import noDataImage from "../../assets/no-data.png";

import "./styles.scss";
import { reservredDatesArrayType } from "../../types/types";
import { getReserves } from "../../services/services";
import { supabase } from "../../Supabase/initialize";
import { CircularProgress } from "@mui/material";

const SeeReserves = ({
  dates,
  setDates,
}: {
  dates: reservredDatesArrayType[];
  setDates: React.Dispatch<React.SetStateAction<reservredDatesArrayType[]>>;
}) => {
  useEffect(() => {
    (async () => {
      setTableLoading(true);

      const { data: reserves } = await getReserves();
      if (reserves) setDates(reserves);

      setTableLoading(false);
    })();
  }, []);

  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const [tableLoading, setTableLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const { error } = await supabase.from("reserves").delete().eq("id", id);
      if (error) throw error;

      const { data: reserves } = await getReserves();
      if (reserves) setDates(reserves);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

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
        {tableLoading ? (
          <div className="self-center flex items-center gap-5">
            <CircularProgress />
          </div>
        ) : dates.length ? (
          dates?.map((date: any) => (
            <div
              className="grid grid-cols-4 gap-10 text-white text-xl"
              key={date.id}
            >
              <p>{date.date}</p>
              <p>{date.time}</p>
              <p>{date.userName ?? "-"}</p>
              <p
                className="text-red-500 cursor-pointer flex justify-center items-center"
                onClick={() => handleDelete(date.id)}
              >
                {loadingStates[date.id] ? (
                  <CircularProgress size="30px" color="error" />
                ) : (
                  <HiTrash className="w-[30px] h-[25px]" />
                )}
              </p>
            </div>
          ))
        ) : (
          <div className="self-center flex items-center gap-5">
            <span className="text-white">داده ای یافت نشد</span>
            <img className="w-[100px]" src={noDataImage} />
          </div>
        )}
      </div>
    </>
  );
};

export default SeeReserves;
