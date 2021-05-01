import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invertBg: false,
  autoAd: false,
  saveCredentials: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setInvertBg(state, action) {
      state.invertBg = action.payload;
    },
    setAutoAd(state, action) {
      state.autoAd = action.payload;
    },
    setSaveCredentials(state, action) {
      state.saveCredentials = action.payload;
    },
  },
});

export const {
  setInvertBg,
  setAutoAd,
  setSaveCredentials,
} = settingsSlice.actions;

export default settingsSlice.reducer;
