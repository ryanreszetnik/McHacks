import { SET_TIME, UPDATE_TIME } from "../../Constants/reducerEvents";
import { updateTime } from "../../Endpoints";

const INITIAL_STATE = {
  delay: { hours: 0, minutes: 1 },
  start: { hours: 9, minutes: 0 },
  end: { hours: 20, minutes: 0 },
};

export default function timeReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_TIME:
      return action.payload;
    case UPDATE_TIME:
      updateTime(action.payload);
      return action.payload;
    default:
      return state;
  }
}
