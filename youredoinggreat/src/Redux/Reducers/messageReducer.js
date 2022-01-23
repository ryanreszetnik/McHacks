import {
  SET_MESSAGES,
  ADD_MESSAGE,
  REMOVE_MESSAGE,
} from "../../Constants/reducerEvents";
import { addMessage, removeMessage } from "../../Endpoints";

const INITIAL_STATE = [];

export default function messageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return action.payload;
    case ADD_MESSAGE:
      addMessage(action.payload);
      return [...state, action.payload];
    case REMOVE_MESSAGE:
      removeMessage(action.payload);
      return state.filter((m) => m !== action.payload);
    default:
      return state;
  }
}
