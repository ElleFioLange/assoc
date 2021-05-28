import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "./store";

// This sets up an entities property in the state to easily find items by id
const itemAdapter = createEntityAdapter<TItem>();

const itemSlice = createSlice({
  name: "items",
  initialState: itemAdapter.getInitialState(),
  reducers: {
    addItem: itemAdapter.addOne,
    deleteItems: itemAdapter.removeAll,
  },
});

export const { addItem, deleteItems } = itemSlice.actions;

export const {
  selectIds: selectItemsIds,
  selectEntities: selectItemDict,
  selectAll: selectItems,
  selectTotal: selectTotalItems,
  selectById: selectItemById,
} = itemAdapter.getSelectors<RootState>((state) => state.items);

export default itemSlice.reducer;
