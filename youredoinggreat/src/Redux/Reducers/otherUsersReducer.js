import { SET_OTHER_USERS } from "../../Constants/reducerEvents";

const INITIAL_STATE = [];

export default function otherUsersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_OTHER_USERS:
      return action.payload;

    default:
      return state;
  }
}
