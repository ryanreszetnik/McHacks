import { combineReducers } from "redux";
import messageReducer from "./Reducers/messageReducer";
import userReducer from "./Reducers/userReducer";

export default combineReducers({
  user: userReducer,
  messages: messageReducer,
});
