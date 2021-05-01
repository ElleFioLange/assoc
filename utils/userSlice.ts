import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  displayName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { uid, displayName } = action.payload;
      state = { uid, displayName };
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
