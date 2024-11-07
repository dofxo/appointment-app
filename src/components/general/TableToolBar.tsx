import {
  Divider,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";

const TableToolbar = ({
  title,
  isAscending,
  setAscendingStatus,
}: {
  title: string;
  isAscending: boolean;
  setAscendingStatus: React.Dispatch<React.SetStateAction<boolean>>;
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
