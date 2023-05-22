import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import loginExampleSlice from "../Features/example.slice";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = configureStore({
  reducer: {
    example: loginExampleSlice,
  },
  middleware: [...middlewares, thunk],
});

export default store;