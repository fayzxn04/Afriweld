import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer.js";
import bannerReducer from "./reducers/bannerReducer.js";
import categoryReducer from "./reducers/categoryReducer.js";
import productReducer from "./reducers/productReducer.js";
import addressReducer from "./reducers/addressReducer.js";
import couponReducer from "./reducers/couponReducer.js";
import userReducer from "./reducers/userReducer.js";

export const store = configureStore({
  reducer: {
    app: appReducer,
    banner: bannerReducer,
    category: categoryReducer,
    product: productReducer,
    address: addressReducer,
    coupon: couponReducer,
    user: userReducer,
  },
});
