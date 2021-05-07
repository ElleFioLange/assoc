import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  uid: string;
  displayName: string;
  saved: Record<string, boolean> | null;
} = {
  uid: "",
  displayName: "",
  saved: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { uid, displayName } = action.payload;
      state.uid = uid || state.uid;
      state.displayName = displayName || state.displayName;
    },
    setSaved(state, action) {
      state.saved = action.payload;
    },
  },
});

export const { setUser, setSaved } = userSlice.actions;

export default userSlice.reducer;
