import { useContext, useEffect, useMemo, useState } from "react";
import { HiTrash } from "react-icons/hi";
import { getReserves, getUsers } from "../../services/services";
import { supabase } from "../../Supabase/initialize";
import {
  Box,
  CircularProgress,
  IconButton,
  Avatar,
  Paper,
} from "@mui/material";
import { convertToPersianDate } from "../../helpers/convertToPersianDate";
import TableToolbar from "../general/TableToolBar";
import { MainContext } from "../../context/mainContext";
import { useSearchParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const SeeReserves = () => {
  const { dates, setDates } = useContext(MainContext);
  const [isAscending, setAscendingStatus] = useState(false);
  const [query, setQuery] = useSearchParams();
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const [tableLoading, setTableLoading] = useState(false);

  const showReserversOnTable = async (isAscending: boolean) => {
    setTableLoading(true);
    try {
      const { data: reserves } = await getReserves(isAscending);
      const { data: users } = await getUsers();

      reserves?.forEach((reserve) => {
        const user = users?.find((user) => user.username === reserve.userName);
        if (user) {
          reserve.profile_picture = user.profile_picture;
          reserve.phone_number = user.phone_number;
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

  const filteredDates = useMemo(() => {
    const queryResult = query.get("query");
    return queryResult
      ? dates.filter((date) => date.userName?.includes(queryResult))
      : dates;
  }, [query, dates]);

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

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "تاریخ",
      flex: 1,
      valueGetter: (params) => {
        const dateValue = params;

        return dateValue ? convertToPersianDate(new Date(params), "date") : "-";
      },
      align: "center",
      sortable: false,
      filterable: false,
    },

    {
      field: "time",
      headerName: "زمان",
      flex: 1,
      renderCell: (params) => {
        const timeValue = params.row.date;
        return timeValue
          ? convertToPersianDate(new Date(timeValue), "time")
          : "-";
      },
      align: "center",
      sortable: false,
      filterable: false,
    },
    {
      field: "userName",
      headerName: "رزرو کننده",
      flex: 1,
      align: "center",
      sortable: false,
      filterable: false,
    },
    {
      field: "phone_number",
      headerName: "شماره تلفن",
      flex: 1,
      align: "center",
      sortable: false,
      filterable: false,
    },
    {
      field: "profile_picture",
      headerName: "تصویر کاربر",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <Avatar
            src={params.value}
            alt="Profile"
            sx={{ width: 40, height: 40, margin: "0 auto" }}
          />
        ) : (
          "-"
        ),
      align: "center",
      sortable: false,
      filterable: false,
    },
    {
      field: "actions",
      headerName: "عملیات",
      flex: 1,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.id)} color="error">
          {loadingStates[params.row.id] ? (
            <CircularProgress size="24px" color="error" />
          ) : (
            <HiTrash />
          )}
        </IconButton>
      ),
      align: "center",
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <div id="reserve-list-wrapper" className="flex flex-col items-center p-5">
      <Paper sx={{ m: 3, width: "100%", height: 600 }}>
        <TableToolbar
          title="لیست رزرو ها"
          setAscendingStatus={setAscendingStatus}
          isAscending={isAscending}
          setQuery={setQuery}
        />
        {tableLoading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredDates}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50]}
            disableRowSelectionOnClick
            disableColumnMenu
            disableColumnResize
            getRowId={(row) => row.id}
            loading={tableLoading}
            className="centered-header"
          />
        )}
      </Paper>
    </div>
  );
};

export default SeeReserves;
