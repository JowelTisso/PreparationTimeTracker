import { combineReducers } from "redux";
import logReducer from "./logSlice";
import calendarReducer from "./calendarSlice";

const rootReducer = combineReducers({
  logState: logReducer,
  calendarState: calendarReducer,
});

export default rootReducer;
