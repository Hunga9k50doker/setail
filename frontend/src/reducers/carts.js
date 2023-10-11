/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import {
  CREATE_CART,
  GET_ALL_CARTS,
  GET_CART_BY_ID,
  END_LOADING,
  START_LOADING,
  DELETE_CART,
  UPDATE_CART,
} from "../constants/actionTypes";
import { produce } from "immer";

const initialState = {
  isLoading: true,
  carts: [],
  cart: {
    items: [],
    totalCount: 0,
    itemsPerPage: 0,
    currentPage: 1,
  },
};

const reducer = (state = initialState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case START_LOADING:
        draftState.isLoading = true;
        break;
      case END_LOADING:
        draftState.isLoading = false;
        break;
      case GET_ALL_CARTS:
        draftState.carts = action.payload.data;
        break;
      case GET_CART_BY_ID:
        draftState.cart = action.payload.cart;
        break;
      case CREATE_CART:
        draftState.carts.push(action.payload);
        break;
      case DELETE_CART:
        draftState.cart.items = draftState.cart.items.filter(
          (cart) => cart.product._id !== action.payload
        );
        break;
      case UPDATE_CART:
        draftState.cart.items = draftState.cart.items.map((cart) => {
          if (cart.product._id === action.payload.id) {
            return {
              ...cart,
              quantity: action.payload.quantity,
              total: +action.payload.quantity * cart.product.cost,
            };
          }
          return cart;
        });
        break;
      default:
        break;
    }
  });
};

export default reducer;
