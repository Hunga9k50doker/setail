import { combineReducers } from "redux";
import cards from "./cards";
import tours from "./tours";
import authReducer from "./auth";
import products from "./products";
import carts from "./carts";

export default combineReducers({
  cards,
  tours,
  carts,
  products,
  authReducer,
});
