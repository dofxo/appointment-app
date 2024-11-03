import { Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import setToken from "../../helpers/setToken";

const Header = ({
  username,
  userId,
  setOpenModal,
  isAdmin,
  setUserId,
  setUsername,
  setIsAdmin,
  showAdmin,
  setShowAdmin,
}: {
  username: string;
  userId: string | null;
  showAdmin: boolean;
  isAdmin: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [inSettings, setInsettings] = useState(false);
  const navigate = useNavigate();

  return (
    <div id="page-title" className="mb-[40px]">
      <h1 className="text-3xl text-[#00A9FF]">رزرو نوبت</h1>
      {username && (
        <div className="text-[#00A9FF] text-xl   flex gap-2 mt-[15px] p-2 rounded !absolute top-5 right-5 !font-[unset]">
          <span className="text-bold text-[25px]"> {username}</span> عزیز٬ خوش
          آمدید.
        </div>
      )}
      <div className="flex gap-2 mt-[15px] text-white p-2 rounded !absolute top-5 left-5 !font-[unset]">
        {!userId && (
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(true);
            }}
            className="!font-[unset]"
          >
            ورود/عضویت
          </Button>
        )}

        {userId && (
          <>
            <Link
              to={!inSettings ? "/settings" : isAdmin ? "/admin/" : "/user/"}
              onClick={() => setInsettings(!inSettings)}
            >
              <Button variant="contained" className="!font-[unset]">
                {!inSettings ? "تنظیمات" : "خانه"}
              </Button>
            </Link>

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
          </>
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
  );
};

export default Header;
