import { createSlice } from "@reduxjs/toolkit";

const tokensSlice = createSlice({
  name: "tokens",
  initialState: 0,
  reducers: {
    setTokens: (_, action) => action.payload,
  },
});

export const { setTokens } = tokensSlice.actions;

export default tokensSlice.reducer;
