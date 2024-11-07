import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import noDataImage from "../../assets/no-data.png";
import { getReserves, getUsers } from "../../services/services";
import { supabase } from "../../Supabase/initialize";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";
import { convertToPersianDate } from "../../helpers/convertToPersianDate";
import TableToolbar from "../general/TableToolBar";

const SeeReserves = ({
  dates,
  setDates,
}: {
  dates: any[];
  setDates: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const headers = ["تاریخ", "زمان", "رزرو کننده", "تصویر کاربر", "عملیات"];
  const [isAscending, setAscendingStatus] = useState(false);

  const showReserversOnTable = async (isAscending: boolean) => {
    try {
      setTableLoading(true);
      const { data: reserves } = await getReserves(isAscending);
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
      setTableLoading(false);
    }
  };

  useEffect(() => {
    showReserversOnTable(isAscending);
  }, [isAscending]);

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
    <div id="reserve-list-wrapper" className="flex flex-col items-center p-5">
      <TableContainer component={Paper} sx={{ m: 3 }} className="w-full">
        <TableToolbar
          title="لیست رزرو ها"
          setAscendingStatus={setAscendingStatus}
          isAscending={isAscending}
        />
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} sx={{ textAlign: "center" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableLoading ? (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  sx={{ textAlign: "center" }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : dates.length ? (
              dates.map((date) => {
                const rowData = [
                  convertToPersianDate(date.date ?? "-", "date"),
                  convertToPersianDate(date.date ?? "-", "time"),
                  date.userName ?? "-",
                  date.profile_picture ? (
                    <Avatar
                      src={date.profile_picture}
                      alt="Profile"
                      style={{
                        borderRadius: "50%",
                        margin: "0 auto",
                      }}
                      sx={{
                        width: { xs: "40px", md: "80px" },
                        height: { xs: "40px", md: "80px" },
                      }}
                    />
                  ) : (
                    "-"
                  ),
                  <IconButton
                    onClick={() => handleDelete(date.id ?? "")}
                    color="error"
                  >
                    {loadingStates[date.id ?? ""] ? (
                      <CircularProgress size="24px" color="error" />
                    ) : (
                      <HiTrash />
                    )}
                  </IconButton>,
                ];

                return (
                  <TableRow key={date.id ?? date.userName}>
                    {rowData.map((cellData, index) => (
                      <TableCell
                        key={index}
                        sx={{ textAlign: "center", padding: "8px" }}
                      >
                        {cellData}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  sx={{ textAlign: "center" }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                  >
                    <span>داده ای یافت نشد</span>
                    <img
                      src={noDataImage}
                      alt="No Data"
                      style={{ width: 100 }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SeeReserves;
