import { combineReducers } from "redux";
import cards from "./cards";
import tours from "./tours";
import authReducer from "./auth";
import products from "./products";
import carts from "./carts";
import comments from "./comments";

export default combineReducers({
  cards,
  tours,
  comments,
  carts,
  products,
  authReducer,
});
