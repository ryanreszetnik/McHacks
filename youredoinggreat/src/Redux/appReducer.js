import { combineReducers } from "redux";
import messageReducer from "./Reducers/messageReducer";
import userReducer from "./Reducers/userReducer";
import preferenceReducer from "./Reducers/preferenceReducer";

export default combineReducers({
  user: userReducer,
  messages: messageReducer,
  preferences: preferenceReducer,
});
