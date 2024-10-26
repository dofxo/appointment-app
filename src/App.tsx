import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import Admin from "./components/admin/Admin";
import User from "./components/user/User";
import { Routes, Route, useNavigate } from "react-router-dom";
import SeeReserves from "./components/admin/SeeReserves";
import ManageReserves from "./components/admin/ManageReserves";

import { AdminContext } from "./context/appointmentContent";
import { useLocation } from "react-router-dom";

import AuthModal from "./components/Modals/AuthModal";
import { Toaster } from "react-hot-toast";
import { supabase } from "./Supabase/initialize";
import setToken from "./helpers/setToken";
import AuthPrompt from "./components/AuthPrompt/AuthPrompt";
import CircularProgress from "@mui/material/CircularProgress";
import { reservredDatesArrayType } from "./types/types";

const App = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [dates, setDates] = useState<reservredDatesArrayType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState<null | string>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const userId = localStorage.getItem("token") || null;
      setUserId(userId);

      if (userId) {
        try {
          const { error, data } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

          if (data.username) setUsername(data.username);

          if (data.isAdmin) setIsAdmin(true);

          navigate(data.isAdmin ? "/admin" : "/user");

          const { pathname } = location;
          const filteredPathName = pathname.replace(/[\/\\]/g, "");
          setShowAdmin(filteredPathName.includes("admin"));

          if (error) throw error;
        } catch (error) {
          console.error(error);
        }
      } else {
        navigate("/authPrompt");
      }

      setIsLoading(false);
    })();
  }, [userId]);

  return (
    <AdminContext.Provider value={{ setShowAdmin, showAdmin }}>
      {!isLoading ? (
        <>
          <Toaster />
          <center className="max-w-[1200px] m-[auto] mt-[20px]">
            <div id="page-title" className="mb-[40px]">
              <h1 className="text-3xl text-[#00A9FF]">رزرو نوبت</h1>
              {username && (
                <div className="text-[#00A9FF] text-xl   flex gap-2 mt-[15px] p-2 rounded !absolute top-5 right-5 !font-[unset]">
                  <span className="text-bold text-[25px]"> {username}</span>{" "}
                  عزیز٬ خوش آمدید.
                </div>
              )}
              <div className="flex gap-2 mt-[15px] text-white p-2 rounded !absolute top-5 left-5 !font-[unset]">
                {!userId ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="!font-[unset]"
                  >
                    ورود/عضویت
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      setToken(null);
                      setUserId(null);
                      setUsername("");
                      setIsAdmin(false);
                    }}
                    className="!font-[unset]"
                  >
                    خروج از حساب
                  </Button>
                )}

                {isAdmin && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      showAdmin ? navigate("/user/") : navigate("/admin/");
                      setShowAdmin(!showAdmin);
                    }}
                    className="!font-[unset]"
                  >
                    تغییر به {showAdmin ? "کاربر" : "ادمین"}
                  </Button>
                )}
              </div>
            </div>

            <AuthModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              setUserId={setUserId}
            />

            <div className="mt-[15%]">
              <Routes>
                <Route path="/authPrompt" element={<AuthPrompt />} />
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
                <Route path="/user" element={<User userName={username} />} />
              </Routes>
            </div>
          </center>
        </>
      ) : (
        <div className="flex justify-center mt-[150px]">
          <CircularProgress size={150} />
        </div>
      )}
    </AdminContext.Provider>
  );
};

export default App;
