import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
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
  userInfo,
}: {
  username: string;
  userId: string | null;
  isAdmin: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: any;
}) => {
  const [inSettings, setInsettings] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [userProfile, setUserProfile] = useState("");
  const [showSwithUserButton, setSwitchUserStatus] = useState(false);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    setSwitchUserStatus(isAdmin);
  }, []);

  useEffect(() => {
    if (!userInfo) return;

    setUserProfile((prev) => {
      if (userInfo.profile_picture) {
        prev = userInfo.profile_picture ?? "";
      }
      return prev;
    });
  }, [userInfo]);

  return (
    <AppBar>
      <Toolbar>
        <div
          id="header"
          className="mb-[40px] flex flex-col items-center gap-5 w-full"
        >
          <h1 id="page-title" className="text-3xl w-full mt-5">
            رزرو نوبت
          </h1>
          <div
            id="main-content"
            className="flex items-center justify-between w-full"
          >
            <Box className="flex items-center gap-5" sx={{ flexGrow: 0 }}>
              <Tooltip title={username ? "بار کردن منو" : ""}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={username}
                    src={userProfile}
                    sx={{ width: 60, height: 60 }}
                  />
                </IconButton>
              </Tooltip>
              {username && (
                <>
                  <Typography sx={{ display: { xs: "none", md: "block" } }}>
                    {username} عزیز٬ خوش آمدید.
                  </Typography>
                  <Menu
                    sx={{ mt: "70px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    className="flex flex-col"
                  >
                    <MenuItem className="w-full" onClick={handleCloseUserMenu}>
                      <Typography
                        onClick={() => {
                          setToken(null);
                          setUserId(null);
                          setUsername("");
                          setIsAdmin(false);
                          setUserProfile("");
                        }}
                        className="!font-[unset] !text-sm"
                      >
                        خروج از حساب
                      </Typography>
                    </MenuItem>
                    {showSwithUserButton && (
                      <MenuItem
                        className="w-full"
                        onClick={handleCloseUserMenu}
                      >
                        <Typography
                          onClick={() => {
                            isAdmin ? navigate("/user/") : navigate("/admin/");
                            setIsAdmin((prev) => !prev);
                          }}
                          className="!font-[unset] !text-sm"
                        >
                          تغییر به {isAdmin ? "کاربر" : "ادمین"}
                        </Typography>
                      </MenuItem>
                    )}
                  </Menu>
                </>
              )}
            </Box>

            <div className="button-wrapper flex items-center gap-2 text-white rounded">
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
                    to={isAdmin ? "/admin" : "/user"}
                    onClick={() => setInsettings(!inSettings)}
                  >
                    <Button className="!text-white !text-[17px]">خانه</Button>
                  </Link>

                  <Link to="/settings">
                    <Button className="!text-white !text-[17px]">
                      تنظیمات
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
