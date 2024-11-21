import { useSelector } from "react-redux";

export type AppSliceStateTypes = {
  showAdmin: boolean;
  username: string;
  userId: string | null;
  openModal: boolean;
  isAdmin: boolean;
  userInfo: any;
  dates: any[];
};

export const initialState: AppSliceStateTypes = {
  showAdmin: false,
  username: "",
  userId: null,
  openModal: false,
  isAdmin: false,
  userInfo: { profile_picture: "" },
  dates: [],
};

const valueSelector = <K extends keyof AppSliceStateTypes>(
  key: K,
): AppSliceStateTypes[K] => {
  return useSelector(
    (state: { appReducer: AppSliceStateTypes }) => state.appReducer[key],
  );
};

export const statesValues = () => {
  return {
    showAdmin: valueSelector("showAdmin"),
    dates: valueSelector("dates"),
    username: valueSelector("username"),
    userId: valueSelector("userId"),
    openModal: valueSelector("openModal"),
    userInfo: valueSelector("userInfo"),
    isAdmin: valueSelector("isAdmin"),
  };
};
