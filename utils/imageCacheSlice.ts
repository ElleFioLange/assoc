import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

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

export default imageCacheSlice.reducer;
