import { configureStore } from "@reduxjs/toolkit";
//import debtReducer from "./debtSlice.js";
import { debtorApi } from "./debtorApi.js";

export const store = configureStore({
  reducer: {
    [debtorApi.reducerPath]: debtorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(debtorApi.middleware),
});
