/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  END_LOADING,
  START_LOADING,
  UPDATE_REVIEW_PRODUCT,
  SEARCH_PRODUCTS,
} from "../constants/actionTypes";
import { produce } from "immer";

const initialState = {
  isLoading: true,

  products: {
    items: [],
    totalPages: 1,
    currentPage: 1,
    totalCount: 0,
  },
  product: null,
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
      case GET_ALL_PRODUCTS:
        draftState.products = action.payload.data;
        break;
      case SEARCH_PRODUCTS:
        draftState.products = action.payload.data;
        break;
      case GET_PRODUCT_BY_ID:
        draftState.product = action.payload.product;
        break;
      case CREATE_PRODUCT:
        draftState.products.items.push(action.payload);
        break;
      case UPDATE_PRODUCT:
        const index = draftState.products.items.findIndex(
          (product) => product._id === action.payload
        );
        if (index !== -1) {
          draftState.products.items[index] = action.payload;
        }
        break;
      case UPDATE_REVIEW_PRODUCT:
        draftState.product = action.payload.product;
        break;
      case DELETE_PRODUCT:
        draftState.products = draftState.products.items.filter(
          (product) => product._id !== action.payload
        );
        break;
      default:
        break;
    }
  });
};

export default reducer;
