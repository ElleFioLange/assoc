import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import locationsReducer from "./locationsSlice";
import itemsReducer from "./itemsSlice";
import userReducer from "./userSlice";
import settingsReducer from "./settingsSlice";

const store = configureStore({
  reducer: {
    locations: locationsReducer,
    items: itemsReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
