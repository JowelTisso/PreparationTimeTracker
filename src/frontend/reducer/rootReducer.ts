import { combineReducers } from "redux";
import logReducer from "./logSlice";

const rootReducer = combineReducers({
  logs: logReducer,
});

export default rootReducer;
