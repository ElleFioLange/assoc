import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  displayName: "",
  tokens: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
    },
    setTokens(state, action) {
      state.tokens = action.payload;
    },
  },
});

export const { setUserInfo, setTokens } = userSlice.actions;

export default userSlice.reducer;
