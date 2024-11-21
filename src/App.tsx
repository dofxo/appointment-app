// package imports
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

// helpers
import { getUser } from "./services/services";

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
import { statesValues } from "./redux/appReducerHelpers";
import {
  setUsername,
  setUserId,
  setUserInfo,
  setIsAdmin,
  setShowAdmin,
} from "./redux/appReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId, isAdmin } = statesValues();

  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // sets userId (can be signed in already)
      const userId = localStorage.getItem("token") || null;
      dispatch(setUserId(userId));

      // if user is logged in
      if (userId) {
        try {
          // get the user details from its id and places it
          setIsLoading(true);
          const { error, data } = await getUser(userId);

          if (data) {
            if (data.username) dispatch(setUsername(data.username));
            if (data.isAdmin) dispatch(setIsAdmin(true));
            dispatch(setUserInfo(data));
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
    dispatch(setShowAdmin(filteredPathName.includes("admin")));
  }, [isAdmin]);

  return (
    <>
      {!isLoading ? (
        <>
          <Toaster />
          <center className="max-w-[1200px] m-[auto] mt-[20px] pb-[50px] pt-[75px]">
            <Header />

            <AuthModal />

            <div className="mt-[100px]">
              <Routes>
                <Route path="/authPrompt" element={<AuthPrompt />} />
                <Route path="/admin" element={<Admin />}>
                  <Route path="/admin/create" element={<ManageReserves />} />
                  <Route path="/admin/see" element={<SeeReserves />} />
                  <Route path="/admin/users" element={<Users />} />
                </Route>
                <Route path="/user" element={<User />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </center>
        </>
      ) : (
        <div className="flex justify-center mt-[150px]">
          <CircularProgress size={150} />
        </div>
      )}
    </>
  );
};

export default TitleAdder(App, "خانه");
