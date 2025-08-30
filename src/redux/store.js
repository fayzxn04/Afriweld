import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer.js";
import bannerReducer from "./reducers/bannerReducer.js";

export const store = configureStore({
  reducer: {
    app: appReducer,
    banner: bannerReducer,
  },
});
