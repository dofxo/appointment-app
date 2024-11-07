import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import noDataImage from "../../assets/no-data.png";
import { getUsers } from "../../services/services";
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
import moment from "jalali-moment";
import TableToolbar from "../general/TableToolBar";

const Users = () => {
  const headers = [
    "شناسه",
    "تاریخ ساخت اکانت",
    "نام کاربری",
    "شماره تلفن",
    "عکس کاربر",
    "عملیات",
  ];
  const [users, setUsers] = useState<any[]>();
  const [isAscending, setAscendingStatus] = useState(false);

  const showUsers = async (isAscending: boolean) => {
    (async () => {
      try {
        setTableLoading(true);
        const { data: users, error } = await getUsers(isAscending);

        if (users) setUsers(users);

        if (error) throw error;
      } catch (error) {
        console.error(error);
      } finally {
        setTableLoading(false);
      }
    })();
  };

  useEffect(() => {
    showUsers(isAscending);
  }, [isAscending]);

  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const [tableLoading, setTableLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) throw error;

      const { data: users } = await getUsers();
      if (users) setUsers(users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div id="reserve-list-wrapper" className="flex flex-col items-center p-5">
      <TableContainer
        component={Paper}
        sx={{
          m: 3,
        }}
        className="w-full"
      >
        <TableToolbar
          isAscending={isAscending}
          setAscendingStatus={setAscendingStatus}
          title="لیست کاربران"
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
            ) : users?.length ? (
              users.map((date) => {
                const rowData = [
                  date.id ?? "-",
                  moment(date.created_at ?? "", "YYYY/MM/DD")
                    .locale("fa")
                    .format("YYYY/MM/DD") ?? "-",
                  date.username ?? "-",
                  date.phone_number ?? "-",
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

export default Users;
