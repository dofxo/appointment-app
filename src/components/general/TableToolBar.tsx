import {
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  HiOutlineSearch,
  HiSortAscending,
  HiSortDescending,
} from "react-icons/hi";

const TableToolbar = ({
  title,
  isAscending,
  setAscendingStatus,
  setQuery,
}: {
  title: string;
  isAscending: boolean;
  setAscendingStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setQuery: any;
}) => {
  return (
    <>
      <Toolbar className="flex justify-between ">
        <Typography
          sx={{ color: "primary.main" }}
          variant="h6"
          className="font-bold text-xl"
        >
          {title}
        </Typography>

        <TextField
          size="small"
          id="outlined-search"
          type="search"
          variant="standard"
          sx={{ p: 2 }}
          onChange={(e) => setQuery({ query: e.target.value })}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <HiOutlineSearch size={25} className="mx-2" />
                </InputAdornment>
              ),
            },
          }}
        />

        <Tooltip
          title={`نمایش بر اساس ${!isAscending ? "قدیمی ترین" : "جدید ترین"}`}
        >
          <IconButton onClick={() => setAscendingStatus(!isAscending)}>
            {isAscending ? <HiSortAscending /> : <HiSortDescending />}
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
    </>
  );
};

export default TableToolbar;
