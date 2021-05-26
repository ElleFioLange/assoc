import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  uid: string;
  displayName: string;
  tokens: number;
  saved: TItem[];
} = {
  uid: "",
  displayName: "",
  tokens: 0,
  saved: [],
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
    setTokens(state, action) {
      state.tokens = action.payload;
    },
    setSaved(state, action) {
      state.saved = action.payload;
    },
  },
});

export const { setUser, setTokens, setSaved } = userSlice.actions;

export default userSlice.reducer;
