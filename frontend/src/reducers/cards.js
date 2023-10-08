/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import {
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD,
  GET_ALL_CARDS,
  GET_CARD_BY_ID,
  END_LOADING,
  START_LOADING,
  UPDATE_REVIEW_CARD,
  SEARCH_CARDS,
} from "../constants/actionTypes";
import { produce } from "immer";

const initialState = {
  isLoading: true,

  cards: {
    items: [],
    totalPages: 1,
    currentPage: 1,
    totalCount: 0,
  },
  card: null,
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
      case GET_ALL_CARDS:
        draftState.cards = action.payload.data;
        break;
      case SEARCH_CARDS:
        draftState.cards = action.payload.data;
        break;
      case GET_CARD_BY_ID:
        draftState.card = action.payload.card;
        break;
      case CREATE_CARD:
        draftState.cards.items.push(action.payload);
        break;
      case UPDATE_CARD:
        const index = draftState.cards.items.findIndex(
          (card) => card._id === action.payload
        );
        if (index !== -1) {
          draftState.cards.items[index] = action.payload;
        }
        break;
      case UPDATE_REVIEW_CARD:
        draftState.card = action.payload.card;
        break;
      case DELETE_CARD:
        draftState.cards = draftState.cards.items.filter(
          (card) => card._id !== action.payload
        );
        break;
      default:
        break;
    }
  });
};

export default reducer;
