import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import store from "./store";
import type { RootState, AppDispatch } from "./store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export const useAppDispatch = (): ReturnType<typeof useDispatch> =>
  useDispatch<AppDispatch>();
export const useThunkDispatch = (): ThunkDispatch<
  RootState,
  unknown,
  AnyAction
> => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
