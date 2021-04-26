import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  quantity: 0,
};

export const fetchTokens = createAsyncThunk<number, string>(
  "tokens/fetchTokens",
  async (userId) => {
    const response = await axios.get<number>(`/assoc/${userId}/tokens`);
    return response.data;
  }
);

export const useTokens = createAsyncThunk<
  number,
  { userId: string; quantity: number }
>("tokens/useTokens", async ({ userId, quantity }) => {
  const response = await axios.post<number>(`/${userId}/tokens`, { quantity });
  return response.data;
});

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state = { status: "idle", quantity: action.payload };
      })
      .addCase(useTokens.pending, (state) => {
        state.status = "loading";
      })
      .addCase(useTokens.fulfilled, (state, action) => {
        state = { status: "idle", quantity: action.payload };
      });
  },
});

export default tokensSlice.reducer;
