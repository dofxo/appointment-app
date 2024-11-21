import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./appReducerHelpers";

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setShowAdmin(state, action: PayloadAction<boolean>) {
      state.showAdmin = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setUserId(state, action: PayloadAction<string | null>) {
      state.userId = action.payload;
    },
    setOpenModal(state, action: PayloadAction<boolean>) {
      state.openModal = action.payload;
    },
    setIsAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
    },
    setDates(state, action: PayloadAction<any[]>) {
      state.dates = action.payload;
    },
  },
});

export const {
  setShowAdmin,
  setUserId,
  setOpenModal,
  setIsAdmin,
  setUsername,
  setDates,
  setUserInfo,
} = appSlice.actions;

export default appSlice;
