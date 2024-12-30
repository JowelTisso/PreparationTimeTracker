import { combineReducers } from "redux";
import logReducer from "./logSlice";

const rootReducer = combineReducers({
  logState: logReducer,
});

export default rootReducer;
