import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "./store";

// This sets up an entities property in the state to easily find locations by id
const locationAdapter = createEntityAdapter<TLocation>();

const locationSlice = createSlice({
  name: "locations",
  initialState: locationAdapter.getInitialState(),
  reducers: {
    addLocation: locationAdapter.addOne,
    deleteLocations: locationAdapter.removeAll,
  },
});

export const { addLocation, deleteLocations } = locationSlice.actions;

export const {
  selectIds: selectLocationsIds,
  selectEntities: selectLocationDict,
  selectAll: selectLocations,
  selectTotal: selectTotalLocations,
  selectById: selectLocationById,
} = locationAdapter.getSelectors<RootState>((state) => state.locations);

export default locationSlice.reducer;
