import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import noDataImage from "../../assets/no-data.png";

import "./styles.scss";
import { reservredDatesArrayType } from "../../types/types";
import { getReserves, getUsers } from "../../services/services";
import { supabase } from "../../Supabase/initialize";
import { CircularProgress, Typography } from "@mui/material";

const SeeReserves = ({
  dates,
  setDates,
}: {
  dates: reservredDatesArrayType[]; // Ensure dates is typed as an array of reservredDatesArrayType
  setDates: React.Dispatch<React.SetStateAction<reservredDatesArrayType[]>>;
}) => {
  const headers = ["تاریخ", "زمان", "رزرو کننده", "تصویر کاربر", "عملیات"];

  useEffect(() => {
    (async () => {
      setTableLoading(true);

      const { data: reserves } = await getReserves();
      const { data: users } = await getUsers();

      reserves?.forEach((reserve) => {
        const user = users?.find((user) => user.username === reserve.userName);
        if (user) {
          reserve.profile_picture = user.profile_picture;
        }
      });

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
      const { data: users } = await getUsers();

      reserves?.forEach((reserve) => {
        const user = users?.find((user) => user.username === reserve.userName);
        if (user) {
          reserve.profile_picture = user.profile_picture;
        }
      });

      if (reserves) setDates(reserves);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <>
      <Typography
        sx={{ color: "primary.main" }}
        variant="h6"
        className="font-bold text-xl"
      >
        لیست رزرو ها
      </Typography>
      <div className="flex flex-col max-w-[800px] gap-10 mt-10 bg-gray-600 p-5 rounded-[20px] mb-[50px]">
        <div className="grid grid-cols-5 gap-10 text-white text-xl border-b-black border-b pb-2">
          {headers.map((header, index) => (
            <p key={index}>{header}</p>
          ))}
        </div>
        {tableLoading ? (
          <div className="self-center flex items-center gap-5">
            <CircularProgress />
          </div>
        ) : dates.length ? (
          dates.map((date: any) => {
            const rowData = [
              date.date,
              date.time,
              date.userName ?? "-",
              date.profile_picture ? (
                <img
                  className="rounded-full w-[80px] h-[80px]"
                  src={date.profile_picture}
                  alt="Profile"
                />
              ) : (
                "-"
              ),
              <span
                className="text-red-500 cursor-pointer flex justify-center items-center"
                onClick={() => handleDelete(date.id)}
              >
                {loadingStates[date.id] ? (
                  <CircularProgress size="30px" color="error" />
                ) : (
                  <HiTrash className="w-[30px] h-[25px]" />
                )}
              </span>,
            ];

            return (
              <div
                className="grid grid-cols-5 gap-10 text-white text-xl items-center"
                key={date.id}
              >
                {rowData.map((data, index) => (
                  <p key={index}>{data}</p>
                ))}
              </div>
            );
          })
        ) : (
          <div className="self-center flex items-center gap-5">
            <span className="text-white">داده ای یافت نشد</span>
            <img className="w-[100px]" src={noDataImage} alt="No Data" />
          </div>
        )}
      </div>
    </>
  );
};

export default SeeReserves;
