import { Button, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import "./styles.scss";
import { NavLink } from "react-router-dom";
import TitleAdder from "../../HOC/TitleAdder";

const AdminPage = () => {
  const navigationItmes = [
    { path: "/admin/create", text: "اضافه کردن نوبت جدید" },
    { path: "/admin/see", text: "نمایش نوبت ها" },
  ];
  return (
    <>
      <Typography variant="h5" sx={{ color: "primary.main" }}>
        صفحه مدیریت نوبت ها
      </Typography>
      <div className="button-wrapper m-[40px] flex gap-2 justify-center">
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
      </div>
      <Outlet />
    </>
  );
};

export default TitleAdder(AdminPage, "مدیریت");
