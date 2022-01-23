import { combineReducers } from "redux";
import messageReducer from "./Reducers/messageReducer";
import userReducer from "./Reducers/userReducer";
import preferenceReducer from "./Reducers/preferenceReducer";
import timeReducer from "./Reducers/timeReducer";

export default combineReducers({
  user: userReducer,
  messages: messageReducer,
  preferences: preferenceReducer,
  time: timeReducer,
});
