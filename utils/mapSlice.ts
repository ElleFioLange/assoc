import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "./store";

// This sets up an entities property in the map state to easily find locations by id
const mapAdapter = createEntityAdapter<LocationData>();

// CurLocation stored within MapSlice because it makes more sense
// than giving it its own slice
const initialState = mapAdapter.getInitialState({
  curLocationId: "",
});

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setCurLocationId(state, action) {
      state.curLocationId = action.payload;
    },
    setMap: mapAdapter.setAll,
    deleteMap: mapAdapter.removeAll,
  },
});

export const { setCurLocationId, setMap, deleteMap } = mapSlice.actions;

export const {
  selectAll: selectLocations,
  selectById: selectLocationById,
} = mapAdapter.getSelectors<RootState>((state) => state.map);

export default mapSlice.reducer;
