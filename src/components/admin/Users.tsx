import { useEffect, useMemo, useState } from "react";
import { HiTrash } from "react-icons/hi";
import noDataImage from "../../assets/no-data.png";
import { getUsers } from "../../services/services";
import { supabase } from "../../Supabase/initialize";
import {
  Box,
  CircularProgress,
  IconButton,
  Avatar,
  Paper,
} from "@mui/material";
import moment from "jalali-moment";
import TableToolbar from "../general/TableToolBar";
import { useSearchParams } from "react-router-dom";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

type User = {
  id: string;
  created_at: string;
  username: string;
  phone_number: string;
  profile_picture: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAscending, setAscendingStatus] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{ [id: string]: boolean }>(
    {},
  );
  const [query, setQuery] = useSearchParams();
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    showUsers(isAscending);
  }, [isAscending]);

  const showUsers = async (isAscending: boolean) => {
    setTableLoading(true);
    try {
      const { data: users, error } = await getUsers(isAscending);
      if (users) setUsers(users);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setTableLoading(false);
    }
  };

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

  const filteredUsers: GridRowsProp = useMemo(() => {
    const queryResult = query.get("query");
    return queryResult
      ? users.filter((user) => user.username?.includes(queryResult))
      : users;
  }, [query, users]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "شناسه",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
    },
    {
      field: "created_at",
      headerName: "تاریخ ساخت اکانت",
      flex: 1,
      sortable: false,
      filterable: false,
      valueGetter: (params: any) => {
        const date = params.value;
        if (!date) return "-";
        try {
          return (
            moment(date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD") ?? "-"
          );
        } catch (error) {
          return "-";
        }
      },
      align: "center",
    },
    {
      field: "username",
      headerName: "نام کاربری",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
    },
    {
      field: "phone_number",
      headerName: "شماره تلفن",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
    },
    {
      field: "profile_picture",
      headerName: "عکس کاربر",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
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
    },
    {
      field: "actions",
      headerName: "عملیات",
      flex: 1,
      sortable: false,
      filterable: false,
      align: "center",
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.id)} color="error">
          {loadingStates[params.row.id] ? (
            <CircularProgress size="24px" color="error" />
          ) : (
            <HiTrash />
          )}
        </IconButton>
      ),
    },
  ];

  return (
    <div id="reserve-list-wrapper" className="flex flex-col items-center p-5">
      <Paper sx={{ m: 3, width: "100%", height: 600 }}>
        <TableToolbar
          isAscending={isAscending}
          setAscendingStatus={setAscendingStatus}
          title="لیست کاربران"
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
        ) : filteredUsers?.length ? (
          <DataGrid
            rows={filteredUsers}
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
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            gap={2}
          >
            <span>داده ای یافت نشد</span>
            <img src={noDataImage} alt="No Data" style={{ width: 100 }} />
          </Box>
        )}
      </Paper>
    </div>
  );
};

export default Users;
