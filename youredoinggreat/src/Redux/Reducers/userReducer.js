import { SET_USER } from "../../Constants/reducerEvents";

const INITIAL_STATE = {};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}
