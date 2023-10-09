import { combineReducers } from "redux";
import cards from "./cards";
import tours from "./tours";
import authReducer from "./auth";
import products from "./products";

export default combineReducers({
  cards,
  tours,
  products,
  authReducer,
});
