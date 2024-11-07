import { Box, Button, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import "./styles.scss";
import { NavLink } from "react-router-dom";
import TitleAdder from "../../HOC/TitleAdder";

const AdminPage = () => {
  const navigationItmes = [
    { path: "/admin/users", text: "کاربران" },
    { path: "/admin/create", text: "اضافه کردن نوبت جدید" },
    { path: "/admin/see", text: "نمایش نوبت ها" },
  ];
  return (
    <>
      <Typography variant="h5" sx={{ color: "primary.main" }}>
        صفحه مدیریت نوبت ها
      </Typography>
      <Box
        sx={{ margin: { sm: "40px", xs: "20px" } }}
        className="button-wrapper flex gap-2 justify-center"
      >
        {navigationItmes.map((item, idx) => (
          <Button
            key={idx}
            variant="contained"
            className="change-status-button"
          >
            <NavLink
              style={({ isActive }) => {
                return { color: isActive ? "#00A" : "" };
              }}
              to={item.path}
            >
              {item.text}
            </NavLink>
          </Button>
        ))}
      </Box>
      <Outlet />
    </>
  );
};

export default TitleAdder(AdminPage, "مدیریت");
