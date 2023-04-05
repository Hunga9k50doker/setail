import { combineReducers } from "redux";
import cards from "./cards";
import authReducer from "./auth";

export default combineReducers({
  cards,
  authReducer,
});
