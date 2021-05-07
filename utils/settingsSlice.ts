import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  invertBg: false,
  autoAd: false,
  disableAnimations: false,
};

export const fetchSettings = createAsyncThunk("settings/fetch", async () => {
  const settings = await AsyncStorage.getItem("settings");
  return settings;
});

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setInvertBg(state, action) {
      state.invertBg = action.payload;
      AsyncStorage.setItem(
        "settings",
        JSON.stringify({ ...state, invertBg: action.payload })
      );
    },
    setAutoAd(state, action) {
      state.autoAd = action.payload;
      AsyncStorage.setItem(
        "settings",
        JSON.stringify({ ...state, autoAd: action.payload })
      );
    },
    setDisableAnimations(state, action) {
      state.disableAnimations = action.payload;
      AsyncStorage.setItem(
        "settings",
        JSON.stringify({ ...state, disableAnimations: action.payload })
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      if (action.payload) {
        const { invertBg, autoAd, disableAnimations } = JSON.parse(
          action.payload
        );
        state.invertBg = invertBg;
        state.autoAd = autoAd;
        state.disableAnimations = disableAnimations;
      }
    });
  },
});

export const {
  setInvertBg,
  setAutoAd,
  setDisableAnimations,
} = settingsSlice.actions;

export default settingsSlice.reducer;
