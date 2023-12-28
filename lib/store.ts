import { configureStore } from "@reduxjs/toolkit";

import raceDataReducer from "./features/racedata/racedataslice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      raceDataReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
