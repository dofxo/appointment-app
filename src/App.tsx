import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import Admin from "./components/admin/Admin";
import User from "./components/user/User";
import { Routes, Route, useNavigate } from "react-router-dom";
import SeeReserves from "./components/admin/SeeReserves";
import ManageReserves from "./components/admin/ManageReserves";

import { AdminContext } from "./context/adminContent";
import { Navigate, useLocation } from "react-router-dom";

const App = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [dates, setDates] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    const filteredPathName = pathname.replace(/[\/\\]/g, "");

    setShowAdmin(filteredPathName.includes("admin"));
  }, []);

  const navigate = useNavigate();

  return (
    <AdminContext.Provider value={{ setShowAdmin, showAdmin }}>
      <center className="max-w-[1200px] m-[auto] mt-[20px]">
        <div id="page-title" className="mb-[40px]">
          <h1 className="text-3xl text-[#00A9FF]">رزرو نوبت</h1>
          <Button
            variant="contained"
            onClick={() => {
              showAdmin ? navigate("/user/") : navigate("/admin/");
              setShowAdmin(!showAdmin);
            }}
            className="mt-[15px] text-white p-2 rounded !absolute top-5 left-5 !font-[unset]"
          >
            تغییر به {showAdmin ? "کاربر" : "ادمین"}
          </Button>
        </div>

        <div className="mt-[15%]">
          <Routes>
            <Route path="/" element={<Navigate to="/user/" />} />
            <Route path="/admin" element={<Admin />}>
              <Route
                path="/admin/create"
                element={<ManageReserves setDates={setDates} />}
              />
              <Route
                path="/admin/see"
                element={<SeeReserves dates={dates} setDates={setDates} />}
              />
            </Route>
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </center>
    </AdminContext.Provider>
  );
};

export default App;
