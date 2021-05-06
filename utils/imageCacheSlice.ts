import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "./store";

const imageCacheAdapter = createEntityAdapter<Blob>();

const initialState = imageCacheAdapter.getInitialState();

const imageCacheSlice = createSlice({
  name: "imageCache",
  initialState,
  reducers: {
    cacheImage: imageCacheAdapter.upsertOne,
    cacheMultiple: imageCacheAdapter.upsertMany,
    deleteImage: imageCacheAdapter.removeOne,
    deleteMultiple: imageCacheAdapter.removeMany,
    deleteAll: imageCacheAdapter.removeAll,
  },
});

export const {
  cacheImage,
  cacheMultiple,
  deleteImage,
  deleteMultiple,
  deleteAll,
} = imageCacheSlice.actions;

export const {
  selectById: selectImageById,
} = imageCacheAdapter.getSelectors<RootState>((state) => state.imageCache);

export default imageCacheSlice.reducer;
