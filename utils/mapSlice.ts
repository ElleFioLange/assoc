import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "./store";

// This sets up an entities property in the map state to easily find nodes by id
const mapAdapter = createEntityAdapter<NodeData>();

// CurNode stored within MapSlice because it makes more sense
// than giving it its own slice
const initialState = mapAdapter.getInitialState({
  curNodeId: "",
});

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCurNodeId(state, action) {
      state.curNodeId = action.payload;
    },
    setMap: mapAdapter.setAll,
    deleteMap: mapAdapter.removeAll,
  },
});

export const { setCurNodeId, setMap, deleteMap } = mapSlice.actions;

export const {
  selectAll: selectNodes,
  selectById: selectNodeById,
} = mapAdapter.getSelectors<RootState>((state) => state.map);

export default mapSlice.reducer;
