import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import mapReducer from "./mapSlice";
import tokensReducer from "./tokensSlice";
import userReducer from "./userSlice";
import settingsReducer from "./settingsSlice";

const store = configureStore({
  reducer: {
    map: mapReducer,
    tokens: tokensReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
