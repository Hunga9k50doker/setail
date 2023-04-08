import { combineReducers } from "redux";
import cards from "./cards";
import tours from "./tours";
import authReducer from "./auth";

export default combineReducers({
  cards,
  tours,
  authReducer,
});
