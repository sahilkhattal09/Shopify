import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export const dontShowError = [].map(
  (i) => (i as any)?.typePrefix?.split?.("/")?.[1]
);
