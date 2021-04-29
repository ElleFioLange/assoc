import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invertBg: false,
  autoAd: false,
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
  },
});

export const { setInvertBg, setAutoAd } = settingsSlice.actions;

export default settingsSlice.reducer;
