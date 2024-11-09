import { createContext } from "react";
import { reservredDatesArrayType } from "../types/types";

interface mainContextType {
  showAdmin: boolean;
  setShowAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userInfo: { profile_picture: string; username: string } | null;
  setDates: React.Dispatch<React.SetStateAction<reservredDatesArrayType>>;
  dates: reservredDatesArrayType;
  openModal: boolean;
}

export const MainContext = createContext<mainContextType>({
  showAdmin: false,
  setShowAdmin: () => {},
  username: "",
  userId: null,
  setUserId: () => {},
  setOpenModal: () => {},
  openModal: false,
  isAdmin: false,
  setIsAdmin: () => {},
  setUsername: () => {},
  userInfo: null,
  setDates: () => {},
  dates: [],
});
