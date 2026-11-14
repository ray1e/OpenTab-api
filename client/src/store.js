import { configureStore } from "@reduxjs/toolkit";
//import debtReducer from "./debtSlice.js";
import { debtorApi } from "./debtorApi.js";
import { tabApi } from "./tabApi.js";

export const store = configureStore({
  reducer: {
    [debtorApi.reducerPath]: debtorApi.reducer,
    [tabApi.reducerPath]: tabApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(debtorApi.middleware, tabApi.middleware),
});
