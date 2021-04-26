import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import axios from "axios";

// This sets up an entities property in the map state to easily find nodes by id
const mapAdapter = createEntityAdapter<NodeData>();

// Status property in order to indicate loading
// CurNode stored within MapSlice because it makes more sense
// than giving it its own slice
const initialState = mapAdapter.getInitialState({
  status: "idle",
  curNodeId: "",
});

// Async thunk which gets map data based on userId
export const fetchMap = createAsyncThunk<MapData, string>(
  "map/fetchMap",
  async (userId) => {
    const response = await axios.get<MapData>(`/assoc/${userId}/map`);
    return response.data;
  }
);

// Async thunk which queries map with a userId
export const queryMap = createAsyncThunk<
  MapAction,
  { userId: string; query: string }
>("map/queryMap", async ({ userId, query }) => {
  const response = await axios.post<MapAction>(`/${userId}/map`, { query });
  return response.data;
});

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    switchNode(state, action) {
      state.curNodeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMap.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMap.fulfilled, (state, action) => {
        mapAdapter.setAll(state, action.payload.nodes);
        (state.status = "idle"), (state.curNodeId = action.payload.curNodeId);
      })
      .addCase(queryMap.pending, (state) => {
        state.status = "loading";
      })
      .addCase(queryMap.fulfilled, (state, action) => {
        if (action.payload.unlockItem)
          mapAdapter.updateOne(state, {
            id: action.payload.unlockItem.id,
            changes: action.payload.unlockItem,
          });
        else if (action.payload.unlockNode)
          mapAdapter.addOne(state, action.payload.unlockNode);
      });
  },
});

export const { switchNode } = mapSlice.actions;

export const {
  selectAll: selectNodes,
  selectById: selectNodeById,
} = mapAdapter.getSelectors<RootState>((state) => state.map);

export default mapSlice.reducer;
