import {
    SET_WATER,
    SET_EXERCISE,
    SET_CALL,
    SET_FOOD,
    SET_ALL
  } from "../../Constants/reducerEvents";
  import {setWater, setFood, setExercise, setCall} from "../../Endpoints";
  
  const INITIAL_STATE = {water:false, exercise: false, food:false, call:false};
  
  export default function preferenceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case SET_WATER:
        setWater(action.payload)
        return {...state, water:action.payload}
      case SET_FOOD:
        setFood(action.payload)
        return {...state, food:action.payload}
      case SET_EXERCISE:
        setExercise(action.payload)
        return {...state, exercise:action.payload}
      case SET_CALL:
        setCall(action.payload)
        return {...state, call:action.payload}
    case SET_ALL:
        return action.payload
      default:
        return state;
    }
  }
  