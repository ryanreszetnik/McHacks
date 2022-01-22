import { createStore } from "redux";
import appReducer from "./appReducer";
export const store = createStore(appReducer);
