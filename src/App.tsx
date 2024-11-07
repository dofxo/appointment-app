// package imports
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

// helpers
import { getUser } from "./services/services";
import { reservredDatesArrayType } from "./types/types";
import { AdminContext } from "./context/appointmentContent";

// components
import CircularProgress from "@mui/material/CircularProgress";

import {
  Admin,
  ManageReserves,
  SeeReserves,
  User,
  AuthPrompt,
  AuthModal,
  Header,
  Settings,
  TitleAdder,
  Users,
} from "./components/";

const App = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [dates, setDates] = useState<reservredDatesArrayType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState<null | string>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // sets userId (can be signed in already)
      const userId = localStorage.getItem("token") || null;
      setUserId(userId);

      // if user is logged in
      if (userId) {
        try {
          // get the user details from its id and places it
          setIsLoading(true);
          const { error, data } = await getUser(userId);

          if (data) {
            if (data.username) setUsername(data.username);
            if (data.isAdmin) setIsAdmin(true);
            setUserInfo(data);
            navigate(data.isAdmin ? "/admin/see" : "/user");
          }

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

  useEffect(() => {
    // changes the state based on the path
    const { pathname } = location;
    const filteredPathName = pathname.replace(/[\/\\]/g, "");
    setShowAdmin(filteredPathName.includes("admin"));
  }, [isAdmin]);

  return (
    <AdminContext.Provider value={{ setShowAdmin, showAdmin }}>
      {!isLoading ? (
        <>
          <Toaster />
          <center className="max-w-[1200px] m-[auto] mt-[20px] pt-[75px]">
            <Header
              username={username}
              userId={userId}
              setUserId={setUserId}
              setOpenModal={setOpenModal}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              setUsername={setUsername}
              userInfo={userInfo}
            />

            <AuthModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              setUserId={setUserId}
            />

            <div className="mt-[100px]">
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
                  <Route path="/admin/users" element={<Users />} />
                </Route>
                <Route path="/user" element={<User userName={username} />} />
                <Route
                  path="/settings"
                  element={<Settings userId={userId} />}
                />
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

export default TitleAdder(App, "خانه");
