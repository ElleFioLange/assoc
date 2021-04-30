import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

const initialState = {
  loading: false,
  quantity: 10,
};

export const fetchTokens = createAsyncThunk<
  number,
  undefined,
  { state: RootState }
>("tokens/fetchTokens", async (_, thunkApi) => {
  const userId = thunkApi.getState().user.userId;
  const response = await axios.get<number>(`/assoc/${userId}/tokens`);
  return response.data;
});

export const useTokens = createAsyncThunk<number, number, { state: RootState }>(
  "tokens/useTokens",
  async (quantity, thunkApi) => {
    const userId = thunkApi.getState().user.userId;
    const response = await axios.post<number>(`/assoc/${userId}/tokens/use`, {
      quantity,
    });
    return response.data;
  }
);

export const addTokens = createAsyncThunk<number, number, { state: RootState }>(
  "tokens/addTokens",
  async (quantity, thunkApi) => {
    const userId = thunkApi.getState().user.userId;
    const response = await axios.post<number>(`/assoc/${userId}/tokens/add`, {
      quantity,
    });
    return response.data;
  }
);

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.loading = false;
        state.quantity = action.payload;
      })
      .addCase(useTokens.pending, (state) => {
        state.loading = true;
      })
      .addCase(useTokens.fulfilled, (state, action) => {
        state.loading = false;
        state.quantity = action.payload;
      })
      .addCase(addTokens.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTokens.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.quantity = action.payload;
      });
  },
});

export default tokensSlice.reducer;
