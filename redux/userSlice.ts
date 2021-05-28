import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "firebase";
import { RootState } from "./store";

export const toggleSaved = createAsyncThunk<
  Record<string, boolean>,
  string,
  { state: RootState }
>("user/toggleSaved", async (itemId, thunkAPI) => {
  const {
    user: { id, saved },
  } = thunkAPI.getState();
  const newSaved = { ...saved };
  saved[itemId] ? delete newSaved[itemId] : (newSaved[itemId] = true);
  await firestore().collection("users").doc(id).update({ saved: newSaved });
  return newSaved;
});

const initialState: {
  id: string;
  name: string;
  birthday: number;
  curLocationId: string;
  reports: string[];
  lastFeedbackReward: number;
  tokens: number;
  saved: Record<string, boolean>;
} = {
  id: "",
  name: "",
  birthday: 0,
  curLocationId: "",
  reports: [],
  lastFeedbackReward: 0,
  tokens: 0,
  saved: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state = payload;
    },
    setCurLocationId(state, { payload }) {
      state.curLocationId = payload;
    },
    setLastFeedbackReward(state, { payload }) {
      state.lastFeedbackReward = payload;
    },
    setTokens(state, { payload }) {
      state.tokens = payload;
    },
    setSaved(state, { payload }) {
      state.saved = payload;
    },
  },
});

export const {
  setUser,
  setCurLocationId,
  setLastFeedbackReward,
  setTokens,
  setSaved,
} = userSlice.actions;

export default userSlice.reducer;
